"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2, PlusCircle, Sparkles, Wand2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { ExpenseInsightsOutput } from "@/ai/flows/expense-insights";
import { getExpenseInsightsAction } from "@/app/actions";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const expenseSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  category: z.string().min(1, "Category is required"),
  date: z.date({
    required_error: "A date is required.",
  }),
});

type Expense = z.infer<typeof expenseSchema> & { id: number };

const initialExpenses: Expense[] = [
  { id: 1, description: "Groceries", amount: 75.43, category: "Food", date: new Date() },
  { id: 2, description: "Monthly Rent", amount: 1200, category: "Housing", date: new Date(new Date().setDate(1)) },
  { id: 3, description: "Gas", amount: 45.20, category: "Transport", date: new Date(new Date().setDate(-2)) },
  { id: 4, description: "Dinner with friends", amount: 120.50, category: "Entertainment", date: new Date(new Date().setDate(-3)) },
];

export default function ExpensesClient() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [insights, setInsights] = useState<ExpenseInsightsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: "",
      amount: 0,
      category: "",
      date: new Date(),
    },
  });

  function addExpense(values: z.infer<typeof expenseSchema>) {
    setExpenses([
      ...expenses,
      { ...values, id: Math.random() },
    ]);
    form.reset();
    toast({
      title: "Expense Added",
      description: `Successfully added "${values.description}".`,
    });
  }
  
  const handleGetInsights = async () => {
    setIsLoading(true);
    setInsights(null);
    try {
      const insightData = await getExpenseInsightsAction({
        expenses: expenses.map(e => ({...e, date: e.date.toISOString()})),
        income: 5000, // Mock income
      });
      setInsights(insightData);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate AI insights.",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>A list of your recent transactions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">{expense.description}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>{format(expense.date, "PPP")}</TableCell>
                    <TableCell className="text-right">
                {expense.amount.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sparkles className="text-accent h-5 w-5" /> AI Expense Insights</CardTitle>
            <CardDescription>
              Get an AI-powered breakdown of your spending habits.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
               <div className="space-y-4">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-10 w-40" />
               </div>
            ) : insights ? (
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold">Summary</h4>
                  <p className="text-muted-foreground">{insights.summary}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Key Spending Areas</h4>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {insights.keySpendingAreas.map((area, i) => <li key={i}>{area}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Potential Savings</h4>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {insights.potentialSavingsAreas.map((area, i) => <li key={i}>{area}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Recommendations</h4>
                  <p className="text-muted-foreground">{insights.recommendations}</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground p-8">Click the button to generate insights.</div>
            )}
          </CardContent>
           <div className="flex justify-start p-6 pt-0">
             <Button onClick={handleGetInsights} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Generate Insights
              </Button>
           </div>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Add New Expense</CardTitle>
            <CardDescription>Enter the details of your expense.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(addExpense)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Coffee" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Food">Food</SelectItem>
                          <SelectItem value="Transport">Transport</SelectItem>
                          <SelectItem value="Housing">Housing</SelectItem>
                          <SelectItem value="Entertainment">Entertainment</SelectItem>
                          <SelectItem value="Utilities">Utilities</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Expense
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
