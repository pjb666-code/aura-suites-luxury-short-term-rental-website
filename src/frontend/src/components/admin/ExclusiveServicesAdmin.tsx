import { useFileUpload, useFileUrl } from "@/blob-storage/FileStorage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import type { ExclusiveService } from "@/hooks/useQueries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronUp,
  Edit2,
  ImageIcon,
  Loader2,
  Plus,
  Save,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const DEFAULT_CATEGORIES = [
  "Culinary",
  "Wellness",
  "Transport",
  "Culture",
  "Concierge",
  "Events",
];

function useDraftExclusiveServices() {
  const { actor, isFetching } = useActor();
  return useQuery<ExclusiveService[]>({
    queryKey: ["draftExclusiveServices"],
    queryFn: async () => {
      if (!actor) return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).listDraftExclusiveServices();
    },
    enabled: !!actor && !isFetching,
  });
}

function ImageKeyPreview({ imageKey }: { imageKey: string }) {
  const { data: url, isLoading } = useFileUrl(imageKey);
  if (isLoading)
    return (
      <div className="flex h-20 w-full items-center justify-center rounded-md border border-[#e2e5eb] bg-[#f7f8fa]">
        <Loader2 className="h-4 w-4 animate-spin text-luxury-gold" />
      </div>
    );
  if (!url) return null;
  return (
    <img
      src={url}
      alt="Preview"
      className="h-20 w-full rounded-md object-cover border border-[#e2e5eb]"
    />
  );
}

