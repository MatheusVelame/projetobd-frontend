'use client';

import FinanceiroBuscar from '@/components/FinanceiroBuscar';
import { Financeiro } from '@/types/financeiro';
import '@/styles/Financeiro/FinanceiroPageBuscar.css';

export default function FinanceiroPageBuscar() {
  const urlBase = 'http://localhost:8081/api/financeiros';

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

  return (
    <div className="financeiro-container">
      <h1 className="financeiro-title">Financeiro</h1>
      <FinanceiroBuscar onBuscar={buscarPorId} />
    </div>
  );
}
