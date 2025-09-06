import { useState, useEffect } from 'react';
import { Select, Form, Input, Button, message, Spin } from 'antd';
import { CreditCard } from 'lucide-react';
import useAuthStore from '../../stores/authStore';
import { attachPaymentMethod} from '../../services/stripeService';
import { loadStripe } from '@stripe/stripe-js';
import {  CardNumberElement,
	CardExpiryElement,
	CardCvcElement, Elements, useStripe, useElements, 
	} from '@stripe/react-stripe-js';

// Card brand icons
import visaIcon from '../../assets/icons/visa.svg';
import mastercardIcon from '../../assets/icons/mastercard.svg';
import amexIcon from '../../assets/icons/amex.svg';
import discoverIcon from '../../assets/icons/discover.svg';

const { Option } = Select;

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY || 'pk_test_key');;

// CardForm component that uses Stripe Elements
const CardForm = ({ onCardAdded }: { onCardAdded: (cardId: string) => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
//   const { user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();
  
	if (!stripe || !elements) return;
  
	setSaving(true);
	setCardError(null);
  
	try {
	  const cardNumberElement = elements.getElement(CardNumberElement);
	  if (!cardNumberElement) throw new Error("Card element not found");
  
	  const { error, paymentMethod } = await stripe.createPaymentMethod({
		type: "card",
		card: cardNumberElement,
	  });
  
	  if (error) throw new Error(error.message);
	  if (!paymentMethod) throw new Error("Payment method creation failed");
  
	  // Add the payment method to the customer
	  // const ensureCustomerResponse = await ensureCustomer();
	  // if (!ensureCustomerResponse.success) {
		// throw new Error("Could not create or retrieve customer");
	  // }
  
	  const customerId = ''
  
	  const attachResponse = await attachPaymentMethod(
		customerId,
		paymentMethod.id
	  );
  
	  if (!attachResponse.success) {
		throw new Error(attachResponse.message || "Failed to save card");
	  }
  
	  message.success("Card added successfully!");
	  cardNumberElement.clear();
	  onCardAdded(paymentMethod.id);
	} catch (err: unknown) {
    if (err instanceof Error) {
      setCardError(err.message || "Failed to add card");
      message.error(err.message || "Failed to add card");
    } else {
      setCardError("Failed to add card");
      message.error("Failed to add card");
    }
	} finally {
	  setSaving(false);
	}
  };
  

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="text-left block text-sm font-medium text-gray-700 mb-2">
          Card Number
        </label>
        <div className="border border-gray-300 rounded-md p-3 bg-white">
          <CardNumberElement options={cardElementOptions} />
        </div>
        {cardError && (
          <p className="mt-2 text-sm text-red-600">{cardError}</p>
        )}
      </div>
	  <div className="mb-4">
        <label className="text-left block text-sm font-medium text-gray-700 mb-2">
		Card Expiry
        </label>
        <div className="border border-gray-300 rounded-md p-3 bg-white">
          <CardExpiryElement options={cardElementOptions} />
        </div>
        {cardError && (
          <p className="mt-2 text-sm text-red-600">{cardError}</p>
        )}
      </div>
	  <div className="mb-4">
        <label className="text-left block text-sm font-medium text-gray-700 mb-2">
		Card CVC
        </label>
        <div className="border border-gray-300 rounded-md p-3 bg-white">
          <CardCvcElement options={cardElementOptions} />
        </div>
        {cardError && (
          <p className="mt-2 text-sm text-red-600">{cardError}</p>
        )}
      </div>

      <Form.Item name="saveCard" valuePropName="checked">
        <div className="flex items-center gap-2">
          <input type="checkbox" id="saveCard" className="h-4 w-4" defaultChecked />
          <label htmlFor="saveCard" className="text-sm text-gray-700">
            Save this card for future payments
          </label>
        </div>
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        loading={saving}
        className="w-full mt-4 bg-primary-50 hover:bg-primary-200 text-white rounded-full"
        disabled={!stripe}
      >
        Add Card
      </Button>
    </form>
  );
};

