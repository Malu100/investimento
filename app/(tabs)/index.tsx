// index.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

export default function App() {
  const [valor, setValor] = useState("");
  const [meses, setMeses] = useState("");
  const [juros, setJuros] = useState("");
  const [resultado, setResultado] = useState({ semJuros: 0, comJuros: 0 });

  const formatCurrency = (v: number) =>
    `R$ ${v.toFixed(2).replace(".", ",")}`;

  const calcular = () => {
    const P = parseFloat(valor.replace(",", ".")) || 0; // investimento mensal
    const n = parseInt(meses) || 0; // número de meses
    const i = (parseFloat(juros.replace(",", ".")) || 0) / 100; // taxa mensal

    if (P <= 0 || n <= 0) {
      setResultado({ semJuros: 0, comJuros: 0 });
      return;
    }

    // sem juros = valor investido * meses
    const semJuros = P * n;

    // com juros compostos (fórmula da soma de PA geométrica):
    // FV = P * [ ( (1+i)^n - 1 ) / i ]
    let comJuros = semJuros;
    if (i > 0) {
      comJuros = P * ((Math.pow(1 + i, n) - 1) / i);
    }

    setResultado({ semJuros, comJuros });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Simulador de Investimentos</Text>
        </View>

        <Text style={styles.label}>Investimento mensal:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o valor"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />

        <Text style={styles.label}>Número de meses:</Text>
        <TextInput
          style={styles.input}
          placeholder="Quantos meses deseja investir"
          keyboardType="numeric"
          value={meses}
          onChangeText={setMeses}
        />

        <Text style={styles.label}>Taxa de juros ao mês:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a taxa de juros"
          keyboardType="numeric"
          value={juros}
          onChangeText={setJuros}
        />

        <TouchableOpacity style={styles.button} onPress={calcular}>
          <Text style={styles.buttonText}>Simular</Text>
        </TouchableOpacity>

        <Text style={styles.result}>
          Valor total sem juros: {formatCurrency(resultado.semJuros)}
        </Text>
        <Text style={styles.result}>
          Valor total com juros compostos: {formatCurrency(resultado.comJuros)}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e6f2e6" },
  content: { padding: 16 },
  header: {
    backgroundColor: "#1c4b27",
    padding: 12,
    borderRadius: 4,
    marginBottom: 20,
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },
  label: {
    color: "#2f5b9e",
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#3d2b23",
    padding: 12,
    marginTop: 18,
    borderRadius: 25,
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 30,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  result: {
    marginTop: 12,
    fontWeight: "600",
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
