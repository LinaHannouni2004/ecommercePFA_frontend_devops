'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiSearch, FiBell, FiMessageSquare } from 'react-icons/fi';
import { BsGraphUp, BsPeople, BsBoxSeam, BsChatDots } from 'react-icons/bs';
import './CommentPage.css';

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('comments');

useEffect(() => {
  fetch("http://localhost:8081/api/reviews")
    .then((res) => {
      if (!res.ok) {
        return res.json().then(err => { 
          throw new Error(err.message || 'Failed to fetch reviews');
        });
      }
      return res.json();
    })
    .then((data) => {
      console.log("Reviews received:", data);
      const formattedComments = data.map(review => ({
        id: review.id,
        user: review.userName || "Anonymous",
        content: review.comment,
        date: review.createdAt?.split("T")[0] ?? '',
        status: review.status?.toLowerCase() || 'pending'
      }));
      setComments(formattedComments);
    })
    .catch((err) => {
      console.error("Error loading comments:", err);
      // You might want to set some error state here
    });
}, []);


  // Navigation items
  const navItems = [
    { icon: <BsGraphUp />, label: 'Dashboard', key: 'dashboard', path: '/admin' },
    { icon: <BsChatDots />, label: 'Comments', key: 'comments', path: '/admin/comments' },
    { icon: <BsPeople />, label: 'Users', key: 'users', path: '/admin/users' },
    { icon: <BsBoxSeam />, label: 'Products', key: 'products', path: '/admin/products' },
  ];

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      setComments(comments.filter(comment => comment.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setComments(comments.map(comment =>
      comment.id === id ? { ...comment, status: newStatus } : comment
    ));
  };

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

        <div className="content">
          <h1>Gestion des Commentaires</h1>

          {/* Comment List */}
          <div className="comment-list">
            <h2>Liste des Commentaires</h2>
            {comments.length === 0 ? (
              <p>Aucun commentaire trouvé.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Utilisateur</th>
                    <th>Contenu</th>
                    <th>Date</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.map(comment => (
                    <tr key={comment.id} className={`status-${comment.status}`}>
                      <td>{comment.user}</td>
                      <td>{comment.content}</td>
                      <td>{comment.date}</td>
                      <td>
                        <select
                          value={comment.status}
                          onChange={(e) => handleStatusChange(comment.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="pending">En attente</option>
                          <option value="positive">Positif</option>
                          <option value="neutral">Neutre</option>
                          <option value="negative">Négatif</option>
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(comment.id)}
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

export default CommentsPage;
