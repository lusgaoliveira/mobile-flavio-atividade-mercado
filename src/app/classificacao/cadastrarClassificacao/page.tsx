"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface CadastroClassificacaoProps {
  onCadastroSucesso?: () => void;
}

const CadastroClassificacao: React.FC<CadastroClassificacaoProps> = ({ onCadastroSucesso }) => {
  const [idProduto, setIdProduto] = useState<number>(0);
  const [idCliente, setIdCliente] = useState<number>(0);
  const [nota, setNota] = useState<number>(0);
  const [comentario, setComentario] = useState("");
  const [dataClassificacao, setDataClassificacao] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://ceteia.guanambi.ifbaiano.edu.br:15050/api/classificacao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_produto: idProduto,
          id_cliente: idCliente,
          nota,
          comentario,
          data_classificacao: dataClassificacao,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao cadastrar classificação.");
      }

      // Limpar o formulário
      setIdProduto(0);
      setIdCliente(0);
      setNota(0);
      setComentario("");
      setDataClassificacao("");

      if (onCadastroSucesso) {
        onCadastroSucesso();
      } else {
        router.push("/classificacao/listarClassificacao"); 
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao cadastrar classificação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ID Produto:</label>
        <input
          type="number"
          value={idProduto}
          onChange={(e) => setIdProduto(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>ID Cliente:</label>
        <input
          type="number"
          value={idCliente}
          onChange={(e) => setIdCliente(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Nota:</label>
        <input
          type="number"
          value={nota}
          onChange={(e) => setNota(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Comentário:</label>
        <input
          type="text"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Data da Classificação:</label>
        <input
          type="date"
          value={dataClassificacao}
          onChange={(e) => setDataClassificacao(e.target.value)}
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

export default CadastroClassificacao;