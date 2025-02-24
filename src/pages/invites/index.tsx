import './Invites.css';
import Header from '../../components/header';
import { TableInvites } from '../../components/tables/TableInvites';
import { useState, useEffect } from 'react';

export function Invites() {
  const [invites, setInvites] = useState([]);

  // função para buscar os convites do usuario
  const fetchInvites = () => {
    const userToken = localStorage.getItem("token");

    fetch('http://localhost:3333/events/invites', {
      headers: {
        "Authorization": `Bearer ${userToken}`
      }
    })
      .then((response) => response.json())
      .then((data) => setInvites(data))
      .catch((error) => console.error('Erro ao listar convites!:', error));
  };

  // chama a função de listagem de convites
  useEffect(() => {
    fetchInvites()
  }, []);

  // função para aceitar o convite
  const onApprove = (id: string) => {
    const userToken = localStorage.getItem("token");

    fetch(`http://localhost:3333/events/invite/${id}/accept`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        fetchInvites();
      })
      .catch((error) => console.error('Erro ao aceitar convite!:', error));
  };

  // função para recusar convite
  const onReprove = (id: string) => {
    const userToken = localStorage.getItem("token");

    fetch(`http://localhost:3333/events/invite/${id}/reprove`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        fetchInvites();
      })
      .catch((error) => console.error('Erro ao recusar convite!:', error));
  };

  return (
    <div className='events'>
      <Header />

      <section className='events-section'>
        <div className='my-events'>
          <h2 className='section-title'>Convites disponiveis</h2>
        </div>

        <TableInvites data={invites} onApprove={onApprove} onReprove={onReprove} />

      </section>
    </div>
  );
}