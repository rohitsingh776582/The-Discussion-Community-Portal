import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './QuestionCard.css';
import { Star, Rss, X, ArrowDown } from 'lucide-react';
import { FaUserCircle } from "react-icons/fa";
import ParentComponent from '../Modal/ParentComponent';

const QuestionCard = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get("http://localhost:4100/api/questions", {
                    withCredentials: true
                });

                console.log("response",response.data.data);

                let fetchedQuestions = [];

                if (Array.isArray(response.data?.data)) {
                    fetchedQuestions = response.data.data;
                } else if (Array.isArray(response.data?.Objectdata)) {
                    fetchedQuestions = response.data.Objectdata;
                } else if (Array.isArray(response.data)) {
                    fetchedQuestions = response.data;
                } else {
                    console.warn("⚠️ Unexpected data structure:", response.data);
                }
                const sortedQuestions = fetchedQuestions.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );

                setQuestions(sortedQuestions);

                // Fetch answers for each question
                sortedQuestions.forEach(async (q) => {
                    try {
                        const ansRes = await axios.get(
                            `http://localhost:4100/api/answers/${q._id}`,
                            { withCredentials: true }
                        );
                        setAnswers((prev) => ({
                            ...prev,
                            [q._id]: ansRes.data?.data || []
                        }));
                    } catch (err) {
                        console.error(`❌ Failed to fetch answers for question ${q._id}`, err);
                    }
                });

            } catch (error) {
                console.error("❌ Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, [refresh]);

    return (
        <>
            {questions.length > 0 ? (
                questions.map((q) => (
                    <div className="question-card" key={q._id}>
                        {/* Top Label */}
                        <div className="question-label">
                            <Star className="icon star" />
                            Questions for you
                        </div>

                        {/* Author Info */}
                        <div className="answer-author">
                            <FaUserCircle className="faCircle" />
                            <div className="Show_the_Anse">
                                <p>{q.askedBy?.name || "Anonymous"}</p>
                                <p>
                                    Date:{" "}
                                    {new Date(q.createdAt).toLocaleString("en-GB", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Question Text */}
                        <div className="question-text">
                            <p>{q.title}</p>
                        </div>

                        <p className="meta-info">
                            {answers[q._id]?.length || 0} answers · Last followed just now
                        </p>

                        {/* Actions */}
                        <div className="question-actions">
                            <div className="action-btn">
                                <ParentComponent
                                    questionId={q._id}
                                    question={q.title}
                                    onAnswerSubmit={() => setRefresh(prev => !prev)}
                                    name={q.askedBy?.name}
                                />
                            </div>

                            <button className="action-btn">
                                <Rss className="icon" /> Follow · 1
                            </button>
                            <button className="action-btn">
                                <X className="icon" /> Pass
                            </button>
                            <ArrowDown className="icon arrow" />
                        </div>

                        {/* Answer Section */}
                        <div className="answer-section">
                            {answers[q._id]?.length > 0 ? (
                                answers[q._id].map((ans, i) => (
                                    <div className="answer" key={ans._id || i}>
                                        <div className="answerAndcircle">
                                            <FaUserCircle className="faCircleAnser" />
                                            <div>
                                                <p><strong>{ans.answeredBy?.name || 'Anonymous'}</strong></p>
                                                <p><strong>
                                                    Date: {new Date(ans.createdAt).toLocaleString("en-GB", {
                                                        day: "2-digit",
                                                        month: "long",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true
                                                    })}
                                                </strong></p>
                                            </div>
                                        </div>
                                        <div className="AnswerThequestion">
                                            <p>{ans.answer}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="no-answer">No answers yet.</p>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p>No questions to display or still loading...</p>
            )}
        </>
    );
};

export default QuestionCard;




