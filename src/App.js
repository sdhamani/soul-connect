import Login from "./components/login/Login";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import HomePage from "./components/homepage/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <PrivateRoute path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
