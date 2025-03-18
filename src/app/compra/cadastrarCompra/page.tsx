"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface CadastroCompraProps {
  onCadastroSucesso?: () => void;
}

const CadastroCompra: React.FC<CadastroCompraProps> = ({ onCadastroSucesso }) => {
  const [idFornecedor, setIdFornecedor] = useState<number>(0);
  const [dataCompra, setDataCompra] = useState("");
  const [valorTotal, setValorTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://ceteia.guanambi.ifbaiano.edu.br:15050/api/compras", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_fornecedor: idFornecedor,
          data_compra: dataCompra,
          valor_total: valorTotal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao cadastrar compra.");
      }

      // Limpar o formulário
      setIdFornecedor(0);
      setDataCompra("");
      setValorTotal(0);

      if (onCadastroSucesso) {
        onCadastroSucesso();
      } else {
        router.push("/compra/listarCompras"); // Redireciona para a lista de compras
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao cadastrar compra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ID Fornecedor:</label>
        <input
          type="number"
          value={idFornecedor}
          onChange={(e) => setIdFornecedor(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Data da Compra:</label>
        <input
          type="date"
          value={dataCompra}
          onChange={(e) => setDataCompra(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Valor Total:</label>
        <input
          type="number"
          step="0.01"
          value={valorTotal}
          onChange={(e) => setValorTotal(Number(e.target.value))}
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

export default CadastroCompra;