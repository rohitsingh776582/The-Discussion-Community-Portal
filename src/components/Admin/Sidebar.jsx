
import React from 'react';
import './Sidebar.css';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { FaUser, FaBell, FaCalendarAlt, FaTrophy } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <h2 className="logo">Admin</h2>
            <ul className="nav-icons">
                <li><IoHomeOutline /></li>
                <li><FaUser /></li>
                <li><FaBell /></li>
                <li><FaCalendarAlt /></li>
                <li><FaTrophy /></li>
                <li><IoSettingsOutline /></li>
            </ul>
        </aside>
    );
};

export default Sidebar;
