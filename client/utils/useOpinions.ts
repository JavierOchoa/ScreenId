import { useSelector, useDispatch} from "react-redux";
import { userComments, addToSlice, cleanUserComments, resetSliceCounter, reverseComments } from "../slices/commentSlice";
import { RootState } from "../store";
import {useEffect, useState} from "react";
import useAuth from './useAuth';
import { Comment } from "../interfaces";
import axios from "axios";
import {comment} from "postcss";

interface IComment {
  name: string;
  body: string;
  mediaType: string;
  mediaId: number;
}

interface ICommentRemoveResponse{
  successful: boolean;
}

enum SortOptions {
  Newest = "Newest",
  Oldest = "Oldest"
}

export default function useOpinions(){
  const {userCookie} = useAuth();
  const commentsSelector = useSelector((state: RootState)=>state.mediaComments.value);
  const currentSlice = useSelector((state: RootState) => state.mediaComments.currentSlice);
  const totalComments = useSelector((state: RootState) => state.mediaComments.totalComments);

  const [comments, setComments] = useState<Comment[]>([])
  const [theresMoreComments, setTheresMoreComments] = useState(false)
  const [sortOrder, setSortOrder] = useState(SortOptions.Newest)

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(resetSliceCounter());
  },[])

  useEffect(()=>{
    const commentsToReturn: Comment[] = commentsSelector.slice(0, currentSlice);
    setComments(commentsToReturn);
    currentSlice >= totalComments ? setTheresMoreComments(false) : setTheresMoreComments(true);
  }, [currentSlice, commentsSelector])

  function commentsReceiver(commentsReceived: Comment[]){
    dispatch(userComments(commentsReceived));
  }

  function loadMoreComments(){
    dispatch(addToSlice())
  }

  function handleSortOrder(){
    sortOrder === "Newest" ? setSortOrder(SortOptions.Oldest) : setSortOrder(SortOptions.Newest);
    dispatch(reverseComments())
  }

  async function newComment(comment:IComment) {
    const {data} = await axios.post<Comment>(`${process.env.NEXT_PUBLIC_BACKEND}/media/${comment.mediaType}/${comment.mediaId}/comments`, {
        name: comment.name,
        body: comment.body,
        mediaType: comment.mediaType,
        mediaId: String(comment.mediaId)
      },{
        headers: {Authorization: `Bearer ${userCookie}`}
      }
    )
    return data;
  }

  async function removeComment(commentId:string, mediaType: string, mediaId: number) {
    const {data} = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND}/media/${mediaType}/${mediaId}/comments`, {
        data: {
          id: commentId,
        },
          headers: {Authorization: `Bearer ${userCookie}`}
        },
      )
  }
  
  return {newComment, removeComment, commentsReceiver, comments, totalComments, theresMoreComments, loadMoreComments,
    handleSortOrder, sortOrder}
}