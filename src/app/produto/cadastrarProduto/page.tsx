"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface CadastroProdutoProps {
  onCadastroSucesso?: () => void;
}

const CadastroProduto: React.FC<CadastroProdutoProps> = ({ onCadastroSucesso }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidadeEstoque, setQuantidadeEstoque] = useState<number>(0);
  const [idFornecedor, setIdFornecedor] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://ceteia.guanambi.ifbaiano.edu.br:15050/api/produto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          descricao,
          preco,
          quantidade_estoque: quantidadeEstoque,
          id_fornecedor: idFornecedor,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao cadastrar produto.");
      }

      // Limpar o formulário
      setNome("");
      setDescricao("");
      setPreco("");
      setQuantidadeEstoque(0);
      setIdFornecedor(0);

      if (onCadastroSucesso) {
        onCadastroSucesso();
      } else {
        router.push("/produto/listarProdutos"); // Redireciona para a lista de produtos
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao cadastrar produto.");
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
        <label>Descrição:</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Preço:</label>
        <input
          type="text"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Quantidade em Estoque:</label>
        <input
          type="number"
          value={quantidadeEstoque}
          onChange={(e) => setQuantidadeEstoque(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>ID Fornecedor:</label>
        <input
          type="number"
          value={idFornecedor}
          onChange={(e) => setIdFornecedor(Number(e.target.value))}
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

export default CadastroProduto;