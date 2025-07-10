import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProcess } from '../../contexts/ProcessContext';
import { usePolicy } from '../../contexts/PolicyContext';
import { 
  Plus, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  TrendingUp,
  BarChart3,
  Edit3,
  Eye,
  Download,
  Share2
} from 'lucide-react';

const Dashboard = () => {
  const { processes, loadProcesses } = useProcess();
  const { policies, loadPolicies } = usePolicy();
  const [stats, setStats] = useState({
    totalProcesses: 0,
    activeProcesses: 0,
    totalPolicies: 0,
    complianceScore: 85,
    wasteIdentified: 12,
    recentActivity: []
  });

  useEffect(() => {
    loadProcesses();
    loadPolicies();
  }, [loadProcesses, loadPolicies]);

  useEffect(() => {
    // Calculate stats based on loaded data
    setStats({
      totalProcesses: processes.length,
      activeProcesses: processes.filter(p => p.status === 'active').length,
      totalPolicies: policies.length,
      complianceScore: 85, // This would be calculated from actual data
      wasteIdentified: 12,
      recentActivity: [
        {
          id: 1,
          type: 'process_updated',
          title: 'Order Fulfillment Process Updated',
          description: 'Process modified by John Doe',
          time: '2 minutes ago',
          icon: Edit3
        },
        {
          id: 2,
          type: 'policy_created',
          title: 'New Approval Policy Created',
          description: 'Policy created by Jane Smith',
          time: '1 hour ago',
          icon: FileText
        },
        {
          id: 3,
          type: 'waste_identified',
          title: 'Waste Identified in Customer Service',
          description: '3 potential waste areas found',
          time: '3 hours ago',
          icon: AlertTriangle
        }
      ]
    });
  }, [processes, policies]);

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  const QuickAction = ({ title, description, icon: Icon, href, color }) => (
    <Link
      to={href}
      className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );

  const RecentProcess = ({ process }) => (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Edit3 className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">{process.name}</h4>
            <p className="text-xs text-gray-500">Last updated {process.updatedAt}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <Download className="h-4 w-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your processes.</p>
        </div>
        <Link
          to="/editor"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Process
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Processes"
          value={stats.totalProcesses}
          icon={BarChart3}
          color="bg-blue-500"
          change={12}
        />
        <StatCard
          title="Active Processes"
          value={stats.activeProcesses}
          icon={CheckCircle}
          color="bg-green-500"
          change={8}
        />
        <StatCard
          title="Total Policies"
          value={stats.totalPolicies}
          icon={FileText}
          color="bg-purple-500"
          change={-3}
        />
        <StatCard
          title="Compliance Score"
          value={`${stats.complianceScore}%`}
          icon={TrendingUp}
          color="bg-orange-500"
          change={5}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          <div className="space-y-4">
            <QuickAction
              title="Create New Process"
              description="Start building a new BPMN diagram"
              icon={Plus}
              href="/editor"
              color="bg-blue-500"
            />
            <QuickAction
              title="Upload Policy"
              description="Import and analyze policy documents"
              icon={FileText}
              href="/policy"
              color="bg-purple-500"
            />
            <QuickAction
              title="Analyze Waste"
              description="Identify process inefficiencies"
              icon={AlertTriangle}
              href="/waste"
              color="bg-orange-500"
            />
            <QuickAction
              title="Manage Rules"
              description="Define business rules and logic"
              icon={BarChart3}
              href="/rules"
              color="bg-green-500"
            />
          </div>
        </div>

        {/* Recent Processes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Processes</h2>
            <Link to="/library" className="text-sm text-blue-600 hover:text-blue-700">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {processes.slice(0, 5).map((process) => (
              <RecentProcess key={process.id} process={process} />
            ))}
            {processes.length === 0 && (
              <div className="text-center py-8">
                <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No processes yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating your first process.
                </p>
                <div className="mt-6">
                  <Link
                    to="/editor"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Process
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {stats.recentActivity.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Overall Compliance</span>
              <span className="text-sm font-medium text-gray-900">{stats.complianceScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${stats.complianceScore}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Processes Compliant</span>
                <span className="block font-medium text-gray-900">24/28</span>
              </div>
              <div>
                <span className="text-gray-600">Policies Active</span>
                <span className="block font-medium text-gray-900">15</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Waste Analysis</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Waste Identified</span>
              <span className="text-sm font-medium text-gray-900">{stats.wasteIdentified}</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Overproduction</span>
                <span className="font-medium text-gray-900">3</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Waiting</span>
                <span className="font-medium text-gray-900">4</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Transport</span>
                <span className="font-medium text-gray-900">2</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Processing</span>
                <span className="font-medium text-gray-900">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 