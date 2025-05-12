'use client';

import { useEffect, useState } from 'react';
import FinanceiroAlterar from '@/components/FinanceiroAlterar';
import { Financeiro } from '@/types/financeiro';
import '@/styles/Financeiro/FinanceiroPageAlterar.css'; 

export default function FinanceiroPageAlterar() {
  const [financeiros, setFinanceiros] = useState<Financeiro[]>([]);
  const urlBase = 'http://localhost:8081/api/financeiros';

  useEffect(() => {
    fetch(urlBase)
      .then(res => res.json())
      .then(setFinanceiros);
  }, []);

  const buscarPorId = async (id: string): Promise<Financeiro | null> => {
    try {
      const res = await fetch(`${urlBase}/${id}`);
      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      console.error('Erro ao buscar:', error);
      return null;
    }
  };

  const alterar = async (id: number, lucro: number, prejuizo: number) => {
    try {
      const res = await fetch(`${urlBase}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          historicoLucro: lucro,
          historicoPrejuizo: prejuizo,
        }),
      });

      if (!res.ok) {
        alert('Erro ao alterar. Verifique o ID e tente novamente.');
        return;
      }

      const atualizado = await res.json();

      setFinanceiros(prev =>
        prev.map(f => f.idFinanceiro === id ? atualizado : f)
      );
    } catch (error) {
      console.error('Erro ao alterar:', error);
    }
  };

  return (
    <div className="financeiro-container">
      <h1 className="financeiro-title">Alterar Financeiro</h1>
      <FinanceiroAlterar onBuscar={buscarPorId} onAlterar={alterar} />
    </div>
  );
}
