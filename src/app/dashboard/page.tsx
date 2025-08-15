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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProgressRing } from "@/components/ui/progress-ring";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome Back, Saravana!
        </h1>
        <p className="text-muted-foreground">
          Here's your productivity snapshot for today.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* DAILY PROGRESS */}
        <Card className="lg:col-span-1 shadow-lg border border-indigo-100 bg-gradient-to-b from-white to-indigo-50 rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-indigo-600">
              Daily Progress
            </CardTitle>
            <CardDescription className="text-sm text-indigo-400">
              Your goals for today.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-3 gap-4">
            {/* Tasks */}
            <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200 shadow-sm">
              <div className="relative h-20 w-20 flex items-center justify-center">
                <ProgressRing value={75} className="h-20 w-20 text-indigo-600" />
                <span className="absolute text-sm font-semibold text-indigo-600">
                  75%
                </span>
              </div>
              <span className="text-sm font-medium text-indigo-600">Tasks</span>
              <span className="text-xs text-indigo-400">3/4 Done</span>
            </div>

            {/* Reading */}
            <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-violet-50 hover:bg-violet-100 transition-colors duration-200 shadow-sm">
              <div className="relative h-20 w-20 flex items-center justify-center">
                <ProgressRing value={65} className="h-20 w-20 text-violet-600" />
                <span className="absolute text-sm font-semibold text-violet-600">
                  4d
                </span>
              </div>
              <span className="text-sm font-medium text-violet-600">Reading</span>
              <span className="text-xs text-violet-400">4-day streak</span>
            </div>

            {/* Budget */}
            <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors duration-200 shadow-sm">
              <div className="relative h-20 w-20 flex items-center justify-center">
                <ProgressRing value={90} className="h-20 w-20 text-emerald-600" />
                <span className="absolute text-sm font-semibold text-emerald-600">
                  ₹300
                </span>
              </div>
              <span className="text-sm font-medium text-emerald-600">Budget</span>
              <span className="text-xs text-emerald-400">3 days under</span>
            </div>
          </CardContent>
        </Card>

        {/* AI PERSONAL CHALLENGES */}
        <Card className="lg:col-span-2 shadow-lg border border-violet-100 bg-gradient-to-b from-white to-violet-50 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-violet-600">
              <Sparkles className="h-5 w-5" /> AI Personal Challenges
            </CardTitle>
            <CardDescription className="text-violet-400">
              Complete these for bonus XP!
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Card className="bg-violet-50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 text-violet-600">
                  <Award className="h-5 w-5 text-violet-600" /> Reading Rival
                </CardTitle>
                <CardDescription>
                  Read 50 more pages than last week.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <p className="text-sm font-bold text-amber-600">+500 XP</p>
              </CardFooter>
            </Card>
            <Card className="bg-emerald-50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 text-emerald-600">
                  <Award className="h-5 w-5 text-emerald-600" /> Budget Pro
                </CardTitle>
                <CardDescription>
                  Save ₹500 more than last week.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <p className="text-sm font-bold text-amber-600">+300 XP</p>
              </CardFooter>
            </Card>
          </CardContent>
        </Card>

        {/* TASKS OVERVIEW */}
        <Card className="shadow-sm border border-border/40 rounded-xl">
  <CardHeader>
    <CardTitle className="text-amber-600 font-semibold">
      Tasks Overview
    </CardTitle>
    <CardDescription className="text-muted-foreground">
      You have 1 active task remaining.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-3">
      <div className="flex items-center">
        <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
        <span className="text-sm">Finalize Q3 report</span>
      </div>
      <div className="flex items-center">
        <Circle className="mr-3 h-5 w-5 text-amber-500" />
        <span className="flex-1 text-sm">Draft marketing email</span>
      </div>
      <div className="flex items-center">
        <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
        <span className="text-sm">Book flight for conference</span>
      </div>
    </div>
  </CardContent>
</Card>


        {/* PORTFOLIO SNAPSHOT */}
        <Card className="shadow-lg border border-emerald-100 bg-gradient-to-b from-white to-emerald-50 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-emerald-600">Portfolio Snapshot</CardTitle>
            <CardDescription className="text-emerald-400">
              Your portfolio is up by 2.1% today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">
                {Number(12450.8).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
              <div className="flex items-center text-emerald-600">
                <TrendingUp className="h-5 w-5" />
                <span className="ml-1 font-semibold">+2.1%</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {Number(255.4).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}{" "}
              today
            </p>
          </CardContent>
        </Card>

        {/* CURRENTLY READING */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Currently Reading</CardTitle>
            <BookOpen className="h-4 w-4 text-violet-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <img
                src="book.jpg"
                alt="Book cover"
                width={60}
                height={90}
                className="rounded-md"
                data-ai-hint="book cover"
              />
              <div className="flex-1">
                <p className="font-semibold">The Midnight Library</p>
                <p className="text-sm text-muted-foreground">by Matt Haig</p>
                <Progress value={65} className="mt-2 h-2 bg-violet-100 [&>div]:bg-violet-600" />
                <p className="mt-1 text-xs text-muted-foreground">65% complete</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
