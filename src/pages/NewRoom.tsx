import fundoImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google-icon.svg";
import "../styles/auth.scss";
import { Button } from "../components/Button";
export function NewRoow() {
  return (
    <div id="page-auth">
      <aside>
        <img src={fundoImg} alt="Ilustração de Fundo" />
        <strong>Crie sala de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetMeAsk" />
         <h2>Criar uma nova sala</h2>
          <form action="">
            <input type="text" placeholder="Nome da sala" />
            <Button type="submit">Criar sala</Button>
          </form>
            <p>
            Quer entrar em uma sala existente ? <a href="#">Clique aqui</a>
            </p>
        </div>
      </main>
    </div>
  );
}