import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Button } from 'react-native';
import GraficoBarras from './src/components/GraficoBarras';
import Formulario from './src/components/Formulario';

import { collection, getDocs, query } from 'firebase/firestore';
import db from './db/firebaseconfig';

// Datos iniciales
const data2 = [
  { x: '1', y: 0 },
  { x: '2', y: 0 },
  { x: '3', y: 0 },
];

export default function App() {
  const [data, setData] = useState(data2); // Inicializa con datos iniciales
  const [bandera, setBandera] = useState(false); // Variable bandera

  useEffect(() => {

    const recibirDatos = async () => {
      try {
        const q = query(collection(db, "personas"));
        const querySnapshot = await getDocs(q);
        const d = [];

        querySnapshot.forEach((doc) => {
          const datosBD = doc.data();
          const { nombre, salario } = datosBD;

          if (typeof salario === 'number' && nombre) {
            d.push({ x: nombre, y: salario });
          }
        });

        setData(d);
        console.log(d);
      } catch (error) {
        console.error("Error al obtener documentos: ", error);
      }
    };

    recibirDatos(); 
  }, [bandera]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>

        <Formulario setBandera={setBandera}/>

        <View style={styles.graphContainer}>
          <GraficoBarras data={data} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 10,
  },
  graphContainer: {
    marginTop: 10,
    padding: 10,
  },
});
