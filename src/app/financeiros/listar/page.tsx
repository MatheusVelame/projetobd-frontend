'use client';

import { useEffect, useState } from "react";
import FinanceiroLista from "@/components/FinanceiroLista";
import { Financeiro } from "@/types/financeiro";
import '@/styles/FinanceiroPageLista.css';

export default function FinanceirosPageLista() {
  const [financeiros, setFinanceiros] = useState<Financeiro[]>([]);
  const urlBase = 'http://localhost:8081/api/financeiros';

  useEffect(() => {
    fetch(urlBase)
      .then(res => res.json())
      .then(setFinanceiros)
      .catch(error => {
        console.error('Erro ao buscar lista:', error);
        alert('Erro ao buscar registros.');
      });
  }, []);

  return (
    <div className="financeiro-container">
      <h1 className="financeiro-title">Lista de Financeiros</h1>
      <FinanceiroLista lista={financeiros} />
    </div>
  );
}
