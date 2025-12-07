// Create src/pages/Dashboard.js
import React from 'react';
import { getUser } from '../utils/auth';
import Dashboardfarmer from './DashboardPages/Dashboardfarmer';
import Dashboardfinance from './DashboardPages/Dashboardfinance';

const Dashboard = () => {
  const user = getUser();
  const selectedRole = user?.login_selected_role || user?.role || 'farmer';
  
  console.log('📊 Dashboard rendering for role:', selectedRole);
  
  if (selectedRole === 'financier' || selectedRole === 'buyer') {
    return <Dashboardfinance />;
  }
  
  return <Dashboardfarmer />;
};

export default Dashboard;