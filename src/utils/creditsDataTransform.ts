import { CustomerCreditData } from '../stores/creditsStore';


export const transformCustomersDataForTable = (customers: CustomerCreditData[]) => {
  return customers.map((customer) => ({
    customerName: customer.customerName,
    customerEmail: customer.customerEmail,
    plan: customer.customerPlanType,
    phone: customer.customerPhone,
    'customerCreditsRemaining': customer.totalRemainingCredits.toString(),
    'customerExpiringCredits': customer.expiringSoonCredits.toString(),
    'customerLastTopUpDate': customer.lastPurchaseDate 
      ? new Date(customer.lastPurchaseDate).toLocaleDateString()
      : 'Never',
    'customerCreditsActions': true,
    
    customerId: customer.customerId,
    totalPurchasedCredits: customer.totalPurchasedCredits,
    earliestExpiryDate: customer.earliestExpiryDate,
    creditBatches: customer.creditBatches,
  }));
};


export const customersTableHeaders = [
  'customerName',
  'Email',
  'Customer Credits Remaining',
  'Customer Expiring Credits',
  'Customer Last Top-up Date',
  'Customer Credits Actions',
];

// Transform API data to match the admin customers table format
export const transformCustomersDataForAdminTable = (customers: CustomerCreditData[]) => {
  return customers.map((customer) => ({
    name: customer.customerName,
    customerEmail: customer.customerEmail,
    phone: customer.customerPhone || 'N/A',
    plan: customer.customerPlanType || 'N/A',
    customerCreditsRemaining: customer.totalRemainingCredits.toString(),
    customerStatus: 'Active', // Default status
    customerLastLogin: 'N/A', // Not available in credits data
    
    customerId: customer.customerId,
    totalPurchasedCredits: customer.totalPurchasedCredits,
    expiringSoonCredits: customer.expiringSoonCredits,
    lastPurchaseDate: customer.lastPurchaseDate,
    earliestExpiryDate: customer.earliestExpiryDate,
    creditBatches: customer.creditBatches,
  }));
};


export const adminCustomersTableHeaders = [
  'Name',
  'Email',
  'Phone',
  'Plan',
  'Customer Credits Remaining',
  'Customer status',
  'Customer Last Login',
];


export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'Never';
  return new Date(dateString).toLocaleDateString();
};


export const getExpiryStatus = (expiryDate: string | null): 'expired' | 'expiring-soon' | 'valid' => {
  if (!expiryDate) return 'valid';
  
  const now = new Date();
  const expiry = new Date(expiryDate);
  const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntilExpiry < 0) return 'expired';
  if (daysUntilExpiry <= 7) return 'expiring-soon';
  return 'valid';
};
