"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDownRight, ArrowUpRight, PlusCircle, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const stockSchema = z.object({
  ticker: z.string().min(1).max(5).toUpperCase(),
  shares: z.coerce.number().positive(),
});

type Stock = {
  ticker: string;
  name: string;
  shares: number;
  price: number;
  change: number;
  changePercent: number;
};

const initialPortfolio: Stock[] = [
  { ticker: "AAPL", name: "Apple Inc.", shares: 10, price: 14520.2, change: 210, changePercent: 1.45 },
  { ticker: "GOOGL", name: "Alphabet Inc.", shares: 5, price: 11235.5, change: -80, changePercent: -0.71 },
  { ticker: "TSLA", name: "Tesla, Inc.", shares: 15, price: 20850.7, change: 540, changePercent: 2.65 },
  { ticker: "AMZN", name: "Amazon.com, Inc.", shares: 8, price: 10800.1, change: -120, changePercent: -1.10 },
];

export default function PortfolioClient() {
  const [portfolio, setPortfolio] = useState<Stock[]>(initialPortfolio);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof stockSchema>>({
    resolver: zodResolver(stockSchema),
    defaultValues: { ticker: "", shares: 0 },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPortfolio((prev) =>
        prev.map((stock) => {
          const change = (Math.random() - 0.5) * 200; // random INR change
          const newPrice = Math.max(0, stock.price + change);
          const newChange = newPrice - (stock.price - stock.change);
          const newChangePercent = (newChange / (stock.price - stock.change)) * 100;
          return {
            ...stock,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
          };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  function formatCurrency(value: number) {
    return value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  }

  function addStock(values: z.infer<typeof stockSchema>) {
    const newStock: Stock = {
      ticker: values.ticker,
      name: `${values.ticker} Inc.`,
      shares: values.shares,
      price: Math.random() * 50000,
      change: 0,
      changePercent: 0,
    };
    setPortfolio([...portfolio, newStock]);
    toast({ title: "Stock Added", description: `${values.ticker} added to your portfolio.` });
    form.reset();
  }

  function removeStock(ticker: string) {
    setPortfolio(portfolio.filter(stock => stock.ticker !== ticker));
    toast({ title: "Stock Removed", description: `${ticker} removed from your portfolio.` });
  }

  const totalValue = portfolio.reduce((acc, stock) => acc + stock.price * stock.shares, 0);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>My Portfolio</CardTitle>
            <CardDescription>Total Value: {formatCurrency(totalValue)}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stock</TableHead>
                  <TableHead>Shares</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Day's Change</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolio.map((stock) => (
                  <TableRow key={stock.ticker}>
                    <TableCell>
                      <div className="font-bold">{stock.ticker}</div>
                      <div className="text-sm text-muted-foreground">{stock.name}</div>
                    </TableCell>
                    <TableCell>{stock.shares}</TableCell>
                    <TableCell>{formatCurrency(stock.price)}</TableCell>
                    <TableCell className={stock.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                      <div className="flex items-center">
                        {stock.change >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                        <span>
                          {formatCurrency(Math.abs(stock.change))} ({stock.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(stock.price * stock.shares)}</TableCell>
                    <TableCell className="text-right">
                       <Button variant="ghost" size="icon" onClick={() => removeStock(stock.ticker)}>
                         <Trash2 className="h-4 w-4 text-muted-foreground" />
                       </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Add Stock</CardTitle>
            <CardDescription>Add a new stock to your portfolio.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(addStock)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="ticker"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ticker Symbol</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., AAPL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shares"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Shares</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Stock
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
