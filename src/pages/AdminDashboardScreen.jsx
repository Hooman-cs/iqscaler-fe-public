// client/src/pages/AdminDashboardScreen.jsx

import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, deleteQuestion } from '../slices/questionSlice';
import QuestionForm from '../components/QuestionForm'; 
import TestConfigForm from '../components/TestConfigForm';
import UserList from '../components/UserList';
import PaymentHistory from '../components/PaymentHistory';

const AdminDashboardScreen = () => {
  const dispatch = useDispatch();
  const { questions, loading, error, success } = useSelector((state) => state.question);
  const { userInfo } = useSelector((state) => state.auth);

  // State to control the active tab/view: 'questions', 'config', 'users'
  const [activeTab, setActiveTab] = useState('questions'); 
  // State to control question view: 'list', 'create', 'edit'
  const [questionMode, setQuestionMode] = useState('list'); 
  const [questionToEdit, setQuestionToEdit] = useState(null); 

  // --- NEW PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 20; // Define how many items to show per page

  // Fetch questions only when the 'questions' tab is active
  useEffect(() => {
    // Only fetch if admin and on the questions tab, and not currently editing/creating 
    if (userInfo && userInfo.isAdmin && activeTab === 'questions') {
        if (questionMode === 'list') { 
            // Reset page to 1 whenever we switch back to the list view
            setCurrentPage(1); 
            dispatch(fetchQuestions());
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userInfo, activeTab, questionMode]); // Added questionMode to trigger refresh when switching back to list

  // Handler to refresh the list after any successful Question CRUD operation
  const handleQuestionSuccess = () => {
    setQuestionMode('list'); 
    setQuestionToEdit(null); 
    // The useEffect above will handle dispatch(fetchQuestions()) and resetting the page
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      dispatch(deleteQuestion(id));
    }
  };

  const editHandler = (question) => {
    setQuestionToEdit(question);
    setQuestionMode('edit');
  };
    
    // --- PAGINATION LOGIC ---
    const totalPages = Math.ceil(questions.length / questionsPerPage);
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    // Slice the questions array to get only the questions for the current page
    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };


  // --- RENDERING LOGIC ---

  // Renders the list view (default mode)
  const renderList = () => (
    <>
      <button 
        onClick={() => setQuestionMode('create')} 
        className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150 mb-6 cursor-pointer"
      >
        Create New Question
      </button>

      {/* Status Messages */}
      {loading && <p className="text-blue-600 font-medium my-3">Loading questions...</p>}
      {error && <p className="text-red-600 bg-red-100 p-3 rounded-md my-3">Error: {error}</p>}
      {success && <p className="text-green-600 bg-green-100 p-3 rounded-md my-3">Operation successful! List refreshing...</p>}
      
      {/* Question List Table */}
      {questions.length === 0 && !loading ? (
        <p className="p-4 border border-gray-300 rounded-md text-gray-600">No questions found in the database.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question Text</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Map over the currently visible questions */}
              {currentQuestions.map((q) => (
                <tr key={q._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{q._id.substring(18)}...</td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{q.text.substring(0, 50)}...</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{q.difficulty}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-blue-600 hover:text-blue-900 transition duration-150 mr-3 p-1.5 border border-blue-600 rounded-md hover:bg-blue-50"
                      onClick={() => editHandler(q)} // Pass the whole question object
                    >
                      Edit
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900 transition duration-150 p-1.5 border border-red-600 rounded-md hover:bg-red-50"
                      onClick={() => deleteHandler(q._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    
    {/* --- PAGINATION CONTROLS --- */}
    {questions.length > questionsPerPage && (
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
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
    </>
  );

    return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto my-4 md:my-10 bg-white rounded-2xl shadow-2xl border border-gray-100">
      <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-6 md:mb-10 tracking-tight">
        Admin Dashboard
      </h1>

      {/* --- Tab Navigation --- 
          Added 'overflow-x-auto' and 'whitespace-nowrap' to allow swiping on mobile
      */}
      <div className="border-b border-gray-200 flex overflow-x-auto scrollbar-hide mb-6 -mx-4 px-4 md:mx-0 md:px-0 space-x-2 md:space-x-4">
        {['questions', 'config', 'users', 'payments'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)} 
            className={`py-3 px-4 md:px-6 font-bold text-xs md:text-sm transition-all duration-200 focus:outline-none whitespace-nowrap uppercase tracking-widest
                        ${activeTab === tab 
                          ? 'border-b-4 border-blue-600 text-blue-600 bg-blue-50/50' 
                          : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'}`
            }
          >
            {tab === 'questions' && 'Question Management'}
            {tab === 'config' && 'Test Configuration'}
            {tab === 'users' && 'User Management'}
            {tab === 'payments' && 'Payment History'}
          </button>
        ))}
      </div>

      {/* --- Tab Content --- */}
      
      {/* Question Management Tab Content */}
      {activeTab === 'questions' && (
        <div className="mt-4 md:mt-8">
          {questionMode !== 'list' && (
            <button 
              onClick={() => setQuestionMode('list')} 
              className="w-full md:w-auto py-3 px-6 bg-gray-800 text-white font-bold rounded-xl shadow-lg hover:bg-black transition duration-150 mb-8 flex items-center justify-center gap-2"
            >
              <span className="text-xl">←</span> Back to Question List
            </button>
          )}

          <div className="overflow-x-auto">
            {questionMode === 'list' && renderList()}
          </div>

          {questionMode === 'create' && (
            <QuestionForm onSuccess={handleQuestionSuccess} question={null} />
          )}

          {questionMode === 'edit' && questionToEdit && (
            <QuestionForm onSuccess={handleQuestionSuccess} question={questionToEdit} />
          )}
        </div>
      )}

      {/* Test Configuration Tab Content */}
      {activeTab === 'config' && (
        <div className="mt-4 md:mt-8">
          <TestConfigForm />
        </div>
      )}
      
      {/* User Management Tab Content */}
      {activeTab === 'users' && (
        <div className="mt-4 md:mt-8">
          <UserList />
        </div>
      )}

      {/* Payment History Tab Content */}
      {activeTab === 'payments' && (
        <div className="mt-4 md:mt-8">
          <PaymentHistory />
        </div>
      )}
      
    </div>
  );
};

export default AdminDashboardScreen;






// import React, { useEffect, useState } from 'react'; 
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchQuestions, deleteQuestion } from '../slices/questionSlice';
// import QuestionForm from '../components/QuestionForm'; 
// import TestConfigForm from '../components/TestConfigForm';
// import UserList from '../components/UserList';

// const AdminDashboardScreen = () => {
//   const dispatch = useDispatch();
//   const { questions, loading, error, success } = useSelector((state) => state.question);
//   const { userInfo } = useSelector((state) => state.auth);

//   // State to control the active tab/view: 'questions', 'config', 'users'
//   const [activeTab, setActiveTab] = useState('questions'); 
//   // State to control question view: 'list', 'create', 'edit'
//   const [questionMode, setQuestionMode] = useState('list'); 
//   const [questionToEdit, setQuestionToEdit] = useState(null); 

//   // --- NEW PAGINATION STATE ---
//   const [currentPage, setCurrentPage] = useState(1);
//   const questionsPerPage = 20; // Define how many items to show per page

//   // Fetch questions only when the 'questions' tab is active
//   useEffect(() => {
//     // Only fetch if admin and on the questions tab, and not currently editing/creating 
//     if (userInfo && userInfo.isAdmin && activeTab === 'questions') {
//         if (questionMode === 'list') { 
//             // Reset page to 1 whenever we switch back to the list view
//             setCurrentPage(1); 
//             dispatch(fetchQuestions());
//         }
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [dispatch, userInfo, activeTab, questionMode]); // Added questionMode to trigger refresh when switching back to list

//   // Handler to refresh the list after any successful Question CRUD operation
//   const handleQuestionSuccess = () => {
//     setQuestionMode('list'); 
//     setQuestionToEdit(null); 
//     // The useEffect above will handle dispatch(fetchQuestions()) and resetting the page
//   };

//   const deleteHandler = (id) => {
//     if (window.confirm('Are you sure you want to delete this question?')) {
//       dispatch(deleteQuestion(id));
//     }
//   };

//   const editHandler = (question) => {
//     setQuestionToEdit(question);
//     setQuestionMode('edit');
//   };
    
//     // --- PAGINATION LOGIC ---
//     const totalPages = Math.ceil(questions.length / questionsPerPage);
//     const indexOfLastQuestion = currentPage * questionsPerPage;
//     const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
//     // Slice the questions array to get only the questions for the current page
//     const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

//     const paginate = (pageNumber) => {
//         if (pageNumber >= 1 && pageNumber <= totalPages) {
//             setCurrentPage(pageNumber);
//         }
//     };


//   // --- RENDERING LOGIC ---

//   // Renders the list view (default mode)
//   const renderList = () => (
//     <>
//       <button 
//         onClick={() => setQuestionMode('create')} 
//         className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150 mb-6 cursor-pointer"
//       >
//         Create New Question
//       </button>

//       {/* Status Messages */}
//       {loading && <p className="text-blue-600 font-medium my-3">Loading questions...</p>}
//       {error && <p className="text-red-600 bg-red-100 p-3 rounded-md my-3">Error: {error}</p>}
//       {success && <p className="text-green-600 bg-green-100 p-3 rounded-md my-3">Operation successful! List refreshing...</p>}
//       
//       {/* Question List Table */}
//       {questions.length === 0 && !loading ? (
//         <p className="p-4 border border-gray-300 rounded-md text-gray-600">No questions found in the database.</p>
//       ) : (
//         <div className="overflow-x-auto shadow-lg rounded-lg">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question Text</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {/* Map over the currently visible questions */}
//               {currentQuestions.map((q) => (
//                 <tr key={q._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{q._id.substring(18)}...</td>
//                   <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{q.text.substring(0, 50)}...</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{q.difficulty}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <button 
//                       className="text-blue-600 hover:text-blue-900 transition duration-150 mr-3 p-1.5 border border-blue-600 rounded-md hover:bg-blue-50"
//                       onClick={() => editHandler(q)} // Pass the whole question object
//                     >
//                       Edit
//                     </button>
//                     <button 
//                       className="text-red-600 hover:text-red-900 transition duration-150 p-1.5 border border-red-600 rounded-md hover:bg-red-50"
//                       onClick={() => deleteHandler(q._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
    
//     {/* --- PAGINATION CONTROLS --- */}
//     {questions.length > questionsPerPage && (
//         <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
//             <button
//                 onClick={() => paginate(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 disabled:opacity-50 transition"
//             >
//                 &larr; Previous Page
//             </button>
            
//             <span className="text-sm text-gray-600">
//                 Page <b>{currentPage}</b> of <b>{totalPages}</b>
//             </span>
            
//             <button
//                 onClick={() => paginate(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 disabled:opacity-50 transition"
//             >
//                 Next Page &rarr;
//             </button>
//         </div>
//     )}
//     </>
//   );

//     return (
//     <div className="p-4 md:p-8 max-w-7xl mx-auto my-4 md:my-10 bg-white rounded-2xl shadow-2xl border border-gray-100">
//       <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-6 md:mb-10 tracking-tight">
//         Admin Dashboard
//       </h1>

//       {/* --- Tab Navigation --- 
//           Added 'overflow-x-auto' and 'whitespace-nowrap' to allow swiping on mobile
//       */}
//       <div className="border-b border-gray-200 flex overflow-x-auto scrollbar-hide mb-6 -mx-4 px-4 md:mx-0 md:px-0 space-x-2 md:space-x-4">
//         {['questions', 'config', 'users'].map(tab => (
//           <button 
//             key={tab}
//             onClick={() => setActiveTab(tab)} 
//             className={`py-3 px-4 md:px-6 font-bold text-xs md:text-sm transition-all duration-200 focus:outline-none whitespace-nowrap uppercase tracking-widest
//                         ${activeTab === tab 
//                           ? 'border-b-4 border-blue-600 text-blue-600 bg-blue-50/50' 
//                           : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'}`
//             }
//           >
//             {tab === 'questions' && 'Question Management'}
//             {tab === 'config' && 'Test Configuration'}
//             {tab === 'users' && 'User Management'}
//           </button>
//         ))}
//       </div>

//       {/* --- Tab Content --- */}
      
//       {/* Question Management Tab Content */}
//       {activeTab === 'questions' && (
//         <div className="mt-4 md:mt-8">
//           {questionMode !== 'list' && (
//             <button 
//               onClick={() => setQuestionMode('list')} 
//               className="w-full md:w-auto py-3 px-6 bg-gray-800 text-white font-bold rounded-xl shadow-lg hover:bg-black transition duration-150 mb-8 flex items-center justify-center gap-2"
//             >
//               <span className="text-xl">←</span> Back to Question List
//             </button>
//           )}

//           <div className="overflow-x-auto">
//             {questionMode === 'list' && renderList()}
//           </div>

//           {questionMode === 'create' && (
//             <QuestionForm onSuccess={handleQuestionSuccess} question={null} />
//           )}

//           {questionMode === 'edit' && questionToEdit && (
//             <QuestionForm onSuccess={handleQuestionSuccess} question={questionToEdit} />
//           )}
//         </div>
//       )}

//       {/* Test Configuration Tab Content */}
//       {activeTab === 'config' && (
//         <div className="mt-4 md:mt-8">
//           <TestConfigForm />
//         </div>
//       )}
      
//       {/* User Management Tab Content */}
//       {activeTab === 'users' && (
//         <div className="mt-4 md:mt-8">
//           <UserList />
//         </div>
//       )}
      
//     </div>
//   );
// };

// export default AdminDashboardScreen;