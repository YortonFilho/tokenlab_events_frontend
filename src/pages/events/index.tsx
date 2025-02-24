import './Events.css';
import Header from '../../components/header';
import { Event, TableEvents } from '../../components/tables/TableEvents';
import { useState, useEffect } from 'react';

export function Events() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [users, setUsers] = useState([]);
  
  // função para mostrar a aba de criar eventos
  const toggleSheet = () => {
    setIsSheetOpen(prevState => !prevState);
    if (isSheetOpen) {
      setEditEvent(null);
      setDescription('');
      setStartDate('');
      setEndDate('');
    }
  };

  // função para buscar todos os eventos do usuario
  const fetchEvents = () => {
    const userToken = localStorage.getItem("token");

    fetch('http://localhost:3333/events', {
      headers: {
        "Authorization": `Bearer ${userToken}`
      }
    })
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Erro ao listar eventos!:', error));
  };

  // função para editar evento
  const editEventHandler = (event: Event) => {
    setEditEvent(event);
    setDescription(event.description);
    setStartDate(event.startTime);
    setEndDate(event.endTime);
    toggleSheet();
  };

  // função para criar ou atualizar evento
  const createEvent = (e: React.FormEvent) => {
    e.preventDefault();

    const userToken = localStorage.getItem("token");
    const eventData = {
      description,
      startTime: startDate,
      endTime: endDate,
    };

    const method = editEvent ? 'PUT' : 'POST'; 
    const url = editEvent ? `http://localhost:3333/events/${editEvent.id}` : 'http://localhost:3333/events';

    fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    })
      .then((response) => response.json())
      .then(() => {
        fetchEvents();
        toggleSheet();
      })
      .catch((error) => console.error('Erro criar/atualizar evento:', error));
  };

  // função para deletar eventos
  const deleteEvent = (id: string) => {
    const userToken = localStorage.getItem("token");

    fetch(`http://localhost:3333/events/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => {
        fetchEvents();
      })
      .catch((error) => console.error('Erro ao deletar evento!:', error));
  };

  // função para criar convite
  const createInvite = (e: React.FormEvent, eventId: string, userId: string) => {
    e.preventDefault();
    const userToken = localStorage.getItem("token");

    fetch("http://localhost:3333/events/invite", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId,
        userId
      }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchEvents();
      })
      .catch((error) => console.error('Erro ao criar convite!', error));
  };

  // carrega os eventos e usuarios
  useEffect(() => {
    fetchEvents();
    fetchUsers()
  }, []);

  // função para buscar todos usuarios
  const fetchUsers = () => {
    const userToken = localStorage.getItem("token");

    fetch('http://localhost:3333/users', {
      headers: {
        "Authorization": `Bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Erro ao listar usuários:', error));
  };

  return (
    <div className='events'>
      <Header />

      <section className='events-section'>
        <div className='my-events'>
          <h2 className='section-title'>Eventos criados</h2>
          <button className='create-event' onClick={toggleSheet}>Criar evento</button>
        </div>

        <TableEvents createInvite={createInvite} users={users} onDelete={deleteEvent} onEdit={editEventHandler} data={events} />

        <div className={`event-sheet ${isSheetOpen ? 'open' : ''}`}>
          <div className="sheet-content">
            <h3>{editEvent ? 'Editar Evento' : 'Criar Evento'}</h3>
            <form className="event-form" onSubmit={createEvent}>
              <div className="input-group">
                <label htmlFor="description">Descrição</label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descrição do evento"
                />
              </div>

              <div className="input-group">
                <label htmlFor="startDate">Data de Início</label>
                <input
                  type="datetime-local"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label htmlFor="endDate">Data de Fim</label>
                <input
                  type="datetime-local"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <button type="submit" className="submit-btn">{editEvent ? 'Atualizar Evento' : 'Criar Evento'}</button>
              <button type="button" className="close-btn" onClick={toggleSheet}>Fechar</button>
            </form>
          </div>
        </div>
        
      </section>
    </div>
  );
}