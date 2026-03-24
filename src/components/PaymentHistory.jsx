// client/src/components/PaymentHistory.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentHistory } from '../slices/paymentSlice';

// Helper function to format currency dynamically
  const formatCurrency = (amount, currencyCode = 'INR') => {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
      }).format(amount);
    } catch {
      // Fallback just in case a weird currency code is passed
      return `${currencyCode} ${amount}`; 
    }
  };

const PaymentHistory = () => {
  const dispatch = useDispatch();
  const { payments, loading, error } = useSelector((state) => state.payment);

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust rows per page here

  useEffect(() => {
    dispatch(fetchPaymentHistory());
  }, [dispatch]);

  const getStatusColor = (status) => {
    if (status === 'Success') return 'text-green-600 bg-green-100';
    if (status === 'Failed') return 'text-red-600 bg-red-100';
    return 'text-yellow-600 bg-yellow-100';
  };

  if (loading) return <p className="p-4">Loading transactions...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!payments || payments.length === 0) return <p className="p-4 text-gray-500">No payment history found.</p>;

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayments = payments.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg pb-4 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 border-b border-gray-200 text-left text-xs uppercase tracking-wider text-gray-500">
          <tr>
            <th className="px-6 py-3">User</th>
            <th className="px-6 py-3">Result ID</th>
            <th className="px-6 py-3">Base Amount</th>
            <th className="px-6 py-3 text-blue-600 font-bold">Paid Amount</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Gateway</th>
            <th className="px-6 py-3">Transaction ID</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white text-sm">
          {currentPayments.map((p) => (
            <tr key={p._id} className="hover:bg-gray-50 transition duration-150">
              <td className="px-6 py-4">
                <div className="font-medium text-gray-800">{p.user?.username || 'N/A'}</div>
                <div className="text-xs text-gray-500">{p.user?.email || 'N/A'}</div>
              </td>
              <td className="px-6 py-4 text-gray-600 font-mono text-xs">{p.result}</td>
              
              {/* BASE AMOUNT */}
              <td className="px-6 py-4 font-semibold text-gray-700">
                {/* We assume base is INR if paymentGateway is Razorpay, else USD */}
                {formatCurrency(p.amount, p.paymentGateway === 'Stripe' ? 'USD' : 'INR')}
              </td>

              {/* NEW: LOCAL AMOUNT CHARGED BY GATEWAY */}
              <td className="px-6 py-4 font-bold text-blue-700">
                {p.status === 'Success' && p.actualAmount 
                  ? formatCurrency(p.actualAmount, p.actualCurrency) 
                  : '-'}
              </td>

              <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                {new Date(p.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(p.status)}`}>
                  {p.status}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-600 font-semibold">
                {p.paymentGateway || 'Razorpay'}
              </td>
              <td className="px-6 py-4 text-gray-400 font-mono text-xs">{p.razorpayOrderId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- PAGINATION CONTROLS --- */}
      {payments.length > itemsPerPage && (
        <div className="flex justify-between items-center px-6 pt-2 border-t border-gray-200">
            <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 disabled:opacity-50 transition"
            >
                &larr; Previous Page
            </button>
            
            <span className="text-sm text-gray-600">
                Page <b>{currentPage}</b> of <b>{totalPages}</b>
            </span>
            
            <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 disabled:opacity-50 transition"
            >
                Next Page &rarr;
            </button>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;