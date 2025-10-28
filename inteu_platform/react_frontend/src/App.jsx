import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/companyside/auth/Login";
import Register from "./pages/companyside/auth/Register";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route — Company Landing Page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/company/login" element={<Login/>}/> 
        <Route path="/company/register" element={<Register/>}/> 

        {/* You can easily add more routes later */}
        {/* <Route path="/company/login" element={<Login />} /> */}
        {/* <Route path="/company/register" element={<Register />} /> */}
        {/* <Route path="/student" element={<StudentPortal />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
