import './Table.css';
import { format } from 'date-fns'
import { Trash, Edit, Send } from 'lucide-react'
import { useState } from 'react'

interface TableProps {
  data: Event[] | undefined
  onDelete: (id: string) => void
  onEdit: (event: Event) => void
  createInvite: (e: React.FormEvent, eventId: string, userId: string) => void
  users: any[]
}

export type Event = {
  id: string;
  description: string;
  startTime: string;
  endTime: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export function TableEvents({ data, onDelete, onEdit, users, createInvite }: TableProps) {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const toggleInvite = (eventId: string) => {
    setSelectedEvent(eventId);
    setIsInviteOpen((prevState) => !prevState);
  };

  function formatDateTime(date: string) {
    return format(new Date(date), 'dd/MM/yyyy - HH:mm\'h\'');
  }

  const handleCreateInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser && selectedEvent) {
      createInvite(e, selectedEvent, selectedUser);
      setIsInviteOpen(false); 
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Nome do Evento</th>
            <th>Início</th>
            <th>Fim</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((event) => (
            <tr className='table-lines' key={event.id}>
              <td>{event.description}</td>
              <td>{formatDateTime(event.startTime)}</td>
              <td>{formatDateTime(event.endTime)}</td>
              <td className="actions">
                <button className="invite-btn" onClick={() => toggleInvite(event.id)}>
                  <Send size={16} /> Convidar
                </button>
                <button className="edit-btn" onClick={() => onEdit(event)}>
                  <Edit size={16} /> Editar
                </button>
                <button className="delete-btn" onClick={() => onDelete(event.id)}>
                  <Trash size={16} /> Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isInviteOpen && selectedEvent && (
        <div className={`event-sheet ${isInviteOpen ? 'open' : ''}`}>
          <div className="sheet-content">
            <h3>Convite para o Evento</h3>
            <form onSubmit={handleCreateInvite}>
              <div className="input-group">
                <label htmlFor="user">Selecione um usuário</label>
                <select
                  id="user"
                  value={selectedUser || ''}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  <option value="">Selecione um usuário</option>
                  {users.map((user: any) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>

              <button type="submit"  className="submit-btn" disabled={!selectedUser}>Enviar Convite</button>
              <button type="button" className="close-btn" onClick={() => setIsInviteOpen(false)}>Fechar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
