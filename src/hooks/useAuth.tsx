import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function useAuth() {
  //return the user

  // console.log('user auht', useContext(UserContext))
  const context = useContext(UserContext);

  return { user: context.user, singInWithGoogle: context.singInWithGoogle };
}
