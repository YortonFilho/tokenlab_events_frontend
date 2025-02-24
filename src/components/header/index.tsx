import { Link } from 'react-router-dom';
import './Header.css'; 
import { useState, useEffect } from 'react'; 
import { jwtDecode } from 'jwt-decode'; 

// Função para gerar cabeçalho com nome do usuario logado
export function Header() {
  const [username, setUsername] = useState('')

  // coleta nome do usuario
  useEffect(() => {
    const userToken = localStorage.getItem("token");

    if (userToken) {
      const decodedToken: { name?: string } = jwtDecode(userToken);
      
      if (decodedToken.name) {
        setUsername(decodedToken.name);
      }
    }
  }, []);

  return (
    <header className="header">
      <nav>
        <Link to="/">Página inicial</Link>
        <Link to="/invites">Convites</Link>
      </nav>

      <div className='user-area'>
        <div className='username-area'>
          <p className='username'>{username || ''}</p>
          <p className='welcome'>Bem vindo(a) 👋</p>
        </div>
        <div className="user-photo">
          <span>{username[0] || ''}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
