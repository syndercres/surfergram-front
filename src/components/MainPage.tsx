import axios from "axios";
import { useEffect, useState } from "react";
import "./MainPage.css"

export interface Ispot{
    spot_id: number
    name: string,
    directions: string,
    rating: number,
    description: string
}

export interface Icomment{
    comment_id: number,
    spot_id: number,
    name: string,
    comment: string,
    rating: number
}

const URL = "https://surfergram.onrender.com"


export default function MainPage(): JSX.Element{
const [spotList,setSpotList] = useState<Ispot[]>([]);
const [commentList,setCommentList] = useState<Icomment[]>([]);
const [filterCommentList,setFilterCommentList] = useState<Icomment[]>([]);
const [spotSubmit, setSpotSubmit] = useState({
    name: "",
    directions: "",
    rating:"", 
    description:"",
  });
  const [commentSubmit, setCommentSubmit] = useState({
    name: "",
    comment: "",
    rating:"",
  });

  useEffect(() => {
    getSpotsFromServer();
  },[]);
  const getSpotsFromServer = async () => {
      console.log("fetching list from api")
    try {
      const response = await axios.get(URL + "/spots");

      setSpotList(response.data.rows);
      console.table(spotList)
    } catch (error) {
      console.error("you have an error with spots");
    }
    };
      const getCommentsFromServer = async () => {
        //   console.log("fetching list from api")
        try {
          const response = await axios.get(URL + "/comments");
          setCommentList(response.data.rows);
        } catch (error) {
          console.error("you have an error with comments");
        }


  };
  const handleSpotClick = (spot_id:number) => {
    console.log(spot_id)
    getCommentsFromServer()
    console.log(commentList)
  }

    return(
    <>
    <button onClick={getSpotsFromServer}>get spots</button>
    <div className="spot-container">
        {spotList.map((spot) => {
            return(
                <div className="spot-item" key={spot.spot_id}>
                    <h2>{spot.name}</h2>
                    <h3>{spot.directions} {spot.rating}</h3>
                    <p>{spot.description}</p>
                    <button onClick={()=>{handleSpotClick(spot.spot_id)}}>comments</button>
                </div>
            )
        })}
    </div>
    <div className="comment-container">
    {commentList.map((comment) => {
            return(
                <div className="comment-item" key={comment.comment_id}>
                    <h2>{comment.name}</h2>
                    <h3>{comment.comment} </h3>
                    <p>{comment.rating}</p>
                </div>
            )
        })}
    </div>
    </>
    )
}