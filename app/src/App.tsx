import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Homepage } from "./routes/Homepage"
import { AuthPage } from "./routes/AuthPage"
import { LoginForm } from "./components/forms/LoginFormComponent"
import { RegisterForm } from "./components/forms/RegisterFormComponent"
import { YamsPage } from "./routes/YamsPage"
import { LogoutPage } from "./routes/LogoutPage"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/connexion" element={<AuthPage Form={LoginForm} />} />
        <Route path="/inscription" element={<AuthPage Form={RegisterForm} />} />
        <Route path="/deconnexion" element={<LogoutPage />} />
        <Route path="/yams" element={<YamsPage />} />
        <Route path="/leaderboard" element={<div>Leaderboard</div>} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  )
}

export default App
