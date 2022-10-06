import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";

import './App.css';
import { HomePage } from './components/pages/homepage';
import { UsersPage } from "./components/pages/userspage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/feed" />} />
        <Route path="/feed" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
