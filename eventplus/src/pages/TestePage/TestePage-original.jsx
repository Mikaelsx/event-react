import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const TestePage = () => {
  const [total, setTotal] = useState("");
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");

  function handleCalcular(e) {
    //cahamar no submit do form
    e.preventDefault();
    setTotal(parseFloat(n1) + parseFloat(n2));
  }
  return (
    <form onSubmit={handleCalcular}>
      <br />

      <h1>Pagina de teste</h1>
      <br />

      <h2>Calculadora</h2>
      <br />
      <Input
        tipo="number"
        id="numero1"
        nome="numero1"
        dicaCampo="Digite o 1° numero"
        valor={n1}
        fnAltera={setN1}
      />
      <Input
        tipo="number"
        id="numero2"
        nome="numero2"
        dicaCampo="Digite o 2° numero"
        valor={n2}
        fnAltera={setN2}
      />
      <br />
      <Button tipo="submit" textoBotao="Calcular" />

      <p>
        Resultado: <strong>{total}</strong>
      </p>
    </form>
  );
};

export default TestePage;
