import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BackendURL } from "../utils/BackendURL";

import "./MainPage.css";

export interface Ispot {
  spot_id: number;
  name: string;
  directions: string;
  rating: number;
  description: string;
}

// function textSummary(text: string, length: number) {
//   let returnText = "";

//   if (text.length > length) {
//     returnText = text.slice(0, length) + "...";
//   } else {
//     returnText = text;
//   }
//   return returnText;
// }

export default function MainPage(): JSX.Element {
  const [spotList, setSpotList] = useState<Ispot[]>([]);

  const callSpots = useCallback(async () => {
    console.log("fetching spot list from api");
    try {
      const response = await axios.get(BackendURL + "/spots");

      setSpotList(response.data.rows);
    } catch (error) {
      console.error("you have an error with spots");
    }
  }, []);
  useEffect(() => {
    callSpots();
  }, [callSpots]);

  return (
    <>
      <div className="spot-container">
        {spotList.map((spot) => {
          return (
            <div className="spot-item" key={spot.spot_id}>
              <h2>{spot.name}</h2>
              <p> {spot.directions} </p>
              <p>{Number(spot.rating).toFixed(1)}</p>

              <NavLink to={`comments/${spot.spot_id}`}>
                {" "}
                <button>comments</button>
              </NavLink>
            </div>
          );
        })}
      </div>
    </>
  );
}
