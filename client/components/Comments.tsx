import {FC, PropsWithChildren, SyntheticEvent, useState} from "react";
import {Comment} from '../interfaces';
import styles from '../styles/Comments.module.css';
import useAuth from "../utils/useAuth";
import useOpinions from "../utils/useOpinions";
import { useRouter } from 'next/router';

interface Props {
    mediaId: number;
    mediaType: string;
    mediaComments: Comment[];
}

const Comments: FC<PropsWithChildren<Props>> = ({mediaId, mediaType, mediaComments}) => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { newComment, removeComment, commentsReceiver, comments, theresMoreComments, loadMoreComments } = useOpinions()

  const [openCommentForm, setOpenCommentForm] = useState(false);
  commentsReceiver(mediaComments)
  
  const handleNewCommentButton = () => !openCommentForm ? setOpenCommentForm(true) : setOpenCommentForm(false);

  const NewCommentButton: FC = () => {
    return (
      <div className={styles.newCommentButton}>
        <button onClick={()=>handleNewCommentButton()}>{!openCommentForm ? 'New Comment' : 'Cancel'}</button>
      </div>
    )
  }

  const handleCommentRemove = async (commentId: string) => {
    await removeComment(commentId, mediaType, mediaId);
    router.reload()
  }

  const handleCommentSubmit = async(e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      commentName: {value: string},
      commentBody: {value: string}
    }
    const name = target.commentName.value;
    const body = target.commentBody.value;
    const currentRoute = router.asPath.split("/")
    const response = await newComment({name, body, mediaType, mediaId})
    setOpenCommentForm(false)
    router.reload();
  }

  const NewCommentForm: FC = () => {
    return (
      <div className={styles.commentForm}>
        <form onSubmit={(e: SyntheticEvent)=>handleCommentSubmit(e)}>
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
    )
  }

  if(comments === undefined) return <></>
  if(comments.length === 0) {
    return (
      <div>
        <h2>No Comments</h2>
        {openCommentForm && <NewCommentForm/>}
        {isAuthenticated && <NewCommentButton/>}
      </div>
    )
  }

  return (
    <div>
      <h2>Comments</h2>
      <div className={styles.commentsContainer}>
        {
          comments.map((comment, i) => {
            return (
              <div key={comment.id} className={ comments[comments.length-1].id === comment.id ? 'null' : styles.individualComment}>
                <p className={styles.commentName}>{comment.name} {
                  (isAuthenticated && (comment.user.email === user.email)) &&
                    <button onClick={()=>handleCommentRemove(comment.id)}>Delete</button>
                }</p>
                <p className={styles.commentUser}>By: {comment.user.fullName}</p>
                <p className={styles.commentBody}>{comment.body}</p>
              </div>
            )
          })
        }
      </div>
      {theresMoreComments &&
          <div className={styles.loadMoreCommentsText}>
            <p onClick={()=>loadMoreComments()}>Load More Comments</p>
          </div>
      }
      {openCommentForm && <NewCommentForm/>}
      {isAuthenticated && <NewCommentButton/>}
    </div>
  )
}

export default Comments;