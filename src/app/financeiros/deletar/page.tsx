'use client';

import { useEffect, useState } from "react";
import FinanceiroDeletar from "@/components/FinanceiroDeletar";
import { Financeiro } from "@/types/financeiro";
import '@/styles/Financeiro/FinanceiroPageDeletar.css';

export default function FinanceiroPageDeletar() {
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

    const deletar = async (id: number) => {
        await fetch(`${urlBase}/${id}`, { method: 'DELETE' });
        setFinanceiros(financeiros.filter(f => f.idFinanceiro !== id));
    };

    return (
        <div className="deletar-container">
            <h1 className="deletar-titulo">Deletar Financeiro</h1>
            <FinanceiroDeletar onBuscar={buscarPorId} onDeletar={deletar} />
        </div>
    );
}
