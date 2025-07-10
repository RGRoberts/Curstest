import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';

// Layout Components
import Layout from './components/layout/Layout';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// Main Feature Components
import Dashboard from './components/dashboard/Dashboard';
import BPMNEditor from './components/editor/BPMNEditor';
import RulesEngine from './components/rules/RulesEngine';
import PolicyManager from './components/policy/PolicyManager';
import WasteAnalyzer from './components/analysis/WasteAnalyzer';
import ProcessLibrary from './components/library/ProcessLibrary';
import UserManagement from './components/admin/UserManagement';
import Settings from './components/settings/Settings';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { ProcessProvider } from './contexts/ProcessContext';
import { PolicyProvider } from './contexts/PolicyContext';

function App() {
  return (
    <AuthProvider>
      <ProcessProvider>
        <PolicyProvider>
          <Router>
            <div className="App">
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                }}
              />
              <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected Routes */}
                <Route path="/" element={
                  <Layout>
                    <Sidebar />
                    <div className="flex-1 flex flex-col">
                      <Header />
                      <main className="flex-1 overflow-auto">
                        <Routes>
                          <Route path="/" element={<Navigate to="/dashboard" replace />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/editor" element={<BPMNEditor />} />
                          <Route path="/rules" element={<RulesEngine />} />
                          <Route path="/policy" element={<PolicyManager />} />
                          <Route path="/waste" element={<WasteAnalyzer />} />
                          <Route path="/library" element={<ProcessLibrary />} />
                          <Route path="/users" element={<UserManagement />} />
                          <Route path="/settings" element={<Settings />} />
                        </Routes>
                      </main>
                    </div>
                  </Layout>
                } />
              </Routes>
            </div>
          </Router>
        </PolicyProvider>
      </ProcessProvider>
    </AuthProvider>
  );
}

export default App;
