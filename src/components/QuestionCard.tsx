import React, { ReactNode } from "react";

import "../styles/questioncard.scss";

type QuestionType = {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
};

type QuestionTypeProps = {
  question: QuestionType;
  children?: ReactNode;
};

export default function QuestionCard({
  question,
  children,
}: QuestionTypeProps) {
  return (
    <div className="question-card">
      <strong>{question.content}</strong>

      <div className="card-info">
        <div className="author-info">
          <img src={question.author.avatar} />
          <span>{question.author.name}</span>
        </div>
        {children}
      </div>
    </div>
  );
}
