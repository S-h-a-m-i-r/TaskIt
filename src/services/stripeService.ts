import { request } from './request';

// Types for API responses
interface CustomerResponse {
  success: boolean;
  customerId: string;
  message?: string;
}

interface AttachPaymentMethodResponse {
  success: boolean;
  paymentMethod: {
    id: string;
    card: {
      brand: string;
      last4: string;
      exp_month: number;
      exp_year: number;
    };
  };
  isDefault: boolean;
  message?: string;
}

interface PaymentMethodsResponse {
  success: boolean;
  paymentMethods: Array<{
    id: string;
    card: {
      brand: string;
      last4: string;
      exp_month: number;
      exp_year: number;
    };
    isDefault: boolean;
  }>;
  message?: string;
}

/**
 * Create a new Stripe customer and attach the specified payment method
 * @param data Customer data with payment method
 * @returns Customer response with customerId
 */
export const createCustomer = (data: {
  email: string;
  name: string;
  paymentMethodId: string;
}): Promise<CustomerResponse> => {
  return request<CustomerResponse>({
    method: 'post',
    url: '/stripe/create/customer',
    data,
  });
};

/**
 * Attach a payment method to an existing Stripe customer
 * @param customerId Stripe customer ID
 * @param paymentMethodId Stripe payment method ID
 * @returns Response with attached payment method details
 */
export const attachPaymentMethod = (
  customerId: string,
  paymentMethodId: string
): Promise<AttachPaymentMethodResponse> => {
  return request<AttachPaymentMethodResponse>({
    method: 'post',
    url: `/stripe/customer/${customerId}/addCard`,
    data: {
      paymentMethodId,
    },
  });
};

/**
 * Set a payment method as the default for a customer
 * @param customerId Stripe customer ID
 * @param paymentMethodId Stripe payment method ID to set as default
 * @returns Success response
 */
export const setDefaultPaymentMethod = (
  customerId: string,
  paymentMethodId: string
): Promise<{ success: boolean; message?: string }> => {
  return request<{ success: boolean; message?: string }>({
    method: 'post',
    url: `/stripe/customers/${customerId}/default-payment-method`,
    data: {
      paymentMethodId,
    },
  });
};

/**
 * Get all payment methods for a customer
 * @param customerId Stripe customer ID
 * @returns List of payment methods attached to the customer
 */
export const getCustomerPaymentMethods = (
  customerId: string
): Promise<PaymentMethodsResponse> => {
  return request<PaymentMethodsResponse>({
    method: 'get',
    url: `/stripe/customer/${customerId}/payment-methods`,
  });
};

/**
 * Delete a payment method
 * @param paymentMethodId Stripe payment method ID to delete
 * @returns Success response
 */
export const deletePaymentMethod = (
  paymentMethodId: string
): Promise<{ success: boolean; message?: string }> => {
  return request<{ success: boolean; message?: string }>({
    method: 'delete',
    url: `/stripe/payment-methods/${paymentMethodId}`,
  });
};

/**
 * Process a payment with a saved payment method
 * @param amount Amount in cents to charge
 * @param paymentMethodId Payment method ID to use
 * @param customerId Customer ID
 * @param description Optional description for the payment
 * @returns Payment response
 */
export const processPayment = (
  amount: number,
  paymentMethodId: string,
  customerId: string,
  description?: string
): Promise<{
  success: boolean;
  payment: {
    id: string;
    amount: number;
    status: string;
  };
  message?: string;
}> => {
  return request<{
    success: boolean;
    payment: {
      id: string;
      amount: number;
      status: string;
    };
    message?: string;
  }>({
    method: 'post',
    url: '/stripe/charge',
    data: {
      amount,
      paymentMethodId,
      customerId,
      description,
    },
  });
};

/**
 * Create a setup intent for future payments
 * @param customerId Stripe customer ID
 * @returns Setup intent client secret
 */
export const createSetupIntent = (
  customerId: string
): Promise<{ success: boolean; clientSecret: string; message?: string }> => {
  return request<{ success: boolean; clientSecret: string; message?: string }>({
    method: 'post',
    url: '/stripe/setup-intents',
    data: {
      customerId,
    },
  });
};

/**
 * Check if a customer exists, create if not
 * @param email Customer email
 * @param name Customer name
 * @returns Customer ID
 */
export const ensureCustomer = (
  email: string,
  name: string
): Promise<{ success: boolean; customerId: string; message?: string }> => {
  return request<{ success: boolean; customerId: string; message?: string }>({
    method: 'post',
    url: '/stripe/ensure-customer',
    data: {
      email,
      name,
    },
  });
};


export const getCustomerCards = async (customerId: string) => {
  try {
    const response = await request({
      method: 'get',
      url: `/stripe/customer/${customerId}/payment-methods?type=card`,
    });
    
    return response;
  } catch (error) {
    console.error('Error fetching customer cards:', error);
    throw error;
  }
};



export const purchaseCreditsService = (
  customerId: string,
  paymentMethodId: string | null,
  amount: number
): Promise<{
  success: boolean;
  data?: {
    totalAvailable: number;
    recentlySpent: number;
    transactionId: string;
  };
  message?: string;
}> => {
  return request({
    method: 'post',
    url: `/stripe/${customerId}/purchaseCredits`,
    data: {
      paymentMethodId,
      creditAmount: amount,
    },
  });
};