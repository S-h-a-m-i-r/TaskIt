import { request } from './request';

interface CreditDetail {
    _id: string;
    user: string;
    totalCredits: number;
    remainingCredits: number;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  // Main credits response structure
  interface CreditsResponse {
    success: boolean;
    data: {
      totalAvailable: number;
      expiringSoon: number;
      recentlySpent: number;
      creditDetails: CreditDetail[];
    };
    message?: string;
  }

export const getAvailableCredits = (): Promise<CreditsResponse> => {
  return request<CreditsResponse>({
    method: 'get',
    url: '/credits/available',
  });
};

export const purchaseCredits = (amount: number, paymentMethodId: string): Promise<CreditsResponse> => {
  return request<CreditsResponse>({
    method: 'post',
    url: '/credits/purchase',
    data: {
      amount,
      paymentMethodId,
    },
  });
};