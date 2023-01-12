
import MainPage from "./components/MainPage";
import CommentPage from "./components/CommentPage";
import { useState } from "react";



function App(): JSX.Element {

  const [pageView,setPageView] = useState<string>("main")
  const [displaySpotId, setDisplaySpotId] = useState(0)
  function selectSpot(selectedSpotId: number) {
    setDisplaySpotId(selectedSpotId);
    setPageView("comment");
    console.log(pageView);
  }

  function backToSpots() {
    setPageView("main")
  }
  return (
    <>
    <div className="header-buttons">
      <button onClick={backToSpots}>spots</button>
      <button>add a spot</button>
    </div>
      <div>
        {pageView=="main" ? (<MainPage handleChangeSpotId={selectSpot}/>):<></>}
      </div>
      <div>
        {pageView=="comment" ? (<CommentPage handleReturnMain={backToSpots}/>):<></>}      
      </div>
    </>
  );
}

export default App;
