// client/src/pages/ResultScreen.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom";
import { getResultDetails, setResultDetails } from "../slices/resultSlice";
import api from "../utils/api"; 

// --- Import PDF.js for client-side image rendering ---
import * as pdfjsLib from 'pdfjs-dist';

// Configure the PDF.js worker safely
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
// -----------------------------------------------------

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      return resolve(true);
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const ResultScreen = () => {
  const { id: resultId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation(); 

  const { resultDetails, loading, error } = useSelector(
    (state) => state.result,
  );

  const { userInfo } = useSelector((state) => state.auth);

  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [purchaseError, setPurchaseError] = useState(null);
  const [displayPrice, setDisplayPrice] = useState(null);
  const [hasFetchedPrice, setHasFetchedPrice] = useState(false);

  const [orderDetails, setOrderDetails] = useState(null);

  const [currency, setCurrency] = useState("INR");
  const [isLocationLoaded, setIsLocationLoaded] = useState(false);
  
  const [shareLoading, setShareLoading] = useState(false);

  useEffect(() => {
    if (resultId) {
      dispatch(getResultDetails(resultId));
    }
  }, [dispatch, resultId]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const timestamp = new Date().getTime();
        const res = await fetch(
          `https://get.geojs.io/v1/ip/country.json?t=${timestamp}`,
        );
        const data = await res.json();

        if (data.country && data.country !== "IN") {
          setCurrency("USD");
        } else {
          setCurrency("INR");
        }
      } catch (err) {
        console.error("Failed to fetch location, defaulting to INR", err);
      } finally {
        setIsLocationLoaded(true);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchPrice = async () => {
      if (
        isLocationLoaded &&
        resultDetails &&
        !resultDetails.certificatePurchased &&
        !hasFetchedPrice
      ) {
        setHasFetchedPrice(true);
        try {
          const { data } = await api.get(
            `/payments/price?currency=${currency}`,
          );
          setDisplayPrice(data.amount / 100);
        } catch (err) {
          console.error("Failed to fetch price on load:", err);
        }
      }
    };
    fetchPrice();
  }, [isLocationLoaded, resultDetails, hasFetchedPrice, currency]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    const verifyStripe = async (sessionId) => {
      setPurchaseLoading(true);
      try {
        const { data } = await api.post("/payments/verify-stripe", {
          sessionId,
          resultId,
        });
        alert("Payment successful! Certificate access granted.");
        if (data.resultDetails) {
          dispatch(setResultDetails(data.resultDetails));
        }
      } catch (err) {
        const errorMsg =
          err.response?.data?.message ||
          err.message ||
          "Unknown verification error.";
        setPurchaseError(`Verification Failed: ${errorMsg}`);
        console.error(err);
      } finally {
        setPurchaseLoading(false);
        window.history.replaceState(null, "", `/result/${resultId}`);
      }
    };

    if (query.get("stripe_success")) {
      const sessionId = query.get("session_id");
      verifyStripe(sessionId);
    } else if (query.get("stripe_canceled")) {
      setPurchaseError("Stripe payment was canceled. Please try again.");
      window.history.replaceState(null, "", `/result/${resultId}`);
    }
  }, [location, resultId, dispatch]);


  const calculatePercentage = (correct, total) => {
    return total > 0 ? ((correct / total) * 100).toFixed(1) : 0;
  };

  const handlePurchaseCertificate = async () => {
    if (purchaseLoading || resultDetails.certificatePurchased) return;
    setPurchaseLoading(true);
    setPurchaseError(null);

    if (currency === "USD") {
      try {
        const response = await api.post("/payments/create-stripe-session", {
          resultId,
        });
        window.location.href = response.data.url;
      } catch (err) {
        const errorMsg =
          err.response?.data?.message || "Failed to initiate Stripe checkout.";
        setPurchaseError(errorMsg);
        console.error(err);
        setPurchaseLoading(false);
      }
      return; 
    }

    const res = await loadRazorpayScript();

    if (!res) {
      alert(
        "RazorPay script not loaded. Cannot initiate payment. Please check your HTML setup.",
      );
      setPurchaseLoading(false);
      return;
    }

    try {
      let data = orderDetails;

      if (!data) {
        const response = await api.post("/payments/create-order", { resultId });
        data = response.data;
        setDisplayPrice(data.amount / 100);
        setOrderDetails(data);
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "IQ Scaler",
        image: "https://www.iqscaler.com/assets/IQlogo-BMR3F13R.webp",
        description: `Certificate for Test ID: ${resultId}`,
        order_id: data.orderId,
        handler: async function (response) {
          setPurchaseLoading(true);
          try {
            const verifyData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              resultId: resultId,
            };

            const { data: verificationData } = await api.post(
              "/payments/verify",
              verifyData,
            );
            alert("Payment successful! Certificate access granted.");
            if (verificationData.resultDetails) {
              dispatch(setResultDetails(verificationData.resultDetails));
            }
          } catch (err) {
            const errorMsg =
              err.response?.data?.message ||
              err.message ||
              "Unknown verification error.";
            setPurchaseError(`Verification Failed: ${errorMsg}`);
            console.error("Verification Error:", err.response?.data || err);
          } finally {
            setPurchaseLoading(false);
            setOrderDetails(null);
          }
        },
        prefill: {
          name: data.userName || "",
          email: data.userEmail || "",
          contact: "",
        },
        notes: { resultId: resultId },
        theme: { color: "#3b82f6" },
        modal: {
          ondismiss: function () {
            setPurchaseLoading(false);
            setPurchaseError("Payment was cancelled.");
            setOrderDetails(null);
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", async function (response) {
        setPurchaseError(response.error.description);
        try {
          await api.put("/payments/fail", { orderId: options.order_id });
        } catch (err) {
          console.error("Failed to sync failure status", err);
        }
        setPurchaseLoading(false);
        setOrderDetails(null);
      });

      rzp.open();
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to create payment order.";
      setPurchaseError(errorMsg);
      console.error(err);
      setPurchaseLoading(false);
      setOrderDetails(null);
    }
  };

  const handleDownloadCertificate = async (e) => {
    e.preventDefault();
    if (!resultId) return;

    try {
      const response = await api.get(`/certificates/${resultId}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Certificate-${resultId}.pdf`);

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to download certificate.";
      console.error("Certificate Download Failed:", error);
      alert(errorMessage);
    }
  };

  const handlePreviewCertificate = () => {
    if (!resultId) return;

    try {
      api
        .get(`/certificates/${resultId}?preview=true`, {
          responseType: "blob",
        })
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank"); 
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message || "Failed to preview certificate.";
          alert(errorMessage);
          console.error("Preview Failed:", error);
        });
    } catch (error) {
      alert("Failed to initiate preview request.", error);
    }
  };


  // =========================================================================
  // --- HYBRID SHARING LOGIC (IMAGE GENERATION + MOBILE/DESKTOP SPLIT) ---
  // =========================================================================

  const shareUrl = `${window.location.origin}/verify/${resultId}`;
  const shareText = `I just scored an IQ of ${resultDetails?.iqScore || resultDetails?.totalScore} on IQ Scaler! Check out my official certificate here:`;

  // 1. REUSABLE HELPER: Converts PDF to Image Blob
  const generateImageBlob = async () => {
    const response = await api.get(`/certificates/${resultId}`, { responseType: 'blob' });
    const arrayBuffer = await response.data.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);
    
    const scale = 2; // High Resolution
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({ canvasContext: context, viewport: viewport }).promise;

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to create image blob"));
      }, 'image/png', 1.0);
    });
  };

  // 2. SHARED HELPER: Downloads Image and Copies Text to Clipboard
  const triggerDownloadAndCopy = async (blob, socialName, socialUrl) => {
    // Download the Image
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${userInfo?.username || 'user'}_IQ_Certificate.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Copy the text
    const shareTextWithUrl = `${shareText} ${shareUrl}`;
    try {
      await navigator.clipboard.writeText(shareTextWithUrl);
      if (socialName) {
        alert(`Success! Image downloaded & caption copied! 📸📝\n\nWe are now opening ${socialName}. Simply attach your downloaded image and paste the caption into your post!`);
        if (socialName !== "Instagram") window.open(socialUrl, "_blank");
      } else {
        alert("Image downloaded and text copied! You can now share it manually.");
      }
    } catch (err) {
      // FIX: Now we are using 'err' by logging it so ESLint is happy!
      console.error("Failed to copy text to clipboard:", err);
      
      if (socialName) {
        alert(`Image downloaded! 📸\n\nWe are now opening ${socialName}. Please attach the downloaded image to your post!`);
        if (socialName !== "Instagram") window.open(socialUrl, "_blank");
      }
    }
  };

  // 3. MOBILE HANDLER: Uses Native Browser Share
  const handleMobileNativeShare = async () => {
    try {
      setShareLoading(true);
      const blob = await generateImageBlob();
      const file = new File([blob], `${userInfo?.username || 'user'}_IQ_Certificate.png`, { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'My Official IQ Certificate',
          text: shareText,
          files: [file]
        });
      } else {
        // Fallback if their specific mobile browser fails
        await triggerDownloadAndCopy(blob, null, null);
      }
    } catch (error) {
      console.error("Error sharing image natively:", error);
      alert("Something went wrong while generating the image. Please try downloading the PDF instead.");
    } finally {
      setShareLoading(false);
    }
  };

  // 4. DESKTOP HANDLER: Intercepts Social Icon Clicks
  const handleDesktopSocialShare = async (e, social) => {
    e.preventDefault();
    try {
      setShareLoading(true);
      const blob = await generateImageBlob();
      await triggerDownloadAndCopy(blob, social.name, social.url);
    } catch (error) {
      console.error("Error sharing to social:", error);
      alert("Something went wrong while generating the image for sharing.");
    } finally {
      setShareLoading(false);
    }
  };

  // Define Desktop Social Links Map
  const socialLinks = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: "#1877F2",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "X",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      color: "#000000",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: "#0077b5",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.93-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.13-.92 2.06-2.06 2.06zM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      color: "#25D366",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "#",
      color: "#E4405F",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
  ];
  // =========================================================================

  if (loading)
    return (
      <div className="p-6 text-center text-blue-600 font-medium">
        Loading result...
      </div>
    );
  if (error)
    return (
      <div className="p-6 text-red-600 text-center font-medium border border-red-300 bg-red-50 mx-auto max-w-lg">
        Error loading result: {error}
      </div>
    );
  if (!resultDetails)
    return (
      <div className="p-6 text-center text-gray-700">Result not found.</div>
    );

  const scorePercentage = calculatePercentage(
    resultDetails.correctAnswers,
    resultDetails.questionsAttempted,
  );

  return (
    <div className="p-6 max-w-2xl mx-auto my-6 bg-white rounded-xl shadow-2xl border border-gray-100 text-center">
      <h1 className="text-3xl font-bold text-blue-600 border-b-2 border-gray-200 pb-3 mb-6">
        Test Result Details
      </h1>

      <div className="mb-6 space-y-2">
        <p className="text-xl font-bold text-gray-700">
          Total Score:{" "}
          <span className="text-green-600">{resultDetails.totalScore}</span>
        </p>
        <p className="text-lg text-gray-600">
          Correct Answers: {resultDetails.correctAnswers} /{" "}
          {resultDetails.questionsAttempted}
        </p>
        <p className="text-2xl font-extrabold">
          Percentage:{" "}
          <span className="text-yellow-600">{scorePercentage}%</span>
        </p>
      </div>

      <div className="border-t border-dashed border-gray-400 pt-6">
        {!resultDetails.certificatePurchased && (
          <p className="text-gray-700 mb-2 text-lg font-bold">
            “Access your Certified IQ Report”
          </p>
        )}

        <h2 className="text-xl font-semibold mb-2">Certificate Status</h2>

        {purchaseError && (
          <p className="text-red-700 bg-red-100 p-2 rounded-md mb-3 font-medium">
            Error: {purchaseError}
          </p>
        )}

        {purchaseLoading && (
          <p className="text-orange-600 font-medium mb-3 animate-pulse">
            {displayPrice
              ? `Waiting for payment of ${currency === "USD" ? "$" : "₹"} ${displayPrice.toFixed(2)}...`
              : "Initiating payment order..."}
          </p>
        )}

        {resultDetails.certificatePurchased ? (
          <>
            <p className="text-green-600 font-bold text-lg mb-4">
              Certificate successfully purchased!
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handlePreviewCertificate} 
                className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-150 shadow-md"
              >
                Preview Certificate
              </button>
              <button
                onClick={handleDownloadCertificate} 
                className="py-2 px-4 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition duration-150 shadow-md"
              >
                Download Certificate
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Share your achievement
              </p>

              {/* 1. MOBILE ONLY: Native Share Button (Hidden on Desktop 'md:hidden') */}
              <div className="flex md:hidden justify-center mb-4">
                <button 
                  onClick={handleMobileNativeShare}
                  disabled={shareLoading}
                  className="py-2 px-6 w-full bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {shareLoading ? (
                     <span className="animate-pulse">Preparing Image...</span>
                  ) : (
                     <>
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                       Share to Social Media
                     </>
                  )}
                </button>
              </div>

              {/* 2. DESKTOP ONLY: Explicit Social Icons (Hidden on Mobile 'hidden md:flex') */}
              <div className="hidden md:flex justify-center gap-6">
                {socialLinks.map((social) => (
                  <button
                    key={social.name}
                    className="transition-transform hover:scale-110 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ color: social.color }}
                    title={`Share Image on ${social.name}`}
                    disabled={shareLoading}
                    onClick={(e) => handleDesktopSocialShare(e, social)}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
              
              {/* Optional tiny loading text for desktop users waiting for the PDF conversion */}
              {shareLoading && <p className="hidden md:block text-xs text-purple-600 mt-3 animate-pulse">Generating high-quality image...</p>}

            </div>
          </>
        ) : (
          <>
            <p className="text-gray-600 mb-4">
              Certificate available for purchase.
            </p>
            {displayPrice && (
              <p>
                Most people never find out their true IQ. Yours is ready —
                certify it for just {currency === "USD" ? "$" : "₹"}
                {displayPrice.toFixed(2)} before it expires.
              </p>
            )}
            <button
              onClick={handlePurchaseCertificate}
              disabled={purchaseLoading}
              className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {purchaseLoading ? "Processing..." : "Purchase Certificate"}
            </button>

            {displayPrice && (
              <p className="text-base font-semibold text-blue-600 mt-3">
                Certificate Price: {currency} {displayPrice.toFixed(2)}
              </p>
            )}
          </>
        )}
      </div>

      <div className="mt-8 pt-4 border-t border-gray-200">
        <Link
          to="/history"
          className="text-blue-600 hover:text-blue-800 font-semibold transition duration-150"
        >
          &larr; Back to History
        </Link>
      </div>
    </div>
  );
};

export default ResultScreen;