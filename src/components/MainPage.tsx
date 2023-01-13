import axios from "axios";
import { useEffect, useState } from "react";
import "./MainPage.css";

export interface Ispot {
  spot_id: number;
  name: string;
  directions: string;
  rating: number;
  description: string;
}

interface Props {
  handleChangeSpotId: (chosenSpot_id: number) => void;
}

const URL = "http://localhost:4006";

export default function MainPage(props: Props): JSX.Element {
  const [spotList, setSpotList] = useState<Ispot[]>([]);

  useEffect(() => {
    getSpotsFromServer();
  }, []);
  const getSpotsFromServer = async () => {
    console.log("fetching spot list from api");
    try {
      const response = await axios.get(URL + "/spots");

      setSpotList(response.data.rows);
      console.table(spotList);
    } catch (error) {
      console.error("you have an error with spots");
    }
  };

  return (
    <>
      <button onClick={getSpotsFromServer}>get spots</button>
      <div className="spot-container">
        {spotList.map((spot) => {
          return (
            <div className="spot-item" key={spot.spot_id}>
              <h2>{spot.name}</h2>
              <h3>
                {spot.directions} {spot.rating}
              </h3>
              <p>{spot.description}</p>
              <button
                onClick={() => {
                  props.handleChangeSpotId(spot.spot_id);
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
