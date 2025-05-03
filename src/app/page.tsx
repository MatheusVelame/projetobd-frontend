'use client';

// src/index.js
import './styles/index.css'; // Ajuste o caminho se necessário


import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Sistema de Gestão</h1>

      <p className="text-lg">Bem-vindo! Escolha um módulo:</p>

      <div className="space-x-4">
        <Link href="/financeiros">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Financeiro</button>
        </Link>
      </div>
    </main>
  );
}
