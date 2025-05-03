'use client';

import { useEffect, useState } from 'react';
import FinanceiroForm from '@/components/FinanceiroForm';
import FinanceiroBuscar from '@/components/FinanceiroBuscar';
import FinanceiroLista from '@/components/FinanceiroLista';
import { Financeiro } from '@/types/financeiro';

export default function FinanceirosPage() {
  const [financeiros, setFinanceiros] = useState<Financeiro[]>([]);
  const urlBase = 'http://localhost:8081/api/financeiros';

  useEffect(() => {
    fetch(urlBase)
      .then(res => res.json())
      .then(setFinanceiros);
  }, []);

  const inserir = async (lucro: number, prejuizo: number) => {
    const res = await fetch(urlBase, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ historicoLucro: lucro, historicoPrejuizo: prejuizo }),
    });
    const data = await res.json();
    setFinanceiros(prev => [...prev, data]);
  };

  const buscarPorId = async (id: string): Promise<Financeiro | null> => {
    const res = await fetch(`${urlBase}/${id}`);
    if (!res.ok) return null;
    return await res.json();
  };

  const deletar = async (id: number) => {
    await fetch(`${urlBase}/${id}`, { method: 'DELETE' });
    setFinanceiros(financeiros.filter(f => f.idFinanceiro !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Financeiro</h1>
      <FinanceiroForm onInserir={inserir} />
      <FinanceiroBuscar onBuscar={buscarPorId} />
      <FinanceiroLista lista={financeiros} onDeletar={deletar} />
    </div>
  );
}
