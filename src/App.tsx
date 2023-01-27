import MainPage from "./components/MainPage";
import CommentPage from "./components/CommentPage";
import AddASpot from "./components/AddASpot";
import { Routes, Route,  NavLink } from "react-router-dom";
import NavBar from "./components/NavBar";

function App(): JSX.Element {


  return (
    <>
          <div className="header-buttons">
        <button><NavLink to="">spots</NavLink></button>
        <button>
          <NavLink to="/add-spot">
            add a spot
          </NavLink>
        </button>
      </div>
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route index element={<MainPage />} />
        <Route path="comments/:id" element={<CommentPage/>}/>
        <Route path="/add-spot" element={<AddASpot />} />
      </Routes>


    </>
  );
}

export default App;
