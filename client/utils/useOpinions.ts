import { useSelector, useDispatch} from "react-redux";
import { userComments, addToSlice, cleanUserComments } from "../slices/commentSlice";
import { RootState } from "../store";
import { useEffect } from "react";
import useAuth from './useAuth';
import { Comment } from "../interfaces";
import axios from "axios";

interface IComment {
  name: string;
  body: string;
  mediaType: string;
  mediaId: string;
}

export default function useOpinions(){
  const {userCookie} = useAuth();
  const comments = useSelector((state: RootState)=>state.mediaComments.value);
  const currentSlice = useSelector((state: RootState) => state.mediaComments.currentSlice);

  // useEffect(()=>{

  // })

  async function newComment(comment:IComment) {
    const {data} = await axios.post<Comment>(`${process.env.NEXT_PUBLIC_BACKEND_MEDIA}/${comment.mediaType}/${comment.mediaId}/comments`, {
        name: comment.name,
        body: comment.body,
        mediaType: comment.mediaType,
        mediaId: comment.mediaId
      },{
        headers: {Authorization: `Bearer ${userCookie}`}
      }
    )
    return data;
  }

  async function removeComment(commentId:string) {
    // const {data} = await axios.delete
  }
  
  return {newComment}
}