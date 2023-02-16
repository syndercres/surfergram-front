import MainPage from "./components/MainPage";
import CommentPage from "./components/CommentPage";
import AddASpot from "./components/AddASpot";
import { Routes, Route,  NavLink } from "react-router-dom";
import NavBar from "./components/NavBar";

function App(): JSX.Element {


  return (
    <>
          <div className="header-buttons">
        <NavLink to=""><button>spots</button></NavLink>
        
          <NavLink to="/add-spot">
          <button>add a spot </button>
          </NavLink>
       
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
