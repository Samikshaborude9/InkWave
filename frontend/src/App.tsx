import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import PageTransition from "./components/animations/PageTransition";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
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
