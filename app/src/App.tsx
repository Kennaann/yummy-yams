import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Homepage } from "./routes/Homepage"
import { AuthPage } from "./routes/AuthPage"
import { LoginForm } from "./components/forms/LoginFormComponent"
import { RegisterForm } from "./components/forms/RegisterFormComponent"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage Form={LoginForm} />} />
        <Route path="/register" element={<AuthPage Form={RegisterForm} />} />
        <Route path="/yams" element={<div>Yams</div>} />
        <Route path="/leaderboard" element={<div>Leaderboard</div>} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  )
}

export default App
