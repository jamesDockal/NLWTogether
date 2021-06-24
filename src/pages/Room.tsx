import React, { FormEvent, useState, useEffect } from "react";

import { firebase } from "../firebase";

import logoimg from "../assets/logo.svg";
import asddfs from "../assets/copy.svg";

import "../styles/room.scss";
import toast, { Toaster } from "react-hot-toast";
import ContextUser from "../hooks/userHook";

import QuestionCard from "../components/QuestionCard";

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
};

type FirebaseQuestions = Record<string, QuestionType>;

export default function Room({ match }: any) {
  const { user } = ContextUser();
  const [newQuestion, setNewQuestion] = useState("");

  const [allquestionsRoom, setAllquestionsRoom] = useState<QuestionType[]>([]);

  const { id } = match.params;

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
          };
        }
      );
      setAllquestionsRoom(parsedQuestion);
    });
  }, [id]);

  const copyRoomToClipboard = () => {
    toast.success("Copied!");
    navigator.clipboard.writeText(id);
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

    await firebase.database().ref(`rooms/${id}/questions`).push(question);

    toast.success("Question sended!");

    setNewQuestion("");
  };

  return (
    <div>
      <header>
        <img src={logoimg} />
        <div onClick={() => copyRoomToClipboard()} className="clipboard">
          <img src={asddfs} />
          <button>{id}</button>
          <Toaster />
        </div>
      </header>
      <main>
        <div className="about">
          <strong>Sala Teste</strong>
          <div>3 pergunta(s)</div>
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
        {allquestionsRoom.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
}
