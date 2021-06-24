import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { firebase } from "../firebase";
import useAuth from "./useAuth";

//how the questions gonna be
type QuestionType = {
  id: string;
  content: string;
  author: {
    avatar: string;
    name: string;
  };
  isAnswered: boolean;
  isHighLighted: boolean;
  likeCount?: number;
  likeId: string | undefined;
};

//what gonna return from firebase
type FirebaseQuestions = Record<
  string,
  {
    author: {
      avatar: string;
      name: string;
    };
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
    likes?: [];
  }
>;

export default function useRoom(id: string) {
  const [allquestionsRoom, setAllquestionsRoom] = useState<QuestionType[]>([]);
  const [theUser, settheUser] = useState<string | undefined>("");

  const { user } = useContext(UserContext);

  useEffect(() => {
    const roomref = firebase.database().ref(`rooms/${id}`);

    roomref.on("value", (room) => {
      const firebaseQuestions: FirebaseQuestions = room.val().questions ?? {};

      const parsedQuestion = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isAnswered: value.isAnswered,
            isHighLighted: value.isHighLighted,
            likeCount: Object.entries(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]: any) => like.authorId === user?.uid
            )?.[0],
          };
        }
      );
      setAllquestionsRoom(parsedQuestion);
    });
  }, [id, user]);

  return allquestionsRoom;
}
