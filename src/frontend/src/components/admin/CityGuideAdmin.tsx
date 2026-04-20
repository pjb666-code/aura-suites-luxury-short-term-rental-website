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
import type { CityGuideEntry } from "@/hooks/useQueries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Edit2,
  FileText,
  ImageIcon,
  Loader2,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

const DEFAULT_CATEGORIES = [
  "Culture & Nightlife",
  "Gastronomy",
  "Art & Design",
  "Shopping",
  "Nature & Parks",
  "Hidden Gems",
];

function useDraftCityGuideEntries() {
  const { actor, isFetching } = useActor();
  return useQuery<CityGuideEntry[]>({
    queryKey: ["draftCityGuideEntries"],
    queryFn: async () => {
      if (!actor) return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).listDraftCityGuideEntries();
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

// ─── Standalone file upload button — has its own isolated state so it NEVER
//     causes the parent form to re-render, preventing focus loss. ───────────
function FileUploadArea({
  onUploaded,
  folder,
  accept,
  label,
  icon: Icon,
}: {
  onUploaded: (path: string) => void;
  folder: string;
  accept: string;
  label: string;
  icon: React.ElementType;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, isUploading } = useFileUpload();
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    const ext = file.name.split(".").pop() ?? "bin";
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    try {
      const res = await uploadFile(path, file);
      onUploaded(res.path);
      toast.success("File uploaded successfully");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setUploadError(msg);
      toast.error(`Upload failed: ${msg}`);
      console.error("FileUploadArea error:", err);
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
      >
        {isUploading ? (
          <Loader2 className="h-5 w-5 animate-spin text-luxury-gold" />
        ) : (
          <>
            <div className="flex items-center gap-1.5">
              <Upload className="h-4 w-4" />
              <Icon className="h-4 w-4" />
            </div>
            <span className="text-xs">{label}</span>
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
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}

const emptyEntry = {
  title: "",
  category: "Culture & Nightlife",
  description: "",
  imageKey: undefined as string | undefined,
  pdfKey: undefined as string | undefined,
  externalLink: "",
  visible: true,
};

type EntryFormState = typeof emptyEntry;

// ─── Extracted as a module-level component so it is NEVER re-created between
//     renders — this is the key fix for focus loss. ─────────────────────────
interface EntryFormFieldsProps {
  value: EntryFormState;
  onChange: (f: EntryFormState) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}

function EntryFormFields({
  value,
  onChange,
  onSave,
  onCancel,
  saving,
}: EntryFormFieldsProps) {
  // Use locally stable handlers that only call onChange — no state here
  // so this component never self-re-renders on its own (parent drives state).
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-[#1a1d23] font-medium">Title</Label>
          <Input
            value={value.title}
            onChange={(e) => onChange({ ...value, title: e.target.value })}
            placeholder="e.g. Gran Dabbang"
            className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
            data-ocid="guide-title-input"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[#1a1d23] font-medium">Category</Label>
          <Input
            value={value.category}
            onChange={(e) => onChange({ ...value, category: e.target.value })}
            list="guide-category-options"
            placeholder="e.g. Gastronomy"
            className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
          />
          <datalist id="guide-category-options">
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
          placeholder="Why do you recommend this?"
          className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
        />
      </div>

      {/* Image upload */}
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
          <FileUploadArea
            onUploaded={(path) => onChange({ ...value, imageKey: path })}
            folder="city-guide/images"
            accept=".png,.jpg,.jpeg,.webp"
            label="Upload image (.png, .jpg, .webp)"
            icon={ImageIcon}
          />
        )}
      </div>

      {/* PDF upload */}
      <div className="space-y-2">
        <Label className="text-[#1a1d23] font-medium">
          PDF Guide (optional)
        </Label>
        {value.pdfKey ? (
          <div className="flex items-center justify-between rounded-md border border-[#e2e5eb] bg-[#f7f8fa] px-3 py-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-luxury-gold shrink-0" />
              <span className="truncate max-w-[200px] text-xs text-[#5a6378]">
                {value.pdfKey.split("/").pop()}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onChange({ ...value, pdfKey: undefined })}
              className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="mr-1 h-3 w-3" />
              Remove
            </Button>
          </div>
        ) : (
          <FileUploadArea
            onUploaded={(path) => onChange({ ...value, pdfKey: path })}
            folder="city-guide/pdfs"
            accept=".pdf,application/pdf"
            label="Upload PDF guide (.pdf)"
            icon={FileText}
          />
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-[#1a1d23] font-medium">
          External Link (optional)
        </Label>
        <Input
          value={value.externalLink}
          onChange={(e) => onChange({ ...value, externalLink: e.target.value })}
          placeholder="https://..."
          className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
        />
      </div>

      <div className="flex items-center gap-2">
        <Switch
          checked={value.visible}
          onCheckedChange={(v) => onChange({ ...value, visible: v })}
          data-ocid="guide-visible-toggle"
        />
        <Label className="text-[#1a1d23]">Visible in guide</Label>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={onSave}
          disabled={saving || !value.title.trim()}
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

export default function CityGuideAdmin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { data: entries = [], isLoading } = useDraftCityGuideEntries();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState<EntryFormState>(emptyEntry);
  const [editForms, setEditForms] = useState<Record<string, EntryFormState>>(
    {},
  );

  const invalidate = useCallback(
    () =>
      queryClient.invalidateQueries({ queryKey: ["draftCityGuideEntries"] }),
    [queryClient],
  );

  const { mutate: addEntry, isPending: adding } = useMutation({
    mutationFn: async (e: EntryFormState) => {
      if (!actor) throw new Error("Actor not initialized");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (actor as any).addDraftCityGuideEntry({
        id: "",
        sortOrder: BigInt(0),
        title: e.title,
        category: e.category,
        description: e.description,
        imageKey: e.imageKey ?? undefined,
        pdfKey: e.pdfKey ?? undefined,
        externalLink: e.externalLink || undefined,
        visible: e.visible,
      });
    },
    onSuccess: () => {
      invalidate();
      toast.success("Entry added");
      setForm(emptyEntry);
      setShowAddForm(false);
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast.error(`Failed to add entry: ${msg}`);
    },
  });

  const { mutate: updateEntry, isPending: updating } = useMutation({
    mutationFn: async ({
      id,
      sortOrder,
      f,
    }: { id: string; sortOrder: bigint; f: EntryFormState }) => {
      if (!actor) throw new Error("Actor not initialized");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (actor as any).updateDraftCityGuideEntry({
        id,
        sortOrder,
        title: f.title,
        category: f.category,
        description: f.description,
        imageKey: f.imageKey ?? undefined,
        pdfKey: f.pdfKey ?? undefined,
        externalLink: f.externalLink || undefined,
        visible: f.visible,
      });
    },
    onSuccess: () => {
      invalidate();
      toast.success("Entry updated");
      setEditingId(null);
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast.error(`Failed to update entry: ${msg}`);
    },
  });

  const { mutate: deleteEntry } = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not initialized");
      await actor.deleteDraftCityGuideEntry(id);
    },
    onSuccess: () => {
      invalidate();
      toast.success("Entry deleted");
    },
    onError: () => toast.error("Failed to delete entry"),
  });

  const { mutate: reorder } = useMutation({
    mutationFn: async (ids: string[]) => {
      if (!actor) throw new Error("Actor not initialized");
      await actor.reorderCityGuideEntries(ids);
    },
    onSuccess: () => invalidate(),
    onError: () => toast.error("Failed to reorder"),
  });

  const sorted = [...entries].sort(
    (a, b) => Number(a.sortOrder) - Number(b.sortOrder),
  );

  const grouped = sorted.reduce<Record<string, CityGuideEntry[]>>((acc, e) => {
    acc[e.category] = acc[e.category] || [];
    acc[e.category].push(e);
    return acc;
  }, {});

  const handleMove = useCallback(
    (entry: CityGuideEntry, dir: "up" | "down") => {
      const inCategory = grouped[entry.category] || [];
      const idx = inCategory.findIndex((e) => e.id === entry.id);
      const newIdx = dir === "up" ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= inCategory.length) return;
      const newSorted = [...sorted];
      const globalIdx = newSorted.findIndex((e) => e.id === entry.id);
      const swapId = inCategory[newIdx].id;
      const globalSwapIdx = newSorted.findIndex((e) => e.id === swapId);
      [newSorted[globalIdx], newSorted[globalSwapIdx]] = [
        newSorted[globalSwapIdx],
        newSorted[globalIdx],
      ];
      reorder(newSorted.map((e) => e.id));
    },
    [grouped, sorted, reorder],
  );

  const startEdit = useCallback((e: CityGuideEntry) => {
    setEditForms((prev) => ({
      ...prev,
      [e.id]: {
        title: e.title,
        category: e.category,
        description: e.description,
        imageKey: e.imageKey ?? undefined,
        pdfKey: e.pdfKey ?? undefined,
        externalLink: e.externalLink ?? "",
        visible: e.visible,
      },
    }));
    setEditingId(e.id);
  }, []);

  // Stable onChange factory — creates a setter for a given entry id
  // that does NOT recreate itself unless the id changes
  const makeEditOnChange = useCallback(
    (id: string) => (f: EntryFormState) =>
      setEditForms((prev) => ({ ...prev, [id]: f })),
    [],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-6" data-ocid="city-guide-admin">
      <Card className="border-[#e2e5eb] bg-white shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#1a1d23]">City Guide</CardTitle>
              <CardDescription className="text-[#5a6378]">
                Curate your personal recommendations for Palermo Hollywood —
                grouped by category. Upload a PDF for an embedded guide viewer.
              </CardDescription>
            </div>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
              data-ocid="add-guide-entry-btn"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Entry
            </Button>
          </div>
        </CardHeader>

        {showAddForm && (
          <CardContent className="border-t border-[#e2e5eb] pt-6">
            <h3 className="text-sm font-semibold text-luxury-gold mb-4">
              New Guide Entry
            </h3>
            <EntryFormFields
              value={form}
              onChange={setForm}
              onSave={() => addEntry(form)}
              onCancel={() => {
                setShowAddForm(false);
                setForm(emptyEntry);
              }}
              saving={adding}
            />
          </CardContent>
        )}
      </Card>

      {sorted.length === 0 && !showAddForm && (
        <div
          className="rounded-lg border border-[#e2e5eb] bg-[#f7f8fa] py-12 text-center text-[#96a0b5]"
          data-ocid="guide-empty-state"
        >
          No guide entries yet. Click "Add Entry" to start building your city
          guide.
        </div>
      )}

      {Object.entries(grouped).map(([category, catEntries]) => (
        <Card key={category} className="border-[#e2e5eb] bg-white shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-luxury-gold" />
              <CardTitle className="text-[#1a1d23] text-base">
                {category}
              </CardTitle>
              <Badge className="bg-luxury-gold/12 text-luxury-gold border-luxury-gold/30">
                {catEntries.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {catEntries.map((entry, idx) => (
              <div key={entry.id} data-ocid={`guide-entry-${entry.id}`}>
                {editingId === entry.id && editForms[entry.id] ? (
                  <Card className="border-[#e2e5eb] bg-[#f7f8fa]">
                    <CardContent className="p-4">
                      <EntryFormFields
                        value={editForms[entry.id]}
                        onChange={makeEditOnChange(entry.id)}
                        onSave={() =>
                          updateEntry({
                            id: entry.id,
                            sortOrder: entry.sortOrder,
                            f: editForms[entry.id],
                          })
                        }
                        onCancel={() => setEditingId(null)}
                        saving={updating}
                      />
                    </CardContent>
                  </Card>
                ) : (
                  <div className="flex items-start justify-between gap-3 rounded-md border border-[#e2e5eb] bg-[#f7f8fa] p-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-[#1a1d23]">
                          {entry.title}
                        </span>
                        {!entry.visible && (
                          <Badge className="bg-[#f0f2f7] text-[#96a0b5] border-[#e2e5eb] text-xs">
                            Hidden
                          </Badge>
                        )}
                        {entry.externalLink && (
                          <span className="text-xs text-luxury-gold">
                            ↗ Link
                          </span>
                        )}
                        {entry.imageKey && (
                          <ImageIcon className="h-3 w-3 text-luxury-gold" />
                        )}
                        {entry.pdfKey && (
                          <FileText className="h-3 w-3 text-luxury-gold" />
                        )}
                      </div>
                      <p className="text-xs text-[#5a6378] line-clamp-1">
                        {entry.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-0.5 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMove(entry, "up")}
                        disabled={idx === 0}
                        className="h-7 w-7 text-[#96a0b5] hover:text-[#1a1d23] hover:bg-[#f0f2f7]"
                        aria-label="Move up"
                      >
                        <ChevronUp className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMove(entry, "down")}
                        disabled={idx === catEntries.length - 1}
                        className="h-7 w-7 text-[#96a0b5] hover:text-[#1a1d23] hover:bg-[#f0f2f7]"
                        aria-label="Move down"
                      >
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEdit(entry)}
                        className="h-7 w-7 text-[#5a6378] hover:text-luxury-gold hover:bg-luxury-gold/10"
                        aria-label="Edit"
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteEntry(entry.id)}
                        className="h-7 w-7 text-[#5a6378] hover:text-red-600 hover:bg-red-50"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
