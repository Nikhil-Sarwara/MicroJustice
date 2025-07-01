import React, { Component } from 'react';
import { Container } from 'reactstrap';
import '../../assets/styles/LandingLayout.css'; // Specific styles for LandingLayout

export class LandingLayout extends Component {
    static displayName = 'LandingLayout';

    render() {
        return (
            <div className="landing-layout">
                <header className="landing-header">
                    {/* Often just a logo */}
                    <a href="/">
                        <img src="/path/to/your/full-logo.svg" alt="Your Company Logo" className="landing-logo" />
                    </a>
                    {/* Sometimes a very simple CTA button here, e.g., "Login" or "Get Started" */}
                    {/* <button className="btn btn-primary">Get Started</button> */}
                </header>
                <Container fluid tag="main" className="landing-layout-main">
                    {this.props.children} {/* Hero section, features, testimonials etc. go here */}
                </Container>
                <footer className="landing-footer">
                    <p>&copy; 2025 Your Company.</p>
                    <nav className="landing-footer-nav">
                        <a href="/privacy">Privacy</a> | <a href="/terms">Terms</a> | <a href="/contact">Contact</a>
                    </nav>
                </footer>
            </div>
        );
    }
}