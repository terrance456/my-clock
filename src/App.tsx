import Nav from "./components/nav/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.scss";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./components/home/Home";

const App: React.FC = () => {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Nav />} />
    //     <Route path="/1" element={<MainSection />} />
    //   </Routes>
    // </Router>
    <ThemeProvider>
      <Nav />
      <Home />
    </ThemeProvider>
  );
};

export default App;
