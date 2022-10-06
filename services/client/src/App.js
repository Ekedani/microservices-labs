import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";

import './App.css';
import { NavBar } from "./components/basic/navbar";
import { HomePage } from './components/pages/homepage';
import { UsersPage } from "./components/pages/userspage";
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/api/posts" />} />
        <Route path="/api/posts" element={<HomePage />} />
        <Route path="/api/users" element={<UsersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
