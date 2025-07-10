import React from 'react';
import { FileText, Upload, Download, Eye, Edit3, Trash2 } from 'lucide-react';

const PolicyManager = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Policy Manager</h1>
          <p className="text-gray-600">Upload, analyze, and manage policy documents</p>
        </div>
        <button className="btn-primary inline-flex items-center">
          <Upload className="h-4 w-4 mr-2" />
          Upload Policy
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Policy Manager</h3>
        <p className="text-gray-600 mb-6">
          Upload policy documents, extract rules, and map them to processes for compliance analysis.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="btn-primary">Upload Document</button>
          <button className="btn-secondary">View Templates</button>
        </div>
      </div>
    </div>
  );
};

export default PolicyManager; 