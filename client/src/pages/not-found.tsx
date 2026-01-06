import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background">
      <div className="glass-card p-12 text-center max-w-md">
        <div className="mb-4 flex justify-center">
          <AlertCircle className="h-16 w-16 text-destructive" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4 font-display">404</h1>
        <p className="text-muted-foreground mb-8">
          The page you are looking for does not exist.
        </p>

        <Link href="/">
          <button className="btn-primary-gradient px-6 py-3 rounded-xl font-bold w-full">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
