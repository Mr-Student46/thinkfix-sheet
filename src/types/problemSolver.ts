export interface ProblemData {
  title: string;
  description: string;
  importance: string;
  impact: string;
  category: string;
}

export interface RootCause {
  why: string;
}

export interface Solution {
  idea: string;
  effort: number;
  impact: number;
  score: number;
}

export interface Action {
  id: string;
  step: string;
  responsible: string;
  deadline: string;
  status: 'not-started' | 'in-progress' | 'done';
}

export interface ProblemSolverState {
  problem: ProblemData;
  rootCauses: RootCause[];
  solutions: Solution[];
  actions: Action[];
}
