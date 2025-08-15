// Personal Challenges Flow
'use server';

/**
 * @fileOverview Generates personalized challenges for the user based on their activity.
 *
 * - getPersonalChallenges - A function that takes user activity data and returns personalized challenges.
 * - PersonalChallengesInput - The input type for the getPersonalChallenges function.
 * - PersonalChallengesOutput - The return type for the getPersonalChallenges function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalChallengesInputSchema = z.object({
  tasksCompleted: z.number().describe('Number of tasks completed in the last week.'),
  pagesRead: z.number().describe('Number of pages read in the last week.'),
  spendingLastWeek: z.number().describe('Total spending from the previous week.'),
  currentBudgetGoal: z.number().describe('The user\'s current weekly budget goal.'),
});
export type PersonalChallengesInput = z.infer<typeof PersonalChallengesInputSchema>;

const ChallengeSchema = z.object({
  title: z.string().describe('The title of the challenge.'),
  description: z.string().describe('A brief description of the challenge.'),
  xpBonus: z.number().describe('The experience points awarded for completing the challenge.'),
  badgeReward: z.string().optional().describe('A special badge awarded for completing the challenge, if any.'),
});

const PersonalChallengesOutputSchema = z.object({
  challenges: z.array(ChallengeSchema).describe('A list of personalized challenges for the user.'),
});
export type PersonalChallengesOutput = z.infer<typeof PersonalChallengesOutputSchema>;

export async function getPersonalChallenges(
  input: PersonalChallengesInput
): Promise<PersonalChallengesOutput> {
  return personalChallengesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalChallengesPrompt',
  input: {schema: PersonalChallengesInputSchema},
  output: {schema: PersonalChallengesOutputSchema},
  prompt: `You are a motivational coach. Based on the user's activity from the last week, create 3 personalized challenges to encourage them to improve. The challenges should be slightly more difficult than their previous week's performance.

User's activity last week:
- Tasks Completed: {{{tasksCompleted}}}
- Pages Read: {{{pagesRead}}}
- Last Week's Spending: {{{spendingLastWeek}}}
- Weekly Budget Goal: {{{currentBudgetGoal}}}

Generate creative and inspiring challenges. For each challenge, provide a title, a short description, and an XP bonus. One of the challenges can optionally award a special badge.`,
});

const personalChallengesFlow = ai.defineFlow(
  {
    name: 'personalChallengesFlow',
    inputSchema: PersonalChallengesInputSchema,
    outputSchema: PersonalChallengesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
