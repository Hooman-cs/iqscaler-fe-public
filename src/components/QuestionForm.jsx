// client/src/components/QuestionForm.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    createQuestion, 
    updateQuestion, 
    fetchCategories, 
    resetQuestionSuccess, 
} from '../slices/questionSlice'; 
import api from '../utils/api'; 

const QuestionForm = ({ question, onSuccess }) => {
    const dispatch = useDispatch();
    const { 
        loading, 
        error, 
        success,
        availableCategories,
        categoryLoading,
        categoryError
    } = useSelector((state) => state.question);

    const [questionText, setQuestionText] = useState(question?.text || '');
    const [category, setCategory] = useState(question?.category || ''); 
    const [difficulty, setDifficulty] = useState(question?.difficulty || 'easy');
    const [options, setOptions] = useState(question?.options || Array(4).fill({ text: '', imageUrl: '' }));
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(question?.correctAnswerIndex || 0);
    const [questionImage, setQuestionImage] = useState(question?.imageUrl || ''); 
    const [uploading, setUploading] = useState(false);
    const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
    
    useEffect(() => {
        dispatch(fetchCategories()); 
    }, [dispatch]);
    
    useEffect(() => {
        if (success) {
            onSuccess();
            dispatch(resetQuestionSuccess());
        }
    }, [success, dispatch, onSuccess]); 

    const uploadFileHandler = async (e, isOption = false, optionIndex = null) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const { data } = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (isOption) {
                const newOptions = [...options];
                newOptions[optionIndex] = { ...newOptions[optionIndex], imageUrl: data.imageUrl };
                setOptions(newOptions);
            } else {
                setQuestionImage(data.imageUrl);
            }
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
            alert('Image upload failed.');
        }
    };

    const handleOptionChange = (index, field, value) => {
        const newOptions = [...options];
        newOptions[index] = { ...newOptions[index], [field]: value };
        setOptions(newOptions);
    };
    
    const handleCategoryChange = (e) => {
        const value = e.target.value;
        if (value === '__NEW_CATEGORY__') {
            setCategory('');
            setShowNewCategoryInput(true);
        } else {
            setCategory(value);
            setShowNewCategoryInput(false);
        }
    };

    const resetForm = () => {
        setQuestionText(question?.text || '');
        setDifficulty(question?.difficulty || 'easy');
        setCategory(question?.category || ''); 
        setShowNewCategoryInput(false); 
        setOptions(question?.options || Array(4).fill({ text: '', imageUrl: '' }));
        setCorrectAnswerIndex(question?.correctAnswerIndex || 0);
        setQuestionImage(question?.imageUrl || '');
    };

    const submitHandler = (e) => {
        e.preventDefault();
        
        if (showNewCategoryInput && !category.trim()) {
            alert('Please enter a name for the new category.');
            return;
        }

        // UPDATED VALIDATION LOGIC:
        // Check if question text exists
        if (!questionText.trim()) {
            alert('Please enter the question text.');
            return;
        }

        // Check if category exists
        if (!category.trim()) {
            alert('Please select or enter a category.');
            return;
        }

        // Check if every option has AT LEAST a text string OR an image URL
        const isOptionsValid = options.every(opt => 
            (opt.text && opt.text.trim().length > 0) || (opt.imageUrl && opt.imageUrl.trim().length > 0)
        );

        if (!isOptionsValid) {
            alert('Each option must have either text or an image (or both).');
            return;
        }

        // if (!questionText || !category.trim() || options.some(opt => !opt.text && !opt.imageUrl)) {
        //     alert('Please fill in question text, category, and all option texts/images.');
        //     return;
        // }

        // UPDATED: Standardize the object structure sent to backend
        const questionData = {
            text: questionText,
            category: category.trim(),
            difficulty,
            options: options.map(opt => ({
                text: opt.text ? opt.text.trim() : '',
                imageUrl: opt.imageUrl || ''
            })),
            correctAnswerIndex,
            imageUrl: questionImage,
        };

        if (question?._id) {
            dispatch(updateQuestion({ id: question._id, questionData }));
        } else {
            dispatch(createQuestion(questionData));
        }
    };

    return (
        <form onSubmit={submitHandler} className="mb-8 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
            <h3 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">
                {question ? 'Edit Question' : 'Create New Question'}
            </h3>
            
            {loading && <p className="text-blue-600 text-center">Loading...</p>}
            {error && <p className="text-red-600 text-center bg-red-100 p-2 rounded">Error: {error}</p>}

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Question Text:</label>
                <textarea
                    rows="3"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>
            
            <div className="mb-4 p-3 border border-gray-200 rounded-md bg-gray-50">
                <label className="block text-sm font-medium text-gray-700 mb-1">Question Image:</label>
                <input type='file' onChange={(e) => uploadFileHandler(e)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                {uploading && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
                {questionImage && (
                    <div className="mt-2 relative">
                        <img src={questionImage} alt="Question" className="max-w-40 max-h-40 object-contain rounded-md border" />
                        <button type="button" onClick={() => setQuestionImage('')} className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6 text-xs font-bold hover:bg-red-700">X</button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
                    {categoryLoading ? <p className="text-sm text-gray-500">Loading...</p> : (
                        <select value={showNewCategoryInput ? '__NEW_CATEGORY__' : category} onChange={handleCategoryChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required={!showNewCategoryInput}>
                            <option value='' disabled>Select a Category</option> 
                            {availableCategories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                            <option value='__NEW_CATEGORY__'>-- Add New Category --</option>
                        </select>
                    )}
                </div>
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty:</label>
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                        <option value='easy'>Easy (1 pt)</option>
                        <option value='medium'>Medium (3 pts)</option>
                        <option value='hard'>Hard (6 pts)</option>
                    </select>
                </div>
            </div>

            {showNewCategoryInput && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Category Name:</label>
                    <input type='text' value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter New Category Name" required />
                </div>
            )}

            <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3 border-b pb-1">Options (Max 4)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {options.map((option, index) => (
                        <div key={index} className={`p-4 rounded-lg shadow-sm transition-colors border-2 ${correctAnswerIndex === index ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'}`}>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Option {index + 1}:</label>
                            <input type='text' value={option.text} onChange={(e) => handleOptionChange(index, 'text', e.target.value)} placeholder={`Option ${index + 1} Text`} className="w-full p-2 mb-2 border border-gray-300 rounded-md text-sm" />
                            <input type='file' onChange={(e) => uploadFileHandler(e, true, index)} className="block w-full text-xs text-gray-500 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200" />
                            {option.imageUrl && <img src={option.imageUrl} alt={`Option ${index+1}`} className="max-w-20 max-h-20 object-contain mt-2 rounded-md border" />}
                            <label className="flex items-center mt-3 text-sm font-medium text-gray-700">
                                <input type='radio' name='correctAnswer' checked={correctAnswerIndex === index} onChange={() => setCorrectAnswerIndex(index)} className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500" />
                                <span className="ml-2">Correct Answer</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 flex gap-4 justify-end">
                <button type='submit' className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-150 shadow-md disabled:opacity-50" disabled={loading || uploading || categoryLoading}>
                    {question ? 'Update Question' : 'Create Question'}
                </button>
                <button type='button' onClick={resetForm} className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-150 shadow-md" disabled={loading || uploading || categoryLoading}>Reset</button>
            </div>
        </form>
    );
};

export default QuestionForm;