import { useState, useEffect, useCallback } from "react";
import { Select, Input, Button, message, Spin } from "antd";
import { CreditCard, Plus } from "lucide-react";
import useAuthStore from "../../stores/authStore";
import {
  attachPaymentMethod,
  getCustomerCards,
  purchaseCreditsService,
} from "../../services/stripeService";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";

// Card brand icons
import visaIcon from "../../assets/icons/visa.svg";
import mastercardIcon from "../../assets/icons/mastercard.svg";
import amexIcon from "../../assets/icons/amex.svg";
import discoverIcon from "../../assets/icons/discover.svg";
import useCreditsStore from "../../stores/creditsStore";
import EnhancedPaymentForm from "./EnhancedPaymentForm";

const { Option } = Select;

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_KEY || "pk_test_key"
);

// Define interface for card data based on your API response
interface CardData {
  id: string;
  type: string;
  card: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
    funding: string;
  };
  billingDetails: {
    address: {
      city: string | null;
      country: string | null;
      line1: string | null;
      line2: string | null;
      postal_code: string | null;
      state: string | null;
    };
    email: string | null;
    name: string | null;
    phone: string | null;
  };
}

// CardForm component that uses Enhanced Payment Form
const CardForm = ({
  onCardAdded,
}: {
  onCardAdded: (cardId: string) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  const stripeCustomerId: string | undefined =
    user?.paymentMethod?.customerId || "";

  const handleSubmit = async (paymentMethod: { id: string }) => {
    if (!stripe || !elements || !stripeCustomerId) {
      setError("Stripe not initialized or customer ID missing");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Attach payment method to customer
      const response = await attachPaymentMethod(
        stripeCustomerId,
        paymentMethod.id
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to attach payment method");
      }

      message.success("New card added successfully!");
      onCardAdded(paymentMethod.id);
    } catch (err) {
      console.error("Error adding card:", err);
      setError(err instanceof Error ? err.message : "Failed to add card");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EnhancedPaymentForm
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      className="max-w-full"
    />
  );
};

const CreditsSelector = ({
  onChange,
  disabled = false,
}: {
  onChange: (credits: number, amount: number) => void;
  disabled?: boolean;
}) => {
  const [credits, setCredits] = useState<number>(5);
  const creditPrice = 5; // $5 per credit

  const handleCreditsChange = (value: number | null) => {
    if (!value) {
      setCredits(0);
      onChange(0, 0);
      return;
    }

    setCredits(value);
    onChange(value, value * creditPrice);
  };

  const increaseCredits = () => {
    const newValue = credits + 1;
    setCredits(newValue);
    onChange(newValue, newValue * creditPrice);
  };

  const decreaseCredits = () => {
    const newValue = Math.max(0, credits - 1);
    setCredits(newValue);
    onChange(newValue, newValue * creditPrice);
  };

  return (
    <div className="mb-6">
      <label
        htmlFor="credits-input"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Number of Credits
      </label>
      <div className="flex items-center">
        <Button
          onClick={decreaseCredits}
          disabled={credits <= 0 || disabled}
          className="border border-gray-300 px-3 py-1 rounded-l-md"
          icon={<span className="text-xl font-bold">-</span>}
        />
        <Input
          id="credits-input"
          type="number"
          min={0}
          step={1}
          value={credits}
          onChange={(e) => handleCreditsChange(Number(e.target.value))}
          disabled={disabled}
          className="text-center border-y border-gray-300"
          style={{ borderRadius: 0 }}
        />
        <Button
          onClick={increaseCredits}
          disabled={disabled}
          className="border border-gray-300 px-3 py-1 rounded-r-md"
          icon={<span className="text-xl font-bold">+</span>}
        />
      </div>
    </div>
  );
};

// Main Payment Form component
const PaymentFormContent = () => {
  const [loading, setLoading] = useState(false);
  const [savedCards, setSavedCards] = useState<CardData[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [fetchingCards, setFetchingCards] = useState(false);
  const [credits, setCredits] = useState(5);
  const [amount, setAmount] = useState(35);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const { user } = useAuthStore();
  const { fetchCredits } = useCreditsStore();

  const stripeCustomerId: string | undefined =
    user?.paymentMethod?.customerId || "";

  const handleCreditsChange = (credits: number, amount: number) => {
    setCredits(credits);
    setAmount(amount);
  };

  const fetchSavedCards = useCallback(async () => {
    if (!stripeCustomerId) return;

    try {
      setFetchingCards(true);
      const response = (await getCustomerCards(stripeCustomerId)) as {
        success: boolean;
        data?: CardData[];
        message?: string;
      };

      if (response.success && response.data) {
        setSavedCards(response.data);

        // If there are cards, select the first one
        if (response.data.length > 0) {
          setSelectedCard(response.data[0].id);
          setShowNewCardForm(false);
        } else {
          // No cards, show the form
          setShowNewCardForm(true);
        }
      } else {
        throw new Error(response.message || "Failed to load payment methods");
      }
    } catch (error) {
      console.error("Error fetching saved cards:", error);
      message.error("Could not load your saved payment methods");
      // If we couldn't load cards, show the new card form
      setShowNewCardForm(true);
    } finally {
      setFetchingCards(false);
    }
  }, [stripeCustomerId]);

  // Fetch saved cards when component mounts
  useEffect(() => {
    if (stripeCustomerId) {
      fetchSavedCards();
    } else {
      // No saved cards, show new card form by default
      setShowNewCardForm(true);
    }
  }, [stripeCustomerId, fetchSavedCards]);

  const getCardIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return visaIcon;
      case "mastercard":
        return mastercardIcon;
      case "amex":
        return amexIcon;
      case "discover":
        return discoverIcon;
      default:
        return <CreditCard className="w-6 h-6" />;
    }
  };

  const handleCardChange = (value: string) => {
    if (value === "new") {
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
    message.success("New card added successfully!");
  };

  const handlePayment = async () => {
    if (!selectedCard && !showNewCardForm) {
      message.error("Please select a payment method or add a new card");
      return;
    }
    if (credits <= 0) {
      message.error("Please select at least 1 credit to purchase");
      return;
    }
    setLoading(true);
    setPurchaseError(null);
    try {
      // Ensure customer exists
      if (!stripeCustomerId) {
        message.error(
          "Customer ID not found. Please reload the page or contact support."
        );
        return;
      }
      const response = await purchaseCreditsService(
        stripeCustomerId,
        selectedCard,
        amount * 100 // Convert to cents for API
      );

      if (!response.success) {
        throw new Error(
          response.message || "Payment failed. Please try again."
        );
      }
      message.success(
        `Payment successful! ${credits} Credits have been added to your account.`
      );
      fetchCredits();
    } catch (error: unknown) {
      console.error("Payment error:", error);

      if (error instanceof Error) {
        setPurchaseError(error.message);
        message.error(error.message);
      } else {
        setPurchaseError("Payment failed. Please try again.");
        message.error("Payment failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-white p-9 rounded-md">
      <h2 className="text-[36px] font-semibold text-left mb-6">
        Payment Details
      </h2>

      <div className="space-y-6">
        <CreditsSelector
          onChange={handleCreditsChange}
          disabled={loading || fetchingCards}
        />
        {savedCards.length > 0 && (
          <div>
            <label
              htmlFor="payment-method-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Payment Method
            </label>
            {fetchingCards ? (
              <div className="flex justify-center py-4">
                <Spin tip="Loading saved cards..." />
              </div>
            ) : (
              <Select
                id="payment-method-select"
                value={selectedCard || "new"}
                onChange={handleCardChange}
                className="w-full"
                disabled={loading}
              >
                {savedCards.map((card) => (
                  <Option key={card.id} value={card.id}>
                    <div className="flex items-center gap-2">
                      {typeof getCardIcon(card.card.brand) === "string" ? (
                        <img
                          src={getCardIcon(card.card.brand) as string}
                          alt={card.card.brand}
                          className="w-6 h-6"
                        />
                      ) : (
                        Boolean(getCardIcon(card.card.brand)) &&
                        getCardIcon(card.card.brand)
                      )}
                      <span>
                        {card.card.brand.charAt(0).toUpperCase() +
                          card.card.brand.slice(1)}{" "}
                        •••• {card.card.last4}
                        {Boolean(card.card.expMonth && card.card.expYear) &&
                          ` (${card.card.expMonth}/${card.card.expYear})`}
                      </span>
                    </div>
                  </Option>
                ))}
                <Option value="new">
                  <div className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    <span>Add new card</span>
                  </div>
                </Option>
              </Select>
            )}
          </div>
        )}

        {showNewCardForm ? (
          <div className="mt-6 border border-gray-200 p-4 rounded-md bg-gray-50">
            <h3 className="text-lg font-medium mb-4">Add New Card</h3>
            <CardForm onCardAdded={handleCardAdded} />
          </div>
        ) : (
          <div className="pt-4">
            {purchaseError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                {purchaseError}
              </div>
            )}

            <Button
              type="primary"
              onClick={handlePayment}
              loading={loading}
              disabled={loading || credits < 1}
              className="w-full h-12 bg-primary-50 hover:bg-primary-50/5 text-white text-lg rounded-full"
            >
              Pay ${amount.toFixed(2)} USD for {credits} credits
            </Button>
          </div>
        )}

        <p className="text-gray-500 text-sm text-center mt-4">
          Your payment information is secure. We use industry-standard
          encryption.
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
