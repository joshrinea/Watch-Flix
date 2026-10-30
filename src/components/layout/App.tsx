import { BrowserRouter, Route, Routes } from "react-router";
import "../../styles/App.css";
import MainLayout from "./MainLayout";
import { Home } from "../../features/Home";

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
