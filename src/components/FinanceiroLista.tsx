import { Financeiro } from '../types/financeiro';
import '../styles/FinanceiroLista.css';

interface Props {
  lista: Financeiro[];
}

export default function FinanceiroLista({ lista }: Props) {
  return (
    <div className="lista-container">
      <h2 className="lista-titulo">Todos os Registros</h2>
      {lista.map(f => (
        <div key={f.idFinanceiro} className="lista-item">
          <div>
            <p><strong>ID:</strong> {f.idFinanceiro}</p>
            <p><strong>Lucro:</strong> {f.historicoLucro}</p>
            <p><strong>Prejuízo:</strong> {f.historicoPrejuizo}</p>
            <p><strong>Atualização:</strong> {f.dataAtualizacao}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
