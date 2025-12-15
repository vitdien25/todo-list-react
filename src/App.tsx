import { Provider } from "react-redux";
import { store } from "./store";
import HomePage from "./pages/HomePage";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Provider>
  );
}

export default App;
