import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import QuoteListPage from "./components/QuoteListPage";
import CreateQuotePage from "./components/CreateQuotePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/quotes" element={<QuoteListPage />} />
        <Route path="/create-quote" element={<CreateQuotePage />} />
      </Routes>
    </Router>
  );
}

export default App;
