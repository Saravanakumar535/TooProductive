import { Rocket } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-lg bg-primary p-2">
        <Rocket className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold">PersonalZenith</span>
    </div>
  );
}
