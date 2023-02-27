import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { BackendURL } from "../utils/BackendURL";
import { Icomment } from "./CommentPage";


export default function RecentComments():JSX.Element{

    const [recentCommentList, setRecentCommentList] = useState<Icomment[]>([]);

    const callRecentComments = useCallback(async () => {
        console.log("fetching comment list from api");
        try {
          const response = await axios.get(BackendURL + `/recent-comments`);
    
          setRecentCommentList(response.data.rows);
        } catch (error) {
          console.error("you have an error with spots");
        }
        console.log("finished with getcommentsFromServer");
      }, []);

      useEffect(() => {
        callRecentComments();
    
      }, [callRecentComments]);

    return(
        <div>
        {recentCommentList.map((comment) => {
            return (
              <div className="comment-item" key={comment.comment_id}>
                <p>
                  {comment.name}: {comment.comment}{" "}
                  {comment.rating !== 0 ? (
                    <p>gave a rating of: {comment.rating}</p>
                  ) : (
                    <></>
                  )}
                </p>
              </div>
            );
          })}
        </div>
    )
}