import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
import {User} from "oidc-client";

const defaultQuestions = [
    'I got a traffic ticket, what do I do?',
    'I want to get a divorce, what are the steps?',
    'I got a summons, what do I do?',
    'I want to start a business, what are the requirements?',
    'I want to buy a house, what are the steps?',
    'I want to get a green card, what are the requirements?',
    'I want to get a work visa, what are the requirements?',
    'I want to get a student visa, what are the requirements?',
    'I got a parking ticket, what do I do?',
    'I want to get a loan, what are the requirements?',
];

const defaultCategories = [
    'Traffic',
    'Family',
    'Immigration',
    'Business',
    'Real Estate',
    'Finances',
    'Education',
    'Employment',
    'Criminal',
];

export class LegalQuestions extends Component {
    static displayName = LegalQuestions.name;

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            loading: true,
            // Form state for new question
            newTitle: '',
            newCategory: '',
            posting: false,
            postError: null,
            randomQuestion: '',
            randomCategory: '',
        };
    }

    componentDidMount() {
        this.populateQuestions();
    }

    static renderQuestionsTable(questions) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Posted By</th>
                    <th>Created At</th>
                </tr>
                </thead>
                <tbody>
                {questions.map(q =>
                    <tr key={q.id}>
                        <td>{q.title}</td>
                        <td>{q.category}</td>
                        <td>{q.userId}</td> {/* TODO: replace userId with user name */}
                        <td>{new Date(q.createdAt).toLocaleDateString()}</td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }

    render() {
        const { loading, questions, newTitle, newCategory, posting, postError, randomQuestion, randomCategory } = this.state;

        const contents = loading
            ? <p><em>Loading legal questions...</em></p>
            : questions.length === 0
                ? <p><em>No legal questions found.</em></p>
                : LegalQuestions.renderQuestionsTable(questions);

        return (
            <div>
                <h1 id="tableLabel">Legal Questions</h1>

                {/* New Question Form */}
                <div className="mb-3">
                    <h4>Ask a new legal question</h4>
                    <input
                        type="text"
                        placeholder="Title"
                        value={newTitle}
                        onChange={e => this.setState({ newTitle: e.target.value })}
                        className="form-control mb-2"
                        disabled={posting}
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={newCategory}
                        onChange={e => this.setState({ newCategory: e.target.value })}
                        className="form-control mb-2"
                        disabled={posting}
                    />
                    <button
                        onClick={() => this.postQuestion()}
                        className="btn btn-primary"
                        disabled={posting || !newTitle.trim() || !newCategory.trim()}
                    >
                        {posting ? 'Posting...' : 'Post Question'}
                    </button>
                    <button
                        onClick={() => this.setState({
                            newTitle: defaultQuestions[Math.floor(Math.random() * defaultQuestions.length)],
                            newCategory: defaultCategories[Math.floor(Math.random() * defaultCategories.length)],
                        })}
                        className="btn btn-secondary ml-2"
                    >
                        Random Question
                    </button>
                    {postError && <p className="text-danger mt-2">{postError}</p>}
                </div>

                {/* Questions List */}
                {contents}
            </div>
        );
    }

    async populateQuestions() {
        const token = await authService.getAccessToken();
        const response = await fetch('/api/legalquestion', {
            headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        });

        if (response.ok) {
            const data = await response.json();
            this.setState({ questions: data, loading: false });
        } else {
            this.setState({ loading: false });
            console.error('Failed to fetch legal questions:', response.status);
        }
    }

    async postQuestion() {
        this.setState({ posting: true, postError: null });
        const token = await authService.getAccessToken();

        const { newTitle, newCategory } = this.state;

        try {
            const response = await fetch('/api/legalquestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({
                    title: newTitle.trim(),
                    category: newCategory.trim(),
                    content: '', // Add content field if you want
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to post question: ${response.status} ${errorText}`);
            }

            // Clear form and refresh questions
            this.setState({ newTitle: '', newCategory: '' });
            await this.populateQuestions();
        } catch (error) {
            this.setState({ postError: error.message });
        } finally {
            this.setState({ posting: false });
        }
    }
}