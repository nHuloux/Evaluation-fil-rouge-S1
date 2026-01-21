export interface RubricItem {
  id: string;
  category: string;
  criteria: string;
  description: string;
  levelLow: string; // Niveau 0-3
  levelMid: string; // Niveau 4-6
  levelHigh: string; // Niveau 7-10
  maxPoints: number;
}

export interface EvaluationState {
  groupName: string;
  juryName: string;
  scores: Record<string, number>; // Maps RubricItem.id to score
}

export type ScoreLevel = 'low' | 'mid' | 'high';