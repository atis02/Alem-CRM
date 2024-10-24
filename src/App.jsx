import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LandingPageLayout from "./layouts/LandingPageLayout";
import Account from "./Pages/Account";
import Projects from "./Pages/Projects";
import Employees from "./Pages/Employees";
import EmployeesProfile from "./Pages/EmployeesProfile";
import Standarts from "./Pages/Standarts";
import Main from "./Pages/Main";
import Chat from "./Pages/Chat";
import ProjectDetail from "./Pages/ProjectDetail";
import Document from "./Pages/Document";
import Login from "./layouts/LogIn";
import Regulating from "./Pages/Employees/components/Regulating";
import WorkTime from "./Pages/Employees/components/WorkTime";
import Calendar from "./Pages/Calendar";
function App() {
  const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("CRM_USER");

    if (!isLoggedIn) {
      return <Navigate to="/login" replace />; // Redirect to login on unauthorized access
    }
    return children; // Render child component if logged in
  };
  const user = JSON.parse(localStorage.getItem("CRM_USER"));

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/",
      element: (
        <ProtectedRoute>
          <LandingPageLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Main />,
        },
        {
          path: "/calendar",
          element: <Calendar />,
        },
        {
          path: "/document",
          element: <Document />,
        },
        {
          path: "/account",
          element: <Account />,
        },
        {
          path: "/standarts",
          element: <Standarts />,
        },
        {
          path: "/employees",
          element: <Employees />,
        },
        {
          path: "/employees/:id",
          element: <EmployeesProfile />,
        },
        {
          path: "/settings",
          element: <WorkTime />,
        },
        {
          path: "/employees/regulating",
          element: <Regulating />,
        },
        {
          path: "/projects",
          element: <Projects />,
        },
        {
          path: "/chat",
          element: <Chat />,
        },
        {
          path: "/projects/:id",
          element: <ProjectDetail />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} style={{ minHeight: "100vh" }} />;
}

export default App;
