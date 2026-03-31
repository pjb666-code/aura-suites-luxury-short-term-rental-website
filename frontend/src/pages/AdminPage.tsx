import { useState, useEffect } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSaveCallerUserProfile, useIsCallerAdmin, usePublishChanges } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, LogOut, Upload, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import ApartmentsAdmin from '../components/admin/ApartmentsAdmin';
import AuraCollectionAdmin from '../components/admin/AuraCollectionAdmin';
import ContactSubmissionsAdmin from '../components/admin/ContactSubmissionsAdmin';
import LandingPageAdmin from '../components/admin/LandingPageAdmin';
import FooterAdmin from '../components/admin/FooterAdmin';
import ExperienceAdmin from '../components/admin/ExperienceAdmin';
import MediaAdmin from '../components/admin/MediaAdmin';
import LegalAdmin from '../components/admin/LegalAdmin';

export default function AdminPage() {
  const { login, clear, loginStatus, identity, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const { mutate: saveProfile, isPending: savingProfile } = useSaveCallerUserProfile();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { mutate: publishChanges, isPending: publishing } = usePublishChanges();

  const [profileName, setProfileName] = useState('');

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  useEffect(() => {
    if (userProfile) {
      setProfileName(userProfile.name);
    }
  }, [userProfile]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message === 'User is already authenticated') {
        await clear();
        queryClient.clear();
        setTimeout(() => login(), 300);
      } else {
        toast.error('Failed to login. Please try again.');
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const handleSaveProfile = () => {
    if (!profileName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    saveProfile(
      { name: profileName.trim() },
      {
        onSuccess: () => {
          toast.success('Profile created successfully');
        },
        onError: (error) => {
          console.error('Failed to save profile:', error);
          toast.error('Failed to create profile');
        },
      }
    );
  };

  const handlePublish = () => {
    publishChanges(undefined, {
      onSuccess: () => {
        toast.success('Changes published successfully! Your updates are now live.');
      },
      onError: (error) => {
        console.error('Failed to publish changes:', error);
        toast.error('Failed to publish changes');
      },
    });
  };

  if (isInitializing || (isAuthenticated && profileLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-luxury-dark">
        <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-luxury-dark p-4">
        <Card className="w-full max-w-md border-luxury-gold/20 bg-luxury-dark/80 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-3xl text-white">Aura Suites Admin</CardTitle>
            <CardDescription className="text-white/70">Sign in to manage your luxury rental website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleLogin}
              disabled={loginStatus === 'logging-in'}
              className="w-full bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
              size="lg"
            >
              {loginStatus === 'logging-in' ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In with Internet Identity'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showProfileSetup) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-luxury-dark p-4">
        <Card className="w-full max-w-md border-luxury-gold/20 bg-luxury-dark/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">Welcome to Aura Suites Admin</CardTitle>
            <CardDescription className="text-white/70">Please set up your profile to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Your Name</Label>
              <Input
                id="name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Enter your name"
                className="border-luxury-gold/30 bg-white/5 text-white"
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
                  Creating Profile...
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (adminLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-luxury-dark">
        <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-luxury-dark p-4">
        <Card className="w-full max-w-md border-luxury-gold/20 bg-luxury-dark/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">Access Denied</CardTitle>
            <CardDescription className="text-white/70">You don't have permission to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleLogout} variant="outline" className="w-full border-luxury-gold/30 text-white hover:bg-luxury-gold/10">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-luxury-gold/20 bg-luxury-dark/95 backdrop-blur supports-[backdrop-filter]:bg-luxury-dark/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div>
            <h1 className="font-serif text-2xl font-light text-white">Aura Suites Admin</h1>
            <p className="text-xs text-luxury-gold/70">Welcome, {userProfile?.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handlePublish}
              disabled={publishing}
              className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
            >
              {publishing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Publish Changes
                </>
              )}
            </Button>
            <Button onClick={handleLogout} variant="outline" className="border-luxury-gold/30 text-white hover:bg-luxury-gold/10">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Alert className="mb-6 border-luxury-gold/50 bg-luxury-gold/10">
          <AlertCircle className="h-4 w-4 text-luxury-gold" />
          <AlertDescription className="text-sm text-white/90">
            <strong>Draft Mode:</strong> All changes are saved to draft. Click "Publish Changes" to make them live on your website.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="landing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-luxury-dark/50 border border-luxury-gold/20">
            <TabsTrigger value="landing" className="data-[state=active]:bg-luxury-gold data-[state=active]:text-luxury-dark text-white/70">Landing Page</TabsTrigger>
            <TabsTrigger value="apartments" className="data-[state=active]:bg-luxury-gold data-[state=active]:text-luxury-dark text-white/70">Apartments</TabsTrigger>
            <TabsTrigger value="collection" className="data-[state=active]:bg-luxury-gold data-[state=active]:text-luxury-dark text-white/70">Aura Collection</TabsTrigger>
            <TabsTrigger value="experience" className="data-[state=active]:bg-luxury-gold data-[state=active]:text-luxury-dark text-white/70">Experience</TabsTrigger>
            <TabsTrigger value="legal" className="data-[state=active]:bg-luxury-gold data-[state=active]:text-luxury-dark text-white/70">Legal</TabsTrigger>
            <TabsTrigger value="media" className="data-[state=active]:bg-luxury-gold data-[state=active]:text-luxury-dark text-white/70">Media</TabsTrigger>
            <TabsTrigger value="footer" className="data-[state=active]:bg-luxury-gold data-[state=active]:text-luxury-dark text-white/70">Footer</TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-luxury-gold data-[state=active]:text-luxury-dark text-white/70">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="landing">
            <LandingPageAdmin />
          </TabsContent>

          <TabsContent value="apartments">
            <ApartmentsAdmin />
          </TabsContent>

          <TabsContent value="collection">
            <AuraCollectionAdmin />
          </TabsContent>

          <TabsContent value="experience">
            <ExperienceAdmin />
          </TabsContent>

          <TabsContent value="legal">
            <LegalAdmin />
          </TabsContent>

          <TabsContent value="media">
            <MediaAdmin />
          </TabsContent>

          <TabsContent value="footer">
            <FooterAdmin />
          </TabsContent>

          <TabsContent value="contact">
            <ContactSubmissionsAdmin />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
