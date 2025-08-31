import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Homepage from "./components/Homepage";
import BookingPage from "./components/BookingPage";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <header>
        <Nav />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
