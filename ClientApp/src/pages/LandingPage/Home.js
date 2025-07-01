import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap'; // Import necessary Bootstrap components
import { Link } from 'react-router-dom'; // For internal navigation
import '../../assets/styles/HomePage.css'; // Create this CSS file for specific home page styles
import heroImage from '../../assets/images/LegalHandshake.png'; // Example hero image
import trustLogo1 from '../../assets/images/LegalFirmCompanyLogo.png'; // Example trust logos
import trustLogo2 from '../../assets/images/TechCompanyLogo.png';
import trustLogo3 from '../../assets/images/FinancialCompanyLogo.png';


export class Home extends Component {
    static displayName = 'Home'; // Set display name for clarity

    render() {
        return (
            <>
                {/* --- Hero Section --- */}
                <section className="hero-section text-center text-md-left py-5">
                    <Container>
                        <Row className="align-items-center">
                            <Col md="6">
                                <h1 className="hero-headline">Empowering Fair Justice for Everyone.</h1>
                                <p className="hero-subheadline lead mt-3">
                                    MicroJustice provides accessible, affordable legal assistance,
                                    ensuring that quality legal support is within reach for individuals
                                    and small businesses, regardless of their budget.
                                </p>
                                <div className="mt-4">
                                    <Button tag={Link} to="/contact" color="primary" size="lg" className="mr-3 hero-cta">
                                        Get Free Consultation
                                    </Button>
                                    <Button tag={Link} to="/about" color="outline-primary" size="lg" className="hero-secondary-cta">
                                        Learn More
                                    </Button>
                                </div>
                            </Col>
                            <Col md="6" className="d-none d-md-block"> {/* Hidden on small screens */}
                                <img src={heroImage} alt="Legal Handshake" className="img-fluid hero-image" />
                            </Col>
                        </Row>
                        <Row className="trust-logos mt-5 justify-content-center">
                            <Col xs="12">
                                <p className="text-muted">Trusted by:</p>
                            </Col>
                            <Col xs="4" md="2" className="text-center"><img src={trustLogo1} alt="Trust Logo 1" className="img-fluid" style={{ maxHeight: '40px' }} /></Col>
                            <Col xs="4" md="2" className="text-center"><img src={trustLogo2} alt="Trust Logo 2" className="img-fluid" style={{ maxHeight: '40px' }} /></Col>
                            <Col xs="4" md="2" className="text-center"><img src={trustLogo3} alt="Trust Logo 3" className="img-fluid" style={{ maxHeight: '40px' }} /></Col>
                        </Row>
                    </Container>
                </section>

                {/* --- Problem/Solution Section --- */}
                <section className="problem-solution-section py-5 bg-light">
                    <Container>
                        <h2 className="text-center mb-5">Solving Your Toughest Legal Challenges</h2>
                        <Row>
                            <Col md="4" className="text-center mb-4">
                                <div className="icon-circle mb-3"><i className="fa fa-dollar-sign fa-2x"></i></div> {/* Example icon */}
                                <h4>High Costs?</h4>
                                <p>Access quality legal advice without breaking the bank. Our transparent pricing ensures affordability.</p>
                            </Col>
                            <Col md="4" className="text-center mb-4">
                                <div className="icon-circle mb-3"><i className="fa fa-handshake fa-2x"></i></div> {/* Example icon */}
                                <h4>Complex Processes?</h4>
                                <p>We simplify legal jargon and guide you through every step, making justice understandable.</p>
                            </Col>
                            <Col md="4" className="text-center mb-4">
                                <div className="icon-circle mb-3"><i className="fa fa-clock fa-2x"></i></div> {/* Example icon */}
                                <h4>Time Constraints?</h4>
                                <p>Get quick, efficient support online or in-person, fitting seamlessly into your busy schedule.</p>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* --- Features in Detail Section --- */}
                <section className="features-detail-section py-5">
                    <Container>
                        <h2 className="text-center mb-5">How MicroJustice Empowers You</h2>

                        <Row className="align-items-center mb-5">
                            <Col md="6">
                                <img src={heroImage} alt="Feature 1" className="img-fluid rounded shadow-sm" /> {/* Replace with actual feature image */}
                            </Col>
                            <Col md="6">
                                <h3>Personalized Legal Guidance</h3>
                                <p>
                                    Every legal situation is unique. Our platform connects you with experienced legal professionals who
                                    understand your specific needs and provide tailored advice. From initial consultations to case management,
                                    we're with you every step of the way.
                                </p>
                                <Button tag={Link} to="/services" color="link">Explore Services <i className="fa fa-arrow-right"></i></Button>
                            </Col>
                        </Row>

                        <Row className="align-items-center flex-md-row-reverse"> {/* Reverse order for alternating layout */}
                            <Col md="6">
                                <img src={heroImage} alt="Feature 2" className="img-fluid rounded shadow-sm" /> {/* Replace with actual feature image */}
                            </Col>
                            <Col md="6">
                                <h3>Secure & Convenient Platform</h3>
                                <p>
                                    Manage your legal queries, documents, and communication all in one secure, easy-to-use online portal.
                                    Access your case details anytime, anywhere, with confidence in your privacy.
                                </p>
                                <Button tag={Link} to="/platform" color="link">Discover the Platform <i className="fa fa-arrow-right"></i></Button>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* --- Testimonials Section --- */}
                <section className="testimonials-section py-5 bg-light">
                    <Container>
                        <h2 className="text-center mb-5">What Our Clients Say</h2>
                        <Row className="justify-content-center">
                            <Col md="4" className="mb-4">
                                <div className="card h-100 shadow-sm testimonial-card">
                                    <div className="card-body">
                                        <p className="font-italic">"MicroJustice made understanding my legal rights incredibly easy and affordable. Their team was professional and supportive."</p>
                                        <div className="d-flex align-items-center mt-3">
                                            <img src="https://via.placeholder.com/60" alt="Client 1" className="rounded-circle mr-3" /> {/* Replace with actual client image */}
                                            <div>
                                                <strong>Jane Doe</strong>
                                                <div className="text-muted">Small Business Owner</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md="4" className="mb-4">
                                <div className="card h-100 shadow-sm testimonial-card">
                                    <div className="card-body">
                                        <p className="font-italic">"I never thought I could afford legal advice, but MicroJustice proved me wrong. They helped me navigate a complex issue effortlessly."</p>
                                        <div className="d-flex align-items-center mt-3">
                                            <img src="https://via.placeholder.com/60" alt="Client 2" className="rounded-circle mr-3" /> {/* Replace with actual client image */}
                                            <div>
                                                <strong>John Smith</strong>
                                                <div className="text-muted">Individual Client</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md="4" className="mb-4">
                                <div className="card h-100 shadow-sm testimonial-card">
                                    <div className="card-body">
                                        <p className="font-italic">"The online platform is intuitive and secure. Getting fast, reliable legal answers has never been simpler."</p>
                                        <div className="d-flex align-items-center mt-3">
                                            <img src="https://via.placeholder.com/60" alt="Client 3" className="rounded-circle mr-3" /> {/* Replace with actual client image */}
                                            <div>
                                                <strong>Emily White</strong>
                                                <div className="text-muted">Startup Founder</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* --- Final Call to Action --- */}
                <section className="final-cta-section text-center py-5">
                    <Container>
                        <h2>Ready to Experience Justice That's Accessible?</h2>
                        <p className="lead mb-4">Join MicroJustice today and take control of your legal future with confidence.</p>
                        <Button tag={Link} to="/contact" color="primary" size="lg" className="final-cta-button">
                            Start Your Legal Journey Now
                        </Button>
                    </Container>
                </section>
            </>
        );
    }
}