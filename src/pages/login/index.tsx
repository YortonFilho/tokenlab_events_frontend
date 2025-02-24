import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import icon from '../../images/tokenlab-icon.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  const navigate = useNavigate();

  // função para enviar requisição de login para api
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); 

    try {
      const response = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error("Usuário ou senha inválidos!");
      }

      const result = await response.json();

      if (result.token) {
        localStorage.setItem('token', result.token);
        navigate("/");
      } else {
        throw new Error('Token não recebido!');
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Erro ao fazer login!"); 
    }
  };

  return (
    <div className="login-page">
      <div className='left-div'>
        <img src={icon} alt="" />
      </div>

      <div className='right-div'> 
        <div className="login-area">
          <h1>Login</h1>

          <form className='login-form' onSubmit={handleSubmit}>
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

            {errorMessage && <p className="error-message">{errorMessage}</p>} 

            <button type="submit" className="login-btn">Entrar</button>
          </form>

          <div className="register-link">
            <p>Ainda não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
