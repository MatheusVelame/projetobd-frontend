import { useState } from 'react';
import { Financeiro } from '../types/financeiro';
import '../styles/FinanceiroBuscar.css';

interface Props {
  onBuscar: (id: string) => Promise<Financeiro | null>;
}

export default function FinanceiroBuscar({ onBuscar }: Props) {
  const [id, setId] = useState('');
  const [resultado, setResultado] = useState<Financeiro | null>(null);

  const buscar = async () => {
    const res = await onBuscar(id);
    setResultado(res);
  };

  return (
    <div className="buscar-container">
      <h2 className="buscar-titulo">Buscar por ID</h2>
      <input
        type="number"
        placeholder="ID"
        className="buscar-input"
        value={id}
        onChange={e => setId(e.target.value)}
      />
      <button className="buscar-botao" onClick={buscar}>
        Buscar
      </button>

      {resultado && (
        <div className="buscar-resultado">
          <p><strong>ID:</strong> {resultado.idFinanceiro}</p>
          <p><strong>Lucro:</strong> {resultado.historicoLucro}</p>
          <p><strong>Prejuízo:</strong> {resultado.historicoPrejuizo}</p>
          <p><strong>Data:</strong> {resultado.dataAtualizacao}</p>
        </div>
      )}
    </div>
  );
}
