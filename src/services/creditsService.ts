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

// System credit statistics interface
interface CreditStatistics {
  totalCreditsUsed: number;
  creditsUsedThisMonth: number;
  remainingCreditsOverall: number;
  expiringCreditsSoon: number;
}

interface CreditStatisticsResponse {
  success: boolean;
  data: CreditStatistics;
  message?: string;
}

export const getCreditStatistics = (): Promise<CreditStatisticsResponse> => {
  return request<CreditStatisticsResponse>({
    method: 'get',
    url: '/credits/statistics',
  });
};

// Customer credit data interface
interface CustomerCreditData {
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerPlanType: string;
  totalPurchasedCredits: number;
  totalRemainingCredits: number;
  totalSpentCredits: number;
  expiringSoonCredits: number;
  lastPurchaseDate: string | null;
  earliestExpiryDate: string | null;
  creditBatches: {
    batchId: string;
    totalCredits: number;
    remainingCredits: number;
    expiresAt: string;
    createdAt: string;
  }[];
}

interface CustomersResponse {
  success: boolean;
  data: CustomerCreditData[];
  count: number;
  message?: string;
}

export const getAllCustomersWithCredits = (): Promise<CustomersResponse> => {
  return request<CustomersResponse>({
    method: 'get',
    url: '/credits/customers',
  });
};

// Add credits to a customer (admin only)
interface AddCreditsResponse {
  success: boolean;
  data?: {
    creditsAdded: number;
    newTotal: number;
  };
  message?: string;
}

export const addCredits = (userId: string, amount: number, reason: string = 'Purchase'): Promise<AddCreditsResponse> => {
  return request<AddCreditsResponse>({
    method: 'post',
    url: '/credits/add',
    data: {
      userId,
      amount,
      reason
    }
  });
};