import axios from "axios";
import { useEffect, useState } from "react";
import "./CommentPage.css";
//--------------------------------------------------------------------------------------------------------------------INTERFACE declarations
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
//--------------------------------------------------------------------------------------------------------------------JSX Element declarations
export default function CommentPage(props: Props): JSX.Element {
  const [commentList, setCommentList] = useState<Icomment[]>([]);
  const [commentSubmit, setCommentSubmit] = useState({
    name: "",
    comment: "",
    rating: 0,
  });


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
//--------------------------------------------------------------------------------------------------------------------POST of a comment
  const postCommentToServer = async (
    spot_id: number,
    name: string,
    comment: string,
    rating: number,
  ) => {
    if (comment.length > 0) {
      try {
        await axios.post(URL + "/comments", {
          spot_id: props.spotId,
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

    postCommentToServer(
      props.spotId,
      commentSubmit.name,
      commentSubmit.comment,
      commentSubmit.rating
    );
    getCommentsFromServer();
  };

  return (
    <div>
                <div className="comment-form">
            {/*-------------------------------------------------------------------------------Describes behaviour of the form to enter comment */}
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
      <h1> comments:</h1>
      <div className="comment-container">
        {filteredCommentList.map((comment) => {
          return (
            <div className="comment-item" key={comment.comment_id}>
              <p>{comment.name}: {comment.comment} - rating: {comment.rating}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
