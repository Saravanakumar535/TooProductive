import ReadingClient from "@/components/pages/reading-client";

export default function ReadingPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Reading Log</h1>
        <p className="text-muted-foreground">
          Track your reading and get AI-powered book recommendations.
        </p>
      </header>
      <ReadingClient />
    </div>
  );
}
