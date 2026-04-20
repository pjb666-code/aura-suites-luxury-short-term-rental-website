import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Compass,
  FileText,
  Image,
  LayoutDashboard,
  Loader2,
  LogOut,
  Star,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ApartmentsAdmin from "../components/admin/ApartmentsAdmin";
import AuraCollectionAdmin from "../components/admin/AuraCollectionAdmin";
import CityGuideAdmin from "../components/admin/CityGuideAdmin";
import ContactInfoAdmin from "../components/admin/ContactInfoAdmin";
import ExclusiveServicesAdmin from "../components/admin/ExclusiveServicesAdmin";
import ExperienceAdmin from "../components/admin/ExperienceAdmin";
import FooterAdmin from "../components/admin/FooterAdmin";
import LandingPageAdmin from "../components/admin/LandingPageAdmin";
import LegalAdmin from "../components/admin/LegalAdmin";
import MapManagerAdmin from "../components/admin/MapManagerAdmin";
import MediaAdmin from "../components/admin/MediaAdmin";
import TestimonialsAdmin from "../components/admin/TestimonialsAdmin";
import {
  useGetCallerUserProfile,
  useIsCallerAdmin,
  usePublishChanges,
  useSaveCallerUserProfile,
} from "../hooks/useQueries";

// ─── Types ────────────────────────────────────────────────────────────────────

type SectionKey =
  | "landing"
  | "apartments"
  | "collection"
  | "experience-modules"
  | "map-manager"
  | "city-guide"
  | "exclusive-services"
  | "legal"
  | "contact-info"
  | "footer"
  | "testimonials"
  | "media";

interface NavGroup {
  id: string;
  label: string;
  icon: React.ElementType;
  items: { key: SectionKey; label: string; icon: React.ElementType }[];
}

// ─── Navigation Structure ─────────────────────────────────────────────────────

const navGroups: NavGroup[] = [
  {
    id: "content",
    label: "Content",
    icon: LayoutDashboard,
    items: [
      { key: "landing", label: "Landing Page", icon: LayoutDashboard },
      { key: "apartments", label: "Apartments", icon: LayoutDashboard },
      { key: "collection", label: "Aura Collection", icon: Star },
    ],
  },
  {
    id: "experience",
    label: "Experience",
    icon: Compass,
    items: [
      { key: "experience-modules", label: "Experience Modules", icon: Compass },
      { key: "map-manager", label: "Map Manager", icon: Compass },
      { key: "city-guide", label: "City Guide", icon: Compass },
      { key: "exclusive-services", label: "Exclusive Services", icon: Compass },
    ],
  },
  {
    id: "pages",
    label: "Pages & Legal",
    icon: FileText,
    items: [
      { key: "legal", label: "Legal Pages", icon: FileText },
      { key: "contact-info", label: "Contact Information", icon: FileText },
      { key: "footer", label: "Footer", icon: FileText },
    ],
  },
  {
    id: "testimonials",
    label: "Testimonials",
    icon: Star,
    items: [{ key: "testimonials", label: "Guest Reviews", icon: Star }],
  },
  {
    id: "media",
    label: "Media",
    icon: Image,
    items: [{ key: "media", label: "Media Library", icon: Image }],
  },
];

const SECTION_TITLES: Record<SectionKey, string> = {
  landing: "Landing Page",
  apartments: "Apartments",
  collection: "Aura Collection",
  "experience-modules": "Experience Modules",
  "map-manager": "Map Manager",
  "city-guide": "City Guide",
  "exclusive-services": "Exclusive Services",
  legal: "Legal Pages",
  "contact-info": "Contact Information",
  footer: "Footer",
  testimonials: "Testimonials",
  media: "Media Library",
};

// ─── Sidebar Component ────────────────────────────────────────────────────────

interface SidebarProps {
  activeSection: SectionKey;
  onSelect: (key: SectionKey) => void;
  collapsed: Record<string, boolean>;
  onToggle: (id: string) => void;
  mobile?: boolean;
}

