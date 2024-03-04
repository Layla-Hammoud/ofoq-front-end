import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./Context/AuthContext";
import ScrollToTop from "./layouts/ScrollToTop/ScrollToTop";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ScrollToTop />
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
