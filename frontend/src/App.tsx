import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Membership from "./pages/Membership";
import Home from "./pages/Home";
import PageTransition from "./components/animations/PageTransition";
import PrivateRoute from "./components/PrivateRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PageTransition>
              <LandingPage />
            </PageTransition>
          }
        />
         <Route path="/membership" element={<Membership />} />
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/signup"
          element={
            <PageTransition>
              <Signup />
            </PageTransition>
          }
        />
        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <PageTransition>
                <Home />
              </PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <PageTransition>
              <Profile />
            </PageTransition>
          }
        />
        <Route
          path="/post/:id"
          element={
            <PageTransition>
              <Post />
            </PageTransition>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
