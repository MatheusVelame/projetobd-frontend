import { useState } from "react";
import { Financeiro } from "@/types/financeiro";
import '../styles/Financeiro/FinanceiroDeletar.css';

interface Props {
    onBuscar: (id: string) => Promise<Financeiro | null>;
    onDeletar: (id: number) => void;
}

export default function FinanceiroDeletar({ onBuscar, onDeletar }: Props) {
    const [id, setId] = useState('');
    const [resultado, setResultado] = useState<Financeiro | null| 'not-found'>(null);

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
        <div className="buscar-container">
            <h2 className="buscar-titulo">Buscar Id</h2>
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

            {resultado === 'not-found' && (
                <p className="buscar-nao-encontrado">Nenhum registro encontrado com esse ID.</p>
            )}

            {resultado && resultado !== 'not-found' &&(
                <div className="buscar-resultado">
                <p><strong>ID:</strong> {resultado.idFinanceiro}</p>
                <p><strong>Lucro:</strong> {resultado.historicoLucro}</p>
                <p><strong>Prejuízo:</strong> {resultado.historicoPrejuizo}</p>
                <p><strong>Data:</strong> {resultado.dataAtualizacao}</p>

                <button className="deletar" onClick={() => onDeletar(resultado.idFinanceiro)}>
                    Deletar
                </button>

              </div>
            )}
        </div>
    )
}