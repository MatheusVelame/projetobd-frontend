'use client';

import { useEffect, useState } from 'react';

interface Financeiro {
  idFinanceiro: number;
  historicoLucro: number;
  historicoPrejuizo: number;
  dataAtualizacao: string;
}

export default function FinanceirosPage() {
  const [financeiros, setFinanceiros] = useState<Financeiro[]>([]);
  const [novo, setNovo] = useState({ historicoLucro: '', historicoPrejuizo: '' });
  const [buscaId, setBuscaId] = useState('');
  const [resultadoBusca, setResultadoBusca] = useState<Financeiro | null>(null);

  const urlBase = 'http://localhost:8081/api/financeiros';

  useEffect(() => {
    fetch(urlBase)
      .then(res => res.json())
      .then(setFinanceiros);
  }, []);

  const inserir = async () => {
    const res = await fetch(urlBase, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        historicoLucro: parseFloat(novo.historicoLucro),
        historicoPrejuizo: parseFloat(novo.historicoPrejuizo),
      }),
    });
    const data = await res.json();
    setFinanceiros(prev => [...prev, data]);
  };

  const buscarPorId = async () => {
    const res = await fetch(`${urlBase}/${buscaId}`);
    if (res.ok) {
      const data = await res.json();
      setResultadoBusca(data);
    } else {
      setResultadoBusca(null);
      alert('Financeiro não encontrado.');
    }
  };

  const deletar = async (id: number) => {
    await fetch(`${urlBase}/${id}`, { method: 'DELETE' });
    setFinanceiros(financeiros.filter(f => f.idFinanceiro !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Financeiro</h1>

      {/* Inserir */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Inserir</h2>
        <input
          type="number"
          placeholder="Lucro"
          className="border p-2 rounded"
          value={novo.historicoLucro}
          onChange={e => setNovo({ ...novo, historicoLucro: e.target.value })}
        />
        <input
          type="number"
          placeholder="Prejuízo"
          className="border p-2 rounded ml-2"
          value={novo.historicoPrejuizo}
          onChange={e => setNovo({ ...novo, historicoPrejuizo: e.target.value })}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded ml-2"
          onClick={inserir}
        >
          Adicionar
        </button>
      </div>

      {/* Buscar por ID */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Buscar por ID</h2>
        <input
          type="number"
          placeholder="ID"
          className="border p-2 rounded"
          value={buscaId}
          onChange={e => setBuscaId(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded ml-2"
          onClick={buscarPorId}
        >
          Buscar
        </button>
        {resultadoBusca && (
          <div className="mt-2 border p-4 rounded bg-gray-100">
            <p><strong>ID:</strong> {resultadoBusca.idFinanceiro}</p>
            <p><strong>Lucro:</strong> {resultadoBusca.historicoLucro}</p>
            <p><strong>Prejuízo:</strong> {resultadoBusca.historicoPrejuizo}</p>
            <p><strong>Data:</strong> {resultadoBusca.dataAtualizacao}</p>
          </div>
        )}
      </div>

      {/* Lista */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Todos os Registros</h2>
        {financeiros.map(f => (
          <div key={f.idFinanceiro} className="border p-4 rounded bg-white flex justify-between items-center">
            <div>
              <p><strong>ID:</strong> {f.idFinanceiro}</p>
              <p><strong>Lucro:</strong> {f.historicoLucro}</p>
              <p><strong>Prejuízo:</strong> {f.historicoPrejuizo}</p>
              <p><strong>Atualização:</strong> {f.dataAtualizacao}</p>
            </div>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => deletar(f.idFinanceiro)}
            >
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
