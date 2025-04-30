import { Financeiro } from '../types/financeiro';

interface Props {
  lista: Financeiro[];
  onDeletar: (id: number) => void;
}

export default function FinanceiroLista({ lista, onDeletar }: Props) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Todos os Registros</h2>
      {lista.map(f => (
        <div key={f.idFinanceiro} className="border p-4 rounded bg-white flex justify-between items-center">
          <div>
            <p><strong>ID:</strong> {f.idFinanceiro}</p>
            <p><strong>Lucro:</strong> {f.historicoLucro}</p>
            <p><strong>Prejuízo:</strong> {f.historicoPrejuizo}</p>
            <p><strong>Atualização:</strong> {f.dataAtualizacao}</p>
          </div>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={() => onDeletar(f.idFinanceiro)}
          >
            Deletar
          </button>
        </div>
      ))}
    </div>
  );
}
