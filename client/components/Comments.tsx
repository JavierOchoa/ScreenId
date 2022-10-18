import {FC, PropsWithChildren} from "react";
import {Comment} from '../interfaces';
import styles from '../styles/Comments.module.css';

interface Props {
  comments: Comment[];
}

const Comments: FC<PropsWithChildren<Props>> = ({comments}) => {
  if(comments === undefined) return <></>
  if(comments.length === 0) {
    return <div>No Comments</div>
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
                <p className={styles.commentUser}>By: {comment.name}</p>
                <p className={styles.commentBody}>{comment.body}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Comments;