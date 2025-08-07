import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Admin = () => {
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [monthlyData, setMonthlyData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [AdminProfile, setAdmin] = useState("Rohit Singh");

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    useEffect(() => {
        fetchQuestions();
        fetchAnswers();
        GetAdmin();
    }, []);

    useEffect(() => {
        if (questions.length || answers.length) {
            const stats = generateMonthlyStats(questions, answers);
            setMonthlyData(stats);
        }
    }, [questions, answers]);

    const fetchQuestions = async () => {
        try {
            const res = await axios.get('http://localhost:4100/api/questions', { withCredentials: true });
            const data = res.data.data || [];
            setQuestions(data);
            data.forEach(q => {
                if (q.askedBy?._id && !userDetails[q.askedBy._id]) {
                    fetchUserDetails(q.askedBy._id);
                }
            });
        } catch (err) {
            console.error("Error fetching questions:", err);
        }
    };

    const fetchAnswers = async () => {
        try {
            const res = await axios.get('http://localhost:4100/api/getAllAnswer', { withCredentials: true });
            const data = res.data.data || [];
            setAnswers(data);
            data.forEach(a => {
                if (a.answeredBy?._id && !userDetails[a.answeredBy._id]) {
                    fetchUserDetails(a.answeredBy._id);
                }
            });
        } catch (err) {
            console.error("Error fetching answers:", err);
        }
    };

    const fetchUserDetails = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:4100/api/getName_and_Email/${userId}`, { withCredentials: true });
            setUserDetails(prev => ({ ...prev, [userId]: res.data }));
        } catch (err) {
            console.error(`Error fetching user (${userId}) info:`, err);
        }
    };

    const handleDeleteQuestion = async (id) => {
        if (!window.confirm("Are you sure you want to delete this question?")) return;
        try {
            setLoading(true);
            setError(null);
            await axios.delete(`http://localhost:4100/api/deletequestion/${id}`, { withCredentials: true });
            await fetchQuestions();
        } catch (error) {
            console.error("Error deleting question:", error);
            setError("Failed to delete question.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAnswer = async (id) => {
        if (!window.confirm("Are you sure you want to delete this answer?")) return;
        try {
            setLoading(true);
            setError(null);
            await axios.delete(`http://localhost:4100/api/deleteAnswer/${id}`, { withCredentials: true });
            await fetchAnswers();
        } catch (error) {
            console.error("Error deleting answer:", error);
            setError("Failed to delete answer.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user and their data?")) return;
        try {
            setLoading(true);
            setError(null);
            await axios.delete(`http://localhost:4100/api/deleteUserAndData/${id}`, { withCredentials: true });
            await fetchAnswers();
            await fetchQuestions();
            window.location.reload();
        } catch (error) {
            console.error("Error deleting user:", error);
            setError("Failed to delete user.");
        } finally {
            setLoading(false);
        }
    };

    // user get 
    const GetAdmin = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await axios.get('http://localhost:4100/Myprofile', { withCredentials: true });
            console.log("data", res.data.data);
            setAdmin(res.data.data);
        }
        catch (err) {
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
    }


    const users = Object.keys(userDetails).length;
    const questionCount = questions.length;
    const answerCount = answers.length;
    const maxCount = Math.max(users, questionCount, answerCount) || 1;
    const percent = (val) => ((val / maxCount) * 100).toFixed(1);

    const generateMonthlyStats = (questions, answers) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const stats = months.map(name => ({ name, questions: 0, answers: 0 }));
        questions.forEach(q => stats[new Date(q.createdAt).getMonth()].questions++);
        answers.forEach(a => stats[new Date(a.createdAt).getMonth()].answers++);
        return stats;
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <header className="dashboard-header">
                    <div>
                        <h1 className="common">Hello {AdminProfile?.name} 👋</h1>
                        {/* <p className="box-paraGraph"><strong>Date:</strong> {new Date().toLocaleDateString('en-GB')}</p> */}
                        <p className="box-paraGraph">
                            <strong>Date :</strong>{" "}
                            {new Date(AdminProfile?.createdAt).toLocaleString("en-GB", {
                                day: "2-digit", month: "long", year: "numeric",
                                hour: "2-digit", minute: "2-digit", hour12: true
                            })}
                        </p>
                    </div>
                    <button onClick={handleLogout}>Logout</button>
                </header>

                <section className="top-cards">
                    <div className="card stat">
                        <p className="box-paraGraph"><strong>Total Users</strong></p>
                        <h2 className="common">{users}</h2>
                    </div>
                    <div className="card stat">
                        <p className="box-paraGraph"><strong>Total Questions</strong></p>
                        <h2 className="common">{questionCount}</h2>
                    </div>
                    <div className="card stat">
                        <p className="box-paraGraph"><strong>Total Answers</strong></p>
                        <h2 className="common">{answerCount}</h2>
                    </div>
                </section>

                <section className="charts-row">

                    <div className="card chart">
                        <h3 className="common">Distribution</h3>
                        <div className="circle-charts">

                            <div style={{ width: 100 }}>
                                <CircularProgressbar value={percent(users)} text={`${percent(users)}%`} styles={buildStyles({ pathColor: '#00bcd4', textColor: '#fff' })} />
                                <p className="box-paraGraph"><strong>Users</strong></p>
                            </div>

                            <div style={{ width: 100 }}>
                                <CircularProgressbar value={percent(questionCount)} text={`${percent(questionCount)}%`} styles={buildStyles({ pathColor: '#ffc107', textColor: '#fff' })} />
                                <p className="box-paraGraph"><strong>Questions</strong></p>
                            </div>

                            <div style={{ width: 100 }}>
                                <CircularProgressbar value={percent(answerCount)} text={`${percent(answerCount)}%`} styles={buildStyles({ pathColor: '#4caf50', textColor: '#fff' })} />
                                <p className="box-paraGraph"><strong>Answers</strong></p>
                            </div>
                            
                        </div>
                    </div>

                    <div className="card chart">
                        <h3 className="common">Monthly Stats</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={monthlyData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="questions" fill="#8884d8" />
                                <Bar dataKey="answers" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </section>

                <div className="boxContnear">
                    {Object.entries(userDetails).map(([id, user]) => (
                        <div className="box userbox" key={id}>
                            <p className="box-paraGraph"><strong>User</strong></p>
                            <p className="box-paraGraph"><strong>Name :</strong> {user.name}</p>
                            <p className="box-paraGraph"><strong>Email :</strong> {user.email}</p>
                            <p className='box-paraGraph'>
                                <strong>Date:</strong>{" "}
                                {new Date(user.createdAt).toLocaleString("en-GB", {
                                    day: "2-digit", month: "long", year: "numeric",
                                    hour: "2-digit", minute: "2-digit", hour12: true
                                })}
                            </p>
                            <button id='userButton' onClick={() => handleDeleteUser(id)}>Delete</button>
                        </div>
                    ))}

                    {questions.map(q => (
                        <div className="box" key={q._id}>
                            <p className="box-paraGraph"><strong>Question</strong></p>
                            <p className="box-paraGraph"><strong>Name :</strong> {q.askedBy?.name || 'Anonymous'}</p>
                            <p className="box-paraGraph"><strong>Email :</strong> {userDetails[q.askedBy?._id]?.email || 'Unknown'}</p>
                            <p className="box-paraGraph"><strong>Question :</strong> {q.title}</p>
                            <p className="box-paraGraph">
                                <strong>Date :</strong>{" "}
                                {new Date(q.createdAt).toLocaleString("en-GB", {
                                    day: "2-digit", month: "long", year: "numeric",
                                    hour: "2-digit", minute: "2-digit", hour12: true
                                })}
                            </p>
                            <button onClick={() => handleDeleteQuestion(q._id)}>Delete</button>
                        </div>
                    ))}

                    {answers.map(a => (
                        <div className="box" key={a._id}>
                            <p className="box-paraGraph"><strong>Answer</strong></p>
                            <p className="box-paraGraph"><strong>Name:</strong> {a.answeredBy?.name || 'Anonymous'}</p>
                            <p className="box-paraGraph"><strong>Email:</strong> {userDetails[a.answeredBy?._id]?.email || 'Unknown'}</p>
                            <p className="box-paraGraph"><strong>Answer:</strong> {a.answer}</p>
                            <p className="box-paraGraph">
                                <strong>Date :</strong>{" "}
                                {new Date(a.createdAt).toLocaleString("en-GB", {
                                    day: "2-digit", month: "long", year: "numeric",
                                    hour: "2-digit", minute: "2-digit", hour12: true
                                })}
                            </p>
                            <button onClick={() => handleDeleteAnswer(a._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin;
