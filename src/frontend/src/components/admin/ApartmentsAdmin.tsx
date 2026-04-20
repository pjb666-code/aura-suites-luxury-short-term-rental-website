import type { Apartment } from "@/backend";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddDraftApartment,
  useDraftApartments,
  usePermanentlyDeleteApartment,
  useUpdateApartmentGalleryImages,
  useUpdateDraftApartment,
} from "@/hooks/useQueries";
import { GripVertical, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ApartmentsAdmin() {
  const { data: apartments, isLoading } = useDraftApartments();
  const addApartment = useAddDraftApartment();
  const updateApartment = useUpdateDraftApartment();
  const permanentlyDelete = usePermanentlyDeleteApartment();
  useUpdateApartmentGalleryImages();
  const { uploadFile, isUploading } = useFileUpload();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingApartment, setEditingApartment] = useState<Apartment | null>(
    null,
  );
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [apartmentToDelete, setApartmentToDelete] = useState<string | null>(
    null,
  );
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Apartment>({
    id: "",
    name: "",
    description: "",
    amenities: [],
    city: "Buenos Aires",
    address: "",
    photos: [],
    isActive: true,
    bookingUrl: "",
  });

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      description: "",
      amenities: [],
      city: "Buenos Aires",
      address: "",
      photos: [],
      isActive: true,
      bookingUrl: "",
    });
    setEditingApartment(null);
  };

  const handleOpenDialog = (apartment?: Apartment) => {
    if (apartment) {
      setEditingApartment(apartment);
      setFormData(apartment);
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image file`);
        continue;
      }

      try {
        const path = `apartments/${Date.now()}-${file.name}`;
        const { url } = await uploadFile(path, file);
        setFormData((prev) => ({
          ...prev,
          photos: [...prev.photos, url],
        }));
        toast.success(`${file.name} uploaded successfully`);
      } catch (error) {
        console.error("Upload error:", error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }
  };

  const handleRemovePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newPhotos = [...formData.photos];
    const draggedPhoto = newPhotos[draggedIndex];
    newPhotos.splice(draggedIndex, 1);
    newPhotos.splice(index, 0, draggedPhoto);

    setFormData((prev) => ({ ...prev, photos: newPhotos }));
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    const apartmentData = {
      ...formData,
      id: editingApartment ? formData.id : `apt-${Date.now()}`,
    };

    try {
      if (editingApartment) {
        await updateApartment.mutateAsync(apartmentData);
        toast.success("Apartment updated in draft");
      } else {
        await addApartment.mutateAsync(apartmentData);
        toast.success("Apartment added to draft");
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving apartment:", error);
      toast.error("Failed to save apartment");
    }
  };

  const handleDeleteClick = (id: string) => {
    setApartmentToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!apartmentToDelete) return;

    try {
      await permanentlyDelete.mutateAsync(apartmentToDelete);
      toast.success("Apartment permanently deleted");
      setDeleteConfirmOpen(false);
      setApartmentToDelete(null);
    } catch (error) {
      console.error("Error deleting apartment:", error);
      toast.error("Failed to delete apartment");
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
          <h2 className="text-2xl font-semibold text-[#1a1d23]">
            Apartments (Draft)
          </h2>
          <p className="text-sm text-[#5a6378]">
            Manage apartment listings - changes saved to draft until published
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => handleOpenDialog()}
              className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Apartment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl bg-white border-[#e2e5eb]">
            <DialogHeader>
              <DialogTitle className="text-[#1a1d23]">
                {editingApartment ? "Edit Apartment" : "Add New Apartment"}
              </DialogTitle>
              <DialogDescription className="text-[#5a6378]">
                {editingApartment
                  ? "Update apartment details and images"
                  : "Create a new apartment listing with images"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#1a1d23] font-medium">
                  Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Luxury Loft 101"
                  className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-[#1a1d23] font-medium"
                >
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe the apartment..."
                  rows={4}
                  className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-[#1a1d23] font-medium">
                    City
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder="Buenos Aires"
                    className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className="text-[#1a1d23] font-medium"
                  >
                    Address *
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Palermo Hollywood"
                    className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="amenities"
                  className="text-[#1a1d23] font-medium"
                >
                  Amenities (comma-separated)
                </Label>
                <Input
                  id="amenities"
                  value={formData.amenities.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amenities: e.target.value
                        .split(",")
                        .map((a) => a.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="WiFi, Air Conditioning, Kitchen"
                  className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="bookingUrl"
                  className="text-[#1a1d23] font-medium"
                >
                  Custom Booking URL (optional)
                </Label>
                <Input
                  id="bookingUrl"
                  value={formData.bookingUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, bookingUrl: e.target.value })
                  }
                  placeholder="https://booking.com/your-apartment"
                  className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
                />
                <p className="text-xs text-[#96a0b5]">
                  Leave empty to use the global booking URL
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-[#1a1d23] font-medium">
                  Photos (drag to reorder)
                </Label>
                <div className="space-y-4">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    disabled={isUploading}
                    className="cursor-pointer border-[#e2e5eb] bg-white text-[#1a1d23]"
                  />
                  {formData.photos.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {formData.photos.map((photo, index) => (
                        <div
                          key={photo || index}
                          draggable
                          onDragStart={() => handleDragStart(index)}
                          onDragOver={(e) => handleDragOver(e, index)}
                          onDragEnd={handleDragEnd}
                          className="group relative aspect-square overflow-hidden rounded-lg border border-[#e2e5eb] cursor-move"
                        >
                          <img
                            src={photo}
                            alt={`Apartment view ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <GripVertical className="h-6 w-6 text-white" />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(index)}
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
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                />
                <Label htmlFor="isActive" className="text-[#1a1d23]">
                  Active
                </Label>
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
                    addApartment.isPending ||
                    updateApartment.isPending ||
                    isUploading
                  }
                  className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                >
                  {(addApartment.isPending || updateApartment.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingApartment ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {apartments?.map((apartment) => (
          <Card
            key={apartment.id}
            className="overflow-hidden border-[#e2e5eb] bg-white shadow-sm"
          >
            {apartment.photos.length > 0 && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={apartment.photos[0]}
                  alt={apartment.name}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-[#1a1d23]">
                    {apartment.name}
                  </CardTitle>
                  <CardDescription className="text-[#5a6378]">
                    {apartment.city}
                  </CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenDialog(apartment)}
                    className="text-[#5a6378] hover:text-[#1a1d23] hover:bg-[#f0f2f7]"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteClick(apartment.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="line-clamp-2 text-sm text-[#5a6378]">
                {apartment.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-[#96a0b5]">
                <span>{apartment.photos.length} photos</span>
                <span>•</span>
                <span
                  className={
                    apartment.isActive ? "text-green-600" : "text-red-600"
                  }
                >
                  {apartment.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {apartments?.length === 0 && (
        <Card className="border-[#e2e5eb] bg-white">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-[#5a6378]">
              No apartments yet. Add your first apartment to get started.
            </p>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent className="bg-white border-[#e2e5eb]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#1a1d23]">
              Permanently Delete Apartment?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#5a6378]">
              This action cannot be undone. This will permanently delete the
              apartment from both draft and live environments, including all
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
