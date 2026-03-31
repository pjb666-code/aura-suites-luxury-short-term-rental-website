import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useDraftSiteConfig, useUpdateDraftSiteConfig } from '@/hooks/useQueries';

export default function BookingUrlAdmin() {
  const { data: siteConfig, isLoading } = useDraftSiteConfig();
  const { mutate: updateConfig, isPending } = useUpdateDraftSiteConfig();
  const [bookingUrl, setBookingUrl] = useState('');

  useEffect(() => {
    if (siteConfig) {
      setBookingUrl(siteConfig.bookingUrl);
    }
  }, [siteConfig]);

  const handleSave = () => {
    if (!siteConfig) return;

    // Basic URL validation
    try {
      new URL(bookingUrl);
    } catch {
      toast.error('Please enter a valid URL (e.g., https://booking.com)');
      return;
    }

    updateConfig(
      { ...siteConfig, bookingUrl },
      {
        onSuccess: () => {
          toast.success('Booking URL updated successfully');
        },
        onError: (error) => {
          console.error('Failed to update booking URL:', error);
          toast.error('Failed to update booking URL');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Booking URL Configuration</CardTitle>
          <CardDescription>
            Set the URL where users will be directed when they click "Book Your Stay" or "Book Now" buttons
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bookingUrl">Booking Platform URL</Label>
            <Input
              id="bookingUrl"
              type="url"
              value={bookingUrl}
              onChange={(e) => setBookingUrl(e.target.value)}
              placeholder="https://booking.com/your-property"
            />
            <p className="text-xs text-muted-foreground">
              Enter the full URL including https:// (e.g., https://booking.com, https://airbnb.com/rooms/12345)
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => window.open(bookingUrl, '_blank', 'noopener,noreferrer')}
              disabled={!bookingUrl}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Test URL
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={isPending || !bookingUrl}
              className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>This is how the booking button will behave</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8 bg-muted rounded-lg">
            <Button 
              onClick={() => window.open(bookingUrl, '_blank', 'noopener,noreferrer')}
              disabled={!bookingUrl}
              className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
            >
              Book Your Stay
            </Button>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Current URL: {bookingUrl || 'Not set'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
