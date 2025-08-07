import React, { useState } from 'react';
import axios from 'axios'; // ✅ Import axios
import './AnswerModal.css';

const AnswerModal = ({ question = "Is artificial intelligence ruining Quora?", questionId, onClose, onAnswerSubmit,name}) => {
    const [answer, setAnswer] = useState('');
    const handlePost = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log("token", token);
            if (!token) {
                alert("User not logged in");
                return;
            }

            const payload = {
                answer,
                questionId
            };

            const response = await axios.post("http://localhost:4100/api/answer/add", payload, {
                withCredentials: true // ✅ send cookies with request
            });

            if (response.status === 200) {
                console.log("✅ Answer submitted:", response.data);
                alert("✅ Answer posted successfully!");
                setAnswer('');
                onAnswerSubmit && onAnswerSubmit(); 
                onClose(); 
            }

        } catch (err) {
            console.error("❌ Error posting answer:", err.response?.data || err.message);
            alert("Error posting answer");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <button className="close-button" onClick={onClose}>&times;</button>
                <div className="user-info">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                        alt="user"
                        className="user-avatar"
                    />
                    <div>
                        <div className="user-name">{name}</div>
                    </div>
                </div>

                <h3 className="question-text">{question}</h3>
                <textarea
                    className="answer-textarea"
                    placeholder="Write your answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                ></textarea>

                <div className="modal-footer">
                    <div className="footer-left">
                        <button className="icon-btn">Aa</button>
                        <button className="icon-btn">📷</button>
                    </div>
                    <div className="footer-right">
                        <button className="icon-btn">i</button>
                        <button className="post-btn" onClick={handlePost}>Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnswerModal;

