import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../../assets/styles/LandingLayout.css'; // Specific styles for LandingLayout
import logo from '../../assets/images/MicroJusticeLogo.png';

export class LandingLayout extends Component {
    static displayName = 'LandingLayout';

    render() {
        return (
            <div className="landing-layout">
                <header className="landing-header">
                    <Container>
                        <Row>
                            <Col xs="12" md="6" className="text-center text-md-left">
                                <a href="/">
                                    <img src={logo} alt="Micro Justice" className="landing-logo" />
                                </a>
                            </Col>
                            <Col xs="12" md="6" className="text-center text-md-right">
                                <a href="/contact" className="btn btn-outline-primary">Get Started</a>
                            </Col>
                        </Row>
                    </Container>
                </header>
                <Container fluid tag="main" className="landing-layout-main">
                    {this.props.children} {/* Hero section, features, testimonials etc. go here */}
                </Container>
                <footer className="landing-footer">
                    <Container>
                        <Row>
                            <Col xs="12" md="6">
                                <p>&copy; 2025 Your Company. All rights reserved.</p>
                            </Col>
                            <Col xs="12" md="6">
                                <nav className="landing-footer-nav">
                                    <a href="/privacy">Privacy</a> | <a href="/terms">Terms</a> | <a href="/contact">Contact</a>
                                </nav>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </div>
        );
    }
}