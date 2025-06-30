import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { Home } from "./components/Home";
import {LegalQA} from "./components/LegalQA";

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
    element: <LegalQA />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
