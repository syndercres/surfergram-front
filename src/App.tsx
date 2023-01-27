import MainPage from "./components/MainPage";
import CommentPage, { Ispot } from "./components/CommentPage";
import AddASpot from "./components/AddASpot";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

function App(): JSX.Element {
  const [pageView, setPageView] = useState<"comment" | "main"| "add-spot">("main");
  const [displaySpot, setDisplaySpot] = useState<Ispot>({spot_id:1, name:"no spot", description:"",rating:0,directions:"" });
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
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<NavBar/>}/>
          <Route index element={<MainPage handleChangeSpotId={selectSpot} />} />
          <Route path="comments/:id" element={<CommentPage displaySpot={displaySpot} handleReturnMain={backToSpots} />} />
          <Route path="/add-spot" element={<AddASpot />} />

      </Routes>
    </BrowserRouter>

      <div className="header-buttons">
        <button onClick={backToSpots}>spots</button>
        <button onClick={()=> setPageView("add-spot")}>add a spot</button>
      </div>
      <div>
        {pageView === "main" ? (
          <MainPage handleChangeSpotId={selectSpot} />
        ) : (
          <></>
        )}
      </div>
      <div>
        {pageView === "comment" ? (
          <CommentPage displaySpot={displaySpot} handleReturnMain={backToSpots} />
        ) : (
          <></>
        )}
      </div>
      <div>
        {pageView === "add-spot" ? (
          <AddASpot />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default App;