function AdminSidebar({
  activeSection,
  onSelect,
  collapsed,
  onToggle,
  mobile,
}: SidebarProps) {
  return (
    <nav
      className={`flex flex-col h-full overflow-y-auto ${mobile ? "py-4" : "py-4"}`}
      data-ocid="admin-sidebar"
    >
      {navGroups.map((group) => {
        const GroupIcon = group.icon;
        const isCollapsed = collapsed[group.id];
        const hasActive = group.items.some((i) => i.key === activeSection);

        return (
          <div key={group.id} className="mb-0.5">
            <button
              type="button"
              onClick={() => onToggle(group.id)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-150 ${
                hasActive ? "admin-nav-group-active" : "admin-nav-group"
              } hover:bg-[#f0f2f7]`}
              data-ocid={`admin-group-${group.id}`}
              aria-expanded={!isCollapsed}
            >
              <GroupIcon
                className={`h-3.5 w-3.5 shrink-0 ${hasActive ? "admin-accent" : ""}`}
              />
              {!mobile && (
                <>
                  <span className="flex-1 text-left tracking-widest uppercase text-[0.65rem] font-bold">
                    {group.label}
                  </span>
                  {isCollapsed ? (
                    <ChevronRight className="h-3 w-3 opacity-40 transition-transform duration-200" />
                  ) : (
                    <ChevronDown className="h-3 w-3 opacity-40 transition-transform duration-200" />
                  )}
                </>
              )}
            </button>

            {!isCollapsed && (
              <div className="mt-0.5 space-y-0.5 mb-1">
                {group.items.map((item) => {
                  const isActive = activeSection === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => onSelect(item.key)}
                      className={`flex w-full items-center gap-2.5 rounded-lg transition-all duration-150 ${
                        mobile ? "px-3 py-2" : "py-1.5 pl-8 pr-3"
                      } text-sm ${
                        isActive ? "admin-nav-item-active" : "admin-nav-item"
                      }`}
                      data-ocid={`admin-nav-${item.key}`}
                    >
                      {mobile && (
                        <item.icon
                          className={`h-4 w-4 shrink-0 ${isActive ? "text-luxury-gold" : ""}`}
                        />
                      )}
                      <span className={mobile ? "text-xs" : "text-[0.8125rem]"}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

// ─── Content Renderer ─────────────────────────────────────────────────────────

function SectionContent({ section }: { section: SectionKey }) {
  switch (section) {
    case "landing":
      return <LandingPageAdmin />;
    case "apartments":
      return <ApartmentsAdmin />;
    case "collection":
      return <AuraCollectionAdmin />;
    case "experience-modules":
      return <ExperienceAdmin />;
    case "map-manager":
      return <MapManagerAdmin />;
    case "city-guide":
      return <CityGuideAdmin />;
    case "exclusive-services":
      return <ExclusiveServicesAdmin />;
    case "legal":
      return <LegalAdmin />;
    case "contact-info":
      return <ContactInfoAdmin />;
    case "footer":
      return <FooterAdmin />;
    case "testimonials":
      return <TestimonialsAdmin />;
    case "media":
      return <MediaAdmin />;
    default:
      return null;
  }
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────

const STORAGE_KEY = "aura-admin-sections";

function loadCollapsed(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function saveCollapsed(state: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export default function AdminPage() {
  const { login, clear, loginStatus, identity, isInitializing } =
    useInternetIdentity();
  const queryClient = useQueryClient();
  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched,
  } = useGetCallerUserProfile();
  const { mutate: saveProfile, isPending: savingProfile } =
    useSaveCallerUserProfile();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { mutate: publishChanges, isPending: publishing } = usePublishChanges();

  const [profileName, setProfileName] = useState("");
  const [activeSection, setActiveSection] = useState<SectionKey>("landing");
  const [collapsed, setCollapsed] =
    useState<Record<string, boolean>>(loadCollapsed);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = !!identity;
  const showProfileSetup =
    isAuthenticated && !profileLoading && isFetched && userProfile === null;

  useEffect(() => {
    if (userProfile) setProfileName(userProfile.name);
  }, [userProfile]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "";
      if (msg === "User is already authenticated") {
        await clear();
        queryClient.clear();
        setTimeout(() => login(), 300);
      } else {
        toast.error("Failed to login. Please try again.");
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const handleSaveProfile = () => {
    if (!profileName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    saveProfile(
      { name: profileName.trim() },
      {
        onSuccess: () => toast.success("Profile created successfully"),
        onError: () => toast.error("Failed to create profile"),
      },
    );
  };

  const handlePublish = () => {
    publishChanges(undefined, {
      onSuccess: () =>
        toast.success("Changes published! Your updates are now live."),
      onError: () => toast.error("Failed to publish changes"),
    });
  };

  const toggleGroup = (id: string) => {
    setCollapsed((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      saveCollapsed(next);
      return next;
    });
  };

  const handleSelectSection = (key: SectionKey) => {
    setActiveSection(key);
    setMobileMenuOpen(false);
  };

  // ── Auth / Loading states ──────────────────────────────────────────────────

  if (isInitializing || (isAuthenticated && profileLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa]">
        <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa] p-4">
        <Card className="w-full max-w-md border-[#e2e5eb] bg-white shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-luxury-gold/40 bg-luxury-gold/8">
              <span className="font-serif text-luxury-gold text-xl">A</span>
            </div>
            <CardTitle className="font-serif text-3xl font-light text-[#1a1d23]">
              Aura Suites
            </CardTitle>
            <CardDescription className="text-[#5a6378] text-sm mt-1">
              Admin Panel — Sign in to manage your site
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <Button
              onClick={handleLogin}
              disabled={loginStatus === "logging-in"}
              className="w-full bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90 font-medium"
              size="lg"
              data-ocid="admin-login-btn"
            >
              {loginStatus === "logging-in" ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In with Internet Identity"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showProfileSetup) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa] p-4">
        <Card className="w-full max-w-md border-[#e2e5eb] bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#1a1d23]">
              Welcome to Aura Suites
            </CardTitle>
            <CardDescription className="text-[#5a6378]">
              Please set up your profile to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#1a1d23] font-medium">
                Your Name
              </Label>
              <Input
                id="name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Enter your name"
                className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
              />
            </div>
            <Button
              onClick={handleSaveProfile}
              disabled={savingProfile || !profileName.trim()}
              className="w-full bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
            >
              {savingProfile ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Profile…
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (adminLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa]">
        <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa] p-4">
        <Card className="w-full max-w-md border-[#e2e5eb] bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#1a1d23]">Access Denied</CardTitle>
            <CardDescription className="text-[#5a6378]">
              You don't have permission to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-[#e2e5eb] text-[#1a1d23] hover:bg-[#f0f2f7]"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Admin Dashboard ────────────────────────────────────────────────────────

  return (
    <div
      className="admin-panel flex h-screen overflow-hidden admin-bg"
      data-ocid="admin-page"
    >
      {/* ── Desktop Sidebar ── */}
      <aside
        className="hidden md:flex w-[240px] shrink-0 flex-col bg-white border-r border-[#e2e5eb]"
        data-ocid="admin-sidebar-desktop"
      >
        {/* Sidebar Header */}
        <div className="flex h-14 items-center gap-3 border-b border-[#e2e5eb] px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-luxury-gold/40 bg-luxury-gold/8 shrink-0">
            <span className="font-serif text-luxury-gold text-sm font-semibold">
              A
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-serif text-sm font-semibold text-[#1a1d23] truncate">
              Aura Suites
            </p>
            <p className="text-[10px] text-luxury-gold uppercase tracking-widest font-medium">
              Admin Panel
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-2 pt-2">
          <AdminSidebar
            activeSection={activeSection}
            onSelect={handleSelectSection}
            collapsed={collapsed}
            onToggle={toggleGroup}
          />
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-[#e2e5eb] px-3 py-3 space-y-1">
          <div className="px-2 py-1.5">
            <p className="text-xs text-[#5a6378] truncate font-medium">
              {userProfile?.name}
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-[#5a6378] hover:text-[#1a1d23] hover:bg-[#f0f2f7]"
            data-ocid="admin-logout-btn"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* ── Mobile Sidebar Overlay ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white border-r border-[#e2e5eb] overflow-y-auto shadow-xl">
            <div className="flex h-14 items-center gap-3 border-b border-[#e2e5eb] px-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-luxury-gold/40 bg-luxury-gold/8">
                <span className="font-serif text-luxury-gold text-sm">A</span>
              </div>
              <p className="font-serif text-sm font-semibold text-[#1a1d23]">
                Aura Suites Admin
              </p>
            </div>
            <div className="px-2 pt-2">
              <AdminSidebar
                activeSection={activeSection}
                onSelect={handleSelectSection}
                collapsed={collapsed}
                onToggle={toggleGroup}
                mobile
              />
            </div>
          </aside>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#e2e5eb] bg-white px-4 md:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex h-8 w-8 items-center justify-center rounded text-[#5a6378] hover:text-[#1a1d23] hover:bg-[#f0f2f7]"
              aria-label="Open menu"
              data-ocid="admin-mobile-menu-btn"
            >
              <LayoutDashboard className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-sm font-semibold text-[#1a1d23]">
                {SECTION_TITLES[activeSection]}
              </h1>
              <p className="text-xs text-[#96a0b5] hidden sm:block">
                Draft mode — publish to go live
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handlePublish}
              disabled={publishing}
              size="sm"
              className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90 font-semibold shadow-sm"
              data-ocid="admin-publish-btn"
            >
              {publishing ? (
                <>
                  <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                  Publishing…
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-3.5 w-3.5" />
                  Publish Changes
                </>
              )}
            </Button>
          </div>
        </header>

        {/* Draft alert */}
        <div className="shrink-0 px-4 md:px-6 pt-4">
          <Alert className="border-luxury-gold/30 bg-luxury-gold/6 py-2">
            <AlertCircle className="h-3.5 w-3.5 text-luxury-gold" />
            <AlertDescription className="text-xs text-[#5a6378]">
              <strong className="text-luxury-gold font-semibold">
                Draft Mode:
              </strong>{" "}
              All changes are saved as draft. Click{" "}
              <strong className="text-[#1a1d23]">Publish Changes</strong> to
              make them live.
            </AlertDescription>
          </Alert>
        </div>

        {/* Section Content */}
        <main
          className="flex-1 overflow-y-auto px-4 md:px-6 py-6"
          data-ocid="admin-content"
        >
          <SectionContent section={activeSection} />
        </main>
      </div>
    </div>
  );
}
