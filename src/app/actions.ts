"use server";

import {
  getExpenseInsights,
  type ExpenseInsightsInput,
  type ExpenseInsightsOutput,
} from "@/ai/flows/expense-insights";
import {
  getReadingRecommendations,
  type ReadingRecommendationsInput,
  type ReadingRecommendationsOutput,
} from "@/ai/flows/reading-recommendations";

export async function getExpenseInsightsAction(
  input: ExpenseInsightsInput
): Promise<ExpenseInsightsOutput> {
  return await getExpenseInsights(input);
}

export async function getReadingRecommendationsAction(
  input: ReadingRecommendationsInput
): Promise<ReadingRecommendationsOutput> {
  return await getReadingRecommendations(input);
}
