import { useState } from 'react';
import { Financeiro } from '../types/financeiro';

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
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Buscar por ID</h2>
      <input
        type="number"
        placeholder="ID"
        className="border p-2 rounded"
        value={id}
        onChange={e => setId(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded ml-2"
        onClick={buscar}
      >
        Buscar
      </button>

      {resultado && (
        <div className="mt-2 border p-4 rounded bg-gray-100">
          <p><strong>ID:</strong> {resultado.idFinanceiro}</p>
          <p><strong>Lucro:</strong> {resultado.historicoLucro}</p>
          <p><strong>Prejuízo:</strong> {resultado.historicoPrejuizo}</p>
          <p><strong>Data:</strong> {resultado.dataAtualizacao}</p>
        </div>
      )}
    </div>
  );
}
