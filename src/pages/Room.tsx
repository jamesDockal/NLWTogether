import React from "react";

import logoimg from "../assets/logo.svg";
import asddfs from "../assets/copy.svg";

import "../styles/room.scss";
import toast, { Toaster } from "react-hot-toast";

export default function Room({ match }: any) {
  const { id } = match.params;

  const copyRoomToClipboard = () => {
    toast.success("Copied!");
    console.log("pas");
    navigator.clipboard.writeText(id);
  };
  console.log(id);
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
        <form>
          <textarea />
          <div className="form-fotter">
            <div>
              <span>Para enviar uma pergunta, </span>
              <a href="#">faça seu login</a>
            </div>
            <button type="submit">Enviar pergunta</button>
          </div>
        </form>
      </main>
    </div>
  );
}
