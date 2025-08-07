import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { ArrowUp, ArrowDown, MessageCircle } from 'lucide-react'; 
import './AnswerCard.css';

const AnswerCard = ({ author, date, answerText, upvotes, comments }) => {
    return (
        <div className="answer-card">
            <div className="answer-author-info">
                <FaUserCircle className='faCircle' />
                <div>
                    <p className="author-name">{author || "Anonymous"}</p>
                    <p className="answer-date">Date: {date || new Date().toLocaleDateString()}</p>
                </div>
            </div>

            <div className="answer-text-content">
                <p>{answerText || "No answer provided yet."}</p>
            </div>

            <div className="answer-actions-bottom">
                <button className="action-btn-answer">
                    <ArrowUp className="icon" />
                    Upvote {upvotes || 0}
                </button>
                <button className="action-btn-answer">
                    <ArrowDown className="icon" />
                    Downvote
                </button>
                <button className="action-btn-answer">
                    <MessageCircle className="icon" />
                    Comment {comments || 0}
                </button>
            </div>
        </div>
    );
};

export default AnswerCard;