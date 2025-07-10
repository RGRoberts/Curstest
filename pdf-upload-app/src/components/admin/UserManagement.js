import React from 'react';
import { Users, UserPlus, Shield, Settings } from 'lucide-react';

const UserManagement = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage user accounts, roles, and permissions</p>
        </div>
        <button className="btn-primary inline-flex items-center">
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">User Management</h3>
        <p className="text-gray-600 mb-6">
          Manage user accounts, assign roles (Admin, Editor, Viewer), and control access 
          to processes and policies.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="btn-primary">Manage Users</button>
          <button className="btn-secondary">Role Settings</button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement; 