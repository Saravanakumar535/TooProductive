import TasksClient from "@/components/pages/tasks-client";

export default function TasksPage() {
  return (
    <div className="space-y-6">
       <header>
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <p className="text-muted-foreground">
          Manage your daily tasks with smart prioritization.
        </p>
      </header>
      <TasksClient />
    </div>
  );
}
