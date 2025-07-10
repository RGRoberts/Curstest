import React from 'react';
import { Settings, User, Shield, Bell, Palette } from 'lucide-react';

const Settings = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure application preferences and user settings</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <Settings className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Settings</h3>
        <p className="text-gray-600 mb-6">
          Configure application settings, user preferences, security options, and notification 
          preferences.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="btn-primary">General Settings</button>
          <button className="btn-secondary">Security</button>
        </div>
      </div>
    </div>
  );
};

export default Settings; 