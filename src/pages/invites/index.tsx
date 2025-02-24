import './Invites.css';
import Header from '../../components/header';
import { TableInvites } from '../../components/tables/TableInvites';
import { useState, useEffect } from 'react';

export function Invites() {
  const [invites, setInvites] = useState([]);

  const fetchInvites = () => {
    const userToken = localStorage.getItem("token");

    fetch('http://localhost:3333/events/invites', {
      headers: {
        "Authorization": `Bearer ${userToken}`
      }
    })
      .then((response) => response.json())
      .then((data) => setInvites(data))
      .catch((error) => console.error('Error fetching invites:', error));
  };

  useEffect(() => {
    fetchInvites()
  }, []);

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
      .catch((error) => console.error('Error deleting event:', error));
  };

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
      .catch((error) => console.error('Error deleting event:', error));
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