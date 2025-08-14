import PortfolioClient from "@/components/pages/portfolio-client";

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Stock Portfolio</h1>
        <p className="text-muted-foreground">
          Monitor your investments with real-time updates.
        </p>
      </header>
      <PortfolioClient />
    </div>
  );
}
