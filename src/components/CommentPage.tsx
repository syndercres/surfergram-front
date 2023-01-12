import axios from "axios";
import { useEffect, useState } from "react";
import "./CommentPage.css"


export interface Icomment{
    comment_id: number,
    spot_id: number,
    name: string,
    comment: string,
    rating: number
}
interface Props {        
    handleReturnMain: () => void;
  }
const URL = "https://surfergram.onrender.com"

export default function CommentPage(props:Props): JSX.Element{


    const [commentList,setCommentList] = useState<Icomment[]>([]);
    const [filterCommentList,setFilterCommentList] = useState<Icomment[]>([]);
    const [commentSubmit, setCommentSubmit] = useState({
        name: "",
        comment: "",
        rating:"",
      });

    const getCommentsFromServer = async () => {
        //   console.log("fetching list from api")
        try {
          const response = await axios.get(URL + "/comments");
          setCommentList(response.data.rows);
        } catch (error) {
          console.error("you have an error with comments");
        }
     };

     useEffect(() => {getCommentsFromServer();console.log(commentList)},[])

    return (<div>
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
    </div>)
}