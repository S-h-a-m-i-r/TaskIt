
import API from '../services/api';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface Invoice {
  invoiceNumber: string;
  user: string;
  invoiceAmount: number;
  invoiceDate: string;
  invoicePaymentmethod: string;
  invoicePaymentType: string;
}

interface InvoiceState {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
  fetchInvoices: () => Promise<void>;
}

const useInvoiceStore = create<InvoiceState>()(
  devtools((set) => ({
    invoices: [],
    loading: false,
    error: null,
    fetchInvoices: async () => {
      set({ loading: true, error: null });
      try {
        const res = await API.get('/invoices/all');
        const data = res.data;
        if (data.success) {
          set({ invoices: data.invoices, loading: false });
        } else {
          set({ error: data.message || 'Failed to fetch invoices', loading: false });
        }
      } catch (err) {
        set({ error: (err as Error).message || 'Network error', loading: false });
      }
    },
  }))
);

export default useInvoiceStore;
