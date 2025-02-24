import './Table.css';
import { format } from 'date-fns'
import { X, CircleCheck } from 'lucide-react'

interface TableProps {
  data: Invite[] | undefined
  onReprove: (id: string) => void
  onApprove: (id: string) => void
}

type User = {
  id: string;
  name: string;
  email: string;
};

type Event = {
  id: string;
  description: string;
  startTime: string;
  endTime: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

type Invite = {
  id: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  user: User;
  event: Event;
};


export function TableInvites({ data, onApprove, onReprove }: TableProps) {

  function formatDateTime(date: string) {
    return format(new Date(date), 'dd/MM/yyyy - HH:mm\'h\'')
  };

  return (
    <table align='center'>
      <thead>
        <tr>
          <th>Nome do Criador do evento</th>
          <th>Nome do evento</th>
          <th>Inicio</th>
          <th>Fim</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((invite) => (
          <tr>
            <td>{invite.event.createdBy}</td>
            <td>{invite.event.description}</td>
            <td>{formatDateTime(invite.event.startTime)}</td>
            <td>{formatDateTime(invite.event.endTime)}</td>
            <td className="actions">
              <button className="edit-btn" onClick={() => onApprove(invite.id)}><CircleCheck size={16} />Aprovar</button>
              <button className="delete-btn" onClick={() => onReprove(invite.id)}> <X size={16}
              /> Recusar</button>
            </td>
          </tr>
        ))}
        {data && data?.length < 1 && (
          <tr>
            <td></td>
            <h2 className='not-data'>Você não possui convites</h2>
          </tr>
        )}
      </tbody>
    </table>
  );
};

