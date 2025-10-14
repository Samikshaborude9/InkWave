import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Membership from "./pages/Membership";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Stories from "./pages/Stories";
import Stats from "./pages/Stats";
import Following from "./pages/Following";
import PageTransition from "./components/animations/PageTransition";
import PrivateRoute from "./components/PrivateRoutes";
import Write from "./pages/Write";

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
          path="/write"
          element={
        <PrivateRoute>
          <PageTransition>
            <Write />
          </PageTransition>
        </PrivateRoute>
      }
       />

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
          path="/library"
          element={
            <PrivateRoute>
              <PageTransition>
                <Library />
              </PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/stories"
          element={
            <PrivateRoute>
              <PageTransition>
                <Stories />
              </PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <PrivateRoute>
              <PageTransition>
                <Stats />
              </PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/following"
          element={
            <PrivateRoute>
              <PageTransition>
                <Following />
              </PageTransition>
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
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
