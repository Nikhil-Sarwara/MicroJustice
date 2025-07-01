import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from '../common/NavMenu'; // Assuming NavMenu is in common
import '../../assets/styles/DefaultLayout.css'; // Add some specific styles if needed

export class DefaultLayout extends Component {
    static displayName = 'DefaultLayout'; // Updated display name

    render() {
        return (
            <div className="default-layout">
                <NavMenu />
                <Container tag="main" className="default-layout-main">
                    {this.props.children}
                </Container>
                {/* Optional: A simple footer for default pages */}
                <footer className="default-layout-footer">
                    <p>&copy; 2025 Your Company. All rights reserved.</p>
                </footer>
            </div>
        );
    }
}