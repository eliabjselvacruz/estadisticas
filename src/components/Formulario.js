import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import db from '../../db/firebaseconfig';
import { collection, addDoc } from "firebase/firestore"; 

export default function Formulario({setBandera}) {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('Masculino');
  const [salario, setSalario] = useState('');

  const limpiarCampos = () => {
    setNombre("");
    setEdad("");
    setGenero("Masculino");
    setSalario("");
  }

  const guardarDatos = async () => {
    try {
      const docRef = await addDoc(collection(db, "personas"), {
        nombre: nombre,
        edad: parseInt(edad),
        genero: genero,
        salario: parseFloat(salario)
      });
      console.log("Documento agregado con ID: ", docRef.id);
    } catch (e) {
      console.error("Error al agregar el documento: ", e);
    }
  }

  const handleSubmit = () => {
    console.log(`Nombre: ${nombre}, Edad: ${edad}, Género: ${genero}, Salario: ${salario}`);
    guardarDatos();
    limpiarCampos();
    setBandera(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ingresa tu nombre"
      />

      <Text style={styles.label}>Edad:</Text>
      <TextInput
        style={styles.input}
        value={edad}
        onChangeText={setEdad}
        placeholder="Ingresa tu edad"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Género:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={genero}
          onValueChange={(itemValue) => setGenero(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Femenino" value="Femenino" />
        </Picker>
      </View>

      <Text style={styles.label}>Salario:</Text>
      <TextInput
        style={styles.input}
        value={salario}
        onChangeText={setSalario}
        placeholder="Ingresa tu salario"
        keyboardType="numeric"
      />

      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    height: 50,
  },
});
