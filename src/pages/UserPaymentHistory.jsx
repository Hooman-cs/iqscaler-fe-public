import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyPayments } from '../slices/paymentSlice';
import { Link } from 'react-router-dom';

// Helper function to format currency dynamically (No unused variable warning!)
const formatCurrency = (amount, currencyCode = 'INR') => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  } catch {
    return `${currencyCode} ${amount}`; 
  }
};

const UserPaymentHistory = () => {
  const dispatch = useDispatch();
  // Notice we are pulling from 'myPayments' now, not 'payments'!
  const { myPayments, loading, error } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(fetchMyPayments());
  }, [dispatch]);

  const getStatusColor = (status) => {
    if (status === 'Success') return 'text-green-700 bg-green-100 border-green-200';
    if (status === 'Failed') return 'text-red-700 bg-red-100 border-red-200';
    return 'text-yellow-700 bg-yellow-100 border-yellow-200';
  };

  if (loading) return <div className="p-8 text-center text-gray-600 animate-pulse">Loading your receipts...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">My Payment History</h1>
      <p className="text-gray-600 mb-8">View your previous certificate purchases and receipts.</p>

      {/* --- EMPTY STATE --- */}
      {!myPayments || myPayments.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5.5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No purchases yet</h2>
          <p className="text-gray-500 mb-6">You haven't purchased any certificates yet. Take a test to get started!</p>
          <Link to="/quiz" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            Take an IQ Test
          </Link>
        </div>
      ) : (
        /* --- CARD GRID LAYOUT --- */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myPayments.map((p) => (
            <div key={p._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium text-gray-800">{new Date(p.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(p.status)}`}>
                  {p.status}
                </span>
              </div>

              <hr className="my-4 border-gray-100" />

              {/* Card Body - IDs and Gateway */}
              <div className="mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Test ID:</span>
                  <Link to={`/result/${p.result}`} className="text-blue-600 hover:underline font-mono truncate ml-2 max-w-[150px]">
                    {p.result}
                  </Link>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Gateway:</span>
                  <span className="text-gray-700 font-medium">{p.paymentGateway || 'Razorpay'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Transaction ID:</span>
                  <span className="text-gray-400 font-mono truncate ml-2 max-w-[150px]">{p.razorpayOrderId}</span>
                </div>
              </div>

              <hr className="my-4 border-gray-100" />

              {/* Card Footer - Pricing Data */}
              <div className="bg-gray-50 p-3 rounded-lg flex flex-col space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base Price:</span>
                  <span className="text-gray-800 font-medium">
                    {formatCurrency(p.amount, p.paymentGateway === 'Stripe' ? 'USD' : 'INR')}
                  </span>
                </div>
                
                {/* Only show the local charged amount if it exists and payment was successful */}
                {p.status === 'Success' && p.actualAmount && (
                  <div className="flex justify-between text-base mt-1">
                    <span className="text-gray-800 font-bold">Total Paid:</span>
                    <span className="text-blue-700 font-bold">
                      {formatCurrency(p.actualAmount, p.actualCurrency)}
                    </span>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPaymentHistory;