// Reading Recommendations Flow
'use server';

/**
 * @fileOverview Provides personalized book recommendations based on a user's reading history.
 *
 * - getReadingRecommendations - A function that takes a user's reading history and returns book recommendations.
 * - ReadingRecommendationsInput - The input type for the getReadingRecommendations function.
 * - ReadingRecommendationsOutput - The return type for the getReadingRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReadingRecommendationsInputSchema = z.object({
  readingHistory: z
    .string()
    .describe(
      'A list of books the user has read, including titles and authors.'
    ),
  genrePreferences: z
    .string()
    .optional()
    .describe('The user specified genre preferences, if any.'),
});
export type ReadingRecommendationsInput = z.infer<typeof ReadingRecommendationsInputSchema>;

const ReadingRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of book recommendations based on the user history.'),
});
export type ReadingRecommendationsOutput = z.infer<typeof ReadingRecommendationsOutputSchema>;

export async function getReadingRecommendations(
  input: ReadingRecommendationsInput
): Promise<ReadingRecommendationsOutput> {
  return readingRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'readingRecommendationsPrompt',
  input: {schema: ReadingRecommendationsInputSchema},
  output: {schema: ReadingRecommendationsOutputSchema},
  prompt: `You are a book recommendation expert. Based on the user's reading history, provide personalized book recommendations. If the user specifies any genre preferences, incorporate those preferences into your recommendations.

Reading History: {{{readingHistory}}}
Genre Preferences: {{{genrePreferences}}}

Provide a list of book recommendations.`,
});

const readingRecommendationsFlow = ai.defineFlow(
  {
    name: 'readingRecommendationsFlow',
    inputSchema: ReadingRecommendationsInputSchema,
    outputSchema: ReadingRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
