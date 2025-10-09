import { useNavigate } from "react-router-dom";
import useRegistrationStore from "../../stores/registrationStore";
import useStripePayment from "../../hooks/useStripePayment";
import { message } from "antd";
import EnhancedPaymentForm from "../../components/generalComponents/EnhancedPaymentForm";

interface PaymentMethod {
  paymentMethodId: string;
  customerId: string;
  cardLast4: string;
  cardBrand: string;
  cardExpMonth: number;
  cardExpYear: number;
  cardFunding: string;
  token: string;
}

const CreditCardDetails = () => {
  const navigate = useNavigate();
  const { userDetails, setPaymentMethod, nextStep, prevStep } =
    useRegistrationStore();

  const handlePaymentSuccess = (paymentMethod: PaymentMethod) => {
    setPaymentMethod(paymentMethod);
    nextStep();
    navigate("/signup/createPassword");
  };

  const handlePaymentError = (error: string) => {
    message.error(error);
  };

  const handleBack = () => {
    prevStep();
    navigate("/signup/plan");
  };

  const {
    handleStripePayment,
    handleCardFieldChange,
    cardErrorMessage,
    cardType,
    isProcessing,
  } = useStripePayment({
    userDetails,
    onPaymentSuccess: handlePaymentSuccess,
    onPaymentError: handlePaymentError,
  });

  const handlePaymentSubmit = async () => {
    await handleStripePayment();
  };

  return (
    <div className="max-w-[886px] text-black py-5 flex flex-col gap-5 justify-center rounded-lg w-full font-sans">
      <div className="text-center w-full space-y-2 text-[32px] font-bold [tracking:0.01em] text-primary-100">
        <h2>Credit Card Details</h2>
      </div>
      <div className="text-center w-full space-y-2 text-[16px] font-normal mb-1 text-gray-600">
        <p>Secure payment processing with Stripe</p>
      </div>

      <EnhancedPaymentForm
        onSubmit={handlePaymentSubmit}
        loading={isProcessing}
        error={cardErrorMessage}
        onCardFieldChange={handleCardFieldChange}
        cardType={cardType}
        className="max-w-full"
      />

      <div className="flex gap-4 mt-6">
        <button
          type="button"
          onClick={handleBack}
          className="flex-1 py-4 text-[12px] border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default CreditCardDetails;
