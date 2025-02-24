import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; 
import { useState, useEffect } from 'react'; 
import { jwtDecode } from 'jwt-decode'; 
import { LogOut } from 'lucide-react';

// Função para gerar cabeçalho com nome do usuario logado
export function Header() {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

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

  function logout(){
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header className="header">
      <nav>
        <Link to="/">Página inicial</Link>
        <Link to="/invites">Convites</Link>
      </nav>

      <div className='user-area'>
        <div className='username-area'>
          <p className='username'>{username || ''}</p>
          <div className='sign-out'>
          <p className='welcome'>Bem vindo(a) 👋</p>
          <LogOut onClick={logout} size={16} color='#ff0000'/>
          </div>
        </div>
        <div className="user-photo">
          <span>{username[0] || ''}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
