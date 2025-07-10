import React from 'react';
import { AlertTriangle, TrendingUp, BarChart3, Target } from 'lucide-react';

const WasteAnalyzer = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Waste Analyzer</h1>
          <p className="text-gray-600">Identify and analyze process waste using Lean principles</p>
        </div>
        <button className="btn-primary inline-flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Analyze Process
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Waste Analyzer</h3>
        <p className="text-gray-600 mb-6">
          Identify the 8 types of waste (Muda) in your processes: Overproduction, Waiting, Transport, 
          Over-processing, Inventory, Motion, Defects, and Unused Talent.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="btn-primary">Start Analysis</button>
          <button className="btn-secondary">View Reports</button>
        </div>
      </div>
    </div>
  );
};

export default WasteAnalyzer; 