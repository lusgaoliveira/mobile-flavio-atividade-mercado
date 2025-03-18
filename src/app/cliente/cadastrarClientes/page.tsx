"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface CadastroClienteProps {
  onCadastroSucesso?: () => void;
}

const CadastroCliente: React.FC<CadastroClienteProps> = ({ onCadastroSucesso }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://ceteia.guanambi.ifbaiano.edu.br:15050/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          telefone,
          endereco,
          data_nascimento: dataNascimento,
          senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao cadastrar cliente.");
      }

      // Limpar o formulário
      setNome("");
      setEmail("");
      setTelefone("");
      setEndereco("");
      setDataNascimento("");
      setSenha("");

      if (onCadastroSucesso) {
        onCadastroSucesso();
      } else {
        router.push("/cliente/listarClientes"); 
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao cadastrar cliente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Telefone:</label>
        <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
      </div>
      <div>
        <label>Endereço:</label>
        <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
      </div>
      <div>
        <label>Data de Nascimento:</label>
        <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required />
      </div>
      <div>
        <label>Senha:</label>
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
};

export default CadastroCliente;