import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAEetlf7Bu9O5Du89jA-3Ut0lF81ThTawU",
  authDomain: "piiv-e1032.firebaseapp.com",
  projectId: "piiv-e1032",
  storageBucket: "piiv-e1032.appspot.com",
  messagingSenderId: "941266876655",
  appId: "1:941266876655:web:130afff1ec63e1ef5ec31a",
  measurementId: "G-YV31DDZQRS"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  // Estados para armazenar as entradas do usuário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  // Função que é chamada quando o formulário é enviado
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isRegister) {
        // Registro de novo usuário
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registro bem-sucedido!");
      } else {
        // Login do usuário
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login bem-sucedido!");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>{isRegister ? "Registrar" : "Acesse o sistema"}</h1>
        <div className="input-field">
          <input
            type="email"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="recall-forget">
          <a href="#">Esqueceu sua senha?</a>
        </div>
        <button type="submit">{isRegister ? "Registrar" : "Login"}</button>
        <div className="signup-link">
          <p>
            {isRegister ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
            <a href="#" onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? "Login" : "Registar"}
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
