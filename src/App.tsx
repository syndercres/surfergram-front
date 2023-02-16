import MainPage from "./components/MainPage";
import CommentPage from "./components/CommentPage";
import AddASpot from "./components/AddASpot";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

function App(): JSX.Element {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route index element={<MainPage />} />
        <Route path="comments/:id" element={<CommentPage />} />
        <Route path="/add-spot" element={<AddASpot />} />
      </Routes>
    </>
  );
}

export default App;
