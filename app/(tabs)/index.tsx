import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const standard = [0.5, 0.75, 1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70];

const App = () => {
  const [corrente, setCorrente] = useState<string>('');
  const [distancia, setDistancia] = useState<string>('');
  const [res, setRes] = useState<{
    b110: number;
    b220: number;
    recom110: number;
    recom220: number;
  } | null>(null);

  const roundUpStandard = (value: number): number => {
    const found = standard.find(s => s >= value);
    return found || standard[standard.length - 1];
  };

  const calcular = () => {
    const I = parseFloat(corrente.replace(',', '.')) || 0;
    const d = parseFloat(distancia.replace(',', '.')) || 0;
    
    if (I <= 0 || d <= 0) {
      Alert.alert('Erro', 'Informe corrente e distância válidas');
      return;
    }

    const b110 = (2 * I * d) / 294.64;
    const b220 = (2 * I * d) / 510.4;

    setRes({
      b110: Math.round(b110 * 100) / 100,
      b220: Math.round(b220 * 100) / 100,
      recom110: roundUpStandard(b110),
      recom220: roundUpStandard(b220)
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Calculadora de Bitola</Text>

        {}
        <TextInput
          style={styles.input}
          placeholder="Corrente (A)"
          value={corrente}
          onChangeText={setCorrente}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Distância (m)"
          value={distancia}
          onChangeText={setDistancia}
          keyboardType="numeric"
        />

        {}
        <TouchableOpacity style={styles.button} onPress={calcular}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>

        {}
        {res && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Resultado</Text>
            <Text>Bitola (110V): {res.b110} mm² — recomenda: {res.recom110} mm²</Text>
            <Text>Bitola (220V): {res.b220} mm² — recomenda: {res.recom220} mm²</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  content: {
    padding: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#4A148C',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#B45309',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  card: {
    marginTop: 16,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontWeight: '700',
    marginBottom: 8,
    color: '#4A148C',
  },
});

export default App;