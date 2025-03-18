"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Compra from "../../models/compra";
import Link from "next/link"; // Importe o componente Link

const ComprasPage = () => {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const response = await fetch("http://ceteia.guanambi.ifbaiano.edu.br:15050/api/compras");
        if (!response.ok) {
          throw new Error("Erro ao buscar compras!");
        }
        const data = await response.json();
        setCompras(data.compras);
      } catch (error) {
        setError("Erro ao carregar compras!");
      } finally {
        setLoading(false);
      }
    };

    fetchCompras();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Compras</h1>
      {/* Botão para cadastrar compra */}
      <Link href="/compra/cadastrarCompra">
        <button className={styles.cadastrarButton}>Cadastrar Compra</button>
      </Link>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : compras.length === 0 ? (
        <p>Nenhuma compra cadastrada.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID Compra</th>
              <th>ID Fornecedor</th>
              <th>Data Compra</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra) => (
              <tr key={compra.id_compra}>
                <td>{compra.id_compra}</td>
                <td>{compra.id_fornecedor}</td>
                <td>{new Date(compra.data_compra).toLocaleString()}</td>
                <td>R${(Number(compra.valor_total) || 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComprasPage;