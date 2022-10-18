import { useSelector, useDispatch} from "react-redux";
import { userComments, addToSlice, cleanUserComments } from "../slices/commentSlice";
import { RootState } from "../store";
import { useEffect } from "react";

export default function useOpinions(){
  const comments = useSelector((state: RootState)=>state.mediaComments.value);
  const currentSlice = useSelector((state: RootState) => state.mediaComments.currentSlice);

  useEffect(()=>{

  })
}