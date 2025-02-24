"use client"; 

import { useSearchParams } from "next/navigation";

export default function Grupo() {
  const searchParams = useSearchParams();
  const nomeParam = searchParams.get("nome");
  const enderecoParam = searchParams.get("endereco");

  return (
    <div>
      <h1>Olá, {nomeParam}!</h1>
      <h2>Seu endereço: {enderecoParam}</h2>
    </div>
  );
}
