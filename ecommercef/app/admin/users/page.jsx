'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiSearch, FiBell, FiMessageSquare } from 'react-icons/fi';
import { BsGraphUp, BsPeople, BsBoxSeam, BsChatDots } from 'react-icons/bs';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './UserPage.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('users');

  // États pour stats utilisateurs (inscriptions et connexions)
  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState(null);

  useEffect(() => {
    // Charger utilisateurs
    fetch('http://localhost:8081/api/admin/users')
      .then(res => {
        if (!res.ok) throw new Error('Erreur réseau');
        return res.json();
      })
      .then(data => setUsers(data))
      .catch(err => {
        console.error('Erreur chargement utilisateurs:', err);
        setUsers([]);
      });

    // Charger stats utilisateurs (inscriptions + connexions par jour)
    fetch('http://localhost:8081/api/admin/users/stats')
      .then(res => {
        if (!res.ok) throw new Error('Erreur réseau stats');
        return res.json();
      })
      .then(data => {
        setStats(data);
        setStatsError(null);
      })
      .catch(err => {
        console.error('Erreur chargement stats:', err);
        setStatsError(err.message);
      });
  }, []);

  // Préparer les données pour le graphique
  const chartData = {
    labels: stats ? stats.registrations.map(r => r.date) : [],
    datasets: [
      {
        label: 'Inscriptions par jour',
        data: stats ? stats.registrations.map(r => r.count) : [],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Connexions par jour',
        data: stats ? stats.logins.map(l => l.count) : [],
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Statistiques utilisateurs - inscriptions et connexions par jour',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        precision: 0
      }
    }
  };

  // Navigation (inchangé)
  const navItems = [
    { icon: <BsGraphUp />, label: 'Dashboard', key: 'dashboard', path: '/admin' },
    { icon: <BsChatDots />, label: 'Comments', key: 'comments', path: '/admin/comments' },
    { icon: <BsPeople />, label: 'Users', key: 'users', path: '/admin/users' },
    { icon: <BsBoxSeam />, label: 'Products', key: 'products', path: '/admin/products' },
  ];

  // Suppression / changement rôle (inchangé)
  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleRoleChange = (id, newRole) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, role: newRole } : user
    ));
  };

  return (
    <div className="dashboard-container">
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

      <main className="main-content">
        <header className="content-header">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Rechercher..." />
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

        <div className="content" style={{ color: 'black' }}>
          <h1>Gestion des Utilisateurs</h1>

          {/* Graphique des stats */}
          {statsError && <p style={{ color: 'red' }}>Erreur chargement stats: {statsError}</p>}
          {stats ? (
            <div style={{ maxWidth: '900px', marginBottom: '40px' }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          ) : (
            <p>Chargement des statistiques...</p>
          )}

          {/* Liste des utilisateurs */}
          <div className="user-list" style={{ color: 'black' }}>
            <h2>Liste des Utilisateurs</h2>
            {users.length === 0 ? (
              <p>Aucun utilisateur trouvé.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Rôle</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className={`role-${user.role}`} style={{ color: 'black' }}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className="role-select"
                          style={{ color: 'black' }}
                        >
                          <option value="admin">Admin</option>
                          <option value="client">Client</option>
                          <option value="blocked">Bloqué</option>
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="btn-delete"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UsersPage;
