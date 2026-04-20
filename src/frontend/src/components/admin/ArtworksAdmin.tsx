import type { Artwork } from "@/backend";
import { useFileUpload } from "@/blob-storage/FileStorage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddDraftArtwork,
  useDraftArtists,
  useDraftArtworks,
  usePermanentlyDeleteArtwork,
  useUpdateArtworkGalleryImages,
  useUpdateDraftArtwork,
} from "@/hooks/useQueries";
import {
  GripVertical,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ArtworksAdmin() {
  const { data: artworks, isLoading } = useDraftArtworks();
  const { data: artists } = useDraftArtists();
  const addArtwork = useAddDraftArtwork();
  const updateArtwork = useUpdateDraftArtwork();
  const permanentlyDelete = usePermanentlyDeleteArtwork();
  useUpdateArtworkGalleryImages();
  const { uploadFile, isUploading } = useFileUpload();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [artworkToDelete, setArtworkToDelete] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Artwork>({
    id: "",
    title: "",
    description: "",
    artistId: "",
    photo: "",
    isForSale: false,
    price: undefined,
    galleryImages: [],
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
      artistId: "",
      photo: "",
      isForSale: false,
      price: undefined,
      galleryImages: [],
    });
    setEditingArtwork(null);
    setPhotoPreview(null);
    setSelectedFile(null);
  };

  const handleOpenDialog = (artwork?: Artwork) => {
    if (artwork) {
      setEditingArtwork(artwork);
      setFormData(artwork);
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }

    try {
      const path = `artworks/${Date.now()}-${selectedFile.name}`;
      const { url } = await uploadFile(path, selectedFile);
      setFormData({ ...formData, photo: url });
      toast.success("Photo uploaded successfully");
      setSelectedFile(null);
      setPhotoPreview(null);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload photo");
    }
  };

  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image file`);
        continue;
      }

      try {
        const path = `artworks/gallery/${Date.now()}-${file.name}`;
        const { url } = await uploadFile(path, file);
        setFormData((prev) => ({
          ...prev,
          galleryImages: [...prev.galleryImages, url],
        }));
        toast.success(`${file.name} uploaded successfully`);
      } catch (error) {
        console.error("Upload error:", error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index),
    }));
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newImages = [...formData.galleryImages];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);

    setFormData((prev) => ({ ...prev, galleryImages: newImages }));
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.artistId) {
      toast.error("Please fill in all required fields");
      return;
    }

    const artworkData = {
      ...formData,
      id: editingArtwork ? formData.id : `artwork-${Date.now()}`,
      price: formData.isForSale && formData.price ? formData.price : undefined,
    };

    try {
      if (editingArtwork) {
        await updateArtwork.mutateAsync(artworkData);
        toast.success("Artwork updated in draft");
      } else {
        await addArtwork.mutateAsync(artworkData);
        toast.success("Artwork added to draft");
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving artwork:", error);
      toast.error("Failed to save artwork");
    }
  };

  const handleDeleteClick = (id: string) => {
    setArtworkToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!artworkToDelete) return;

    try {
      await permanentlyDelete.mutateAsync(artworkToDelete);
      toast.success("Artwork permanently deleted");
      setDeleteConfirmOpen(false);
      setArtworkToDelete(null);
    } catch (error) {
      console.error("Error deleting artwork:", error);
      toast.error("Failed to delete artwork");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Artworks (Draft)
          </h2>
          <p className="text-sm text-[#5a6378]">
            Manage artwork collection - changes saved to draft until published
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => handleOpenDialog()}
              className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Artwork
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl bg-white border-[#e2e5eb]">
            <DialogHeader>
              <DialogTitle className="text-[#1a1d23]">
                {editingArtwork ? "Edit Artwork" : "Add New Artwork"}
              </DialogTitle>
              <DialogDescription className="text-[#5a6378]">
                {editingArtwork
                  ? "Update artwork details and images"
                  : "Create a new artwork entry with images"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[#1a1d23]">
                  Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Artwork Title"
                  className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-[#1a1d23]">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe the artwork..."
                  rows={4}
                  className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="artistId" className="text-[#1a1d23]">
                  Artist *
                </Label>
                <Select
                  value={formData.artistId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, artistId: value })
                  }
                >
                  <SelectTrigger className="border-[#e2e5eb] bg-white text-[#1a1d23]">
                    <SelectValue placeholder="Select an artist" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#e2e5eb]">
                    {artists?.map((artist) => (
                      <SelectItem
                        key={artist.id}
                        value={artist.id}
                        className="text-[#1a1d23]"
                      >
                        {artist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-[#1a1d23]">Main Photo</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="relative aspect-square overflow-hidden rounded-lg border border-luxury-gold/30 bg-muted">
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : formData.photo ? (
                        <img
                          src={formData.photo}
                          alt="Artwork cover"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[#96a0b5]">
                          No photo
                        </div>
                      )}
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoSelect}
                      className="cursor-pointer border-[#e2e5eb] bg-white text-[#1a1d23]"
                    />
                    {selectedFile && (
                      <Button
                        type="button"
                        onClick={handlePhotoUpload}
                        disabled={isUploading}
                        className="w-full"
                        variant="outline"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Photo
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="photoUrl" className="text-[#1a1d23]">
                      Or enter photo URL
                    </Label>
                    <Input
                      id="photoUrl"
                      value={formData.photo}
                      onChange={(e) =>
                        setFormData({ ...formData, photo: e.target.value })
                      }
                      placeholder="/assets/generated/artwork-photo.jpg"
                      className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
                    />
                    <p className="text-xs text-white/50">
                      Use uploaded image URL or path from /assets/ directory
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#1a1d23]">
                  Gallery Images (drag to reorder)
                </Label>
                <div className="space-y-4">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryUpload}
                    disabled={isUploading}
                    className="cursor-pointer border-luxury-gold/30 bg-white/5 text-white"
                  />
                  {formData.galleryImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {formData.galleryImages.map((image, index) => (
                        <div
                          key={image || index}
                          draggable
                          onDragStart={() => handleDragStart(index)}
                          onDragOver={(e) => handleDragOver(e, index)}
                          onDragEnd={handleDragEnd}
                          className="group relative aspect-square overflow-hidden rounded-lg border border-luxury-gold/30 cursor-move"
                        >
                          <img
                            src={image}
                            alt={`Artwork view ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <GripVertical className="h-6 w-6 text-white" />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(index)}
                            className="absolute right-1 top-1 rounded-full bg-destructive p-1 opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <X className="h-3 w-3 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isForSale"
                  checked={formData.isForSale}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isForSale: checked })
                  }
                />
                <Label htmlFor="isForSale" className="text-[#1a1d23]">
                  Available for Sale
                </Label>
              </div>

              {formData.isForSale && (
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-[#1a1d23]">
                    Price (USD)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price ? Number(formData.price) : ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: e.target.value
                          ? BigInt(e.target.value)
                          : undefined,
                      })
                    }
                    placeholder="1000"
                    className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-[#e2e5eb] text-[#1a1d23] hover:bg-[#f0f2f7]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    addArtwork.isPending ||
                    updateArtwork.isPending ||
                    isUploading
                  }
                  className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                >
                  {(addArtwork.isPending || updateArtwork.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingArtwork ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {artworks?.map((artwork) => {
          const artist = artists?.find((a) => a.id === artwork.artistId);
          return (
            <Card
              key={artwork.id}
              className="overflow-hidden border-[#e2e5eb] bg-white shadow-sm"
            >
              {artwork.photo && (
                <div className="aspect-square overflow-hidden">
                  <img
                    src={artwork.photo}
                    alt={artwork.title}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-white">
                      {artwork.title}
                    </CardTitle>
                    <CardDescription className="text-[#5a6378]">
                      {artist?.name || "Unknown Artist"} •{" "}
                      {artwork.galleryImages.length} gallery images
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenDialog(artwork)}
                      className="text-[#5a6378] hover:text-[#1a1d23] hover:bg-[#f0f2f7]"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(artwork.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="line-clamp-2 text-sm text-[#5a6378]">
                  {artwork.description}
                </p>
                {artwork.isForSale && artwork.price && (
                  <p className="text-sm font-medium text-luxury-gold">
                    ${Number(artwork.price).toLocaleString()}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {artworks?.length === 0 && (
        <Card className="border-[#e2e5eb] bg-white shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-[#5a6378]">
              No artworks yet. Add your first artwork to get started.
            </p>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent className="bg-white border-[#e2e5eb]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#1a1d23]">
              Permanently Delete Artwork?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#5a6378]">
              This action cannot be undone. This will permanently delete the
              artwork from both draft and live environments, including all
              associated images and data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#e2e5eb] text-[#1a1d23] hover:bg-[#f0f2f7]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={permanentlyDelete.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {permanentlyDelete.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
