import React, { useState, useEffect } from 'react';
import authService from './api-authorization/AuthorizeService';

export function LegalQA() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [answerInputs, setAnswerInputs] = useState({});
    const [postingId, setPostingId] = useState(null);

    useEffect(() => {
        loadQuestions();
    }, []);

    async function loadQuestions() {
        setLoading(true);
        const token = await authService.getAccessToken();
        const res = await fetch('/api/legalquestion', {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        });

        if (res.ok) {
            const data = await res.json();
            setQuestions(data);
        } else {
            setError('Failed to load questions');
        }

        setLoading(false);
    }

    const handleInputChange = (questionId, value) => {
        setAnswerInputs(prev => ({ ...prev, [questionId]: value }));
    };

    async function postAnswer(questionId) {
        const content = (answerInputs[questionId] || '').trim();
        if (!content) return;

        setPostingId(questionId);
        setError(null);

        try {
            const token = await authService.getAccessToken();
            const res = await fetch('/api/legalanswer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ questionId, content })
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Error ${res.status}: ${text}`);
            }

            setAnswerInputs(prev => ({ ...prev, [questionId]: '' }));
            await loadQuestions(); // refresh the questions + answers
        } catch (err) {
            setError(err.message);
        }

        setPostingId(null);
    }

    if (loading) return <p>Loading questions...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container mt-4">
            <h2>Legal Questions & Answers</h2>

            {questions.length === 0 ? (
                <p>No legal questions found.</p>
            ) : (
                questions.map(q => (
                    <div key={q.id} className="card my-3">
                        <div className="card-body">
                            <h5 className="card-title">{q.title}</h5>
                            <h6 className="text-muted">{q.category} | by {q.userName} on {new Date(q.createdAt).toLocaleDateString()}</h6>
                            {q.content && <p className="mt-2">{q.content}</p>}

                            <hr />

                            <h6 className="mb-2">Answers ({q.answers.length})</h6>
                            {q.answers.length > 0 ? (
                                q.answers.map(a => (
                                    <div key={a.id} className="mb-3">
                                        <div><strong>{a.userName}</strong>:</div>
                                        <div>{a.content}</div>
                                        <small className="text-muted">{new Date(a.createdAt).toLocaleString()}</small>
                                        <hr />
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted">No answers yet.</p>
                            )}

                            {/* Answer form */}
                            <div className="mt-3">
                                <textarea
                                    className="form-control"
                                    placeholder="Write your answer..."
                                    rows="3"
                                    value={answerInputs[q.id] || ''}
                                    onChange={e => handleInputChange(q.id, e.target.value)}
                                    disabled={postingId === q.id}
                                />
                                <button
                                    className="btn btn-primary mt-2"
                                    onClick={() => postAnswer(q.id)}
                                    disabled={postingId === q.id || !(answerInputs[q.id] || '').trim()}
                                >
                                    {postingId === q.id ? 'Posting...' : 'Submit Answer'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
