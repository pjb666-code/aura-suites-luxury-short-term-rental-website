import { useContactSubmissions } from '@/hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail, Calendar } from 'lucide-react';

export default function ContactSubmissionsAdmin() {
  const { data: submissions, isLoading } = useContactSubmissions();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
      </div>
    );
  }

  const sortedSubmissions = [...(submissions || [])].sort((a, b) => Number(b.timestamp - a.timestamp));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Contact Submissions</h2>
        <p className="text-sm text-muted-foreground">View messages from potential guests</p>
      </div>

      <div className="space-y-4">
        {sortedSubmissions.map((submission) => (
          <Card key={submission.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{submission.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    {submission.email}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(Number(submission.timestamp) / 1000000).toLocaleDateString()}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm">{submission.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedSubmissions.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">No contact submissions yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
