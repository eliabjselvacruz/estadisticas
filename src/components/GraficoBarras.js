import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { CartesianChart, Bar } from "victory-native";
import { LinearGradient, vec, useFont } from "@shopify/react-native-skia";


export default function GraficoBarras({data}) {

  const font = useFont(require("../fonts/Roboto-Regular.ttf"));

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', height: 300 }}>
        <CartesianChart
          data={data}
          xKey="x"
          yKeys={["y"]}
          padding={5}
          domainPadding={{ left: 50, right: 50, top: 10 }}
          axisOptions={{
            tickCount: { x: data.length, y: 10 },
            font: font,
            labelPosition: 'outset'
          }}
        >
          {({ points, chartBounds }) => (
            <Bar
              points={points.y}
              chartBounds={chartBounds}
              innerPadding={0.5}
              color="green"
              roundedCorners={{ topLeft: 10, topRight: 10 }}
              labels={{ position: "top", color: "orange" }}
            >
              <LinearGradient
                start={vec(0, 0)}
                end={vec(0, 500)}
                colors={[
                  "#a78bfa",
                  "#a78bfa50",
                ]}
              />
            </Bar>
          )}
        </CartesianChart>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
