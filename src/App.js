import Login from "./components/login/Login";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import HomePage from "./components/homepage/HomePage";
import UserPosts from "./components/userposts/UserPosts";
import PageNotFound from "./components/pagenotfound/PageNotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <PrivateRoute path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <PrivateRoute path="/usersposts" element={<UserPosts />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
