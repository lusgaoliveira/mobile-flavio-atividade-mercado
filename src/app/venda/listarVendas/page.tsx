"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Venda from "../../models/venda";
import Link from "next/link"; // Importe o componente Link

const VendasPage = () => {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const response = await fetch("http://ceteia.guanambi.ifbaiano.edu.br:15050/api/venda");
        if (!response.ok) {
          throw new Error("Erro ao buscar vendas!");
        }
        const data = await response.json();
        setVendas(data.vendas);
      } catch (error) {
        setError("Erro ao carregar vendas!");
      } finally {
        setLoading(false);
      }
    };

    fetchVendas();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Vendas</h1>
      {/* Botão para cadastrar venda */}
      <Link href="/venda/cadastrarVenda">
        <button className={styles.cadastrarButton}>Cadastrar Venda</button>
      </Link>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : vendas.length === 0 ? (
        <p>Nenhuma venda cadastrada.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID Venda</th>
              <th>ID Cliente</th>
              <th>Data da Venda</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda) => (
              <tr key={venda.id_venda}>
                <td>{venda.id_venda}</td>
                <td>{venda.id_cliente}</td>
                <td>{new Date(venda.data_venda).toLocaleDateString()}</td>
                <td>R${Number(venda.valor_total).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VendasPage;