function ImageUploadArea({
  onUploaded,
}: {
  onUploaded: (path: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, isUploading } = useFileUpload();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `exclusive-services/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    try {
      const res = await uploadFile(path, file);
      onUploaded(res.path);
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="admin-upload-zone flex w-full flex-col items-center justify-center gap-2 py-4 disabled:cursor-not-allowed disabled:opacity-50"
        data-ocid="service-image-upload"
      >
        {isUploading ? (
          <Loader2 className="h-5 w-5 animate-spin text-luxury-gold" />
        ) : (
          <>
            <div className="flex items-center gap-1.5">
              <Upload className="h-4 w-4" />
              <ImageIcon className="h-4 w-4" />
            </div>
            <span className="text-xs">Upload image (.png, .jpg, .webp)</span>
          </>
        )}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.webp"
        className="hidden"
        onChange={handleChange}
      />
    </>
  );
}

const emptyService = {
  name: "",
  category: "Concierge",
  description: "",
  priceInfo: "",
  imageKey: undefined as string | undefined,
  requestLink: "",
  visible: true,
};

type ServiceFormState = typeof emptyService;

// ─── Extracted as top-level component to prevent unmount/remount on re-render ─
interface ServiceFormFieldsProps {
  value: ServiceFormState;
  onChange: (f: ServiceFormState) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}

function ServiceFormFields({
  value,
  onChange,
  onSave,
  onCancel,
  saving,
}: ServiceFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-[#1a1d23] font-medium">Service Name</Label>
          <Input
            value={value.name}
            onChange={(e) => onChange({ ...value, name: e.target.value })}
            placeholder="e.g. Private Chef"
            className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
            data-ocid="service-name-input"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[#1a1d23] font-medium">Category</Label>
          <Input
            value={value.category}
            onChange={(e) => onChange({ ...value, category: e.target.value })}
            list="service-category-options"
            placeholder="e.g. Culinary"
            className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
          />
          <datalist id="service-category-options">
            {DEFAULT_CATEGORIES.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-[#1a1d23] font-medium">Description</Label>
        <Textarea
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
          rows={3}
          placeholder="Describe this exclusive service..."
          className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-[#1a1d23] font-medium">
          Price Info (optional)
        </Label>
        <Input
          value={value.priceInfo}
          onChange={(e) => onChange({ ...value, priceInfo: e.target.value })}
          placeholder="e.g. From $150/person"
          className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-[#1a1d23] font-medium">Image (optional)</Label>
        {value.imageKey ? (
          <div className="space-y-2">
            <ImageKeyPreview imageKey={value.imageKey} />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onChange({ ...value, imageKey: undefined })}
              className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="mr-1 h-3 w-3" />
              Remove image
            </Button>
          </div>
        ) : (
          <ImageUploadArea
            onUploaded={(path) => onChange({ ...value, imageKey: path })}
          />
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-[#1a1d23] font-medium">
          Request Link (optional)
        </Label>
        <Input
          value={value.requestLink}
          onChange={(e) => onChange({ ...value, requestLink: e.target.value })}
          placeholder="https://wa.me/... or mailto:..."
          className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
        />
      </div>

      <div className="flex items-center gap-2">
        <Switch
          checked={value.visible}
          onCheckedChange={(v) => onChange({ ...value, visible: v })}
          data-ocid="service-visible-toggle"
        />
        <Label className="text-[#1a1d23]">Visible on site</Label>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={onSave}
          disabled={saving || !value.name.trim()}
          className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
        >
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save
        </Button>
        <Button
          variant="ghost"
          onClick={onCancel}
          className="text-[#5a6378] hover:bg-[#f0f2f7]"
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default function ExclusiveServicesAdmin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { data: services = [], isLoading } = useDraftExclusiveServices();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState<ServiceFormState>(emptyService);
  const [editForms, setEditForms] = useState<Record<string, ServiceFormState>>(
    {},
  );

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["draftExclusiveServices"] });

  const { mutate: addService, isPending: adding } = useMutation({
    mutationFn: async (s: ServiceFormState) => {
      if (!actor) throw new Error("Actor not initialized");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (actor as any).addDraftExclusiveService({
        id: "",
        sortOrder: BigInt(0),
        name: s.name,
        category: s.category,
        description: s.description,
        priceInfo: s.priceInfo || undefined,
        imageKey: s.imageKey ?? undefined,
        requestLink: s.requestLink || undefined,
        visible: s.visible,
      });
    },
    onSuccess: () => {
      invalidate();
      toast.success("Service added");
      setForm(emptyService);
      setShowAddForm(false);
    },
    onError: () => toast.error("Failed to add service"),
  });

  const { mutate: updateService, isPending: updating } = useMutation({
    mutationFn: async ({
      id,
      sortOrder,
      f,
    }: { id: string; sortOrder: bigint; f: ServiceFormState }) => {
      if (!actor) throw new Error("Actor not initialized");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (actor as any).updateDraftExclusiveService({
        id,
        sortOrder,
        name: f.name,
        category: f.category,
        description: f.description,
        priceInfo: f.priceInfo || undefined,
        imageKey: f.imageKey ?? undefined,
        requestLink: f.requestLink || undefined,
        visible: f.visible,
      });
    },
    onSuccess: () => {
      invalidate();
      toast.success("Service updated");
      setEditingId(null);
    },
    onError: () => toast.error("Failed to update service"),
  });

  const { mutate: deleteService } = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not initialized");
      await actor.deleteDraftExclusiveService(id);
    },
    onSuccess: () => {
      invalidate();
      toast.success("Service deleted");
    },
    onError: () => toast.error("Failed to delete service"),
  });

  const { mutate: reorder } = useMutation({
    mutationFn: async (ids: string[]) => {
      if (!actor) throw new Error("Actor not initialized");
      await actor.reorderExclusiveServices(ids);
    },
    onSuccess: () => invalidate(),
    onError: () => toast.error("Failed to reorder"),
  });

  const sorted = [...services].sort(
    (a, b) => Number(a.sortOrder) - Number(b.sortOrder),
  );

  const handleMove = (idx: number, dir: "up" | "down") => {
    const newIdx = dir === "up" ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= sorted.length) return;
    const ids = sorted.map((s) => s.id);
    [ids[idx], ids[newIdx]] = [ids[newIdx], ids[idx]];
    reorder(ids);
  };

  const startEdit = (s: ExclusiveService) => {
    setEditForms((prev) => ({
      ...prev,
      [s.id]: {
        name: s.name,
        category: s.category,
        description: s.description,
        priceInfo: s.priceInfo ?? "",
        imageKey: s.imageKey ?? undefined,
        requestLink: s.requestLink ?? "",
        visible: s.visible,
      },
    }));
    setEditingId(s.id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-6" data-ocid="exclusive-services-admin">
      <Card className="border-[#e2e5eb] bg-white shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#1a1d23]">
                Exclusive Services
              </CardTitle>
              <CardDescription className="text-[#5a6378]">
                Offer curated services to your guests — private chef, concierge,
                tours, and more.
              </CardDescription>
            </div>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
              data-ocid="add-service-btn"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </div>
        </CardHeader>

        {showAddForm && (
          <CardContent className="border-t border-[#e2e5eb] pt-6">
            <h3 className="text-sm font-semibold text-luxury-gold mb-4">
              New Exclusive Service
            </h3>
            <ServiceFormFields
              value={form}
              onChange={setForm}
              onSave={() => addService(form)}
              onCancel={() => {
                setShowAddForm(false);
                setForm(emptyService);
              }}
              saving={adding}
            />
          </CardContent>
        )}
      </Card>

      {sorted.length === 0 && !showAddForm && (
        <div
          className="rounded-lg border border-[#e2e5eb] bg-[#f7f8fa] py-12 text-center text-[#96a0b5]"
          data-ocid="services-empty-state"
        >
          No services added yet. Click "Add Service" to get started.
        </div>
      )}

      {sorted.map((service, idx) => (
        <Card
          key={service.id}
          className="border-[#e2e5eb] bg-white shadow-sm"
          data-ocid={`service-item-${service.id}`}
        >
          <CardContent className="p-5">
            {editingId === service.id && editForms[service.id] ? (
              <>
                <h3 className="text-sm font-semibold text-luxury-gold mb-4">
                  Edit: {service.name}
                </h3>
                <ServiceFormFields
                  value={editForms[service.id]}
                  onChange={(f) =>
                    setEditForms((prev) => ({ ...prev, [service.id]: f }))
                  }
                  onSave={() =>
                    updateService({
                      id: service.id,
                      sortOrder: service.sortOrder,
                      f: editForms[service.id],
                    })
                  }
                  onCancel={() => setEditingId(null)}
                  saving={updating}
                />
              </>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-luxury-gold" />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-medium text-[#1a1d23]">
                        {service.name}
                      </span>
                      <Badge className="bg-luxury-gold/12 text-luxury-gold border-luxury-gold/30 text-xs">
                        {service.category}
                      </Badge>
                      {!service.visible && (
                        <Badge className="bg-[#f0f2f7] text-[#96a0b5] border-[#e2e5eb] text-xs">
                          Hidden
                        </Badge>
                      )}
                      {service.priceInfo && (
                        <span className="text-xs text-[#5a6378]">
                          {service.priceInfo}
                        </span>
                      )}
                      {service.imageKey && (
                        <ImageIcon className="h-3 w-3 text-luxury-gold" />
                      )}
                    </div>
                    <p className="text-xs text-[#5a6378] line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMove(idx, "up")}
                    disabled={idx === 0}
                    className="h-8 w-8 text-[#96a0b5] hover:text-[#1a1d23] hover:bg-[#f0f2f7]"
                    aria-label="Move up"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMove(idx, "down")}
                    disabled={idx === sorted.length - 1}
                    className="h-8 w-8 text-[#96a0b5] hover:text-[#1a1d23] hover:bg-[#f0f2f7]"
                    aria-label="Move down"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => startEdit(service)}
                    className="h-8 w-8 text-[#5a6378] hover:text-luxury-gold hover:bg-luxury-gold/10"
                    aria-label="Edit"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteService(service.id)}
                    className="h-8 w-8 text-[#5a6378] hover:text-red-600 hover:bg-red-50"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
