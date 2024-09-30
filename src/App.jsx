import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LandingPageLayout from "./layouts/LandingPageLayout";
import Account from "./Pages/Account";
import Employees from "./Pages/Employees";
import EmployeesProfile from "./Pages/EmployeesProfile";
import Main from "./Pages/Main";
import Document from "./Pages/Document";
import Login from "./layouts/LogIn";
import Regulating from "./Pages/Employees/components/Regulating";
import WorkTime from "./Pages/Employees/components/WorkTime";
function App() {
  const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("CRM_USER");

    if (!isLoggedIn) {
      return <Navigate to="/login" replace />; // Redirect to login on unauthorized access
    }
    return children; // Render child component if logged in
  };

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
          path: "/document",
          element: <Document />,
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
          path: "/employees/working",
          element: <WorkTime />,
        },
        {
          path: "/employees/regulating",
          element: <Regulating />,
        },
        {
          path: "/account",
          element: <Account />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} style={{ minHeight: "100vh" }} />;
}

export default App;
