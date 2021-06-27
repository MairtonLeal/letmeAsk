import { FormEvent } from 'react';

import {useHistory} from 'react-router-dom';
import fundoImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google-icon.svg";
import "../styles/auth.scss";
import { Button } from "../components/Button";
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { database } from '../services/firebase';
export function Home() {
  const {user, signInWithGoogle} = useAuth();
  const history = useHistory();
  const [roomCode, setRoomCode] = useState('');
  async function handleCreateRoom(){
    if(!user){
        await signInWithGoogle()
    }
      await history.push('/rooms/newroom')
  
  }
// ideias sua sala propria de atendimento, sua sala de cozinha de condominio, sala de atendimento e consultas.
  // ideia master = profissionais informarem dados, para consultas
async function handleJoinRoom(event: FormEvent){
    event.preventDefault();
    if (roomCode.trim() === '' ){
      return;
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if(!roomRef.exists()){
      alert('Sala não existe');
    }
    if(roomRef.val().endedAt){
      alert("Sala está fechada");
      return;
    }
    history.push(`/rooms/${roomCode}`);
  }

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
          <button onClick={handleCreateRoom} className="createRoom">
            <img src={googleIcon} alt="Logo da Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input onChange={event => setRoomCode(event.target.value)}
            value={roomCode} type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
