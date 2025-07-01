import React, { Component } from 'react';
import authService from '../../components/api-authorization/AuthorizeService';
// import '../../assets/styles/LegalQA.css'; // Optional: for specific styles for LegalQA page

export class LegalQA extends Component {
    static displayName = 'LegalQA'; // Set display name for debugging

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            loading: true,
            error: null,
            answerInputs: {}, // Stores input values for each question's answer textarea
            postingId: null,  // Tracks which question is currently being answered (for loading state)
        };

        // Bind event handlers to the class instance
        this.loadQuestions = this.loadQuestions.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.postAnswer = this.postAnswer.bind(this);
    }

    // Equivalent of useEffect(() => { loadQuestions() }, [])
    componentDidMount() {
        this.loadQuestions();
    }

    async loadQuestions() {
        this.setState({ loading: true, error: null }); // Reset error on new load attempt
        try {
            const token = await authService.getAccessToken();
            const res = await fetch('/api/legalquestion', {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });

            if (res.ok) {
                const data = await res.json();
                this.setState({ questions: data, loading: false });
            } else {
                const errorText = await res.text();
                throw new Error(`Failed to load questions: ${res.status} - ${errorText}`);
            }
        } catch (err) {
            console.error("Error loading questions:", err);
            this.setState({ error: err.message || 'Failed to load questions.', loading: false });
        }
    }

    handleInputChange(questionId, value) {
        // Update the answerInputs state for a specific question ID
        this.setState(prevState => ({
            answerInputs: {
                ...prevState.answerInputs,
                [questionId]: value
            }
        }));
    }

    async postAnswer(questionId) {
        const content = (this.state.answerInputs[questionId] || '').trim();
        if (!content) return; // Don't post empty answers

        this.setState({ postingId: questionId, error: null }); // Set posting state for the specific question

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

            // Clear the input for the posted question
            this.setState(prevState => ({
                answerInputs: {
                    ...prevState.answerInputs,
                    [questionId]: ''
                }
            }));

            await this.loadQuestions(); // Refresh questions and answers after successful post
        } catch (err) {
            console.error("Error posting answer:", err);
            this.setState({ error: err.message || 'Failed to post answer.' });
        } finally {
            this.setState({ postingId: null }); // Reset posting state regardless of success or failure
        }
    }

    render() {
        const { questions, loading, error, answerInputs, postingId } = this.state;

        if (loading) {
            return <p>Loading questions...</p>;
        }

        if (error) {
            return <p className="text-danger">Error: {error}</p>;
        }

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
                                <h6 className="text-muted">
                                    {q.category} | by {q.userName} on {new Date(q.createdAt).toLocaleDateString()}
                                </h6>
                                {q.content && <p className="mt-2">{q.content}</p>}

                                <hr />

                                <h6 className="mb-2">Answers ({q.answers.length})</h6>
                                {q.answers.length > 0 ? (
                                    q.answers.map(a => (
                                        <div key={a.id} className="mb-3">
                                            <div>
                                                <strong>{a.userName}</strong>:
                                            </div>
                                            <div>{a.content}</div>
                                            <small className="text-muted">
                                                {new Date(a.createdAt).toLocaleString()}
                                            </small>
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
                      onChange={e => this.handleInputChange(q.id, e.target.value)}
                      disabled={postingId === q.id}
                  />
                                    <button
                                        className="btn btn-primary mt-2"
                                        onClick={() => this.postAnswer(q.id)}
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
}