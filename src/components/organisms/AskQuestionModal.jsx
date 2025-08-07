import React, { useState } from 'react';
import TipsBox from '../molecules/TipsBox/TipsBox';
import InputArea from '../atoms/InputArea/InputArea';
import './AskQuestionModal.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AskQuestionModal = () => {

    const [question, setQuestion] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log("getToken", token);
            if (!token) {
                alert("User not logged in");
                return;
            }

            const payload = {
                title: question,
                mediaUrl: ""  
            };

            const response = await axios.post("http://localhost:4100/api/question/add", payload, {
                withCredentials: true 
            });


            console.log("✅ Question submitted:", response.data);
            alert("✅ Question submitted successfully!");

            setQuestion('');
            setIsOpen(false);
            navigate('/home');
        } catch (err) {
            console.error("❌ Error submitting question:", err.response?.data || err.message);
            alert("Error submitting question");
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-button" onClick={handleClose}>
                    <Link to='/home'>&times;</Link>
                </button>
                <h2 className="modal-title">Add Question</h2>
                <TipsBox />
                <InputArea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder='Start your question with "What", "How", "Why", etc.'
                />

                <div className="button-row">
                    <button onClick={() => setQuestion('')} className="cancel-button">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="submit-button">
                        Add question
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AskQuestionModal;
