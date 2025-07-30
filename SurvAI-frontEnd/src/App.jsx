import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../src/pages/HomePage.jsx";
import FeaturePage from "../src/pages/FeaturePage.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import BlogsPage from "./pages/BlogsPage.jsx";
import ProtectedRoute from "./components/Routing/ProtectedRoute.jsx";
import EntireBlog from './components/BlogComponents/EntireBlog.jsx';
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/feature"
          element={
            <ProtectedRoute>
              <FeaturePage />
            </ProtectedRoute>
          }
        />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blog/:id" element={<EntireBlog />} />
      </Routes>
    </Router>
  );
};

export default App;
