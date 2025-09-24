import { create } from 'zustand';
import { getAvailableCredits, purchaseCredits, getCreditStatistics } from '../services/creditsService';

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
  resetError: () => void;
  resetStatisticsError: () => void;
  statistics: {
    totalCreditsUsed: number;
    creditsUsedThisMonth: number;
    remainingCreditsOverall: number;
    expiringCreditsSoon: number;
  } | null;
  statisticsLoading: boolean;
  statisticsError: string | null;
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

  resetError: () => set({ error: null }),
  resetStatisticsError: () => set({ statisticsError: null }),
}));

export default useCreditsStore;