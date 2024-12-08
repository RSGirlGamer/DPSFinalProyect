import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { format } from 'date-fns';

const pastEvents = [
  { id: "1", name: "Concierto de Rock", date: "2024-10-15", attended: true },
  { id: "2", name: "Taller de React Native", date: "2024-11-20", attended: false },
  { id: "3", name: "Cine al Aire Libre", date: "2024-09-10", attended: true },
  { id: "4", name: "Clase de Yoga", date: "2024-08-05", attended: false },
];

const statisticsData = {
  labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      data: [5, 10, 8, 13, 20, 35, 20, 30, 10, 20, 10, 20],
    },
  ],
};

export default function ProfileScreen({ navigation }) {
  // Renderizar historial de eventos
  const renderEvent = ({ item }) => (
    <View style={styles.eventCard}>
      <Text style={styles.eventName}>{item.name}</Text>
      <Text>{format(new Date(item.date), "dd-MM-yyyy")}</Text>
      <Text style={styles.attendanceStatus}>
        {item.attended ? "Asistido" : "No Asistido"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>

      {/* Historial de Eventos */}
      <Text style={styles.sectionTitle}>Historial de Eventos</Text>
      <FlatList
        data={pastEvents}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No has asistido a eventos todavía.</Text>}
        style={styles.list}
      />

      {/* Estadísticas */}
      <Text style={styles.sectionTitle}>Estadísticas</Text>
      <LineChart
        data={statisticsData}
        width={350}
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffc107",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />

      {/* Botón para ir a la configuración o editar perfil */}
      <Button mode="contained" style={styles.button} onPress={() => navigation.navigate("EditProfile")}      >
        Editar Perfil
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f6f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventCard: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  attendanceStatus: {
    fontSize: 16,
    color: "#007bff",
    marginTop: 5,
  },
  chart: {
    marginVertical: 20,
  },
  list: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    marginTop: 20,
  },
});
