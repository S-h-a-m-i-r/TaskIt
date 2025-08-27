import { useNavigate } from 'react-router-dom';
import {
	CardNumberElement,
	CardExpiryElement,
	CardCvcElement,
} from '@stripe/react-stripe-js';
import useRegistrationStore from '../../stores/registrationStore';
import useStripePayment from '../../hooks/useStripePayment';
import { message } from 'antd';

interface PaymentMethod {
	paymentMethodId: string;
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
		navigate('/signup/createPassword');
	};

	const handlePaymentError = (error: string) => {
		message.error(error);
	};

	const handleBack = () => {
		prevStep();
		navigate('/signup/plan');
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await handleStripePayment();
	};

	return (
		<form
			onSubmit={handleSubmit}
			className=" max-w-[886px] text-black py-5 flex flex-col gap-5 justify-center rounded-lg w-full font-sans"
		>
			<div className=" text-center w-full space-y-2 text-[32px] font-bold [tracking:0.01em] text-primary-100">
				<h2>Credit Card Details</h2>
			</div>
			<div className=" text-center w-full space-y-2 text-[16px] font-normal mb-1 text-gray-600">
				<p>Secure payment processing with Stripe</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="col-span-2">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Card Number
					</label>
					<div className=" bg-white border border-gray-300 rounded-md p-3 focus-within:border-primary-200">
						<CardNumberElement
							options={{
								style: {
									base: {
										fontSize: '16px',
										color: '#424770',
										'::placeholder': {
											color: '#aab7c4',
										},
									},
								},
							}}
							onChange={handleCardFieldChange}
						/>
					</div>
					{cardType && (
						<p className="text-sm text-gray-600 mt-1">Card type: {cardType}</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Expiry Date
					</label>
					<div className=" bg-white border border-gray-300 rounded-md p-3 focus-within:border-primary-200">
						<CardExpiryElement
							options={{
								style: {
									base: {
										fontSize: '16px',
										color: '#424770',
										'::placeholder': {
											color: '#aab7c4',
										},
									},
								},
							}}
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						CVC
					</label>
					<div className=" bg-white border border-gray-300 rounded-md p-3 focus-within:border-primary-200">
						<CardCvcElement
							options={{
								style: {
									base: {
										fontSize: '16px',
										color: '#424770',
										'::placeholder': {
											color: '#aab7c4',
										},
									},
								},
							}}
						/>
					</div>
				</div>
			</div>

			{cardErrorMessage && (
				<div className="text-red-600 text-sm mt-2">{cardErrorMessage}</div>
			)}

			<div className="flex gap-4">
				<button
					type="button"
					onClick={handleBack}
					className="flex-1 py-4 text-[12px] border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50"
				>
					Back
				</button>
				<button
					type="submit"
					disabled={isProcessing}
					className={`flex-1 text-[12px] py-4 px-4 rounded-full hover:bg-primary-200 ${
						isProcessing
							? 'bg-gray-400 cursor-not-allowed'
							: 'bg-primary-50 text-white'
					}`}
				>
					{isProcessing ? 'Processing...' : 'Continue'}
				</button>
			</div>
		</form>
	);
};

export default CreditCardDetails;
