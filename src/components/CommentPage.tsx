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
    spotId:number;
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
        console.log("fetching spot list from api")
      try {
        const response = await axios.get(URL + "/comments");
        console.log(response.data.rows)
        setCommentList(response.data.rows)

        setFilterCommentList(commentList.filter((comment)=> {return comment.spot_id == 2}))

        console.log("filter list",filterCommentList)


      } catch (error) {
        console.error("you have an error with spots");
      }
      };
  

     useEffect(() => {getCommentsFromServer()},[props.spotId])

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