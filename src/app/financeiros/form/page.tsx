'use client';

import { useEffect, useState } from 'react';
import FinanceiroForm from '@/components/FinanceiroForm';
import { Financeiro } from '@/types/financeiro';
import '@/styles/FinanceiroPageForm.css';



export default function FinanceirosPageForm() {
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

  return (
    <div className="financeiro-container">
      <h1 className="financeiro-title">Financeiro</h1>
      <FinanceiroForm onInserir={inserir} />
    </div>
  );
}
