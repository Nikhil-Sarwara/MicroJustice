// src/App.js

import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import './custom.css';

// Import ALL your layout components
import { DefaultLayout } from './components/layouts/DefaultLayout'; // Renamed import
import { AuthLayout } from './components/layouts/AuthLayout';
import { LandingLayout } from './components/layouts/LandingLayout';

// Create a mapping object for your layouts
const layouts = {
    DefaultLayout: DefaultLayout,
    AuthLayout: AuthLayout,
    LandingLayout: LandingLayout,
    // Add any other layouts here as you create them
};

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, requireAuth, layout, ...rest } = route; // Destructure 'layout'

                    // Determine which layout component to use
                    // If 'layout' is specified in AppRoutes, use it; otherwise, default to DefaultLayout
                    const CurrentLayout = layouts[layout] || DefaultLayout;

                    // Wrap the element with AuthorizeRoute if requireAuth is true
                    const wrappedElement = requireAuth
                        ? <AuthorizeRoute {...rest} element={element} />
                        : element;

                    // Render the route, wrapping the element with the chosen CurrentLayout
                    return (
                        <Route
                            key={index}
                            {...rest}
                            element={<CurrentLayout>{wrappedElement}</CurrentLayout>}
                        />
                    );
                })}
            </Routes>
        );
    }
}