import { useState } from 'react';
import { Financeiro } from '../types/financeiro';
import '../styles/Financeiro/FinanceiroAlterar.css';

interface Props {
  onBuscar: (id: string) => Promise<Financeiro | null>;
  onAlterar: (id: number, lucro: number, prejuizo: number) => void;
}

export default function FinanceiroAlterar({ onBuscar, onAlterar }: Props) {
  const [id, setId] = useState('');
  const [lucro, setLucro] = useState('');
  const [prejuizo, setPrejuizo] = useState('');
  const [resultado, setResultado] = useState<Financeiro | null | 'not-found'>(null);

  const buscar = async () => {
    if (!id.trim()) {
      alert('Digite um ID válido.');
      return;
    }

    const res = await onBuscar(id);
    if (res) {
      setResultado(res);
    } else {
      setResultado('not-found');
    }
  };

  return (
    <div className="alterar-container">
      <div className="header"> 
          <div className="icon-container">
            <img src="/images/pngwing.com.png" alt="Ícone" className="factory-icon" />
          </div>
      </div>

      <div className="alterar-content">
        <p className="option-label">Opção Selecionada: </p>
        <h1 className="alterar-title">Alterar Financeiros</h1>

        <div className="input-group">
          <label htmlFor="id">Digite o Id do Financeiro que deseja alterar:</label>
          <input
          id="id"
          type="number"
          className="alterar-input"
          value={id}
          onChange={e => setId(e.target.value)}
          />
        </div>

        <button className="confirm-button" onClick={buscar}>
          Buscar
        </button>

        {resultado == 'not-found' && (
          <p className="buscar-nao-encontrado">Nenhum registro encontrado com esse ID.</p>
        )}
        
        
        {resultado && resultado !== 'not-found' && (
        <div className="alterar-container">
          
          <div className="buscar-result">
            <p><strong>Resultado:</strong></p>
            <p><strong>ID:</strong> {resultado.idFinanceiro}</p>
            <p><strong>Lucro:</strong> {resultado.historicoLucro}</p>
            <p><strong>Prejuízo:</strong> {resultado.historicoPrejuizo}</p>
            <p><strong>Data:</strong> {resultado.dataAtualizacao}</p>
          </div>

          <h1 className="alterar-title">Informe os dados que deseja alterar</h1>
        
          <div className="input-group">
            <input
              type="number"
              placeholder="Lucro"
              className="alterar-input"
              value={lucro}
              onChange={e => setLucro(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <input
              type="number"
              placeholder="Prejuízo"
              className="alterar-input"
              value={prejuizo}
              onChange={e => setPrejuizo(e.target.value)}
            /> 
          </div>

          <button
            className="confirm-button"
            onClick={() => {
                if (typeof resultado === 'object' && resultado !== null) {
                    onAlterar(resultado.idFinanceiro, parseFloat(lucro), parseFloat(prejuizo));
                    setLucro('');
                    setPrejuizo('');
                  }                  
            }}
          >
            Alterar
          </button>
        </div>
      )}

      </div>
    </div>
  );
}
