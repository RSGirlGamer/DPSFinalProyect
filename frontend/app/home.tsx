import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { Button } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import { format, addDays, isWithinInterval, parseISO } from "date-fns";

const events = [
  { id: "1", name: "Concierto de Rock", date: "2024-12-02T20:00:00", location: "Auditorio Nacional" },
  { id: "2", name: "Taller de React Native", date: "2024-12-07T18:30:00", location: "Online" },
  { id: "3", name: "Clase de Yoga", date: "2024-12-10T09:00:00", location: "Parque Central" },
  { id: "4", name: "Cine al Aire Libre", date: "2024-12-08T20:00:00", location: "Plaza Mayor" },
];

const personalEvents = [
  { id: "1", name: "Concierto de Metal", date: "2024-12-02T20:00:00", location: "Auditorio Nacional" },
  { id: "2", name: "Taller de Angular", date: "2024-12-07T18:30:00", location: "Online" },
  { id: "3", name: "Clase de Yoga", date: "2024-12-10T09:00:00", location: "Parque Central" },
  { id: "4", name: "Cine en el Colegio", date: "2024-12-08T20:00:00", location: "Plaza Mayor" },
];

export default function HomeScreen({ navigation }) {
  const today = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(today);
  const [markedDates, setMarkedDates] = useState({});
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const datesWithColors = {};
    events.forEach((event) => {
      const date = event.date.split("T")[0];
      if (!datesWithColors[date]) {
        datesWithColors[date] = { marked: true, dotColor: generateRandomColor() };
      }
    });
    datesWithColors[selectedDate] = { ...datesWithColors[selectedDate], selected: true, selectedColor: "#007bff" };
    setMarkedDates(datesWithColors);
  }, [selectedDate]);

  const filteredEvents = selectedDate
    ? events.filter((event) => event.date.startsWith(selectedDate))
    : events;

  useEffect(() => {
    const todayDate = new Date();
    const threeDaysFromNow = addDays(todayDate, 4);

    const upcoming = personalEvents.filter((event) =>
      isWithinInterval(parseISO(event.date), { start: todayDate, end: threeDaysFromNow })
    );

    setUpcomingEvents(upcoming);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => navigation.navigate("EventDetails", { event: item })}
    >
      <Text style={styles.eventName}>{item.name}</Text>
      <Text>{format(new Date(item.date), "dd-MM-yyyy hh:mm a")} - {item.location}</Text>
    </TouchableOpacity>
  );

  const contentData = [
    {
      type: "section",
      title: "Eventos Próximos",
      data: upcomingEvents,
    },
    {
      type: "calendar",
      data: [], // Placeholder for calendar
    },
    {
      type: "section",
      title: "Eventos del Día",
      data: filteredEvents,
    },
  ];

  const renderSection = ({ item }) => {
    if (item.type === "calendar") {
      return (
        <Calendar
          current={today}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          style={styles.calendar}
        />
      );
    } else {
      return (
        <>
          <Text style={styles.sectionTitle}>{item.title}</Text>
          <FlatList
            data={item.data}
            renderItem={renderItem}
            keyExtractor={(event) => event.id}
            horizontal={item.title === "Eventos Próximos"}
            ListEmptyComponent={
              <Text style={styles.noEventsText}>
                No hay eventos disponibles para esta fecha.
              </Text>
            }
          />
        </>
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        data={contentData}
        renderItem={renderSection}
        keyExtractor={(item, index) => `section-${index}`}
        contentContainerStyle={styles.scrollContainer}
        ListFooterComponent={
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate("CreateEvent")}
          >
            Crear Nuevo Evento
          </Button>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f4f6f9", // Fondo uniforme
    paddingBottom: 10 // Evita espacios negativos si el contenido está vacío
  },
  scrollContainer: { 
    backgroundColor: "#f4f6f9", 
    padding: 20 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: "bold", 
    marginBottom: 10 
  },
  calendar: { 
    marginBottom: 20 
  },
  button: { 
    backgroundColor: "#007bff", 
    marginTop: 20 
  },
  eventCard: { 
    padding: 15, 
    marginBottom: 10, 
    backgroundColor: "#fff", 
    borderRadius: 8, 
    marginRight: 10 
  },
  eventName: { 
    fontSize: 18, 
    fontWeight: "bold" 
  },
  noEventsText: { 
    fontSize: 16, 
    color: "#666", 
    textAlign: "center", 
    marginTop: 20 
  },
});