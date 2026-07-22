import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="w-full max-w-md mx-4 border border-primary/30 bg-card p-8">
        <div className="flex mb-4 gap-3 items-center">
          <AlertCircle className="h-8 w-8 text-primary shrink-0" />
          <h1 className="text-2xl font-bold text-foreground font-display uppercase tracking-widest">
            404 — Not Found
          </h1>
        </div>
        <p className="mt-2 text-sm text-muted-foreground font-sans">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}
