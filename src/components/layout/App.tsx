import { BrowserRouter, Route, Routes } from "react-router";
import "../../styles/App.css";
import MainLayout from "./MainLayout";
import { Home } from "../../features/Home";
import Details from "../../features/Details";
import { Movies } from "../../features/Movies";
import { Tv } from "../../features/Tv";
import ScrollToTop from "./ScrollToTop";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/details/:mediaType/:id" element={<Details />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
