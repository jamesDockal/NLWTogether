import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function ContextUser() {
  return useContext(UserContext);
}
