import { SetStateAction, useState } from 'react';
import creditCard from '../assets/icons/CreditCard_icon.svg'
import banktransfer from '../assets/icons/Bank_icon.svg'
function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');

  const handlePaymentChange = (method: SetStateAction<string>) => {
    setPaymentMethod(method);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    alert('Form submitted');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full text-left max-w-[630px]">
      <div className="mb-4 w-full flex-1">
        <label htmlFor="billedTo" className="block mb-2 text-sm  font-medium text-gray-700">Billed to</label>
        <input
          type="text"
          id="billedTo"
          name="billedTo"
          className="w-full p-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:none"
        />
      </div>

      <div className="mb-4">
        <label className=" block mb-2 text-sm font-medium text-gray-700">Payment Details</label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => handlePaymentChange('Bank Transfer')}
            className={`flex flex-col justify-between py-3 px-4 w-52 border rounded-md text-sm font-medium  text-gray-700
              ${paymentMethod === 'Bank Transfer' 
                ? 'bg-white border-white' 
                : 'bg-transparen'}`}
          >
            <img src={banktransfer} alt='bank transfer' />
            Bank Transfer
          </button>
          <button
            type="button"
            onClick={() => handlePaymentChange('Credit Card')}
            className={` flex flex-col justify-between py-3 w-52 px-5 border rounded-md text-sm font-medium  text-gray-700
              ${paymentMethod === 'Credit Card' 
                ? 'bg-white text-gray-700' 
                : 'bg-transparent'}`}
          >
            <img src={creditCard} alt='credit card' />
            Credit Card
          </button>
        </div>
      </div>

      {paymentMethod === 'Credit Card' && (
        <>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block mb-2 text-sm font-medium text-gray-700">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              className="w-full p-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="expiryDate" className="block mb-2 text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              className="w-full p-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cvv" className="block mb-2 text-sm font-medium text-gray-700">CVV</label>
            <input
              type="password"
              id="cvv"
              name="cvv"
              className="w-full p-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </>
      )}

{paymentMethod === 'Bank Transfer' && (
        <>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block mb-2 text-sm font-medium text-gray-700">enter your bank</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="Search Bank"
              className="w-full p-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </>
      )}

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          className="flex-1 py-3 px-4 bg-primary-100 text-white rounded-full font-medium text-sm hover:bg-blue-600"
        >
          Buy Now
        </button>
        <button
          type="button"
          className="flex-1 py-3 px-4 bg-transparent text-gray-700 rounded-full text-sm hover:bg-gray-400 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default PaymentForm;
