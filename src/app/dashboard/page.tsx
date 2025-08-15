import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle,
  Circle,
  CreditCard,
  DollarSign,
  Sparkles,
  TrendingUp,
  Award,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProgressRing } from "@/components/ui/progress-ring";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back, User!</h1>
        <p className="text-muted-foreground">Here's your productivity snapshot for today.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle>Daily Progress</CardTitle>
                <CardDescription>Your goals for today.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-around items-center">
                <div className="flex flex-col items-center gap-2">
                    <ProgressRing value={75} className="h-20 w-20 text-primary" />
                    <span className="text-sm font-medium">Tasks</span>
                    <span className="text-xs text-muted-foreground">3/4 Done</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <ProgressRing value={65} className="h-20 w-20 text-accent" />
                    <span className="text-sm font-medium">Reading</span>
                    <span className="text-xs text-muted-foreground">4-day streak</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <ProgressRing value={90} className="h-20 w-20 text-green-500" />
                    <span className="text-sm font-medium">Budget</span>
                    <span className="text-xs text-muted-foreground">3 days under</span>
                </div>
            </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sparkles className="text-accent h-5 w-5"/> AI Personal Challenges</CardTitle>
            <CardDescription>Complete these for bonus XP!</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
                <Card className="bg-secondary/50">
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2"><Award className="text-yellow-500 h-5 w-5"/> Reading Rival</CardTitle>
                        <CardDescription>Read 50 more pages than last week.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <p className="text-sm font-bold text-primary">+500 XP</p>
                    </CardFooter>
                </Card>
                <Card className="bg-secondary/50">
                    <CardHeader>
                        <CardTitle className="text-base">Budget Pro</CardTitle>
                        <CardDescription>Save $20 more than last week.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <p className="text-sm font-bold text-primary">+300 XP</p>
                    </CardFooter>
                </Card>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tasks Overview</CardTitle>
            <CardDescription>You have 1 active task remaining.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="mr-3 h-5 w-5 text-primary" />
                <span className="flex-1 line-through text-muted-foreground">Finalize Q3 report</span>
              </div>
              <div className="flex items-center">
                <Circle className="mr-3 h-5 w-5 text-yellow-500" />
                <span className="flex-1">Draft marketing email</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-3 h-5 w-5 text-primary" />
                <span className="flex-1 line-through text-muted-foreground">Book flight for conference</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Portfolio Snapshot</CardTitle>
            <CardDescription>Your portfolio is up by 2.1% today.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">$12,450.80</span>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-5 w-5" />
                <span className="ml-1 font-semibold">+2.1%</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">+$255.40 today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Currently Reading</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <img
                src="https://placehold.co/80x120.png"
                alt="Book cover"
                width={60}
                height={90}
                className="rounded-md"
                data-ai-hint="book cover"
              />
              <div className="flex-1">
                <p className="font-semibold">The Midnight Library</p>
                <p className="text-sm text-muted-foreground">by Matt Haig</p>
                <Progress value={65} className="mt-2 h-2" />
                <p className="mt-1 text-xs text-muted-foreground">65% complete</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
