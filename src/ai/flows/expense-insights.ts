'use server';

/**
 * @fileOverview An AI agent that provides insights and reports on spending habits.
 *
 * - getExpenseInsights - A function that generates insights based on spending data.
 * - ExpenseInsightsInput - The input type for the getExpenseInsights function.
 * - ExpenseInsightsOutput - The return type for the getExpenseInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExpenseItemSchema = z.object({
  category: z.string().describe('The category of the expense.'),
  amount: z.number().describe('The amount spent in the expense.'),
  date: z.string().describe('The date of the expense.'),
});

const ExpenseInsightsInputSchema = z.object({
  expenses: z.array(ExpenseItemSchema).describe('A list of expenses to analyze.'),
  income: z.number().describe('The user monthly income.'),
});
export type ExpenseInsightsInput = z.infer<typeof ExpenseInsightsInputSchema>;

const ExpenseInsightsOutputSchema = z.object({
  summary: z.string().describe('A summary of the user spending habits.'),
  keySpendingAreas: z
    .array(z.string())
    .describe('The key areas where the user is spending the most money.'),
  potentialSavingsAreas: z
    .array(z.string())
    .describe('The areas where the user can potentially save money.'),
  recommendations: z.string().describe('Recommendations for better financial management.'),
});
export type ExpenseInsightsOutput = z.infer<typeof ExpenseInsightsOutputSchema>;

export async function getExpenseInsights(input: ExpenseInsightsInput): Promise<ExpenseInsightsOutput> {
  return expenseInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'expenseInsightsPrompt',
  input: {schema: ExpenseInsightsInputSchema},
  output: {schema: ExpenseInsightsOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the user's spending habits and provide insights and recommendations.

Here's the user's monthly income: {{{income}}}

Here's a list of their expenses:
{{#each expenses}}
- Category: {{this.category}}, Amount: {{this.amount}}, Date: {{this.date}}
{{/each}}

Provide a summary of their spending habits, identify key spending areas and potential savings areas, and give recommendations for better financial management.
`,
});

const expenseInsightsFlow = ai.defineFlow(
  {
    name: 'expenseInsightsFlow',
    inputSchema: ExpenseInsightsInputSchema,
    outputSchema: ExpenseInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
