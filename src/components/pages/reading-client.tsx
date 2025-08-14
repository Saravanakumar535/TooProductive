"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle, Sparkles, Wand2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getReadingRecommendationsAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  progress: z.coerce.number().min(0).max(100),
});

type Book = z.infer<typeof bookSchema> & { id: number };

const initialBooks: Book[] = [
  { id: 1, title: "The Midnight Library", author: "Matt Haig", progress: 65 },
  { id: 2, title: "Project Hail Mary", author: "Andy Weir", progress: 20 },
  { id: 3, title: "Dune", author: "Frank Herbert", progress: 100 },
];

export default function ReadingClient() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [recommendations, setRecommendations] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: { title: "", author: "", progress: 0 },
  });

  const getRecommendationsForm = useForm({
    defaultValues: {
      readingHistory: initialBooks.map(b => `${b.title} by ${b.author}`).join(", "),
      genrePreferences: "Science Fiction, Fantasy",
    }
  })

  function addBook(values: z.infer<typeof bookSchema>) {
    setBooks([...books, { ...values, id: Math.random() }]);
    form.reset();
    toast({ title: "Book Added", description: `"${values.title}" has been added to your log.` });
  }

  async function handleGetRecommendations(values: {readingHistory: string, genrePreferences: string}) {
    setIsLoading(true);
    setRecommendations("");
    try {
      const result = await getReadingRecommendationsAction(values);
      setRecommendations(result.recommendations);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to generate recommendations." });
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>My Bookshelf</CardTitle>
            <CardDescription>Your current and completed reads.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {books.map((book) => (
              <Card key={book.id}>
                <CardHeader className="flex flex-row items-start gap-4">
                  <img
                    data-ai-hint="book cover"
                    src={`https://placehold.co/80x120.png`}
                    alt={`${book.title} cover`}
                    width={60}
                    height={90}
                    className="rounded-md"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-base">{book.title}</CardTitle>
                    <CardDescription>{book.author}</CardDescription>
                  </div>
                </CardHeader>
                <CardFooter>
                  <div className="w-full">
                    <Progress value={book.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">{book.progress}% complete</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </CardContent>
        </Card>

         <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="text-accent h-5 w-5" /> AI Reading Recommendations
            </CardTitle>
            <CardDescription>
              Discover your next favorite book.
            </CardDescription>
          </CardHeader>
          <Form {...getRecommendationsForm}>
          <form onSubmit={getRecommendationsForm.handleSubmit(handleGetRecommendations)}>
          <CardContent className="space-y-4">
            <FormField control={getRecommendationsForm.control} name="readingHistory" render={({field}) => (
                <FormItem>
                  <FormLabel>Reading History</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us what you've read..." {...field} rows={4} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
            )}/>
            <FormField control={getRecommendationsForm.control} name="genrePreferences" render={({field}) => (
                <FormItem>
                  <FormLabel>Genre Preferences (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Sci-Fi, Mystery" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
            )}/>
            
            {isLoading ? (
              <div className="space-y-2 pt-4">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ) : recommendations && (
              <div className="pt-4">
                <h4 className="font-semibold mb-2">Here are some recommendations for you:</h4>
                <div className="prose prose-sm text-muted-foreground whitespace-pre-wrap">{recommendations}</div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Generate Recommendations
            </Button>
          </CardFooter>
          </form>
          </Form>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Add a Book</CardTitle>
            <CardDescription>Log a new book you're reading.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(addBook)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Book Title</FormLabel>
                      <FormControl><Input placeholder="The Great Gatsby" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl><Input placeholder="F. Scott Fitzgerald" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="progress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Progress (%)</FormLabel>
                      <FormControl><Input type="number" min="0" max="100" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add to Log
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
