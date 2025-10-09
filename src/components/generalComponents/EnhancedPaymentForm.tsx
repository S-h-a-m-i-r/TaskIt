import { useState, useRef } from "react";
import { Button, message } from "antd";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Card brand icons
import visaIcon from "../../assets/icons/visa.svg";
import mastercardIcon from "../../assets/icons/mastercard.svg";
import amexIcon from "../../assets/icons/amex.svg";

interface PaymentMethod {
  id: string;
  type: string;
  card: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}

interface CardFieldChangeEvent {
  complete: boolean;
  brand?: string;
  error?: {
    message: string;
  };
}

interface EnhancedPaymentFormProps {
  onSubmit: (paymentMethod: PaymentMethod) => void;
  loading?: boolean;
  error?: string | null;
  onCardFieldChange?: (event: CardFieldChangeEvent) => void;
  showCardType?: boolean;
  cardType?: string;
  className?: string;
}

const EnhancedPaymentForm = ({
  onSubmit,
  loading = false,
  error,
  onCardFieldChange,
  showCardType = true,
  cardType,
  className = "",
}: EnhancedPaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [detectedCardType, setDetectedCardType] = useState<string>("");

  const cardNumberRef = useRef<HTMLDivElement>(null);
  const expiryRef = useRef<HTMLDivElement>(null);
  const cvcRef = useRef<HTMLDivElement>(null);

  // Custom styles for Stripe Elements
  const cardElementOptions = {
    style: {
      base: {
        backgroundColor: "white",
        fontSize: "16px",
        color: "#424770",
        fontFamily: "sans-serif",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  const handleCardNumberChange = (event: CardFieldChangeEvent) => {
    setDetectedCardType(event.brand || "");

    if (onCardFieldChange) {
      onCardFieldChange(event);
    }

    // Auto-focus expiry when card number is complete
    if (event.complete && expiryRef.current) {
      setTimeout(() => {
        const expiryInput = expiryRef.current?.querySelector("input");
        if (expiryInput) {
          expiryInput.focus();
        }
      }, 100);
    }
  };

  const handleExpiryChange = (event: CardFieldChangeEvent) => {
    // Auto-focus CVC when expiry is complete
    if (event.complete && cvcRef.current) {
      setTimeout(() => {
        const cvcInput = cvcRef.current?.querySelector("input");
        if (cvcInput) {
          cvcInput.focus();
        }
      }, 100);
    }
  };

  const handleCvcChange = () => {
    // CVC change handler - can be extended if needed
  };

  const getCardIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return visaIcon;
      case "mastercard":
        return mastercardIcon;
      case "amex":
      case "american_express":
        return amexIcon;
      default:
        return null;
    }
  };

  const getCardBrandName = (brand: string) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return "Visa";
      case "mastercard":
        return "Mastercard";
      case "amex":
      case "american_express":
        return "American Express";
      default:
        return brand;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      message.error("Payment system not initialized");
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      message.error("Card element not found");
      return;
    }

    try {
      const { error: stripeError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (!paymentMethod) {
        throw new Error("Failed to create payment method");
      }

      onSubmit(paymentMethod as PaymentMethod);
    } catch (err) {
      console.error("Payment error:", err);
      message.error(err instanceof Error ? err.message : "Payment failed");
    }
  };

  const currentCardType = cardType || detectedCardType;
  const cardIcon = getCardIcon(currentCardType);

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {/* Card Logos */}
      <div className="flex justify-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <img src={visaIcon} alt="Visa" className="w-8 h-5" />
          <span className="text-xs text-gray-500">Visa</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={mastercardIcon} alt="Mastercard" className="w-8 h-5" />
          <span className="text-xs text-gray-500">Mastercard</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={amexIcon} alt="American Express" className="w-8 h-5" />
          <span className="text-xs text-gray-500">Amex</span>
        </div>
      </div>

      {/* Card Number */}
      <div>
        <label
          htmlFor="card-number"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Card Number
        </label>
        <div
          ref={cardNumberRef}
          className="relative bg-white border border-gray-300 rounded-md p-3 focus-within:border-primary-200"
        >
          <CardNumberElement
            id="card-number"
            options={{
              ...cardElementOptions,
              placeholder: "1234 5678 9012 3456",
            }}
            onChange={handleCardNumberChange}
          />
          {currentCardType && cardIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <img
                src={cardIcon}
                alt={getCardBrandName(currentCardType)}
                className="w-6 h-4"
              />
            </div>
          )}
        </div>
        {showCardType && currentCardType && (
          <p className="text-sm text-gray-600 mt-1">
            Card type: {getCardBrandName(currentCardType)}
          </p>
        )}
      </div>

      {/* Expiry Date and CVC */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="card-expiry"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Expiry Date
          </label>
          <div
            ref={expiryRef}
            className="bg-white border border-gray-300 rounded-md p-3 focus-within:border-primary-200"
          >
            <CardExpiryElement
              id="card-expiry"
              options={{
                ...cardElementOptions,
                placeholder: "MM/YY",
              }}
              onChange={handleExpiryChange}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="card-cvc"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            CVC
          </label>
          <div
            ref={cvcRef}
            className="bg-white border border-gray-300 rounded-md p-3 focus-within:border-primary-200"
          >
            <CardCvcElement
              id="card-cvc"
              options={{
                ...cardElementOptions,
                placeholder: "123",
              }}
              onChange={handleCvcChange}
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-sm mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        disabled={!stripe || !elements || loading}
        className="w-full h-12 bg-primary-50 hover:bg-primary-200 text-white text-lg rounded-full mt-6"
      >
        {loading ? "Processing..." : "Continue"}
      </Button>

      {/* Security Notice */}
      <p className="text-gray-500 text-sm text-center mt-4">
        Your payment information is secure. We use industry-standard encryption.
      </p>
    </form>
  );
};

export default EnhancedPaymentForm;
