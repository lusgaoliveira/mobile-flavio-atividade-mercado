"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface CadastroVendaProps {
  onCadastroSucesso?: () => void;
}

const CadastroVenda: React.FC<CadastroVendaProps> = ({ onCadastroSucesso }) => {
  const [idCliente, setIdCliente] = useState<number>(0);
  const [dataVenda, setDataVenda] = useState("");
  const [valorTotal, setValorTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://ceteia.guanambi.ifbaiano.edu.br:15050/api/venda", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_cliente: idCliente,
          data_venda: dataVenda,
          valor_total: valorTotal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao cadastrar venda.");
      }

      // Limpar o formulário
      setIdCliente(0);
      setDataVenda("");
      setValorTotal(0);

      if (onCadastroSucesso) {
        onCadastroSucesso();
      } else {
        router.push("/venda/listarVendas"); // Redireciona para a lista de vendas
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao cadastrar venda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <label>Data da Venda:</label>
        <input
          type="date"
          value={dataVenda}
          onChange={(e) => setDataVenda(e.target.value)}
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

export default CadastroVenda;