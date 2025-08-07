import React from 'react';
import './TopicsCard.css';
import { useNavigate, Link } from 'react-router-dom';


const TopicsCard = () => {
  const navigate = useNavigate();

  return (
    <div className="topics-container">
      <div className="topics-header">
        <span>Topics you know about</span>
        <button className="edit-icon" title="Edit">✏️</button>
      </div>

      <div className="topics-card">
        <img
          className="topics-image"
          src="https://cdn-icons-png.flaticon.com/512/545/545680.png"
          alt="No topics"
        />
        <h2 className="topics-title">No topics yet</h2>
        <p className="topics-description">
          You’ll get better questions if you add more specific topics.
        </p>
        <button className="add-button">Add topics</button>
      </div>
    </div>
  );
};

export default TopicsCard;
