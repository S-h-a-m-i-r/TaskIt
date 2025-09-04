import { request } from './request';

// Define types for Stripe responses and requests
export interface StripeCard {
  id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  isDefault?: boolean;
}

export interface StripeCustomer {
  id: string;
  email: string;
  name?: string;
}

interface GetCustomerCardsResponse {
  success: boolean;
  paymentMethods: StripeCard[];
  message?: string;
}

interface CreatePaymentIntentResponse {
  success: boolean;
  clientSecret: string;
  paymentIntentId: string;
  message?: string;
}

interface ProcessPaymentResponse {
  success: boolean;
  payment: {
    id: string;
    amount: number;
    status: string;
  };
  message?: string;
}

interface AddPaymentMethodResponse {
  success: boolean;
  paymentMethod: StripeCard;
  message?: string;
}

interface SetDefaultPaymentMethodResponse {
  success: boolean;
  customer: StripeCustomer;
  message?: string;
}

interface DeletePaymentMethodResponse {
  success: boolean;
  message?: string;
}

interface BuyCreditsResponse {
  success: boolean;
  updatedCredits: number;
  transaction: {
    id: string;
    amount: number;
    creditsAdded: number;
    date: string;
  };
  message?: string;
}

/**
 * Service for handling Stripe payment operations
 */
const stripeService = {
  /**
   * Get all payment methods for a customer
   */
  getCustomerCards: (customerId: string): Promise<GetCustomerCardsResponse> => {
    return request<GetCustomerCardsResponse>({
      method: 'get',
      url: `/stripe/customers/${customerId}/payment-methods`,
    });
  },

  /**
   * Create a payment intent for client-side confirmation
   */
  createPaymentIntent: (
    amount: number, 
    currency: string = 'usd', 
    customerId?: string
  ): Promise<CreatePaymentIntentResponse> => {
    return request<CreatePaymentIntentResponse>({
      method: 'post',
      url: '/stripe/payment-intents',
      data: {
        amount,
        currency,
        customerId,
      },
    });
  },

  /**
   * Add a new payment method to customer
   */
  addPaymentMethod: (
    customerId: string, 
    paymentMethodId: string
  ): Promise<AddPaymentMethodResponse> => {
    return request<AddPaymentMethodResponse>({
      method: 'post',
      url: `/stripe/customers/${customerId}/payment-methods`,
      data: {
        paymentMethodId,
      },
    });
  },

  /**
   * Set default payment method for a customer
   */
  setDefaultPaymentMethod: (
    customerId: string, 
    paymentMethodId: string
  ): Promise<SetDefaultPaymentMethodResponse> => {
    return request<SetDefaultPaymentMethodResponse>({
      method: 'post',
      url: `/stripe/customers/${customerId}/default-payment-method`,
      data: {
        paymentMethodId,
      },
    });
  },

  /**
   * Delete a payment method
   */
  deletePaymentMethod: (
    paymentMethodId: string
  ): Promise<DeletePaymentMethodResponse> => {
    return request<DeletePaymentMethodResponse>({
      method: 'delete',
      url: `/stripe/payment-methods/${paymentMethodId}`,
    });
  },

  /**
   * Process payment with existing payment method
   */
  processPaymentWithSavedCard: (
    amount: number,
    paymentMethodId: string,
    customerId: string,
    description?: string
  ): Promise<ProcessPaymentResponse> => {
    return request<ProcessPaymentResponse>({
      method: 'post',
      url: '/stripe/charge',
      data: {
        amount,
        paymentMethodId,
        customerId,
        description,
      },
    });
  },

  /**
   * Buy credits with saved payment method
   */
  buyCredits: (
    amount: number,
    paymentMethodId: string,
    creditsAmount: number
  ): Promise<BuyCreditsResponse> => {
    return request<BuyCreditsResponse>({
      method: 'post',
      url: '/stripe/buy-credits',
      data: {
        amount,
        paymentMethodId,
        creditsAmount,
      },
    });
  },

  /**
   * Check if user has Stripe customer record, create if not
   */
  ensureCustomer: (): Promise<{ success: boolean; customerId: string }> => {
    return request<{ success: boolean; customerId: string }>({
      method: 'post',
      url: '/stripe/ensure-customer',
    });
  },
};

export default stripeService;