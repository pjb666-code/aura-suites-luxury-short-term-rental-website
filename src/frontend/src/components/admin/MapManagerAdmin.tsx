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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import type { MapMarker } from "@/hooks/useQueries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Edit2,
  ImageIcon,
  Loader2,
  MapPin,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

const CATEGORIES = [
  "Dining",
  "Art & Culture",
  "Nightlife",
  "Shopping",
  "Local Experiences",
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  Dining: "bg-orange-600/20 text-orange-400 border-orange-600/30",
  "Art & Culture": "bg-purple-600/20 text-purple-400 border-purple-600/30",
  Nightlife: "bg-blue-600/20 text-blue-400 border-blue-600/30",
  Shopping: "bg-pink-600/20 text-pink-400 border-pink-600/30",
  "Local Experiences": "bg-green-600/20 text-green-400 border-green-600/30",
};

function useDraftMapMarkers() {
  const { actor, isFetching } = useActor();
  return useQuery<MapMarker[]>({
    queryKey: ["draftMapMarkers"],
    queryFn: async () => {
      if (!actor) return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).listDraftMapMarkers();
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

// ─── Isolated upload component — has its own state so parent never re-renders
//     while upload is in progress, which prevents focus loss. ────────────────
function ImageUploadArea({
  onUploaded,
}: { onUploaded: (path: string) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, isUploading } = useFileUpload();
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `map-markers/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    try {
      const res = await uploadFile(path, file);
      onUploaded(res.path);
      toast.success("Image uploaded successfully");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setUploadError(msg);
      toast.error(`Upload failed: ${msg}`);
      console.error("ImageUploadArea error:", err);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={() => {
          setUploadError(null);
          fileInputRef.current?.click();
        }}
        disabled={isUploading}
        className="admin-upload-zone flex w-full flex-col items-center justify-center gap-2 py-4 disabled:cursor-not-allowed disabled:opacity-50"
        data-ocid="marker-image-upload"
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
      {uploadError && (
        <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1">
          {uploadError}
        </p>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.webp"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}

const emptyMarker = {
  name: "",
  category: "Dining",
  address: "",
  description: "",
  lat: 0,
  lng: 0,
  website: "",
  imageKey: undefined as string | undefined,
  visible: true,
};

type MarkerFormState = typeof emptyMarker;

// ─── Extracted at module level — never re-created between renders ─────────
interface MarkerFormFieldsProps {
  value: MarkerFormState;
  onChange: (f: MarkerFormState) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}

function MarkerFormFields({
  value,
  onChange,
  onSave,
  onCancel,
  saving,
}: MarkerFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-[#1a1d23] font-medium">Name</Label>
          <Input
            value={value.name}
            onChange={(e) => onChange({ ...value, name: e.target.value })}
            placeholder="e.g. Narda Comedor"
            className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
            data-ocid="marker-name-input"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[#1a1d23] font-medium">Category</Label>
          <Select
            value={value.category}
            onValueChange={(v) => onChange({ ...value, category: v })}
          >
            <SelectTrigger className="border-[#e2e5eb] bg-white text-[#1a1d23]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-[#1a1d23] font-medium">Address</Label>
        <Input
          value={value.address}
          onChange={(e) => onChange({ ...value, address: e.target.value })}
          placeholder="e.g. Thames 2296, Palermo"
          className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-[#1a1d23] font-medium">Description</Label>
        <Textarea
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
          rows={2}
          className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-[#1a1d23] font-medium">Latitude</Label>
          <Input
            type="number"
            step="any"
            value={value.lat}
            onChange={(e) =>
              onChange({
                ...value,
                lat: Number.parseFloat(e.target.value) || 0,
              })
            }
            placeholder="-34.5814"
            className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
            data-ocid="marker-lat-input"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[#1a1d23] font-medium">Longitude</Label>
          <Input
            type="number"
            step="any"
            value={value.lng}
            onChange={(e) =>
              onChange({
                ...value,
                lng: Number.parseFloat(e.target.value) || 0,
              })
            }
            placeholder="-58.4340"
            className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
            data-ocid="marker-lng-input"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-[#1a1d23] font-medium">Website (optional)</Label>
        <Input
          value={value.website}
          onChange={(e) => onChange({ ...value, website: e.target.value })}
          placeholder="https://..."
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

      <div className="flex items-center gap-2">
        <Switch
          checked={value.visible}
          onCheckedChange={(v) => onChange({ ...value, visible: v })}
          data-ocid="marker-visible-toggle"
        />
        <Label className="text-[#1a1d23]">Visible on map</Label>
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

export default function MapManagerAdmin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { data: markers = [], isLoading } = useDraftMapMarkers();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState<MarkerFormState>(emptyMarker);
  const [editForms, setEditForms] = useState<Record<string, MarkerFormState>>(
    {},
  );

  const invalidate = useCallback(
    () => queryClient.invalidateQueries({ queryKey: ["draftMapMarkers"] }),
    [queryClient],
  );

  const { mutate: addMarker, isPending: adding } = useMutation({
    mutationFn: async (m: MarkerFormState) => {
      if (!actor) throw new Error("Actor not initialized");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (actor as any).addDraftMapMarker({
        id: "",
        sortOrder: BigInt(0),
        name: m.name,
        category: m.category,
        address: m.address,
        description: m.description,
        lat: m.lat,
        lng: m.lng,
        website: m.website || undefined,
        imageKey: m.imageKey ?? undefined,
        visible: m.visible,
      });
    },
    onSuccess: () => {
      invalidate();
      toast.success("Marker added");
      setForm(emptyMarker);
      setShowAddForm(false);
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast.error(`Failed to add marker: ${msg}`);
    },
  });

  const { mutate: updateMarker, isPending: updating } = useMutation({
    mutationFn: async ({
      id,
      sortOrder,
      f,
    }: { id: string; sortOrder: bigint; f: MarkerFormState }) => {
      if (!actor) throw new Error("Actor not initialized");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (actor as any).updateDraftMapMarker({
        id,
        sortOrder,
        name: f.name,
        category: f.category,
        address: f.address,
        description: f.description,
        lat: f.lat,
        lng: f.lng,
        website: f.website || undefined,
        imageKey: f.imageKey ?? undefined,
        visible: f.visible,
      });
    },
    onSuccess: () => {
      invalidate();
      toast.success("Marker updated");
      setEditingId(null);
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast.error(`Failed to update marker: ${msg}`);
    },
  });

  const { mutate: deleteMarker } = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not initialized");
      await actor.deleteDraftMapMarker(id);
    },
    onSuccess: () => {
      invalidate();
      toast.success("Marker deleted");
    },
    onError: () => toast.error("Failed to delete marker"),
  });

  const startEdit = useCallback((m: MapMarker) => {
    setEditForms((prev) => ({
      ...prev,
      [m.id]: {
        name: m.name,
        category: m.category,
        address: m.address,
        description: m.description,
        lat: m.lat,
        lng: m.lng,
        website: m.website ?? "",
        imageKey: m.imageKey ?? undefined,
        visible: m.visible,
      },
    }));
    setEditingId(m.id);
  }, []);

  // Stable onChange factory for edit forms
  const makeEditOnChange = useCallback(
    (id: string) => (f: MarkerFormState) =>
      setEditForms((prev) => ({ ...prev, [id]: f })),
    [],
  );

  const sorted = [...markers].sort(
    (a, b) => Number(a.sortOrder) - Number(b.sortOrder),
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-6" data-ocid="map-manager-admin">
      <Card className="border-[#e2e5eb] bg-white shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#1a1d23]">Map Markers</CardTitle>
              <CardDescription className="text-[#5a6378]">
                Curate places to recommend to your guests — restaurants,
                galleries, nightlife, and more.
              </CardDescription>
            </div>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
              data-ocid="add-marker-btn"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Marker
            </Button>
          </div>
        </CardHeader>

        {showAddForm && (
          <CardContent className="border-t border-[#e2e5eb] pt-6">
            <h3 className="text-sm font-semibold text-luxury-gold mb-4">
              New Map Marker
            </h3>
            <MarkerFormFields
              value={form}
              onChange={setForm}
              onSave={() => addMarker(form)}
              onCancel={() => {
                setShowAddForm(false);
                setForm(emptyMarker);
              }}
              saving={adding}
            />
          </CardContent>
        )}
      </Card>

      {sorted.length === 0 && !showAddForm && (
        <div
          className="rounded-lg border border-[#e2e5eb] bg-[#f7f8fa] py-12 text-center text-[#96a0b5]"
          data-ocid="markers-empty-state"
        >
          No markers added yet. Click "Add Marker" to get started.
        </div>
      )}

      {sorted.map((m) => (
        <Card
          key={m.id}
          className="border-[#e2e5eb] bg-white shadow-sm"
          data-ocid={`marker-item-${m.id}`}
        >
          <CardContent className="p-5">
            {editingId === m.id && editForms[m.id] ? (
              <>
                <h3 className="text-sm font-semibold text-luxury-gold mb-4">
                  Edit: {m.name}
                </h3>
                <MarkerFormFields
                  value={editForms[m.id]}
                  onChange={makeEditOnChange(m.id)}
                  onSave={() =>
                    updateMarker({
                      id: m.id,
                      sortOrder: m.sortOrder,
                      f: editForms[m.id],
                    })
                  }
                  onCancel={() => setEditingId(null)}
                  saving={updating}
                />
              </>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-luxury-gold" />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-medium text-[#1a1d23]">
                        {m.name}
                      </span>
                      <Badge
                        className={
                          CATEGORY_COLORS[m.category] ||
                          "bg-[#f0f2f7] text-[#5a6378] border-[#e2e5eb]"
                        }
                      >
                        {m.category}
                      </Badge>
                      {!m.visible && (
                        <Badge className="bg-[#f0f2f7] text-[#96a0b5] border-[#e2e5eb]">
                          Hidden
                        </Badge>
                      )}
                      {m.imageKey && (
                        <ImageIcon className="h-3 w-3 text-luxury-gold" />
                      )}
                    </div>
                    <p className="text-xs text-[#5a6378] truncate">
                      {m.address}
                    </p>
                    <p className="text-xs text-[#96a0b5] mt-0.5">
                      Lat: {m.lat.toFixed(4)}, Lng: {m.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => startEdit(m)}
                    className="h-8 w-8 text-[#5a6378] hover:text-luxury-gold hover:bg-luxury-gold/10"
                    aria-label="Edit"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMarker(m.id)}
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
