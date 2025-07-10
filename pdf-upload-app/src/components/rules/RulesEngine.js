import React, { useState, useEffect } from 'react';
import { usePolicy } from '../../contexts/PolicyContext';
import { 
  Plus, 
  Save, 
  Play, 
  Trash2, 
  Edit3, 
  Eye, 
  Copy,
  Code,
  Database,
  FileText,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const RulesEngine = () => {
  const { rules, loadRules, createRule, updateRule, deleteRule } = usePolicy();
  const [selectedRule, setSelectedRule] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [activeTab, setActiveTab] = useState('rules');

  useEffect(() => {
    loadRules();
  }, [loadRules]);

  const RuleCard = ({ rule }) => (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Code className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">{rule.name}</h3>
            <span className={`badge ${rule.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
              {rule.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{rule.description}</p>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>Type: {rule.type}</span>
            <span>Priority: {rule.priority}</span>
            <span>Updated: {rule.updatedAt}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSelectedRule(rule)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            title="Edit Rule"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowTestModal(true)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            title="Test Rule"
          >
            <Play className="h-4 w-4" />
          </button>
          <button
            onClick={() => deleteRule(rule.id)}
            className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50"
            title="Delete Rule"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const DecisionTable = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Decision Table</h3>
        <p className="text-sm text-gray-600">Define business rules using decision tables</p>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rule 1
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rule 2
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rule 3
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Order Amount
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  &lt; $100
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  $100 - $500
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  &gt; $500
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Customer Type
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  New
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Regular
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  VIP
                </td>
              </tr>
              <tr className="bg-blue-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Action
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Manual Review
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Auto Approve
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Fast Track
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const RuleEditor = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Rule Editor</h3>
        <p className="text-sm text-gray-600">Write business rules using natural language</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rule Name
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter rule name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="form-input"
              rows="3"
              placeholder="Describe the rule purpose"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rule Logic
            </label>
            <div className="border border-gray-300 rounded-md">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-300">
                <span className="text-sm font-medium text-gray-700">If</span>
              </div>
              <textarea
                className="w-full px-4 py-3 border-0 focus:ring-0 resize-none"
                rows="4"
                placeholder="Enter condition (e.g., order amount > 1000)"
              />
              <div className="bg-gray-50 px-4 py-2 border-t border-gray-300">
                <span className="text-sm font-medium text-gray-700">Then</span>
              </div>
              <textarea
                className="w-full px-4 py-3 border-0 focus:ring-0 resize-none"
                rows="4"
                placeholder="Enter action (e.g., require manager approval)"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select className="form-input">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select className="form-input">
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button className="btn-secondary">Cancel</button>
            <button className="btn-primary">Save Rule</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rules Engine</h1>
          <p className="text-gray-600">Define and manage business rules for process automation</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary inline-flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Rule
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('rules')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'rules'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Business Rules
          </button>
          <button
            onClick={() => setActiveTab('decision-tables')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'decision-tables'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Decision Tables
          </button>
          <button
            onClick={() => setActiveTab('editor')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'editor'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Rule Editor
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rules.map((rule) => (
              <RuleCard key={rule.id} rule={rule} />
            ))}
            {rules.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Code className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No rules yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating your first business rule.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="btn-primary inline-flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Rule
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'decision-tables' && (
        <DecisionTable />
      )}

      {activeTab === 'editor' && (
        <RuleEditor />
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Code className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Rules</dt>
                <dd className="text-lg font-medium text-gray-900">{rules.length}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Active Rules</dt>
                <dd className="text-lg font-medium text-gray-900">
                  {rules.filter(r => r.status === 'active').length}
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Draft Rules</dt>
                <dd className="text-lg font-medium text-gray-900">
                  {rules.filter(r => r.status === 'draft').length}
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Play className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Executions Today</dt>
                <dd className="text-lg font-medium text-gray-900">1,234</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesEngine; 