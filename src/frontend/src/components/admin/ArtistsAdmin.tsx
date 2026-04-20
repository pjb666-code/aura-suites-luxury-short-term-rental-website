import type { Artist } from "@/backend";
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
import { Textarea } from "@/components/ui/textarea";
import {
  useAddDraftArtist,
  useDraftArtists,
  usePermanentlyDeleteArtist,
  useUpdateArtistGalleryImages,
  useUpdateDraftArtist,
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

export default function ArtistsAdmin() {
  const { data: artists, isLoading } = useDraftArtists();
  const addArtist = useAddDraftArtist();
  const updateArtist = useUpdateDraftArtist();
  const permanentlyDelete = usePermanentlyDeleteArtist();
  useUpdateArtistGalleryImages();
  const { uploadFile, isUploading } = useFileUpload();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [artistToDelete, setArtistToDelete] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Artist>({
    id: "",
    name: "",
    bio: "",
    photo: "",
    artworks: [],
    galleryImages: [],
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      bio: "",
      photo: "",
      artworks: [],
      galleryImages: [],
    });
    setEditingArtist(null);
    setPhotoPreview(null);
    setSelectedFile(null);
  };

  const handleOpenDialog = (artist?: Artist) => {
    if (artist) {
      setEditingArtist(artist);
      setFormData(artist);
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
      const path = `artists/${Date.now()}-${selectedFile.name}`;
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
        const path = `artists/gallery/${Date.now()}-${file.name}`;
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

    if (!formData.name || !formData.bio) {
      toast.error("Please fill in all required fields");
      return;
    }

    const artistData = {
      ...formData,
      id: editingArtist ? formData.id : `artist-${Date.now()}`,
    };

    try {
      if (editingArtist) {
        await updateArtist.mutateAsync(artistData);
        toast.success("Artist updated in draft");
      } else {
        await addArtist.mutateAsync(artistData);
        toast.success("Artist added to draft");
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving artist:", error);
      toast.error("Failed to save artist");
    }
  };

  const handleDeleteClick = (id: string) => {
    setArtistToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!artistToDelete) return;

    try {
      await permanentlyDelete.mutateAsync(artistToDelete);
      toast.success("Artist permanently deleted");
      setDeleteConfirmOpen(false);
      setArtistToDelete(null);
    } catch (error) {
      console.error("Error deleting artist:", error);
      toast.error("Failed to delete artist");
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
          <h2 className="text-2xl font-semibold text-white">Artists (Draft)</h2>
          <p className="text-sm text-[#5a6378]">
            Manage artist profiles - changes saved to draft until published
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => handleOpenDialog()}
              className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Artist
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl bg-white border-[#e2e5eb]">
            <DialogHeader>
              <DialogTitle className="text-[#1a1d23]">
                {editingArtist ? "Edit Artist" : "Add New Artist"}
              </DialogTitle>
              <DialogDescription className="text-[#5a6378]">
                {editingArtist
                  ? "Update artist profile and photos"
                  : "Create a new artist profile with photos"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#1a1d23]">
                  Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Artist Name"
                  className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-[#1a1d23]">
                  Biography *
                </Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  placeholder="Tell us about the artist..."
                  rows={4}
                  className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-[#1a1d23]">Profile Photo</Label>
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
                          alt="Artist portrait"
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
                      placeholder="/assets/generated/artist-photo.jpg"
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
                    addArtist.isPending || updateArtist.isPending || isUploading
                  }
                  className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                >
                  {(addArtist.isPending || updateArtist.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingArtist ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {artists?.map((artist) => (
          <Card
            key={artist.id}
            className="overflow-hidden border-[#e2e5eb] bg-white shadow-sm"
          >
            {artist.photo && (
              <div className="aspect-square overflow-hidden">
                <img
                  src={artist.photo}
                  alt={artist.name}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-white">
                    {artist.name}
                  </CardTitle>
                  <CardDescription className="text-[#5a6378]">
                    {artist.artworks.length} artworks •{" "}
                    {artist.galleryImages.length} gallery images
                  </CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenDialog(artist)}
                    className="text-[#5a6378] hover:text-[#1a1d23] hover:bg-[#f0f2f7]"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteClick(artist.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-sm text-[#5a6378]">
                {artist.bio}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {artists?.length === 0 && (
        <Card className="border-[#e2e5eb] bg-white shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-[#5a6378]">
              No artists yet. Add your first artist to get started.
            </p>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent className="bg-white border-[#e2e5eb]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#1a1d23]">
              Permanently Delete Artist?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#5a6378]">
              This action cannot be undone. This will permanently delete the
              artist from both draft and live environments, including all
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
