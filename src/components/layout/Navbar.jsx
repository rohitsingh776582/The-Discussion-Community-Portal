import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SlUserFollowing } from "react-icons/sl";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineQuestionAnswer, MdKeyboardArrowDown } from "react-icons/md";
import { GiSpaceShuttle } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { FiMenu, FiX } from "react-icons/fi";
import ParentComponent from '../Modal/ParentComponent';
import './Navbar.css';
import Profile from '../Profile/Profile';

const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">

                <div className="logo-and-menu">
                    <div className="navbar-logo">
                        Discussion Community Portal
                    </div>

                    {/* Hamburger icon beside logo (mobile only) */}
                    <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </div>

                </div>

                <div className="icon-group">
                    <IoHomeOutline />
                    <SlUserFollowing />
                    {/* <ParentComponent /> */}
                    <GiSpaceShuttle />
                    <IoIosNotifications />
                </div>

            </div>

            <div className="navbar-search">

                <input className="custom-input" placeholder="Search..." />
                <CiSearch className="search-icon" />

            </div>

            <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
                <li >
                    <Link className='Profile' to="/Profile">Profile</Link>
                </li>
                <li className="add-question">
                    <Link to="/askquestion" className="add-question-link">
                        Add Question
                    </Link>
                    <MdKeyboardArrowDown />
                </li>
                <li>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>

    );
};

export default Navbar;
