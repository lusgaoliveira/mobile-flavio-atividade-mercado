"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Classificacao from "../../models/classificacao";
import Link from "next/link"; // Importe o componente Link

const ClassificacoesPage = () => {
  const [classificacoes, setClassificacoes] = useState<Classificacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClassificacoes = async () => {
      try {
        const response = await fetch("http://ceteia.guanambi.ifbaiano.edu.br:15050/api/classificacao");
        if (!response.ok) {
          throw new Error("Erro ao buscar classificações.");
        }
        const data = await response.json();
        setClassificacoes(data.classificacoes);
      } catch (error) {
        setError("Erro ao carregar classificações.");
      } finally {
        setLoading(false);
      }
    };

    fetchClassificacoes();
  }, []);

  return (
    <div>
      <h1>Lista de Classificações</h1>
      {/* Botão para cadastrar classificação */}
      <Link href="/classificacao/cadastrarClassificacao">
        <button className={styles.cadastrarButton}>Cadastrar Classificação</button>
      </Link>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : classificacoes.length === 0 ? (
        <p>Nenhuma classificação cadastrada.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Produto</th>
              <th>ID Cliente</th>
              <th>Nota</th>
              <th>Comentário</th>
              <th>Data da Classificação</th>
            </tr>
          </thead>
          <tbody>
            {classificacoes.map((classificacao) => (
              <tr key={classificacao.id_classificacao}>
                <td>{classificacao.id_classificacao}</td>
                <td>{classificacao.id_produto}</td>
                <td>{classificacao.id_cliente}</td>
                <td>{classificacao.nota}</td>
                <td>{classificacao.comentario}</td>
                <td>{new Date(classificacao.data_classificacao).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClassificacoesPage;