import React from "react";

import "../styles/questioncard.scss";

type QuestionType = {
  question: {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
  };
};

export default function QuestionCard({ question }: QuestionType) {
  return (
    <div className="question-card">
      <div className="question-content">
        <strong>{question.content}</strong>
      </div>
      <div className="author-info">
        <img src={question.author.avatar} />
        <strong>{question.author.name}</strong>
      </div>
    </div>
  );
}
