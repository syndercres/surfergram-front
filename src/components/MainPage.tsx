import axios from "axios";
import { useEffect, useState } from "react";
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

interface Props {
  handleChangeSpotId: (chosenSpot_id: Ispot) => void;
}

function textSummary(text: string, length: number) {
  let returnText = "";

  if (text.length > length) {
    returnText = text.slice(0, length) + "...";
  } else {
    returnText = text;
  }
  return returnText;
}

export default function MainPage(props: Props): JSX.Element {
  const [spotList, setSpotList] = useState<Ispot[]>([]);

  useEffect(() => {
    getSpotsFromServer();
  }, []);
  const getSpotsFromServer = async () => {
    console.log("fetching spot list from api");
    try {
      const response = await axios.get(BackendURL + "/spots");

      setSpotList(response.data.rows);
      console.table(spotList);
    } catch (error) {
      console.error("you have an error with spots");
    }
  };

  return (
    <>
      <div className="spot-container">
        {spotList.map((spot) => {
          return (
            <div className="spot-item" key={spot.spot_id}>
              <h2>{spot.name}</h2>
              <p> {spot.directions} </p>
              <p>{spot.rating}</p>
              <p>{textSummary(spot.description, 60)}</p>
              <button
                onClick={() => {
                  props.handleChangeSpotId(spot);
                }}
              >
                comments
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
