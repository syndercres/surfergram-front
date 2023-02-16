import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BackendURL } from "../utils/BackendURL";

import "./CommentPage.css";
//--------------------------------------------------------------------------------------------------------------------INTERFACE declarations
export interface Icomment {
  comment_id: number;
  spot_id: number;
  name: string;
  comment: string;
  rating: number;
}


export interface Ispot {
  spot_id: number;
  name: string;
  directions: string;
  rating: number;
  description: string;
}

//--------------------------------------------------------------------------------------------------------------------JSX Element declarations
export default function CommentPage(): JSX.Element {
  const [selectedDisplaySpot, setSelectedDisplaySpot] = useState<Ispot>()
  const [commentList, setCommentList] = useState<Icomment[]>([]);
  const [commentSubmit, setCommentSubmit] = useState({
    name: "",
    comment: "",
    rating: 0,
  });
  const { id } = useParams();

  const callSpot = useCallback( 
    async () => {
      console.log("fetching spot list from api");
      try {
      const response = await axios.get(BackendURL + `/spots/${id}`);

      setSelectedDisplaySpot(response.data.rows[0]);
    
      
      } catch (error) {
        console.error("you have an error with spots");
      }
  },[id])

  const callComments = useCallback(
    async () => {
         console.log("fetching comment list from api");
        try {
          const response = await axios.get(BackendURL + `/comments/${id}`);
    
          setCommentList(response.data.rows);
       
        } catch (error) {
          console.error("you have an error with spots");
        }
        console.log("finished with getcommentsFromServer");
 
    },
    [id],
   );
   
  
 


  useEffect(() => {
    callComments();
    callSpot();
  }, [callSpot,callComments]);

  //--------------------------------------------------------------------------------------------------------------------POST of a comment
  const postCommentToServer = async (
    spot_id: string,
    name: string,
    comment: string,
    rating: number
  ) => {
    if (comment.length > 0) {
      try {
        await axios.post(BackendURL + "/comments", {
          spot_id: id,
          name: name,
          comment: comment,
          rating: rating,
        });
      } catch (error) {
        console.log("error from post");
      }
    } else {
      alert("you must paste something before you submit!");
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //  console.log("submitted", pasteSubmit);
    if(id){
    await postCommentToServer(
      id,
      commentSubmit.name,
      commentSubmit.comment,
      commentSubmit.rating
    );
  }
    if (commentSubmit.rating !== 0) {
      await axios.patch(BackendURL + `/spots/${id}`, {
        rating: commentSubmit.rating,
      });
    }
    callComments();
    callSpot();
  };
if(selectedDisplaySpot){
  return (
    <div>
      <div className="spot-info">
        <h1>{selectedDisplaySpot.name}</h1>
        <p>best conditions to go: {selectedDisplaySpot.directions}</p>
        <p>description: {selectedDisplaySpot.description}</p>
        <p>spot rating: {selectedDisplaySpot.rating}</p>
      </div>
      <div className="comment-form">
        {/*-------------------------------------------------------------------------------Describes behaviour of the form to enter comment */}
        <h1> comments:</h1>
        <form onSubmit={handleCommentSubmit}>
          <input
            placeholder="your name"
            type="text"
            value={commentSubmit.name}
            onChange={(e) =>
              setCommentSubmit({ ...commentSubmit, name: e.target.value })
            }
          />

          <input
            placeholder="comment here"
            type="text"
            value={commentSubmit.comment}
            onChange={(e) =>
              setCommentSubmit({
                ...commentSubmit,
                comment: e.target.value,
              })
            }
          />
          <input
            placeholder="your rating"
            type="number"
            value={commentSubmit.rating}
            onChange={(e) =>
              setCommentSubmit({
                ...commentSubmit,
                rating: e.target.valueAsNumber,
              })
            }
          />
          <input type="submit" />
        </form>
      </div>

      <div className="comment-container">
        {commentList.map((comment) => {
          return (
            <div className="comment-item" key={comment.comment_id}>
              <p>
                {comment.name}: {comment.comment} - rating: {comment.rating}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
  }else{
    return(
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
}
