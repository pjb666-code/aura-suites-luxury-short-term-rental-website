import type { Testimonial } from "@/backend";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronUp,
  Edit2,
  Loader2,
  Plus,
  Save,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function StarPicker({
  value,
  onChange,
}: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className="transition-colors"
          aria-label={`${s} star${s > 1 ? "s" : ""}`}
        >
          <Star
            className={`h-5 w-5 ${s <= value ? "fill-luxury-gold text-luxury-gold" : "text-[#e2e5eb]"}`}
          />
        </button>
      ))}
    </div>
  );
}

function TestimonialPreviewCard({
  testimonial,
}: { testimonial: Partial<Testimonial> }) {
  return (
    <div className="rounded-lg border border-[#e2e5eb] bg-[#f7f8fa] p-5">
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`h-4 w-4 ${s <= Number(testimonial.stars ?? 5) ? "fill-luxury-gold text-luxury-gold" : "text-[#e2e5eb]"}`}
          />
        ))}
      </div>
      <p className="text-sm text-[#5a6378] italic mb-4 leading-relaxed">
        "{testimonial.text || "Your testimonial text will appear here."}"
      </p>
      <div>
        <p className="text-sm font-medium text-[#1a1d23]">
          {testimonial.name || "Guest Name"}
        </p>
        {testimonial.date && (
          <p className="text-xs text-[#96a0b5] mt-0.5">{testimonial.date}</p>
        )}
      </div>
    </div>
  );
}

function useDraftTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["draftTestimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listDraftTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export default function TestimonialsAdmin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { data: testimonials = [], isLoading } = useDraftTestimonials();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const emptyForm = { name: "", stars: 5, text: "", date: "", visible: true };
  const [form, setForm] = useState(emptyForm);

  const { mutate: addTestimonial, isPending: adding } = useMutation({
    mutationFn: async (
      t: Omit<Testimonial, "id" | "sortOrder" | "authorPhoto">,
    ) => {
      if (!actor) throw new Error("Actor not initialized");
      await actor.addDraftTestimonial({
        id: "",
        sortOrder: BigInt(0),
        name: t.name,
        stars: BigInt(t.stars),
        text: t.text,
        date: t.date,
        visible: t.visible,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["draftTestimonials"] });
      toast.success("Testimonial added");
      setForm(emptyForm);
      setShowAddForm(false);
    },
    onError: () => toast.error("Failed to add testimonial"),
  });

  const { mutate: updateTestimonial, isPending: updating } = useMutation({
    mutationFn: async (t: Testimonial) => {
      if (!actor) throw new Error("Actor not initialized");
      await actor.updateDraftTestimonial(t);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["draftTestimonials"] });
      toast.success("Testimonial updated");
      setEditingId(null);
    },
    onError: () => toast.error("Failed to update testimonial"),
  });

  const { mutate: deleteTestimonial } = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not initialized");
      await actor.deleteDraftTestimonial(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["draftTestimonials"] });
      toast.success("Testimonial deleted");
    },
    onError: () => toast.error("Failed to delete testimonial"),
  });

  const { mutate: reorder } = useMutation({
    mutationFn: async (ids: string[]) => {
      if (!actor) throw new Error("Actor not initialized");
      await actor.reorderTestimonials(ids);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["draftTestimonials"] }),
    onError: () => toast.error("Failed to reorder"),
  });

  const [editForms, setEditForms] = useState<
    Record<
      string,
      {
        name: string;
        stars: number;
        text: string;
        date: string;
        visible: boolean;
      }
    >
  >({});

  const startEdit = (t: Testimonial) => {
    setEditForms((prev) => ({
      ...prev,
      [t.id]: {
        name: t.name,
        stars: Number(t.stars),
        text: t.text,
        date: t.date,
        visible: t.visible,
      },
    }));
    setEditingId(t.id);
  };

  const handleMove = (idx: number, dir: "up" | "down") => {
    const sorted = [...testimonials].sort(
      (a, b) => Number(a.sortOrder) - Number(b.sortOrder),
    );
    const newIdx = dir === "up" ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= sorted.length) return;
    const ids = sorted.map((t) => t.id);
    [ids[idx], ids[newIdx]] = [ids[newIdx], ids[idx]];
    reorder(ids);
  };

  const sorted = [...testimonials].sort(
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
    <div className="space-y-6" data-ocid="testimonials-admin">
      <Card className="border-[#e2e5eb] bg-white shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#1a1d23]">
                Guest Testimonials
              </CardTitle>
              <CardDescription className="text-[#5a6378]">
                Add and manage guest reviews. Publish changes to make them live.
              </CardDescription>
            </div>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
              data-ocid="add-testimonial-btn"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </div>
        </CardHeader>

        {showAddForm && (
          <CardContent className="border-t border-[#e2e5eb] pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-luxury-gold">
                  New Testimonial
                </h3>
                <div className="space-y-2">
                  <Label className="text-[#1a1d23] font-medium">
                    Guest Name
                  </Label>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="e.g. Maria S."
                    className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
                    data-ocid="testimonial-name-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1a1d23] font-medium">Rating</Label>
                  <StarPicker
                    value={form.stars}
                    onChange={(v) => setForm((f) => ({ ...f, stars: v }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1a1d23] font-medium">
                    Review Text
                  </Label>
                  <Textarea
                    value={form.text}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, text: e.target.value }))
                    }
                    placeholder="Write the guest review..."
                    rows={4}
                    className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
                    data-ocid="testimonial-text-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1a1d23] font-medium">Date</Label>
                  <Input
                    value={form.date}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, date: e.target.value }))
                    }
                    placeholder="e.g. March 2025"
                    className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={form.visible}
                    onCheckedChange={(v) =>
                      setForm((f) => ({ ...f, visible: v }))
                    }
                    data-ocid="testimonial-visible-toggle"
                  />
                  <Label className="text-[#1a1d23]">Visible on site</Label>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() =>
                      addTestimonial({
                        name: form.name,
                        stars: BigInt(form.stars),
                        text: form.text,
                        date: form.date,
                        visible: form.visible,
                      })
                    }
                    disabled={adding || !form.name.trim() || !form.text.trim()}
                    className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                    data-ocid="save-testimonial-btn"
                  >
                    {adding ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowAddForm(false);
                      setForm(emptyForm);
                    }}
                    className="text-[#5a6378] hover:bg-[#f0f2f7]"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-luxury-gold">
                  Preview
                </h3>
                <TestimonialPreviewCard
                  testimonial={{ ...form, stars: BigInt(form.stars) }}
                />
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {sorted.length === 0 && !showAddForm && (
        <div
          className="rounded-lg border border-[#e2e5eb] bg-[#f7f8fa] py-12 text-center text-[#96a0b5]"
          data-ocid="testimonials-empty-state"
        >
          No testimonials yet. Click "Add Testimonial" to get started.
        </div>
      )}

      {sorted.map((t, idx) => (
        <Card
          key={t.id}
          className="border-[#e2e5eb] bg-white shadow-sm"
          data-ocid={`testimonial-item-${t.id}`}
        >
          <CardContent className="p-5">
            {editingId === t.id && editForms[t.id] ? (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[#1a1d23] font-medium">
                      Guest Name
                    </Label>
                    <Input
                      value={editForms[t.id].name}
                      onChange={(e) =>
                        setEditForms((prev) => ({
                          ...prev,
                          [t.id]: { ...prev[t.id], name: e.target.value },
                        }))
                      }
                      className="border-[#e2e5eb] bg-white text-[#1a1d23]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#1a1d23] font-medium">Rating</Label>
                    <StarPicker
                      value={editForms[t.id].stars}
                      onChange={(v) =>
                        setEditForms((prev) => ({
                          ...prev,
                          [t.id]: { ...prev[t.id], stars: v },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#1a1d23] font-medium">
                      Review Text
                    </Label>
                    <Textarea
                      value={editForms[t.id].text}
                      onChange={(e) =>
                        setEditForms((prev) => ({
                          ...prev,
                          [t.id]: { ...prev[t.id], text: e.target.value },
                        }))
                      }
                      rows={4}
                      className="border-[#e2e5eb] bg-white text-[#1a1d23]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#1a1d23] font-medium">Date</Label>
                    <Input
                      value={editForms[t.id].date}
                      onChange={(e) =>
                        setEditForms((prev) => ({
                          ...prev,
                          [t.id]: { ...prev[t.id], date: e.target.value },
                        }))
                      }
                      className="border-[#e2e5eb] bg-white text-[#1a1d23]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={editForms[t.id].visible}
                      onCheckedChange={(v) =>
                        setEditForms((prev) => ({
                          ...prev,
                          [t.id]: { ...prev[t.id], visible: v },
                        }))
                      }
                    />
                    <Label className="text-[#1a1d23]">Visible on site</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() =>
                        updateTestimonial({
                          ...t,
                          name: editForms[t.id].name,
                          stars: BigInt(editForms[t.id].stars),
                          text: editForms[t.id].text,
                          date: editForms[t.id].date,
                          visible: editForms[t.id].visible,
                        })
                      }
                      disabled={updating}
                      className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                    >
                      {updating ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Update
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setEditingId(null)}
                      className="text-[#5a6378] hover:bg-[#f0f2f7]"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-luxury-gold">
                    Preview
                  </h3>
                  <TestimonialPreviewCard
                    testimonial={{
                      ...editForms[t.id],
                      stars: BigInt(editForms[t.id].stars),
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`h-4 w-4 ${s <= Number(t.stars) ? "fill-luxury-gold text-luxury-gold" : "text-[#e2e5eb]"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-[#1a1d23]">
                      {t.name}
                    </span>
                    {t.date && (
                      <span className="text-xs text-[#96a0b5]">{t.date}</span>
                    )}
                    <Badge
                      variant={t.visible ? "default" : "secondary"}
                      className={
                        t.visible
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-[#f0f2f7] text-[#96a0b5] border-[#e2e5eb]"
                      }
                    >
                      {t.visible ? "Visible" : "Hidden"}
                    </Badge>
                  </div>
                  <p className="text-sm text-[#5a6378] italic line-clamp-2">
                    "{t.text}"
                  </p>
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
                    onClick={() => startEdit(t)}
                    className="h-8 w-8 text-[#5a6378] hover:text-luxury-gold hover:bg-luxury-gold/10"
                    aria-label="Edit testimonial"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTestimonial(t.id)}
                    className="h-8 w-8 text-[#5a6378] hover:text-red-600 hover:bg-red-50"
                    aria-label="Delete testimonial"
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
