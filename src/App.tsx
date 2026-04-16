/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LinkManager from './components/LinkManager';
import Marketplace from './components/Marketplace';
import AICopywriter from './components/AICopywriter';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'links':
        return <LinkManager />;
      case 'marketplace':
        return <Marketplace />;
      case 'copywriter':
        return <AICopywriter />;
      case 'analytics':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center">
              <span className="text-4xl">📊</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Detailed breakdowns of your performance are coming soon. Use the dashboard for a quick overview.
              </p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}
