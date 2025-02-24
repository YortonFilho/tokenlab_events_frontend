import { useState } from 'react';
import './RegisterPage.css';
import icon from '../../images/tokenlab-icon.png';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(''); 
  const navigate = useNavigate();

  // função para enviar o formulario para criar usuario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Verifica se as senhas são iguais
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não são iguais!");
      return;
    }

    // envia requisição para api
    try {
      const response = await fetch("http://localhost:3333/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || "Erro ao criar a sua conta!");
      }
      
      navigate("/"); 
    } catch (error: any) {
      console.error("Erro ao criar a conta:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="register-page">
      <div className="left-div">
        <img src={icon} alt="Logo" />
      </div>
      
      <div className="right-div">
        <div className="register-area">
          <h1>Cadastro</h1>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome completo"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme sua senha"
                required
              />
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit" className="register-btn">Cadastrar</button>
          </form>

          <div className="login-link">
            <p>Já tem uma conta? <a href="/login">Faça login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
