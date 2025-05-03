import { useState } from 'react';
import '../styles/FinanceiroForm.css'; // ajuste o caminho se necessário

interface Props {
  onInserir: (lucro: number, prejuizo: number) => void;
}

export default function FinanceiroForm({ onInserir }: Props) {
  const [lucro, setLucro] = useState('');
  const [prejuizo, setPrejuizo] = useState('');

  return (
    <div className="form-container">
      <h2 className="form-subtitle">Opção Selecionada:</h2>
      <h1 className="form-title">Opção Selecionada:</h1>
      <input
        type="number"
        placeholder="Lucro"
        className="form-input"
        value={lucro}
        onChange={e => setLucro(e.target.value)}
      />
      <input
        type="number"
        placeholder="Prejuízo"
        className="form-input ml"
        value={prejuizo}
        onChange={e => setPrejuizo(e.target.value)}
      />
      <button
        className="form-button"
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
