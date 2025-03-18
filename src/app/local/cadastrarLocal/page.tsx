"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface CadastroLocalProps {
  onCadastroSucesso?: () => void;
}

const CadastroLocal: React.FC<CadastroLocalProps> = ({ onCadastroSucesso }) => {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://ceteia.guanambi.ifbaiano.edu.br:15050/api/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          endereco,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao cadastrar local.");
      }

      // Limpar o formulário
      setNome("");
      setEndereco("");

      if (onCadastroSucesso) {
        onCadastroSucesso();
      } else {
        router.push("/local/listarLocais"); 
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao cadastrar local.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Endereço:</label>
        <input
          type="text"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          required
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
};

export default CadastroLocal;