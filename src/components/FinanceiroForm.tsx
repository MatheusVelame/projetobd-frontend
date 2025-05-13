"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import '../styles/Financeiro/FinanceiroForm.css'

interface Props {
  onInserir: (lucro: number, prejuizo: number) => void
}

export default function FinanceiroForm({ onInserir }: Props) {
  const [lucro, setLucro] = useState("")
  const [prejuizo, setPrejuizo] = useState("")
  const router = useRouter()

  const handleSubmit = () => {
    if (lucro && prejuizo) {
      onInserir(parseFloat(lucro), parseFloat(prejuizo))
      setLucro("")
      setPrejuizo("")
    }
  }

  const handleVoltar = () => {
    router.back()
  }

  return (
    <div className="form-container">
      <div className="header">
        <div className="icon-container">
          <img src="/images/pngwing.com.png" alt="Ícone" className="factory-icon" />
        </div>
      </div>

      <div className="form-content">
        <p className="option-label">Opção Selecionada:</p>
        <h1 className="form-title">Inserir Financeiro</h1>

        <div className="input-group">
          <label htmlFor="lucro">Histórico Lucro:</label>
          <input
            id="lucro"
            type="number"
            className="form-input"
            value={lucro}
            onChange={(e) => setLucro(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="prejuizo">Histórico Prejuízo:</label>
          <input
            id="prejuizo"
            type="number"
            className="form-input"
            value={prejuizo}
            onChange={(e) => setPrejuizo(e.target.value)}
          />
        </div>

        <button className="confirm-button" onClick={handleSubmit}>
          Confirmar
        </button>

        <button className="back-button" onClick={handleVoltar}>
          Voltar
        </button>
      </div>
    </div>
  )
}
