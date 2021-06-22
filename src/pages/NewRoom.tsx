import React from "react";

import illustration from "../assets/illustration.svg";
import logoimg from "../assets/logo.svg";

import "../styles/newroom.scss";

export default function NewRoom() {
  return (
    <div id="page-newroom">
      <aside>
        <img src={illustration} alt="ilustration" />
        <strong>Crie suas salas Q&amp;A ao-vivo</strong>
        <p>Tire suas duvidas da audiencia em tempo-real</p>
      </aside>
      <main>
        <div className="create-room">
          <img src={logoimg} alt="logo" />
          <strong>Crie uma nova sala</strong>
        </div>

        <form>
          <input type="text" placeholder="digite seu email" />
          <button>Criar sala</button>
        </form>
        <div className="join-room">
          <span>Quer entrar em uma sala existente?</span>
          <a href="#">Click aki</a>
        </div>
      </main>
    </div>
  );
}
