import { useState } from "react";
import { Financeiro } from "@/types/financeiro";
// adicionar o css

interface Props {
    onBuscar: (id: string) => Promise<Financeiro | null>;
    onDeletar: (id: number) => void;
}

export default function FinanceiroDeletar({ onBuscar, onDeletar }: Props) {
    const [id, setId] = useState('');
    const [resultado, setResultado] = useState<Financeiro | null>(null);

    const buscar = async () => {
        const res = await onBuscar(id);
        setResultado(res);
    }

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

            {resultado && (
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