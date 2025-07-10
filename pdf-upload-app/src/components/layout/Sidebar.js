import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Edit3, 
  BookOpen, 
  FileText, 
  AlertTriangle, 
  Library, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Workflow,
  Code,
  Shield,
  BarChart3
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      path: '/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      description: 'Overview and analytics'
    },
    {
      path: '/editor',
      icon: Edit3,
      label: 'BPMN Editor',
      description: 'Create and edit process diagrams'
    },
    {
      path: '/rules',
      icon: Code,
      label: 'Rules Engine',
      description: 'Define business rules'
    },
    {
      path: '/policy',
      icon: FileText,
      label: 'Policy Manager',
      description: 'Manage policy documents'
    },
    {
      path: '/waste',
      icon: AlertTriangle,
      label: 'Waste Analyzer',
      description: 'Identify process waste'
    },
    {
      path: '/library',
      icon: Library,
      label: 'Process Library',
      description: 'Browse process templates'
    },
    {
      path: '/users',
      icon: Users,
      label: 'User Management',
      description: 'Manage user accounts'
    },
    {
      path: '/settings',
      icon: Settings,
      label: 'Settings',
      description: 'Application configuration'
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Workflow className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">ProcessFlow Pro</h1>
              <p className="text-xs text-gray-500">BPMN & Lean Management</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          )}
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-5 w-5 flex-shrink-0 ${
                isActive(item.path) ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
              }`} />
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{item.label}</div>
                  <div className="text-xs text-gray-500 truncate">{item.description}</div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-xs font-medium text-gray-700">Compliance Status</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-xs text-gray-600">85%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar; 