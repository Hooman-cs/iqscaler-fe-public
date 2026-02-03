// client/src/pages/RefundPolicyScreen.jsx

import React from 'react';

const RefundPolicyScreen = () => {
  const supportEmail = 'support@iqscaler.com';
  const companyName = 'JDPC Global Private Limited';

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-gray-700 leading-relaxed">
      <h1 className="text-4xl font-bold text-blue-700 border-b-2 border-gray-200 pb-3 mb-8 text-center">
        Purchase, Shipping, and Refund Policy
      </h1>
      <p className="text-sm text-gray-500 mb-8 text-center">
        Last Updated: <b>December 2025</b>
      </p>

      <p className="mb-6">
        Thank you for choosing <b>IQScaler.com</b> (owned and operated by <b>{companyName}</b>). We strive to provide a seamless experience for our digital assessments and certifications. Please read this policy carefully before making a purchase.
      </p>

      {/* --- Section 1: Purchase Policy --- */}
      <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mt-8 mb-4">
        1. Purchase Policy
      </h2>
      <ul className="list-disc list-inside space-y-3 pl-4 mb-6">
        <li><b>Pricing:</b> All prices are listed clearly on the payment page. We reserve the right to change prices at any time without prior notice.</li>
        <li><b>Payment Methods:</b> We accept major credit cards, debit cards, and other digital payment methods secured by our third-party payment processors.</li>
        <li><b>Taxes:</b> Applicable taxes will be calculated and displayed at checkout based on your location.</li>
      </ul>

      {/* --- Section 2: Shipping and Delivery Policy --- */}
      <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mt-8 mb-4">
        2. Shipping and Delivery Policy
      </h2>
      <p className="mb-4">
        Since IQScaler.com provides digital services and products, there is no physical shipping involved.
      </p>
      <ul className="list-disc list-inside space-y-3 pl-4 mb-6">
        <li><b>Digital Delivery:</b> Upon successful payment, your IQ Test results and Digital Certificate are generated immediately and delivered to your user dashboard.</li>
        <li><b>Email Confirmation:</b> You will also receive a confirmation email containing your payment receipt and a link to your results.</li>
        <li><b>Delivery Timeline:</b> Delivery is instant. If you do not receive your results within 15 minutes of payment, please check your spam folder or contact support.</li>
      </ul>

      {/* --- Section 3: Refund and Cancellation Policy --- */}
      <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mt-8 mb-4">
        3. Refund and Cancellation Policy
      </h2>
      <p className="mb-4">
        Due to the nature of our digital products (instant access to test results and certificates), <b>all sales are final and non-refundable</b> once the service has been delivered.
      </p>
      <ul className="list-disc list-inside space-y-3 pl-4 mb-6">
        <li><b>Non-Refundable:</b> We do not offer refunds for "change of mind" or if you are dissatisfied with your IQ score. The fee covers the scoring service and platform maintenance.</li>
        <li><b>Exceptions:</b> Refunds may be considered only in cases of:
          <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
            <li>Duplicate payments for the same test due to technical error.</li>
            <li>Failure of the system to generate a result after successful payment, provided our technical team cannot resolve the issue.</li>
          </ul>
        </li>
      </ul>

      <p className="bg-blue-50 border-l-4 border-blue-500 p-4 italic">
        If you experience any technical issues or believe you have a valid claim for a refund under the exceptions above, please contact us at <a href={`mailto:${supportEmail}`} className="text-blue-600 hover:text-blue-800 font-semibold">{supportEmail}</a>.
      </p>
    </div>
  );
};

export default RefundPolicyScreen;