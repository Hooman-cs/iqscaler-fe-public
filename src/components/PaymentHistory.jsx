import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentHistory } from '../slices/paymentSlice';

const PaymentHistory = () => {
  const dispatch = useDispatch();
  const { payments, loading, error } = useSelector((state) => state.payment);

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

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">User</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Date & Time</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Order ID</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments.map((p) => (
            <tr key={p._id} className="hover:bg-gray-50 text-sm">
              <td className="px-6 py-4 font-medium text-gray-900">{p.user?.username || 'N/A'}</td>
              <td className="px-6 py-4 text-gray-500">{new Date(p.createdAt).toLocaleString()}</td>
              <td className="px-6 py-4">₹{p.amount}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(p.status)}`}>
                  {p.status}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-400 font-mono text-xs">{p.razorpayOrderId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;