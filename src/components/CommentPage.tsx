import axios from "axios";
import { useEffect, useState } from "react";
import "./CommentPage.css";

export interface Icomment {
  comment_id: number;
  spot_id: number;
  name: string;
  comment: string;
  rating: number;
}
interface Props {
  handleReturnMain: () => void;
  spotId: number;
}
const URL = "http://localhost:4006";

export default function CommentPage(props: Props): JSX.Element {
  const [commentList, setCommentList] = useState<Icomment[]>([]);


  const getCommentsFromServer = async () => {
    console.log("fetching comment list from api");
    try {
      const response = await axios.get(URL + "/comments");

      setCommentList(response.data.rows);
      console.log("newly retreived comments",response.data.rows)
 
    } catch (error) {
      console.error("you have an error with spots");
    }
    console.log("finished with getcommentsFromServer");
  };

  useEffect(() => {
    getCommentsFromServer();
  }, [props.spotId]);
  const filteredCommentList =   commentList.filter((comment) => {return comment.spot_id === props.spotId})

  return (
    <div>
      <h1> h1 {props.spotId} props</h1>
      <div className="comment-container">
        {filteredCommentList.map((comment) => {
          return (
            <div className="comment-item" key={comment.comment_id}>
              <h2>{comment.name}</h2>
              <h3>{comment.comment} </h3>
              <p>
                {comment.rating}for spot {comment.spot_id}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
