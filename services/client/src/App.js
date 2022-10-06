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
import { User } from "./components/pages/user";
import { ErrorPage } from "./components/pages/errorpage";
import { Post } from "./components/pages/post";
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/api/posts" />} />
        <Route path="/api/posts" element={<HomePage />} />
        <Route path="/api/posts/:id" element={<Post />} />
        <Route path="/api/users" element={<UsersPage />} />
        <Route path="/api/users/:id" element={<User />} />
        <Route path="/oops" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
