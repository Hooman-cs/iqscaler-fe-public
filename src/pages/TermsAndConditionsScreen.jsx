// client/src/pages/TermsAndConditionsScreen.jsx
 
import React from 'react';

const TermsAndConditionsScreen = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-gray-700 leading-relaxed">
      <h1 className="text-4xl font-bold text-blue-700 border-b-2 border-gray-200 pb-3 mb-8 text-center">
        Terms and Conditions of Use for IQScaler.com
      </h1>
      <p className="text-sm text-gray-500 mb-8 text-center">
        Last Updated: <b>December 2025</b>
      </p>

      {/* --- Section 1: Acceptance of Terms --- */}
      <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mt-8 mb-4">
        1. Acceptance of Terms
      </h2>
      <p className="mb-6">
        By creating an account and using the <b>IQScaler.com</b> service, you confirm that you are over the age of <b>18</b> or have received permission from a parent or legal guardian.
      </p>

      {/* --- Section 2: The IQ Test and Disclaimer --- */}
      <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mt-8 mb-4">
        2. The IQ Test and Disclaimer
      </h2>
      <ul className="list-disc list-inside space-y-3 pl-4 mb-6">
        <li>
          <b>Non-Professional Assessment:</b> The IQ test provided on IQScaler.com is for <b>entertainment, general interest, and self-assessment purposes only</b>. The results and any associated certificate are not intended to be a substitute for, and should not be used in place of, professional psychological or clinical evaluations.
        </li>
        <li>
          <b>Accuracy:</b> We strive for accuracy, but we make <b>no guarantee or warranty</b> regarding the completeness, accuracy, or suitability of the test questions or results for any particular purpose.
        </li>
      </ul>

      {/* --- Section 3: Account Registration and Responsibilities --- */}
      <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mt-8 mb-4">
        3. Account Registration and Responsibilities
      </h2>
      <ul className="list-disc list-inside space-y-3 pl-4 mb-6">
        <li>You are responsible for maintaining the <b>confidentiality</b> of your account password and for all activities that occur under your account.</li>
        <li>You agree to provide <b>accurate and complete information</b> during registration.</li>
        <li>We reserve the right to suspend or terminate your account if any information provided is found to be inaccurate, incomplete, or if you violate these Terms.</li>
      </ul>

      {/* --- Section 4: Intellectual Property Rights --- */}
      <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mt-8 mb-4">
        4. Intellectual Property Rights
      </h2>
      <ul className="list-disc list-inside space-y-3 pl-4 mb-6">
        <li>
          <b>Our Content:</b> All content on IQScaler.com, including the test design, test questions, scoring methodology, text, graphics, logos, and the unique ID system, is the property of IQScaler.com and is protected by international copyright laws.
        </li>
        <li>
          <b>Restrictions:</b> You are prohibited from <b>copying, reproducing, distributing, modifying, or reverse-engineering</b> any part of the test or website content without explicit written permission from IQScaler.com.
        </li>
      </ul>

      {/* --- Section 5: Certificate Purchase and Refund Policy --- */}
      <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mt-8 mb-4">
        5. Certificate Purchase and Refund Policy
      </h2>
      <ul className="list-disc list-inside space-y-3 pl-4 mb-6">
        <li><b>Payment:</b> Certificate purchase requires payment via the available third-party payment processors. You agree to pay all charges and fees associated with your purchase.</li>
        <li><b>Digital Product:</b> The IQScaler Certificate is a digital product delivered upon payment confirmation.</li>
        <li>
          <b>Refunds:</b> Due to the instant delivery and digital nature of the certificate, all sales are <b>final and non-refundable</b> once the certificate has been generated and delivered to your account.
        </li>
      </ul>

      {/* --- Section 6: Limitation of Liability --- */}
      <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mt-8 mb-4">
        6. Limitation of Liability
      </h2>
      <p className="bg-red-50 border-l-4 border-red-500 p-4 italic">
        IQSacler.com, its directors, employees, or affiliates will not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use or inability to use the service, including the reliance on the test results.
      </p>
    </div>
  );
};

export default TermsAndConditionsScreen;