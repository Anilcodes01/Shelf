import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { Books } from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import { useAuth } from "./contexts/authContext";
import Layout from "./components/Layout";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Register";
import Profile from "./pages/Profile";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <Outlet /> : <Navigate to="/books" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<BookDetail />} />
          </Route>

          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="*" element={<div>Not found</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
