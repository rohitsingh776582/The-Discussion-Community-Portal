import React, { useState, useEffect } from 'react';
import './Profile.css';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { GiSummits } from "react-icons/gi";
import axios from 'axios';

function Profile() {

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [updatedQuestionText, setUpdatedQuestionText] = useState('');
    const [editingAnserId, setAnserId] = useState(null);
    const [updatedAnswer, setUpdateAnswer] = useState('');
    const [editingQuestionId, setEditingQuestionId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profil, setProfil] = useState(null);


    const [userName, setUserName] = useState('Rohit Kumar');
    const [userCreateDate, setUserCreateDate] = useState('12/12/2025');
    const [userLoginTime, setUserLoginTime] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));



    const ProfileData = async () => {
        try {
            setError(null);
            const res = await axios.get('http://localhost:4100/Myprofile', {
                withCredentials: true,
            });

            setProfil(res.data.data);
            console.log("User Profile Data:", res.data);
            const { user } = res.data;
            if (user) {
                console.log("Name:", user.name);
                console.log("Email:", user.email);
            }

        } catch (error) {

            console.error("Error fetching profile data:", error);
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    setError("Unauthorized. Please log in.");
                } else {
                    setError(`Error: ${error.response?.data?.message || "Something went wrong."}`);
                }
            } else {
                setError("An unexpected error occurred.");
            }
            
        }
    };


    // Function to fetch questions
    const fetchQuestions = async () => {
        try {
            setError(null);
            const res = await axios.get('http://localhost:4100/api/my-question', { withCredentials: true });
            console.log("Fetched Questions Data (raw):", res.data);
            const questionsArray = res.data.data;

            if (Array.isArray(questionsArray)) {
                setQuestions(questionsArray);
            } else {
                console.warn("Questions API did not return an array in .data property:", res.data);
                setQuestions([]);
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
            if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
                setError("Authentication failed for questions. Please log in.");
            } else {
                setError(`Failed to load questions: ${error.message}.`);
            }
        }
    };


    const fetchAnswers = async () => {
        try {
            setError(null);
            const res = await axios.get('http://localhost:4100/api/my-answers', { withCredentials: true });
            console.log("Fetched Answers Data (raw):", res.data);
            const answersArray = res.data.data;
            if (Array.isArray(answersArray)) {
                setAnswers(answersArray);
            } else {
                console.warn("Answers API did not return an array in .data property:", res.data);
                setAnswers([]);
            }
        } catch (error) {
            console.error("Error fetching answers:", error);
            if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
                setError("Authentication failed for answers. Please log in.");
            } else {
                setError(`Failed to load answers: ${error.message}.`);
            }
        }
    };

    useEffect(() => {
        const loadAllData = async () => {
            setLoading(true);
            await Promise.all([
                fetchQuestions(),
                fetchAnswers(),
                ProfileData()
            ]);
            setLoading(false);
        };
        loadAllData();
    }, []);

    const handleEditQuestion = (id, text) => {
        setUpdatedQuestionText(text);
        setEditingQuestionId(id);
    };

    const handleUpdateQuestion = async () => {
        if (!updatedQuestionText.trim() || !editingQuestionId) {
            setError("Question text cannot be empty or no question selected.");
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const res = await axios.put(`http://localhost:4100/api/updatedquestion/${editingQuestionId}`,
                { title: updatedQuestionText },
                { withCredentials: true }
            );
            console.log('Question update response:', res.data);
            await fetchQuestions();
            setUpdatedQuestionText('');
            setEditingQuestionId(null);
            console.log('Question updated successfully!');
        } catch (error) {
            console.error("Error updating question:", error);
            if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
                setError("Authentication failed. Cannot update question.");
            } else {
                setError(`Failed to update question: ${error.message}.`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteQuestion = async (id) => {
        if (!window.confirm("Are you sure you want to delete this question?")) {
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const res = await axios.delete(`http://localhost:4100/api/deletequestion/${id}`, { withCredentials: true }); // Crucial for sending cookies
            console.log('Question delete response:', res.data);
            await fetchQuestions();
            console.log('Question deleted successfully!');
        } catch (error) {
            console.error("Error deleting question:", error);
            if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
                setError("Authentication failed. Cannot delete question.");
            } else {
                setError(`Failed to delete question: ${error.message}.`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateAnswer = async (id, currentText) => {
        const newText = prompt("Update your answer:", currentText);
        if (newText === null || !newText.trim()) {
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const res = await axios.put(`http://localhost:4100/api/updateAnswer/${id}`,
                { answer: newText },
                { withCredentials: true }
            );
            console.log('Answer update response:', res.data);
            await fetchAnswers();
            console.log('Answer updated successfully!');
        } catch (error) {
            console.error("Error updating answer:", error);
            if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
                setError("Authentication failed. Cannot update answer.");
            } else {
                setError(`Failed to update answer: ${error.message}.`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAnswer = async (id) => {
        if (!window.confirm("Are you sure you want to delete this answer?")) {
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const res = await axios.delete(`http://localhost:4100/api/deleteAnswer/${id}`, { withCredentials: true }); // Crucial for sending cookies
            console.log('Answer delete response:', res.data);
            await fetchAnswers();
            console.log('Answer deleted successfully!');
        } catch (error) {
            console.error("Error deleting answer:", error);
            if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
                setError("Authentication failed. Cannot delete answer.");
            } else {
                setError(`Failed to delete answer: ${error.message}.`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container'>
            <div className='sub-container'>
                <div className='profile-section'>
                    <CgProfile className='profile-picture' />

                    <div className="name-and-date">
                        <p>Name : {profil?.name || "Unknown"}</p>
                        <p>
                            Account Created On : {" "}
                            {new Date(profil?.createdAt || "00/00/0000").toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })}
                        </p>
                    </div>
                    <h2 className='home-link'><Link to="/home">Home</Link></h2>
                </div>

                <div className="form-group">
                    <label htmlFor="question" className="form-label">Updated Question</label>
                    <div className='Updated'>
                        <input
                            type="text"
                            id="question"
                            placeholder="Enter your updated question"
                            className="question-input"
                            value={updatedQuestionText}

                            onChange={(e) => setUpdatedQuestionText(e.target.value)}
                        />
                        <button onClick={handleUpdateQuestion} className="submit-button">
                            <GiSummits className="button-icon" />
                        </button>
                    </div>
                </div>

                {loading && <p className="loading-message">Loading data...</p>}
                {error && <p className="error-message">Error: {error}</p>}

                <div className='QuestionAndAnser-card'>
                    <div className='question-entry'>
                        <h2 className='section-title question-title'>Your Questions</h2>
                        {questions.length > 0 ? (
                            questions.map((q) => (
                                <div key={q._id} className='card-entry'>
                                    <p className="card-text">{q.title}</p>
                                    <div className='button-group'>
                                        <div className='AnswerButton'>
                                            <button className='update-button' onClick={() => handleEditQuestion(q._id, q.title)}>
                                                <GrUpdate className="button-icon" />
                                            </button>
                                            <button className='delete-button' onClick={() => handleDeleteQuestion(q._id)}>
                                                <MdDelete className="button-icon" />
                                            </button>
                                        </div>


                                        <div className='Time'>
                                            <p>⏰   {new Date(q.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</p>
                                            <p>📅 {new Date(q.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                            <p>📝 {new Date(q.updatedAt).toLocaleString('en-IN', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            })}</p>
                                        </div>

                                    </div>
                                </div>
                            ))
                        ) : (
                            !loading && !error && <p className="no-data-message">No questions available.</p>
                        )}
                    </div>

                    <div className='answer-entry'>
                        <h2 className='section-title answer-title'>Your Answers</h2>
                        {answers.length > 0 ? (
                            answers.map((a) => (
                                <div key={a._id} className='card-entry'>
                                    <p className="card-text">{a.answer}</p>
                                    <div className='button-group'>
                                        <div className='AnswerButton'>
                                            <button className='update-button' onClick={() => handleUpdateAnswer(a._id, a.answer)}>
                                                <GrUpdate className="button-icon" />
                                            </button>
                                            <button className='delete-button' onClick={() => handleDeleteAnswer(a._id)}>
                                                <MdDelete className="button-icon" />
                                            </button>
                                        </div>

                                        <div className='Time'>
                                            <p>⏰ {new Date(a.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</p>
                                            <p>📅 {new Date(a.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                            <p>📝 {new Date(a.updatedAt).toLocaleString('en-IN', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            })}</p>
                                        </div>

                                    </div>
                                </div>
                            ))
                        ) : (
                            !loading && !error && <p className="no-data-message">No answers available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
