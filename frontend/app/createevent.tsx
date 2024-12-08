import React, { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, StyleSheet, Text, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { es } from 'date-fns/locale';
import { format } from "date-fns";
import axios from 'axios'; // Usamos axios para hacer la solicitud HTTP

export default function CreateEventScreen({ navigation }) {
  const [name, setName] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  // URL del backend (reemplaza con la URL real de tu API)
  const apiUrl = "http://localhost:5000/api/events"; // Cambiar por tu URL real

  const handleCreate = async () => {
    // Validación simple
    if (!name || !location || !description) {
      Alert.alert("Error", "Por favor, complete todos los campos.");
      return;
    }

    // Datos del evento a enviar
    const eventData = {
      name,
      description,
      location,
      date: eventDate.toISOString(), // Enviar la fecha en formato ISO
    };

    try {
      // Llamada a la API para crear el evento
      const response = await axios.post(apiUrl, eventData);

      if (response.status === 201) {
        Alert.alert("Éxito", "Evento creado con éxito.");
        navigation.navigate("Home"); // Redirigir a la página de inicio
      } else {
        Alert.alert("Error", "Hubo un problema al crear el evento.");
      }
    } catch (error) {
      console.error("Error al crear el evento:", error);
      Alert.alert("Error", "Ocurrió un error al intentar crear el evento.");
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setEventDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      const updatedDate = new Date(eventDate);
      updatedDate.setHours(selectedTime.getHours());
      updatedDate.setMinutes(selectedTime.getMinutes());
      setEventDate(updatedDate);
    }
    setShowTimePicker(false);
  };

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleShowTimePicker = () => {
    setShowTimePicker(true);
  };

  const formatDate = (date) => {
    return format(date, "EEEE d MMMM yyyy hh:mm a", { locale: es });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Evento</Text>
      <TextInput
        label="Nombre del Evento"
        value={name}
        onChangeText={setName}
        style={styles.input}
        theme={{
          colors: {
            primary: "#007bff", // Azul para label y línea
            background: "#f4f6f9",
          },
        }}
      />
      <TextInput
        label="Descripción"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        theme={{
          colors: {
            primary: "#007bff", // Azul para label y línea
            background: "#f4f6f9",
          },
        }}
        multiline
      />
      <TextInput
        label="Ubicación"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
        theme={{
          colors: {
            primary: "#007bff", // Azul para label y línea
            background: "#f4f6f9",
          },
        }}
      />
      <View style={styles.datePickerContainer}>
        <Text>Fecha y Hora:</Text>
        <TextInput style={styles.input} editable={false} value={formatDate(eventDate)} />
        <Button mode="contained" style={styles.button} onPress={handleShowDatePicker} >Seleccionar Fecha</Button>
        {showDatePicker && (
          <DateTimePicker
            value={eventDate}
            mode="date"
            onTouchCancel={() => setShowDatePicker(false)}
            display="compact"
            onChange={handleDateChange}
          />
        )}
      </View>
      <View style={styles.datePickerContainer}>
        <Button mode="contained" style={styles.button} onPress={handleShowTimePicker}>Seleccionar Hora</Button>
        {showTimePicker && (
          <DateTimePicker
            value={eventDate}
            mode="time"
            onTouchCancel={() => setShowTimePicker(false)}
            display="compact"
            onChange={handleTimeChange}
          />
        )}
      </View>
      <Button mode="contained" onPress={handleCreate} style={styles.button}>
        Crear Evento
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4f6f9" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { marginBottom: 15, backgroundColor: "#f4f6f9" },
  button: { backgroundColor: "#007bff" },
  datePickerContainer: {
    marginBottom: 15,
  },
  selectedDate: {
    fontSize: 16,
    marginBottom: 10,
    color: "#007BFF",
  }
});
