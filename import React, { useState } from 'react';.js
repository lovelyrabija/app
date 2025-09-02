import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground,
} from 'react-native';

// Import the local image
const backgroundImage = require('./assets/cricket_player.jpg');

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to meters

    if (!w || !h) {
      Alert.alert('Invalid input', 'Please enter valid weight and height');
      return;
    }

    const bmiValue = w / (h * h);
    setBmi(bmiValue.toFixed(2));

    if (bmiValue < 18.5) setCategory('Underweight');
    else if (bmiValue < 24.9) setCategory('Normal weight');
    else if (bmiValue < 29.9) setCategory('Overweight');
    else setCategory('Obesity');
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={styles.title}>BMI Calculator</Text>

        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          placeholderTextColor="#eee"
        />

        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
          placeholderTextColor="#eee"
        />

        <Button title="Calculate BMI" onPress={calculateBMI} color="#1e90ff" />

        {bmi && (
          <View style={styles.result}>
            <Text style={styles.bmiText}>Your BMI: {bmi}</Text>
            <Text style={styles.categoryText}>Category: {category}</Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.4)', // semi-transparent overlay for text visibility
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: 'rgba(255,255,255,0.3)',
    color: '#fff',
  },
  result: {
    marginTop: 30,
    alignItems: 'center',
  },
  bmiText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e90ff',
  },
  categoryText: {
    fontSize: 20,
    marginTop: 10,
    color: '#fff',
  },
});
