import { useState } from 'react';

interface Props {
  onInserir: (lucro: number, prejuizo: number) => void;
}

export default function FinanceiroForm({ onInserir }: Props) {
  const [lucro, setLucro] = useState('');
  const [prejuizo, setPrejuizo] = useState('');

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Inserir</h2>
      <input
        type="number"
        placeholder="Lucro"
        className="border p-2 rounded"
        value={lucro}
        onChange={e => setLucro(e.target.value)}
      />
      <input
        type="number"
        placeholder="Prejuízo"
        className="border p-2 rounded ml-2"
        value={prejuizo}
        onChange={e => setPrejuizo(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded ml-2"
        onClick={() => {
          onInserir(parseFloat(lucro), parseFloat(prejuizo));
          setLucro('');
          setPrejuizo('');
        }}
      >
        Adicionar
      </button>
    </div>
  );
}
