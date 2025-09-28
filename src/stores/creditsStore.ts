import { create } from 'zustand';
import { getAvailableCredits, purchaseCredits, getCreditStatistics, getAllCustomersWithCredits } from '../services/creditsService';

export interface CustomerCreditData {
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

interface CreditsState {
  available: number;
  total: number;
  used: number;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchCredits: () => Promise<void>;
  purchaseCredits: (amount: number, paymentMethodId: string) => Promise<boolean>;
  fetchStatistics: () => Promise<void>;
  fetchCustomers: () => Promise<void>;
  resetError: () => void;
  resetStatisticsError: () => void;
  resetCustomersError: () => void;
  statistics: {
    totalCreditsUsed: number;
    creditsUsedThisMonth: number;
    remainingCreditsOverall: number;
    expiringCreditsSoon: number;
  } | null;
  statisticsLoading: boolean;
  statisticsError: string | null;
  customers: CustomerCreditData[];
  customersLoading: boolean;
  customersError: string | null;
}

const useCreditsStore = create<CreditsState>((set) => ({
  available: 0,
  total: 0,
  used: 0,
  loading: false,
  error: null,
  statistics: null,
  statisticsLoading: false,
  statisticsError: null,
  customers: [],
  customersLoading: false,
  customersError: null,


  fetchCredits: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAvailableCredits();
      
      if (response.success) {
        set({ 
          available: response.data.totalAvailable,
          total: response.data.totalAvailable + response.data.recentlySpent,
          used: response.data.recentlySpent,
          loading: false 
        });
      } else {
        set({ error: response.message || 'Failed to fetch credits', loading: false });
      }
    } catch (error: unknown) {
      set({ 
        error: error instanceof Error
        ? error.message
        : 'An error occurred. Please try again.',
        loading: false 
      });
    }
  },

  purchaseCredits: async (amount: number, paymentMethodId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await purchaseCredits(amount, paymentMethodId);
      
      if (response.success) {
        set({ 
          available: response.data.totalAvailable,
          total: response.data.totalAvailable + response.data.recentlySpent,
          used: response.data.recentlySpent,
          loading: false 
        });
        return true;
      } else {
        set({ error: response.message || 'Failed to purchase credits', loading: false });
        return false;
      }
    } catch (error: unknown) {
      set({ 
        error: error instanceof Error
        ? error.message
        : 'An error occurred. Please try again.', 
        loading: false 
      });
      return false;
    }
  },

  fetchStatistics: async () => {
    set({ statisticsLoading: true, statisticsError: null });
    try {
      const response = await getCreditStatistics();
      
      if (response.success) {
        set({ 
          statistics: response.data,
          statisticsLoading: false 
        });
      } else {
        set({ 
          statisticsError: response.message || 'Failed to fetch credit statistics', 
          statisticsLoading: false 
        });
      }
    } catch (error: unknown) {
      set({ 
        statisticsError: error instanceof Error
          ? error.message
          : 'An error occurred while fetching statistics. Please try again.',
        statisticsLoading: false 
      });
    }
  },

  fetchCustomers: async () => {
    set({ customersLoading: true, customersError: null });
    try {
      const response = await getAllCustomersWithCredits();
      
      if (response.success) {
        set({ 
          customers: response.data,
          customersLoading: false 
        });
      } else {
        set({ 
          customersError: response.message || 'Failed to fetch customers data', 
          customersLoading: false 
        });
      }
    } catch (error: unknown) {
      set({ 
        customersError: error instanceof Error
          ? error.message
          : 'An error occurred while fetching customers data. Please try again.',
        customersLoading: false 
      });
    }
  },

  resetError: () => set({ error: null }),
  resetStatisticsError: () => set({ statisticsError: null }),
  resetCustomersError: () => set({ customersError: null }),
}));

export default useCreditsStore;