import Nav from "./components/nav/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.scss";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./components/home/Home";
import { TimeModalProvider } from "./context/TimeModalContext";
import Modal from "./components/modal/Modal";
import { PreferenceSettingProvider } from "./context/PreferenceSettingContext";
import { GlobalSettingProvider } from "./context/GlobalSettingContext";

const App: React.FC = () => {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Nav />} />
    //     <Route path="/1" element={<MainSection />} />
    //   </Routes>
    // </Router>
    <ThemeProvider>
      <GlobalSettingProvider>
        <TimeModalProvider>
          <PreferenceSettingProvider>
            <Nav />
            <Home />
          </PreferenceSettingProvider>
        </TimeModalProvider>
      </GlobalSettingProvider>
    </ThemeProvider>
  );
};

export default App;
