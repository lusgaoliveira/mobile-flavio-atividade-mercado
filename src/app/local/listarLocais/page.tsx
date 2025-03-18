"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Local from "../../models/local";
import Link from "next/link"; // Importe o componente Link

const LocaisPage = () => {
  const [locais, setLocais] = useState<Local[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocais = async () => {
      try {
        const response = await fetch("http://ceteia.guanambi.ifbaiano.edu.br:15050/api/local");
        if (!response.ok) {
          throw new Error("Erro ao buscar locais!");
        }
        const data = await response.json();
        setLocais(data.locais);
      } catch (error) {
        setError("Erro ao carregar locais!");
      } finally {
        setLoading(false);
      }
    };

    fetchLocais();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Locais</h1>
      {/* Botão para cadastrar local */}
      <Link href="/local/cadastrarLocal">
        <button className={styles.cadastrarButton}>Cadastrar Local</button>
      </Link>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : locais.length === 0 ? (
        <p>Nenhum local cadastrado.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID Local</th>
              <th>Nome</th>
              <th>Endereço</th>
            </tr>
          </thead>
          <tbody>
            {locais.map((local) => (
              <tr key={local.id_local}>
                <td>{local.id_local}</td>
                <td>{local.nome}</td>
                <td>{local.endereco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LocaisPage;