// src/AppRoutes.js

// 1. Keep your existing imports
import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';

// 2. Adjust paths for your page components if needed, or confirm they are correct
//    - Assuming 'pages/Extra/Counter' is correct.
//    - Assuming 'pages/LandingPage/Home' is correct.
//    - Assuming 'pages/ProductPage/LegalQA' is correct.
import { Counter } from "./pages/Extra/Counter";
import { Home } from "./pages/LandingPage/Home";
import { LegalQA } from "./pages/ProductPage/LegalQA";

// 3. Import any new page components you've created that will use different layouts.
//    For example, if you have a specific Login page that needs AuthLayout, import it here.
//    Let's assume you'll create a dedicated login page component.
//    import { LoginPage } from "./pages/Auth/LoginPage"; // Example if you create a separate login page
//    import { TermsOfService } from "./pages/Legal/TermsOfService"; // Example for a simple legal page
//    import { PrivacyPolicy } from "./pages/Legal/PrivacyPolicy"; // Example for a simple legal page


const AppRoutes = [
  {
    // This is your landing page/home page. It likely needs a specific, perhaps simpler, layout
    // or your main DefaultLayout if it's the entry point to the app.
    index: true, // This makes it the default route for the parent (usually '/')
    element: <Home />,
    layout: 'LandingLayout' // Assign the LandingLayout here if it's your marketing home page
    // OR 'DefaultLayout' if it's the main app dashboard/home
  },
  {
    path: '/counter',
    element: <Counter />,
    // For general utility pages like a counter, DefaultLayout is usually appropriate.
    layout: 'DefaultLayout'
  },
  {
    path: '/fetch-legal-questions',
    requireAuth: true,
    element: <LegalQA />,
    // This is a core product feature, so it definitely needs the main app layout.
    layout: 'DefaultLayout'
  },
  // --- Standard Legal Pages (Examples) ---
  // If you add simple pages like Terms or Privacy, they might use the DefaultLayout
  // or a slightly modified DefaultLayout with less navigation, or even a very simple one.
  /*
  {
    path: '/terms',
    element: <TermsOfService />, // You'll need to create this component
    layout: 'DefaultLayout' // Or maybe a more minimal layout if preferred
  },
  {
    path: '/privacy',
    element: <PrivacyPolicy />, // You'll need to create this component
    layout: 'DefaultLayout' // Or maybe a more minimal layout if preferred
  },
  */

  // --- API Authorization Routes ---
  // These routes are handled by your IdentityServer setup.
  // Many of these, especially for login/register, should use the AuthLayout.
  // Since `ApiAuthorizationRoutes` is an array of routes, we need to map over it
  // and assign the AuthLayout to each, if that's the desired behavior.
  ...ApiAuthorzationRoutes.map(route => ({
    ...route, // Spread existing route properties (path, element, etc.)
    // Assign the AuthLayout to all routes coming from ApiAuthorizationRoutes
    // This is crucial for login, register, logout pages to have the correct look.
    layout: 'AuthLayout'
  })),

  // --- 404 Not Found Page (Highly Recommended) ---
  // This should be the absolute LAST route in your array.
  // It catches any paths that didn't match the ones above.
  /*
  {
    path: '*',
    element: <NotFoundPage />, // You'll need to create this component (e.g., in pages/Extra/NotFoundPage.js)
    layout: 'DefaultLayout' // Or a specific 'ErrorLayout' if you make one
  }
  */
];

export default AppRoutes;