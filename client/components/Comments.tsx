import {FC, PropsWithChildren, useState} from "react";
import {Comment} from '../interfaces';
import styles from '../styles/Comments.module.css';
import useAuth from "../utils/useAuth";

interface Props {
  comments: Comment[];
}

const Comments: FC<PropsWithChildren<Props>> = ({comments}) => {
  const { isAuthenticated } = useAuth();
  const [openCommentForm, setOpenCommentForm] = useState(false);
  if(comments === undefined) return <></>
  if(comments.length === 0) {
    return <div>No Comments</div>
  }
  // const newComment = ()
  const handleNewCommentButton = () => {
    if(openCommentForm === false ) setOpenCommentForm(true);
    if(openCommentForm === true ) setOpenCommentForm(false);
  }
  return (
    <div>
      <h2>Comments</h2>
      <div className={styles.commentsContainer}>
        {
          comments.map((comment, i) => {
            return (
              <div key={comment.id} className={ comments[comments.length-1].id === comment.id ? 'null' : styles.individualComment}>
                <p className={styles.commentName}>{comment.name}</p>
                <p className={styles.commentUser}>By: {comment.user.fullName}</p>
                <p className={styles.commentBody}>{comment.body}</p>
              </div>
            )
          })
        }
      </div>
      {openCommentForm && 
        <div className={styles.commentForm}>
          <form>
            <div className={styles.commentLabelGroup}>
              <label htmlFor={"commentName"}>Title:</label><br/>
              <input type={"text"} id={"commentName"} name={"commentName"}></input>
            </div>
            <div className={styles.commentLabelGroup}>
              <label htmlFor={"commentBody"}>Body:</label><br/>
              <textarea className={styles.commentBodyInput} id={"commentBody"} name={"commentBody"}></textarea>
            </div>
            <div>
              <button className={styles.button} type="submit">Submit</button>
            </div>
          </form>
        </div>
      }
      {isAuthenticated &&
        <div className={styles.newCommentButton}>
          <button onClick={()=>handleNewCommentButton()}>{!openCommentForm ? 'New Comment' : 'Cancel'}</button>
        </div>
      }
    </div>
  )
}

export default Comments;