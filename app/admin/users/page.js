'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllUsers, deleteUser } from '@/app/Store/adminSlice';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User, Mail, CheckCircle, XCircle } from 'lucide-react';

const UserManagement = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchAllUsers()).then((result) => {
      if (result?.payload?.success) {
        setUsers(result?.payload?.alluserData);
      }
    });
  }, [dispatch, users, showDialog, selectedUser]);

  const handleDelete = (email) => {
    setShowDialog(false); // Close dialog
    dispatch(deleteUser(email)).then(() => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));
    });
  };

  const openDeleteDialog = (user) => {
    setSelectedUser(user);
    setShowDialog(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">User Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.email}
            className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-3 rounded-full">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{user.username}</h2>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Mail className="w-4 h-4" /> {user.email}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p
                className={`text-sm flex items-center gap-1 font-medium ${user.isVerified ? 'text-green-600' : 'text-yellow-600'
                  }`}
              >
                {user.isVerified ? (
                  <>
                    <CheckCircle className="w-4 h-4" /> Verified
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" /> Not Verified
                  </>
                )}
              </p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => openDeleteDialog(user)}
                className="px-4 py-1"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      {showDialog && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the user{' '}
                <span className="font-bold">{selectedUser?.username}</span>?
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-4 mt-4">
              <Button variant="secondary" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(selectedUser.email)}
              >
                Confirm
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UserManagement;
