import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { LegalQuestions } from "./components/LegalQuestions";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-legal-questions',
    requireAuth: true,
    element: <LegalQuestions />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
