// client/src/components/UserList.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser, updateUser } from '../slices/authSlice'; // Use the updated authSlice
import { FaEdit, FaTrash, FaTimes, FaCheck } from 'react-icons/fa'; 

const UserList = () => {
  const dispatch = useDispatch();
  const { usersList, usersLoading, usersError, usersSuccess } = useSelector((state) => state.auth);
  
  // State to track which user is being edited
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingIsAdmin, setEditingIsAdmin] = useState(false);

  // Fetch users on component load or after a successful operation
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, usersSuccess]); // Re-fetch list if an operation succeeds

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      dispatch(deleteUser(id));
    }
  };

  const startEditHandler = (user) => {
    setEditingUserId(user._id);
    setEditingIsAdmin(user.isAdmin);
  };

  const saveEditHandler = (id) => {
    // Dispatch the update operation
    dispatch(updateUser({ userId: id, userData: { isAdmin: editingIsAdmin } }));
    setEditingUserId(null); // Exit editing mode
  };

  const cancelEditHandler = () => {
    setEditingUserId(null);
  };

  if (usersLoading) return <p className="text-center text-blue-600 font-medium">Loading users...</p>;
  if (usersError) return <p className="text-red-600 text-center bg-red-100 p-3 rounded-md border border-red-300">Error fetching users: {usersError}</p>;
  if (!usersList || usersList.length === 0) return <p className="text-center text-gray-500">No registered users found.</p>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4 border-b pb-2 text-gray-700">Registered Users</h3>
      
      {usersSuccess && <p className="text-green-600 bg-green-100 p-2 rounded mb-4">Operation successful!</p>}
      
      {/* Use a wrapper for responsive overflow */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse mt-4 border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">Username</th>
              <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700 w-20">Admin</th>
              <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700 w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user) => (
              <tr key={user._id} className="even:bg-gray-50 hover:bg-gray-100">
                <td className="border border-gray-300 p-3 text-sm text-gray-600">{user._id.substring(18)}...</td>
                <td className="border border-gray-300 p-3 text-sm text-gray-800 font-medium">{user.username}</td>
                <td className="border border-gray-300 p-3 text-sm text-gray-600">{user.email}</td>
                
                {/* Admin Status / Edit Checkbox */}
                <td className="border border-gray-300 p-3 text-center">
                  {editingUserId === user._id ? (
                    <input
                      type='checkbox'
                      checked={editingIsAdmin}
                      onChange={(e) => setEditingIsAdmin(e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded"
                    />
                  ) : (
                    user.isAdmin ? <FaCheck className="text-green-500 mx-auto" title="Admin" /> : <FaTimes className="text-red-500 mx-auto" title="Not Admin" />
                  )}
                </td>
                
                {/* Actions */}
                <td className="border border-gray-300 p-3 text-center whitespace-nowrap">
                  {editingUserId === user._id ? (
                    <div className="flex justify-center space-x-2">
                      <button 
                        onClick={() => saveEditHandler(user._id)} 
                        className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        title="Save Changes"
                      >
                        Save
                      </button>
                      <button 
                        onClick={cancelEditHandler} 
                        className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                        title="Cancel Edit"
                      >
                        Cancel
                      </button>
                    </div>
                ) : (
                  <div className="flex justify-center space-x-2">
                    <button 
                      onClick={() => startEditHandler(user)} 
                      className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      title="Edit User"
                    >
                      <FaEdit />
                    </button>
                    {/* The condition to disable deletion of self-admin is handled in the backend, but we disable for any existing admin to be safe */}
                    <button 
                      onClick={() => deleteHandler(user._id)} 
                      className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50"
                      title={user.isAdmin ? "Cannot delete an Admin account here" : "Delete User"}
                      disabled={user.isAdmin} 
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;