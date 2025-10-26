import React, { useState } from 'react';

export default function Sidebar({ onLogout }) {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">AmaliSpend</div>
                <div className="logo-subtitle">Track your expenses</div>
            </div>

            <nav className="sidebar-menu">
                <a href="#" className="menu-item active">
                    <span className="menu-icon">📊</span>
                    <span>Dashboard</span>
                </a>
                <a href="#" className="menu-item">
                    <span className="menu-icon">💰</span>
                    <span>Transactions</span>
                </a>
                <a href="#" className="menu-item">
                    <span className="menu-icon">📈</span>
                    <span>Analytics</span>
                </a>
                <a href="#" className="menu-item">
                    <span className="menu-icon">🎯</span>
                    <span>Budgets</span>
                </a>
            </nav>

            <div className="sidebar-footer">
                <div className="user-profile">
                    <div className="user-avatar">JD</div>
                    <div className="user-details">
                        <h4>Robert Delali</h4>
                        <p>dela@gmail.com</p>
                    </div>
                </div>
                <button className="logout-btn" onClick={onLogout}>Logout</button>
            </div>
        </aside>
    );
};
