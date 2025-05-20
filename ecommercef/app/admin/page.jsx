'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiSearch, FiBell, FiMessageSquare } from 'react-icons/fi';
import { BsGraphUp, BsPeople, BsBoxSeam, BsChatDots, BsCart } from 'react-icons/bs';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend, ArcElement,
} from 'chart.js';
import './DashboardPage.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

export default function Dashboard() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Chart data
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgba(67, 97, 238, 0.7)',
      borderRadius: 6,
    }],
  };

  const pieChartData = {
    labels: ['Direct', 'Social', 'Referral'],
    datasets: [{
      data: [55, 30, 15],
      backgroundColor: ['#4361ee', '#f8961e', '#43aa8b'],
    }],
  };

  // Stats cards
  const statsCards = [
    { icon: <BsGraphUp size={20} />, title: 'Revenue', value: '$6,200', change: '+3.5%', trend: 'up' },
    { icon: <BsPeople size={20} />, title: 'Customers', value: '1,250', change: '+5.2%', trend: 'up' },
    { icon: <BsBoxSeam size={20} />, title: 'Products', value: '423', change: '+1.1%', trend: 'up' },
    { icon: <BsCart size={20} />, title: 'Orders', value: '345', change: '+8.3%', trend: 'up' },
  ];

  // Navigation items
  const navItems = [
    { icon: <BsGraphUp />, label: 'Dashboard', key: 'dashboard', path: '/admin' },
    { icon: <BsChatDots />, label: 'Comments', key: 'comments', path: '/admin/comments' },
    { icon: <BsPeople />, label: 'Users', key: 'users', path: '/admin/users' },
    { icon: <BsBoxSeam />, label: 'Products', key: 'products', path: '/admin/products' },
  
  ];

  // Orders data
  const orders = [
    { id: '#9842', customer: 'John Smith', product: 'Wireless Headphones', amount: '$300', status: 'completed', date: '2023-05-15' },
    { id: '#9843', customer: 'Sarah Johnson', product: 'Smart Watch', amount: '$250', status: 'pending', date: '2023-05-14' },
    { id: '#9844', customer: 'Emily Davis', product: 'Bluetooth Speaker', amount: '$180', status: 'completed', date: '2023-05-13' },
    { id: '#9845', customer: 'Robert Wilson', product: 'Power Bank', amount: '$50', status: 'completed', date: '2023-05-12' },
    { id: '#9846', customer: 'Jane Doe', product: 'USB Drive', amount: '$25', status: 'cancelled', date: '2023-05-11' },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          {sidebarOpen && <h1 className="logo">AdminPro</h1>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="menu-toggle"
            aria-label="Toggle menu"
          >
            <FiMenu />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.path}
                  className={`nav-item ${activePage === item.key ? 'active' : ''}`}
                  onClick={() => setActivePage(item.key)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {sidebarOpen && <span className="nav-label">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {sidebarOpen && (
          <div className="sidebar-footer">
            <div className="user-profile">
              <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" />
              <span>Admin</span>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Search..." />
          </div>
          <div className="header-actions">
            <button className="action-btn">
              <FiMessageSquare />
              <span className="notification-badge"></span>
            </button>
            <button className="action-btn">
              <FiBell />
              <span className="notification-badge"></span>
            </button>
          </div>
        </header>

        <div className="content">
          <div className="page-header">
            <h1>Dashboard Overview</h1>
            <p>Welcome back, Admin</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            {statsCards.map((card, i) => (
              <div key={i} className={`stat-card ${card.trend}`}>
                <div className="stat-info">
                  <h3>{card.value}</h3>
                  <p>{card.title}</p>
                </div>
                <div className="stat-icon">{card.icon}</div>
                <span className="stat-trend">{card.change}</span>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="charts-container">
            <div className="chart-card">
              <h3>Sales Overview</h3>
              <div className="chart-wrapper">
                <Bar 
                  data={barChartData} 
                  options={{ 
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                  }} 
                />
              </div>
            </div>
            <div className="chart-card">
              <h3>Revenue Sources</h3>
              <div className="chart-wrapper">
                <Pie 
                  data={pieChartData} 
                  options={{ 
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'right' } }
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="table-card">
            <div className="table-header">
              <h3>Recent Orders</h3>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, i) => (
                    <tr key={i}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.product}</td>
                      <td>{order.amount}</td>
                      <td>{order.date}</td>
                      <td>
                        <span className={`status-badge ${order.status}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}