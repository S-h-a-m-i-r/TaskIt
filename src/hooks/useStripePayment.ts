import { useState } from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import { StripeCardNumberElement } from '@stripe/stripe-js';

interface PaymentMethod {
  paymentMethodId: string;
  cardLast4: string;
  cardBrand: string;
  cardExpMonth: number;
  cardExpYear: number;
  cardFunding: string;
  token: string;
}

interface UseStripePaymentProps {
  userDetails: {
    firstName: string;
    lastName: string;
    email: string;
  };
  onPaymentSuccess: (paymentMethod: PaymentMethod) => void;
  onPaymentError: (error: string) => void;
}

const useStripePayment = ({
  userDetails,
  onPaymentSuccess,
  onPaymentError,
}: UseStripePaymentProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardErrorMessage, setCardErrorMessage] = useState('');
  const [cardType, setCardType] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardFieldChange = (event?: { brand?: string; complete?: boolean }) => {
    if (event?.brand === 'amex') {
      setCardType(event.brand.toUpperCase());
    } else {
      const firstLetter = event?.brand?.charAt(0);
      const capitalizedWord =
        (firstLetter?.toUpperCase() || '') + (event?.brand?.slice(1) || '');
      setCardType(capitalizedWord);
    }
    if (event?.complete) {
      setCardErrorMessage('');
    }
  };

  const handleStripePayment = async () => {
    if (!stripe || !elements) {
      const error = 'Stripe is not initialized.';
      setCardErrorMessage(error);
      onPaymentError(error);
      return;
    }

    setIsProcessing(true);

    try {
      const cardNumberElement = elements.getElement(
        CardNumberElement
      ) as StripeCardNumberElement;

      if (!cardNumberElement) {
        const error = 'Card number element not found.';
        setCardErrorMessage(error);
        onPaymentError(error);
        return;
      }

      const { token, error: tokenError } = await stripe.createToken(cardNumberElement);
      if (tokenError) {
        setCardErrorMessage(tokenError.message || 'Error processing payment.');
        onPaymentError(tokenError.message || 'Error processing payment.');
        return;
      }

      setCardErrorMessage('');

      const paymentMethodResponse = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumberElement,
        billing_details: {
          name: `${userDetails.firstName} ${userDetails.lastName}`,
          email: userDetails.email,
        },
      });

      if (paymentMethodResponse.error) {
        setCardErrorMessage(paymentMethodResponse.error.message || 'Error creating payment method.');
        onPaymentError(paymentMethodResponse.error.message || 'Error creating payment method.');
        return;
      }

      const paymentMethod: PaymentMethod = {
        paymentMethodId: paymentMethodResponse.paymentMethod?.id || '',
        cardLast4: paymentMethodResponse.paymentMethod?.card?.last4 || '',
        cardBrand: paymentMethodResponse.paymentMethod?.card?.brand || '',
        cardExpMonth: paymentMethodResponse.paymentMethod?.card?.exp_month || 0,
        cardExpYear: paymentMethodResponse.paymentMethod?.card?.exp_year || 0,
        cardFunding: paymentMethodResponse.paymentMethod?.card?.funding || '',
        token: token?.id || '',
      };

      onPaymentSuccess(paymentMethod);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
      setCardErrorMessage(errorMessage);
      onPaymentError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    handleStripePayment,
    handleCardFieldChange,
    cardErrorMessage,
    cardType,
    isProcessing,
  };
};

export default useStripePayment; 