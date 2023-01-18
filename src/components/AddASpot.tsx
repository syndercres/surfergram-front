import axios from "axios";
import { useEffect, useState } from "react";
import CommentPage from "./CommentPage";
import "./MainPage.css";

export interface Ispot {
  spot_id: number;
  name: string;
  directions: string;
  rating: number;
  description: string;
}


export default function AddASpot():JSX.Element{
    const [spotSubmit, setSpotSubmit] = useState({
        name: "",
        directions:"",
        rating: 0,
        description:"",
      });

    const postSpotToServer = async (
        
        name: string,
        directions: string,
        rating: number,
        description:string,

      ) => {
        if (name.length > 0) {
          try {
            await axios.post(URL + "/spots", {
              name: name,
              directions: directions,
              rating: rating,
              description:description,
            });
          } catch (error) {
            console.log("error from post");
          }
        } else {
          alert("you must paste something before you submit!");
        }
      };

    const handleSpotSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //  console.log("submitted", pasteSubmit);
    
        postSpotToServer(
            spotSubmit.name,
            spotSubmit.directions,
            spotSubmit.rating,
            spotSubmit.description,
        );
        
      };
    return(
        <div className="comment-form">
        {/*-------------------------------------------------------------------------------Describes behaviour of the form to enter comment */}
        <form onSubmit={handleSpotSubmit}>
          <input
            placeholder="spot name"
            type="text"
            value={spotSubmit.name}
            onChange={(e) =>
              setSpotSubmit({ ...spotSubmit, name: e.target.value })
            }
          />

          <input
            placeholder="comment here"
            type="text"
            value={spotSubmit.directions}
            onChange={(e) =>
              setSpotSubmit({
                ...spotSubmit,
                directions: e.target.value,
              })
            }
          />
           <input
            placeholder="your rating"
            type="number"
            value={spotSubmit.rating}
            onChange={(e) =>
              setSpotSubmit({
                ...spotSubmit,
                rating: e.target.valueAsNumber,
              })
            }
          />
          <input type="submit" />
        </form>
      </div>
    )
}