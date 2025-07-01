import React, { Component } from 'react';
import { Container } from 'reactstrap';
import '../../assets/styles/AuthLayout.css'; // Specific styles for AuthLayout

export class AuthLayout extends Component {
    static displayName = 'AuthLayout';

    render() {
        return (
            <div className="auth-layout">
                <header className="auth-header">
                    {/* You might put a simplified logo or branding here */}
                    <a href="/">
                        <img src="/path/to/your/simple-logo.svg" alt="Your Company Logo" className="auth-logo" />
                    </a>
                </header>
                <Container tag="main" className="auth-layout-main">
                    {this.props.children} {/* Login/Registration form goes here */}
                </Container>
                <footer className="auth-footer">
                    <p>&copy; 2025 Your Company. <a href="/privacy">Privacy Policy</a></p>
                </footer>
            </div>
        );
    }
}