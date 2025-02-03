export interface LoanWorkflowResponse {
  code: number;
  message: string;
  result: WorkflowResult;
}

export interface WorkflowResult {
  id: string;
  createdAt: string | null;
  updatedAt: string | null;
  lastModifiedBy: string;
  createdBy: string;
  targetId: string;
  prevSteps: string[];
  currentSteps: string[];
  nextSteps: string[];
  workflowStatus: string | null;
  startTime: string;
  endTime: string | null;
  metadata: any | null;
  steps: WorkflowStep[];
  deleted: boolean;
}

export interface WorkflowStep {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  nextSteps: string[];
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  type: 'DEFAULT' | string;
  transactionId: string | null;
  metadata: StepMetadata;
}

export interface StepMetadata {
  histories: History[];
}

export interface History {
  action: string;
  request: {
    ip: string;
    time: number;
    user: string;
    endpoint: string;
    customerId: string;
  };
  response: {
    applicationResponse: LoanApplication;
  };
}

export interface LoanApplication {
  id: string;
  amount: number | null;
  deleted: boolean;
  dueDate: string | null;
  customer: {
    id: string;
  };
  createdAt: number;
  createdBy: string;
  startDate: string | null;
  updatedAt: number;
  amountPaid: number | null;
  interestRate: number | null;
  lastModifiedBy: string;
  loanProcessors: any[];
  currentOutstandingDebt: number | null;
}

// Step types for workflow
export type WorkflowStepType =
  | 'init'
  | 'create-loan-request'
  | 'create-loan-plan'
  | 'create-financial-info'
  | 'create-credit-rating'
  | 'add-asset-collateral';
