export type BorrowerType = 'INDIVIDUAL' | 'BUSINESS';
export type LoanSecurityType = 'MORTGAGE' | 'UNSECURED';
export type LoanCollateralType = 'VEHICLE' | 'PROPERTY' | 'EQUIPMENT';

export interface LoanRequestBody {
  purpose: string;
  amount: number;
  borrowerType: BorrowerType;
  asset: string;
  loanSecurityType: LoanSecurityType;
  loanCollateralTypes: LoanCollateralType[];
  note: string;
  metadata?: Record<string, string>;
  application: {
    id: string;
  };
}
