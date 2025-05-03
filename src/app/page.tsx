'use client';
import '../styles/index.css';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <h1>Sistema de Gestão</h1>
      <p>Bem-vindo! Escolha um módulo:</p>
      <div>
        <Link href="/financeiros">
          <button className="button">Financeiro</button>
        </Link>
      </div>
    </main>
  );
}
