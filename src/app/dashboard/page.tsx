import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle,
  Circle,
  CreditCard,
  DollarSign,
  TrendingUp,
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

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back, User!</h1>
        <p className="text-muted-foreground">Here's your productivity snapshot for today.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tasks Overview</CardTitle>
            <CardDescription>You have 3 active tasks remaining.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                <span className="flex-1">Finalize Q3 report</span>
                <span className="text-sm text-muted-foreground">High Priority</span>
              </div>
              <div className="flex items-center">
                <Circle className="mr-3 h-5 w-5 text-yellow-500" />
                <span className="flex-1">Draft marketing email</span>
                <span className="text-sm text-muted-foreground">Medium Priority</span>
              </div>
              <div className="flex items-center">
                <Circle className="mr-3 h-5 w-5 text-gray-400" />
                <span className="flex-1">Book flight for conference</span>
                <span className="text-sm text-muted-foreground">Low Priority</span>
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
            <CardTitle className="text-sm font-medium">Recent Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,295.50</div>
            <p className="text-xs text-muted-foreground">+18.2% from last month</p>
            <div className="mt-4">
              <Button asChild size="sm" variant="outline">
                <Link href="/dashboard/expenses">
                  View All Expenses
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
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

         <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Top Spending Category</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">Groceries</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>
                <p className="text-2xl font-bold">$450.23</p>
            </div>
            <div className="mt-4">
              <Button asChild size="sm" variant="outline">
                <Link href="/dashboard/expenses">
                  Get AI Insights
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
