// client/src/pages/PrivacyPolicyScreen.jsx

import React from 'react';

const PrivacyPolicyScreen = () => {
  const supportEmail = 'support@iqscaler.com';
  const companyName = 'JDPC Global Private Limited';

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-gray-700 leading-relaxed">
      <h1 className="text-4xl font-bold text-blue-700 border-b-2 border-gray-200 pb-3 mb-8 text-center">
        Privacy Policy for IQScaler.com
      </h1>
      <p className="text-sm text-gray-500 mb-8 text-center">
        Last Updated: <b>December 2025</b>
      </p>

      <p className="mb-6">
        This privacy policy sets out how <b>IQScaler.com</b> (which is owned and operated by <b>{companyName}</b>) uses and protects any information that you give <b>IQScaler.com</b> when you use this website.
      </p>

      <p className="mb-6">
        <b>IQScaler.com</b> is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, you can be assured that it will only be used in accordance with this privacy statement.
      </p>

      {/* --- Section 1: Information We Collect --- */}
      <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mt-8 mb-4">
        1. Information We Collect
      </h2>
      <p className="mb-4">
        We only collect the information necessary to provide our IQ testing service and certificate fulfillment.
      </p>
      
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Data Points Collected
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Purpose
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Account Data</td>
              <td className="px-6 py-4">Name, Unique ID, Email Address, Password (encrypted)</td>
              <td className="px-6 py-4">To register your account, store results securely, and enable recovery.</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Test Data</td>
              <td className="px-6 py-4">Your answers and final score</td>
              <td className="px-6 py-4">To calculate your IQ result and generate certificates.</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Transaction Data</td>
              <td className="px-6 py-4">Payment info (handled by secure 3rd party)</td>
              <td className="px-6 py-4">To process payments for certificate purchases.</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Technical Data</td>
              <td className="px-6 py-4">IP address, browser type, device information</td>
              <td className="px-6 py-4">To maintain site security and prevent fraud.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- Section 2: How We Use Your Information --- */}
      <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mt-8 mb-4">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc list-inside space-y-2 pl-4 mb-6">
        <li><b>To Provide Services:</b> Calculating and displaying your IQ test results.</li>
        <li><b>To Communicate:</b> Sending essential updates regarding your account or certificate status.</li>
        <li><b>To Process Payments:</b> Facilitating secure transactions via our partners.</li>
        <li><b>To Improve Our Services:</b> Analyzing anonymous data to refine test accuracy.</li>
      </ul>

      {/* --- Section 3: Data Storage and Security --- */}
      <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mt-8 mb-4">
        3. Data Storage and Security
      </h2>
      <p className="mb-4">
        We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
      </p>

      {/* --- Section 4: Data Sharing and Disclosure --- */}
      <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mt-8 mb-4">
        4. Data Sharing and Disclosure
      </h2>
      <p className="mb-4">
        We will not sell, distribute, or lease your personal information to third parties unless we have your permission or are required by law to do so.
      </p>

      {/* --- Section 5: International Users and Data Rights --- */}
      <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mt-8 mb-4">
        5. Your Rights
      </h2>
      <p className="mb-4">
        You may request details of personal information which we hold about you. If you believe that any information we are holding on you is incorrect or incomplete, please contact us as soon as possible.
      </p>
      
      <p className="bg-blue-50 border-l-4 border-blue-500 p-4 italic">
        To exercise your rights or for any privacy-related inquiries, please contact <b>{companyName}</b> at <a href={`mailto:${supportEmail}`} className="text-blue-600 hover:text-blue-800 font-semibold">{supportEmail}</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicyScreen;