// client/src/pages/ResultScreen.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getResultDetails, setResultDetails } from '../slices/resultSlice'; 
import api from '../utils/api'; // Import authenticated API instance

const ResultScreen = () => {
 const { id: resultId } = useParams();
 const dispatch = useDispatch();
 
 const { resultDetails, loading, error } = useSelector((state) => state.result);
 
 const [purchaseLoading, setPurchaseLoading] = useState(false);
 const [purchaseError, setPurchaseError] = useState(null);
 const [displayPrice, setDisplayPrice] = useState(null);

 useEffect(() => {
  if (resultId) {
   dispatch(getResultDetails(resultId));
  }
 }, [dispatch, resultId]);

// --- SHARING LOGIC ---
  //   By using window.location.origin, the code automatically detects where it is running:
  //1. If you are testing on your computer: It will result in http://localhost:5173/verify/123.
  //2. If you have deployed to the web: It will automatically change to https://yourdomain.com/verify/123
  //   Replace 'https://yourdomain.com' with your actual production URL

  const shareUrl = `${window.location.origin}/verify/${resultId}`;

  const shareText = `I just scored ${resultDetails?.totalScore} on my IQ Test! Check out my certificate here:`;
  
  const socialLinks = [
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: '#1877F2',
      icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    },
    {
      name: 'X',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      color: '#000000',
      icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: '#0077b5',
      icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.93-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.13-.92 2.06-2.06 2.06zM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/></svg>
    },
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      color: '#25D366',
      icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    },
    {
      name: 'Instagram',
      url: '#', // We will handle this with an onClick instead
      color: '#E4405F',
      icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
    }
  ];

 const calculatePercentage = (correct, total) => {
  return total > 0 ? ((correct / total) * 100).toFixed(1) : 0;
 };
 
 // --- HANDLERS FOR CERTIFICATE ACTIONS ---

 // NEW HANDLER: For initiating and verifying the RazorPay purchase
 const handlePurchaseCertificate = async () => {
  if (purchaseLoading || resultDetails.certificatePurchased) return;
  setPurchaseLoading(true);
  setPurchaseError(null);

  // Check for RazorPay script. (Assumes <script src="https://checkout.razorpay.com/v1/checkout.js"></script> is in index.html)
  if (!window.Razorpay) {
   alert('RazorPay script not loaded. Cannot initiate payment. Please check your HTML setup.');
   setPurchaseLoading(false);
   return;
  }
  
  try {
   // 1. Get the RazorPay Order ID from your backend
   const { data } = await api.post('/payments/create-order', { resultId });

   // RazorPay amounts are in the smallest currency unit (e.g., paise for INR)
   setDisplayPrice(data.amount / 100); 

   // 2. Configure the RazorPay Checkout Options
   const options = {
    key: data.keyId,
    amount: data.amount,
    currency: data.currency,
    name: 'IQ Testing Platform',
    description: `Certificate for Test ID: ${resultId}`,
    order_id: data.orderId,
    handler: async function (response) {
     // This function runs on SUCCESSFUL payment
     setPurchaseLoading(true); // Re-engage loading state during verification
     try {
      // 3. Send payment details to your backend for signature verification
      const verifyData = {
       razorpay_order_id: response.razorpay_order_id,
       razorpay_payment_id: response.razorpay_payment_id,
       razorpay_signature: response.razorpay_signature,
       resultId: resultId, // Pass resultId back to link payment to certificate
      };
     
      const { data: verificationData } = await api.post('/payments/verify', verifyData);

      alert('Payment successful! Certificate access granted.');

      // CRITICAL: Update Redux state with the new result details object
      if (verificationData.resultDetails) {
       dispatch(setResultDetails(verificationData.resultDetails)); 
      }

     } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Unknown verification error.';
      setPurchaseError(`Verification Failed: ${errorMsg}`);
      console.error('Verification Error:', err.response?.data || err);
     } finally {
      setPurchaseLoading(false);
     }
    },
    prefill: {
     name: data.userName,
     email: data.userEmail,
     contact: '', 
    },
    notes: { resultId: resultId },
    theme: { color: '#3b82f6' }, // Taildwind blue-500 equivalent
   };

   // 4. Open the RazorPay Checkout Widget
const rzp = new window.Razorpay(options);

rzp.on('payment.failed', async function (response) {
  setPurchaseError(response.error.description);
  // NOTIFY BACKEND OF FAILURE
  try {
    await api.put('/payments/fail', { orderId: options.order_id });
  } catch (err) {
    console.error("Failed to sync failure status", err);
  }
  setPurchaseLoading(false);
});
//    const rzp = new window.Razorpay(options);
//    rzp.on('payment.failed', function (response) {
//     setPurchaseError(response.error.description);
//     console.error('Payment Failed:', response.error);
//     setPurchaseLoading(false);
//    });
   rzp.open();

  } catch (err) {
   // Handles errors before the widget opens (e.g., order creation failure)
   const errorMsg = err.response?.data?.message || 'Failed to create payment order.';
   setPurchaseError(errorMsg);
   console.error(err);
   setPurchaseLoading(false);
  }
 };

 // Handler for making the authenticated API call for direct DOWNLOAD
 const handleDownloadCertificate = async (e) => {
   e.preventDefault(); 
   if (!resultId) return;
   
   try {
     // Note: The download request does NOT include the 'preview=true' query
     const response = await api.get(`/certificates/${resultId}`, {
       responseType: 'blob', 
     });

     // Download logic (forces download via Content-Disposition: attachment)
     const blob = new Blob([response.data], { type: 'application/pdf' });
     const url = window.URL.createObjectURL(blob);
     const link = document.createElement('a');
     link.href = url;
     link.setAttribute('download', `Certificate-${resultId}.pdf`); 
     
     document.body.appendChild(link);
     link.click();
     link.remove();
     window.URL.revokeObjectURL(url); 

   } catch (error) {
     const errorMessage = error.response?.data?.message || 'Failed to download certificate.';
     console.error('Certificate Download Failed:', error);
     alert(errorMessage);
   }
 };

 // Handler for PREVIEWING the certificate (opens inline in new tab)
 const handlePreviewCertificate = () => {
   if (!resultId) return;

   try {
     // Perform the authenticated request to get the PDF blob, requesting the inline header
     api.get(`/certificates/${resultId}?preview=true`, {
       responseType: 'blob',
     }).then(response => {
       const blob = new Blob([response.data], { type: 'application/pdf' });
       const url = URL.createObjectURL(blob);
       window.open(url, '_blank'); // Open the blob URL in a new tab
     }).catch(error => {
       const errorMessage = error.response?.data?.message || 'Failed to preview certificate.';
       alert(errorMessage);
       console.error('Preview Failed:', error);
     });

   } catch (error) {
     alert('Failed to initiate preview request.', error);
   }
 };
 // --- END HANDLERS ---
 
 if (loading) return <div className="p-6 text-center text-blue-600 font-medium">Loading result...</div>;
 if (error) return <div className="p-6 text-red-600 text-center font-medium border border-red-300 bg-red-50 mx-auto max-w-lg">Error loading result: {error}</div>;
 if (!resultDetails) return <div className="p-6 text-center text-gray-700">Result not found.</div>;

 const scorePercentage = calculatePercentage(resultDetails.correctAnswers, resultDetails.questionsAttempted);

 return (
  <div className="p-6 max-w-2xl mx-auto my-6 bg-white rounded-xl shadow-2xl border border-gray-100 text-center">
   <h1 className="text-3xl font-bold text-blue-600 border-b-2 border-gray-200 pb-3 mb-6">
      Test Result Details
    </h1>
   
   <div className="mb-6 space-y-2">
    <p className="text-xl font-bold text-gray-700">
        Total Score: <span className="text-green-600">{resultDetails.totalScore}</span>
      </p>
    <p className="text-lg text-gray-600">
        Correct Answers: {resultDetails.correctAnswers} / {resultDetails.questionsAttempted}
      </p>
    <p className="text-2xl font-extrabold">
        Percentage: <span className="text-yellow-600">{scorePercentage}%</span>
      </p>
   </div>

   {/* Certificate Section */}
   <div className="border-t border-dashed border-gray-400 pt-6">
    <h2>Certificate Status</h2>
    
    {/* Purchase Error Display */}
    {purchaseError && (
        <p className="text-red-700 bg-red-100 p-2 rounded-md mb-3 font-medium">
          Error: {purchaseError}
        </p>
      )}
    
    {purchaseLoading && (
        <p className="text-orange-600 font-medium mb-3 animate-pulse">
          {displayPrice ? `Waiting for payment of INR ${displayPrice.toFixed(2)}...` : 'Initiating payment order...'}
        </p>
      )}

    {/* Price Display (only before purchase) */}
    {displayPrice && !resultDetails.certificatePurchased && 
        <p className="text-xl font-bold text-red-600 mb-4">
          Certificate Price: INR {displayPrice.toFixed(2)}
        </p>
    }

    {resultDetails.certificatePurchased ? ( 
      <>
        <p className="text-green-600 font-bold text-lg mb-4">
            Certificate successfully purchased!
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <button 
            onClick={handlePreviewCertificate} // PREVIEW BUTTON
            className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-150 shadow-md"
          >
            Preview Certificate
          </button>
          <button 
            onClick={handleDownloadCertificate} // DOWNLOAD BUTTON
            className="py-2 px-4 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition duration-150 shadow-md"
          >
            Download Certificate
          </button>
        </div>
        {/* NEW SHARE SECTION */}

            <div className="mt-8 pt-6 border-t border-gray-100">

              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Share your achievement</p>

              <div className="flex justify-center gap-6">
  {socialLinks.map((social) => (
    <a
      key={social.name}
      href={social.url}
      target={social.name === 'Instagram' ? '_self' : '_blank'} // Don't open new tab for Instagram
      rel="noopener noreferrer"
      className="transition-transform hover:scale-110 cursor-pointer"
      style={{ color: social.color }}
      title={social.name === 'Instagram' ? 'Copy link for Instagram' : `Share on ${social.name}`}
      onClick={(e) => {
        if (social.name === 'Instagram') {
          e.preventDefault();
          navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
          alert('Link & Message copied to clipboard! You can now paste it on Instagram.');
        }
      }}
    >
      {social.icon}
    </a>
  ))}
</div>

            </div>
      </>
    ) : (
      <>
        <p className="text-gray-600 mb-4">Certificate available for purchase.</p>
        <button 
          onClick={handlePurchaseCertificate} 
          disabled={purchaseLoading}
          className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {purchaseLoading ? 'Processing...' : 'Purchase Certificate'}
        </button>
      </>
    )}
   </div>

   <div className="mt-8 pt-4 border-t border-gray-200">
     <Link to='/history' className="text-blue-600 hover:text-blue-800 font-semibold transition duration-150">
       &larr; Back to History
     </Link>
   </div>
  </div>
 );
};

export default ResultScreen;






// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, Link } from 'react-router-dom';
// import { getResultDetails, setResultDetails } from '../slices/resultSlice'; 
// import api from '../utils/api'; // Import authenticated API instance

// const ResultScreen = () => {
//  const { id: resultId } = useParams();
//  const dispatch = useDispatch();
//  
//  const { resultDetails, loading, error } = useSelector((state) => state.result);
//  
//  const [purchaseLoading, setPurchaseLoading] = useState(false);
//  const [purchaseError, setPurchaseError] = useState(null);
//  const [displayPrice, setDisplayPrice] = useState(null);

//  useEffect(() => {
//   if (resultId) {
//    dispatch(getResultDetails(resultId));
//   }
//  }, [dispatch, resultId]);

// // --- SHARING LOGIC ---
//   //   By using window.location.origin, the code automatically detects where it is running:
//   //1. If you are testing on your computer: It will result in http://localhost:5173/verify/123.
//   //2. If you have deployed to the web: It will automatically change to https://yourdomain.com/verify/123
//   //   Replace 'https://yourdomain.com' with your actual production URL

//   const shareUrl = `${window.location.origin}/verify/${resultId}`;

//   const shareText = `I just scored ${resultDetails?.totalScore} on my IQ Test! Check out my certificate here:`;
  
//   const socialLinks = [
//     {
//       name: 'Facebook',
//       url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
//       color: '#1877F2',
//       icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
//     },
//     {
//       name: 'X',
//       url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
//       color: '#000000',
//       icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
//     },
//     {
//       name: 'LinkedIn',
//       url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
//       color: '#0077b5',
//       icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.93-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.13-.92 2.06-2.06 2.06zM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/></svg>
//     },
//     {
//       name: 'WhatsApp',
//       url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
//       color: '#25D366',
//       icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
//     },
//     {
//       name: 'Instagram',
//       url: '#', // We will handle this with an onClick instead
//       color: '#E4405F',
//       icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
//     }
//   ];

//  const calculatePercentage = (correct, total) => {
//   return total > 0 ? ((correct / total) * 100).toFixed(1) : 0;
//  };
//  
//  // --- HANDLERS FOR CERTIFICATE ACTIONS ---

//  // NEW HANDLER: For initiating and verifying the RazorPay purchase
//  const handlePurchaseCertificate = async () => {
//   if (purchaseLoading || resultDetails.certificatePurchased) return;
//   setPurchaseLoading(true);
//   setPurchaseError(null);

//   // Check for RazorPay script. (Assumes <script src="https://checkout.razorpay.com/v1/checkout.js"></script> is in index.html)
//   if (!window.Razorpay) {
//    alert('RazorPay script not loaded. Cannot initiate payment. Please check your HTML setup.');
//    setPurchaseLoading(false);
//    return;
//   }
//   
//   try {
//    // 1. Get the RazorPay Order ID from your backend
//    const { data } = await api.post('/payments/create-order', { resultId });

//    // RazorPay amounts are in the smallest currency unit (e.g., paise for INR)
//    setDisplayPrice(data.amount / 100); 

//    // 2. Configure the RazorPay Checkout Options
//    const options = {
//     key: data.keyId,
//     amount: data.amount,
//     currency: data.currency,
//     name: 'IQ Testing Platform',
//     description: `Certificate for Test ID: ${resultId}`,
//     order_id: data.orderId,
//     handler: async function (response) {
//      // This function runs on SUCCESSFUL payment
//      setPurchaseLoading(true); // Re-engage loading state during verification
//      try {
//       // 3. Send payment details to your backend for signature verification
//       const verifyData = {
//        razorpay_order_id: response.razorpay_order_id,
//        razorpay_payment_id: response.razorpay_payment_id,
//        razorpay_signature: response.razorpay_signature,
//        resultId: resultId, // Pass resultId back to link payment to certificate
//       };
//      
//       const { data: verificationData } = await api.post('/payments/verify', verifyData);

//       alert('Payment successful! Certificate access granted.');

//       // CRITICAL: Update Redux state with the new result details object
//       if (verificationData.resultDetails) {
//        dispatch(setResultDetails(verificationData.resultDetails)); 
//       }

//      } catch (err) {
//       const errorMsg = err.response?.data?.message || err.message || 'Unknown verification error.';
//       setPurchaseError(`Verification Failed: ${errorMsg}`);
//       console.error('Verification Error:', err.response?.data || err);
//      } finally {
//       setPurchaseLoading(false);
//      }
//     },
//     prefill: {
//      name: data.userName,
//      email: data.userEmail,
//      contact: '', 
//     },
//     notes: { resultId: resultId },
//     theme: { color: '#3b82f6' }, // Taildwind blue-500 equivalent
//    };

//    // 4. Open the RazorPay Checkout Widget
//    const rzp = new window.Razorpay(options);
//    rzp.on('payment.failed', function (response) {
//     setPurchaseError(response.error.description);
//     console.error('Payment Failed:', response.error);
//     setPurchaseLoading(false);
//    });
//    rzp.open();

//   } catch (err) {
//    // Handles errors before the widget opens (e.g., order creation failure)
//    const errorMsg = err.response?.data?.message || 'Failed to create payment order.';
//    setPurchaseError(errorMsg);
//    console.error(err);
//    setPurchaseLoading(false);
//   }
//  };

//  // Handler for making the authenticated API call for direct DOWNLOAD
//  const handleDownloadCertificate = async (e) => {
//    e.preventDefault(); 
//    if (!resultId) return;
//    
//    try {
//      // Note: The download request does NOT include the 'preview=true' query
//      const response = await api.get(`/certificates/${resultId}`, {
//        responseType: 'blob', 
//      });

//      // Download logic (forces download via Content-Disposition: attachment)
//      const blob = new Blob([response.data], { type: 'application/pdf' });
//      const url = window.URL.createObjectURL(blob);
//      const link = document.createElement('a');
//      link.href = url;
//      link.setAttribute('download', `Certificate-${resultId}.pdf`); 
//      
//      document.body.appendChild(link);
//      link.click();
//      link.remove();
//      window.URL.revokeObjectURL(url); 

//    } catch (error) {
//      const errorMessage = error.response?.data?.message || 'Failed to download certificate.';
//      console.error('Certificate Download Failed:', error);
//      alert(errorMessage);
//    }
//  };

//  // Handler for PREVIEWING the certificate (opens inline in new tab)
//  const handlePreviewCertificate = () => {
//    if (!resultId) return;

//    try {
//      // Perform the authenticated request to get the PDF blob, requesting the inline header
//      api.get(`/certificates/${resultId}?preview=true`, {
//        responseType: 'blob',
//      }).then(response => {
//        const blob = new Blob([response.data], { type: 'application/pdf' });
//        const url = URL.createObjectURL(blob);
//        window.open(url, '_blank'); // Open the blob URL in a new tab
//      }).catch(error => {
//        const errorMessage = error.response?.data?.message || 'Failed to preview certificate.';
//        alert(errorMessage);
//        console.error('Preview Failed:', error);
//      });

//    } catch (error) {
//      alert('Failed to initiate preview request.', error);
//    }
//  };
//  // --- END HANDLERS ---
//  
//  if (loading) return <div className="p-6 text-center text-blue-600 font-medium">Loading result...</div>;
//  if (error) return <div className="p-6 text-red-600 text-center font-medium border border-red-300 bg-red-50 mx-auto max-w-lg">Error loading result: {error}</div>;
//  if (!resultDetails) return <div className="p-6 text-center text-gray-700">Result not found.</div>;

//  const scorePercentage = calculatePercentage(resultDetails.correctAnswers, resultDetails.questionsAttempted);

//  return (
//   <div className="p-6 max-w-2xl mx-auto my-6 bg-white rounded-xl shadow-2xl border border-gray-100 text-center">
//    <h1 className="text-3xl font-bold text-blue-600 border-b-2 border-gray-200 pb-3 mb-6">
//       Test Result Details
//     </h1>
//    
//    <div className="mb-6 space-y-2">
//     <p className="text-xl font-bold text-gray-700">
//         Total Score: <span className="text-green-600">{resultDetails.totalScore}</span>
//       </p>
//     <p className="text-lg text-gray-600">
//         Correct Answers: {resultDetails.correctAnswers} / {resultDetails.questionsAttempted}
//       </p>
//     <p className="text-2xl font-extrabold">
//         Percentage: <span className="text-yellow-600">{scorePercentage}%</span>
//       </p>
//    </div>

//    {/* Certificate Section */}
//    <div className="border-t border-dashed border-gray-400 pt-6">
//     <h2>Certificate Status</h2>
//     
//     {/* Purchase Error Display */}
//     {purchaseError && (
//         <p className="text-red-700 bg-red-100 p-2 rounded-md mb-3 font-medium">
//           Error: {purchaseError}
//         </p>
//       )}
//     
//     {purchaseLoading && (
//         <p className="text-orange-600 font-medium mb-3 animate-pulse">
//           {displayPrice ? `Waiting for payment of INR ${displayPrice.toFixed(2)}...` : 'Initiating payment order...'}
//         </p>
//       )}

//     {/* Price Display (only before purchase) */}
//     {displayPrice && !resultDetails.certificatePurchased && 
//         <p className="text-xl font-bold text-red-600 mb-4">
//           Certificate Price: INR {displayPrice.toFixed(2)}
//         </p>
//     }

//     {resultDetails.certificatePurchased ? ( 
//       <>
//         <p className="text-green-600 font-bold text-lg mb-4">
//             Certificate successfully purchased!
//         </p>
//         <div className="flex justify-center gap-4 mt-4">
//           <button 
//             onClick={handlePreviewCertificate} // PREVIEW BUTTON
//             className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-150 shadow-md"
//           >
//             Preview Certificate
//           </button>
//           <button 
//             onClick={handleDownloadCertificate} // DOWNLOAD BUTTON
//             className="py-2 px-4 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition duration-150 shadow-md"
//           >
//             Download Certificate
//           </button>
//         </div>
//         {/* NEW SHARE SECTION */}

//             <div className="mt-8 pt-6 border-t border-gray-100">

//               <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Share your achievement</p>

//               <div className="flex justify-center gap-6">
//   {socialLinks.map((social) => (
//     <a
//       key={social.name}
//       href={social.url}
//       target={social.name === 'Instagram' ? '_self' : '_blank'} // Don't open new tab for Instagram
//       rel="noopener noreferrer"
//       className="transition-transform hover:scale-110 cursor-pointer"
//       style={{ color: social.color }}
//       title={social.name === 'Instagram' ? 'Copy link for Instagram' : `Share on ${social.name}`}
//       onClick={(e) => {
//         if (social.name === 'Instagram') {
//           e.preventDefault();
//           navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
//           alert('Link & Message copied to clipboard! You can now paste it on Instagram.');
//         }
//       }}
//     >
//       {social.icon}
//     </a>
//   ))}
// </div>

//             </div>
//       </>
//     ) : (
//       <>
//         <p className="text-gray-600 mb-4">Certificate available for purchase.</p>
//         <button 
//           onClick={handlePurchaseCertificate} 
//           disabled={purchaseLoading}
//           className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {purchaseLoading ? 'Processing...' : 'Purchase Certificate'}
//         </button>
//       </>
//     )}
//    </div>

//    <div className="mt-8 pt-4 border-t border-gray-200">
//      <Link to='/history' className="text-blue-600 hover:text-blue-800 font-semibold transition duration-150">
//        &larr; Back to History
//      </Link>
//    </div>
//   </div>
//  );
// };

// export default ResultScreen;