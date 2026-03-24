import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle, FaExclamationTriangle, FaFileDownload, FaSearch } from 'react-icons/fa';

const publicApi = axios.create({
  baseURL: 'https://iqscaler.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const VerifyCertificateScreen = () => {
  const { id: resultId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    if (!resultId) {
      setError('Invalid result ID for verification.');
      setLoading(false);
      return;
    }
    
    const fetchCertificate = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await publicApi.get(`/certificates/verify/${resultId}`, {
          responseType: 'blob',
        });
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (err) {
        const message = err.response?.data?.message || 'Verification failed. Certificate may not exist or is not purchased.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
    
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [resultId]);

  // --- RENDERING COMPONENTS ---

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="relative">
            <FaSearch className="text-5xl text-blue-200 animate-pulse" />
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mt-6">Verifying Document...</h1>
        <p className="text-gray-500 mt-2 max-w-xs mx-auto">Connecting to IQ Scaler secure database to validate this achievement.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 border-2 border-red-200 p-8 rounded-3xl max-w-md w-full text-center shadow-sm">
          <FaExclamationTriangle className="text-5xl text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-700 mb-2">Verification Failed</h1>
          <p className="text-red-600 font-medium mb-6">{error}</p>
          <div className="text-sm text-gray-500 border-t border-red-100 pt-4">
            If you believe this is an error, please contact support or try scanning the QR code again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Success Header */}
      <div className="bg-white border-b px-4 py-8 text-center shadow-sm">
        <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 uppercase tracking-tight">
          Official Verification
        </h1>
        <p className="text-green-700 font-semibold mt-1">Status: Genuineness Confirmed</p>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          
          {/* Mobile Fallback View (Shown on small screens) */}
          <div className="md:hidden p-6 text-center bg-blue-50">
             <p className="text-sm text-gray-600 mb-4">
                Mobile browsers may not display PDF previews. Use the button below to view the official document.
             </p>
             <a 
                href={pdfUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform"
             >
                <FaFileDownload /> View Full Certificate
             </a>
          </div>

          {/* PDF Viewer (Responsive Height) */}
          <div className="w-full h-[60vh] md:h-[800px] bg-gray-100 relative">
            {pdfUrl && (
              <iframe 
                src={`${pdfUrl}#view=FitH`} // Opens PDF fitted to width
                title={`Verified Certificate ${resultId}`}
                className="w-full h-full"
                frameBorder="0"
              >
                <div className="p-10 text-center">
                    <p>Your device cannot preview this PDF directly.</p>
                    <a href={pdfUrl} className="text-blue-600 underline">Download instead</a>
                </div>
              </iframe>
            )}
          </div>

          {/* Footer Info */}
          <div className="p-6 bg-gray-50 border-t text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Verification ID</p>
                <p className="text-sm font-mono text-gray-700 break-all">{resultId}</p>
            </div>
            <button 
                onClick={() => window.print()}
                className="hidden md:flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition"
            >
                Print Verification
            </button>
          </div>
        </div>
        
        <p className="mt-8 text-center text-xs text-gray-400 leading-relaxed px-4">
            This verification page is an automated service provided by IQ Scaler. 
            The certificate above is cryptographically linked to a unique test result in our database.
        </p>
      </div>
    </div>
  );
};

export default VerifyCertificateScreen;