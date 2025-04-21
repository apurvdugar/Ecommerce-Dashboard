import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
    const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(60); // Timer starts at 60 seconds

  useEffect(() => {
    // Timer of 1 minute
    const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval); // Clear the interval when the timer reaches 0
            navigate('/'); // Redirect to the homepage
            return 0;
          }
          return prevTime - 1; // Decrease the timer by 1 second
        });
      }, 1000);

    // Cleaning up the timer
    return () => clearTimeout(interval);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-700 mb-6">Thank you for your purchase. Your order has been placed successfully.</p>
        <p className="text-gray-500">You will be redirected to the homepage in 
            <span className='font-bold text-sm'> {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span> minutes.
        </p>
      </div>
    </div>
  );
}

export default CheckoutPage;