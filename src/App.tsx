import MainPage from "./components/MainPage";
import CommentPage, { Ispot } from "./components/CommentPage";
import AddASpot from "./components/AddASpot";
import { useState } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import NavBar from "./components/NavBar";

function App(): JSX.Element {
  const [pageView, setPageView] = useState<"comment" | "main" | "add-spot">(
    "main"
  );
  const [displaySpot, setDisplaySpot] = useState<Ispot>({
    spot_id: 1,
    name: "no spot",
    description: "",
    rating: 0,
    directions: "",
  });
  function selectSpot(selectedDisplaySpot: Ispot) {
    setDisplaySpot(selectedDisplaySpot);
    setPageView("comment");
    console.log(pageView);
  }

  function backToSpots() {
    setPageView("main");
  }
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
        <Route index element={<MainPage handleChangeSpotId={selectSpot} />} />
        <Route path="comments/:id" element={<CommentPage/>}/>
        <Route path="/add-spot" element={<AddASpot />} />
      </Routes>


    </>
  );
}

export default App;
