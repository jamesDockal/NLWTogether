import React, { FormEvent, useState, useEffect } from "react";

import { firebase } from "../firebase";

import logoimg from "../assets/logo.svg";
import copyimg from "../assets/copy.svg";

import "../styles/room.scss";
import toast, { Toaster } from "react-hot-toast";

import useAuth from "../hooks/useAuth";
import useQuestion from "../hooks/useQuestion";
import useRoom from "../hooks/useRoom";

import QuestionCard from "../components/QuestionCard";

export default function Room({ match }: any) {
  const roomId = match.params.id;
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState("");
  const room = useRoom(roomId);

  console.log("room", room);

  const allquestionsRoom = useQuestion(roomId);

  const copyRoomToClipboard = () => {
    toast.success("Copied!");
    navigator.clipboard.writeText(roomId);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!user) return toast.error("You must be logged!");
    if (newQuestion.trim() == "") return toast.error("Empty question!");

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      isAnswered: false,
    };

    await firebase.database().ref(`rooms/${roomId}/questions`).push(question);

    toast.success("Question sended!");

    setNewQuestion("");
  };

  const toggleLike = async (
    questionId: string,
    likedId: string | undefined
  ) => {
    if (likedId) {
      console.log("existe");
      await firebase
        .database()
        .ref(`rooms/${roomId}/questions/${questionId}/likes/${likedId}`)
        .remove();
    } else {
      await firebase
        .database()
        .ref(`rooms/${roomId}/questions/${questionId}/likes`)
        .push({
          authorId: user?.uid,
        });
    }
  };

  return (
    <div>
      <header>
        <img src={logoimg} />
        <div onClick={() => copyRoomToClipboard()} className="clipboard">
          <img src={copyimg} />
          <button>{roomId}</button>
          <Toaster />
        </div>
      </header>
      <main>
        <div className="about">
          <strong>{room?.title}</strong>
          <div>{allquestionsRoom.length} pergunta(s)</div>
        </div>
        <form onSubmit={(event) => handleSubmit(event)}>
          <textarea
            value={newQuestion}
            onChange={(event) => setNewQuestion(event.target.value)}
          />
          <div className="form-fotter">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} />
                <strong>{user.name}</strong>
              </div>
            ) : (
              <div>
                <span>Para enviar uma pergunta, </span>
                <a href="#">faça seu login</a>
              </div>
            )}
            <button type="submit" disabled={!user}>
              Enviar pergunta
            </button>
          </div>
        </form>
      </main>
      <div className="all-questions">
        {allquestionsRoom.map((question) => {
          return (
            <QuestionCard key={question.id} question={question}>
              <div className="like-container">
                <strong className="like-count">{question.likeCount}</strong>
                <button
                  className={`${question.likeId ? "has-liked" : "not-liked"}`}
                  onClick={() => toggleLike(question.id, question.likeId)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                      stroke="#737380"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </QuestionCard>
          );
        })}
      </div>
    </div>
  );
}