// Main Payment Form component
const PaymentFormContent = () => {
//   const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [savedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [fetchingCards] = useState(false);
  const { user } = useAuthStore();

  const stripeCustomerId: string | undefined = user?.paymentMethod?.paymentMethodId;

  // Fetch saved cards when component mounts
  useEffect(() => {
    if (stripeCustomerId) {
      fetchSavedCards();
    } else {
      // No saved cards, show new card form by default
      setShowNewCardForm(true);
    }
  }, [stripeCustomerId]);

  const fetchSavedCards = async () => {
    if (!stripeCustomerId) return;
    
  //   try {
  //     setFetchingCards(true);
  //     const response = {}
      
  //     if (response.success && response.paymentMethods) {
  //       setSavedCards(response.paymentMethods);
        
  //       // If there's a default card, select it
  //       const defaultCard = response.paymentMethods.find(card => card.isDefault);
  //       if (defaultCard) {
  //         setSelectedCard(defaultCard.id);
  //       } else if (response.paymentMethods.length > 0) {
  //         setSelectedCard(response.paymentMethods[0].id);
  //       }
  //     } else {
  //       throw new Error(response.message || 'Failed to load payment methods');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching saved cards:', error);
  //     message.error('Could not load your saved payment methods');
  //     // If we couldn't load cards, show the new card form
  //     setShowNewCardForm(true);
  //   } finally {
  //     setFetchingCards(false);
  //   }
  };

  const getCardIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return visaIcon;
      case 'mastercard':
        return mastercardIcon;
      case 'amex':
        return amexIcon;
      case 'discover':
        return discoverIcon;
      default:
        return <CreditCard className="w-6 h-6" />;
    }
  };

  const handleCardChange = (value: string) => {
    if (value === 'new') {
      setShowNewCardForm(true);
      setSelectedCard(null);
    } else {
      setShowNewCardForm(false);
      setSelectedCard(value);
    }
  };

  const handleCardAdded = (cardId: string) => {
    // Refresh the saved cards list
    fetchSavedCards();
    // Select the newly added card
    setSelectedCard(cardId);
    // Hide the new card form
    setShowNewCardForm(false);
  };

  const handlePayment = async () => {
    if (!selectedCard && !showNewCardForm) {
      message.error('Please select a payment method or add a new card');
      return;
    }
    
    setLoading(true);
    // try {
      // Ensure customer exists
      // let customerId: string | undefined = stripeCustomerId;
      // if (!customerId) {
      //   const customerResponse = await stripeService.ensureCustomer();
      //   if (customerResponse.success) {
      //     customerId = customerResponse.customerId;
      //   } else {
      //     throw new Error('Could not create customer profile');
      //   }
      // }

      // if (selectedCard && customerId) {
        // Process payment with selected card
        // const response = await stripeService.buyCredits(
        //   5500, // $55.00 (amount in cents)
        //   selectedCard,
        //   55 // 55 credits
      //   // );
      //   let response = { success: false }; // Mock response for demonstration
        
      //   if (response.success) {
      //     message.success('Payment successful! Credits added to your account.');
      //     // Update user credits in your app state
      //     // For example: updateUserCredits(response.updatedCredits);
      //   } else {
      //     throw new Error(response?.message || 'Payment failed');
      //   }
      // } else {
      //   message.error('Please add a payment method first');
      // }
    // } catch (error: unknown) {
    //   console.error('Payment error:', error);
    //   if (error instanceof Error) {
    //     message.error(error.message || 'Payment failed. Please try again.');
    //   } else {
    //     message.error('Payment failed. Please try again.');
    //   }
    } 

  return (
    <div className="flex-1 bg-white p-9 rounded-md">
      <h2 className="text-[36px] font-semibold text-left mb-6">Payment Details</h2>
      
      <div className="space-y-6">
        {savedCards.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Payment Method
            </label>
            {fetchingCards ? (
              <div className="flex justify-center py-4">
                <Spin tip="Loading saved cards..." />
              </div>
            ) : (
              <Select 
                value={selectedCard || 'new'}
                onChange={handleCardChange}
                className="w-full"
                disabled={loading}
              >
                {savedCards.map(card => (
                  // <Option key={card?.id} value={card?.id}>
                    <div className="flex items-center gap-2">
                      {
                      typeof getCardIcon(card) === 'string' ? (
                    //    <img src={getCardIcon(card.brand)} alt={card.brand} className="w-6 h-6" />
					<span> image </span>
                      ) : (
                        // getCardIcon(card.brand)
                        <>
                        </>
                      )}
                      {/* <span>
                        {card.brand.charAt(0).toUpperCase() + card.brand.slice(1)} •••• {card.last4}
                        {card.exp_month && card.exp_year && ` (${card.exp_month}/${card.exp_year})`}
                      </span>
                      {card.isDefault && (
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full ml-2">
                          Default
                        </span>
                      )} */}
                    </div>
                  // </Option>
                ))}
                <Option value="new">+ Add new card</Option>
              </Select>
            )}
          </div>
        )}

        {showNewCardForm && (
          <div className="mt-6 border border-gray-200 p-4 rounded-md bg-gray-50">
            <h3 className="text-lg font-medium mb-4">Add New Card</h3>
            <CardForm onCardAdded={handleCardAdded} />
          </div>
        )}

        {!showNewCardForm && (
          <Form.Item
            label="Email Address"
            name="email"
            initialValue={user?.email}
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input placeholder="your@email.com" />
          </Form.Item>
        )}

        {!showNewCardForm && (
          <div className="pt-4">
            <Button 
              type="primary"
              onClick={handlePayment}
              loading={loading}
              className="w-full h-12 bg-primary-50 hover:bg-primary-200 text-white text-lg rounded-full"
            >
              Pay $55 USD
            </Button>
          </div>
        )}
        
        <p className="text-gray-500 text-sm text-center mt-4">
          Your payment information is secure. We use industry-standard encryption.
        </p>
      </div>
    </div>
  );
};

// Wrap the payment form in Stripe Elements
const PaymentForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentFormContent />
    </Elements>
  );
};

export default PaymentForm;