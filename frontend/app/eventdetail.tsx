import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Share, ScrollView, Button, Modal } from "react-native";
import { Rating } from 'react-native-ratings';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { TextInput } from "react-native-paper";

export default function EventDetailsScreen({ route, navigation }) {
  const { event } = route.params;

  const [isRSVPed, setIsRSVPed] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [commentsList, setCommentsList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para el modal


  const [isEditing, setIsEditing] = useState(false);
  const [eventName, setEventName] = useState(event.name);
  const [usersAttending, setUsersAttending] = useState([]); // Nuevo estado para los usuarios
  const [eventDescription, setEventDescription] = useState(event.description || ""); // Nuevo estado para la descripción
  const [eventDate, setEventDate] = useState(new Date(event.date));
  const [eventLocation, setEventLocation] = useState(event.location);

  const fixedRating = 4.298412782137;
  const [isDatePassed, setIsDatePassed] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    if (currentDate > eventDate) {
      setIsDatePassed(true);
    }
     // Simulando usuarios que asistirán al evento
     setUsersAttending([
      { id: 1, name: "Carlos López" },
      { id: 2, name: "Ana Pérez" },
      { id: 3, name: "Juan García" },
    ]);
  }, [eventDate]);

  const handleRSVP = () => {
    setIsRSVPed(true);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() && rating > 0) {
      const newComment = {
        id: commentsList.length + 1,
        comment: comment,
        rating: rating,
      };
      setCommentsList([...commentsList, newComment]);
      setComment("");
      setRating(0);
    } else {
      alert("Por favor, escribe un comentario y selecciona una calificación.");
    }
  };

  const shareEvent = async () => {
    try {
      await Share.share({
        message: `¡No te pierdas el evento "${event.name}"!\nFecha: ${event.date}\nLugar: ${event.location}\n\n¡Nos vemos allí!`,
        title: `Evento: ${event.name}`,
      });
    } catch (error) {
      alert(error);
    }
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    alert(`Evento actualizado: ${eventName}, ${eventDescription}, ${eventDate.toString()}, ${eventLocation}`);
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

  const data = [
    { type: "eventInfo", content: { name: eventName, description: eventDescription, date: eventDate, location: eventLocation } },
    { type: "fixedRating", content: fixedRating },
    { type: "RSVP", content: isRSVPed },
    { type: "users", content: []},
    { type: "commentForm", content: { comment, rating } },
    ...commentsList.map((comment) => ({ type: "comment", content: comment })),
  ];

  const renderItem = ({ item }) => {
    if (item.type === "eventInfo") {
      return (
        <View style={styles.eventInfo}>
          <Text style={styles.title}>Detalles del Evento:</Text>
          {isEditing ? (
            <>
              <Text>Nombre del evento:</Text>
              <TextInput
                style={styles.textInput}
                value={item.content.name}
                onChangeText={setEventName}
                theme={{
                  colors: {
                    primary: "#007bff", // Azul para label y línea
                    background: "#f4f6f9",
                  },
                }}
              />
              <Text>Descripción:</Text>
              <TextInput
                style={styles.textInput}
                value={eventDescription}
                onChangeText={setEventDescription}
                theme={{
                  colors: {
                    primary: "#007bff", // Azul para label y línea
                    background: "#f4f6f9",
                  },
                }}
                placeholder="Escribe una descripción del evento"
              />
              <Text>Lugar:</Text>
              <TextInput
                style={styles.textInput}
                value={item.content.location}
                onChangeText={setEventLocation}
                theme={{
                  colors: {
                    primary: "#007bff", // Azul para label y línea
                    background: "#f4f6f9",
                  },
                }}
              />
              <View style={styles.datePickerContainer}>
                <Text>Fecha y Hora:</Text>
                <TextInput style={styles.textInput} editable={false}
                  theme={{
                    colors: {
                      primary: "#007bff", // Azul para label y línea
                      background: "#f4f6f9",
                    },
                  }}
                  value={formatDate(eventDate)} 
                />
                <Button title="Seleccionar Fecha" onPress={handleShowDatePicker} />
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
                <Button title="Seleccionar Hora" onPress={handleShowTimePicker} />
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
            </>
          ) : (
            <>
              <Text style={styles.details}>Nombre: {item.content.name}</Text>
              <Text style={styles.details}>Descripción: {item.content.description}</Text>
              <Text style={styles.details}>Lugar: {item.content.location}</Text>
              <Text style={styles.details}>Fecha: {formatDate(item.content.date)}</Text>
            </>
          )}
          {!isEditing && !isDatePassed && (
            <Button title="Editar" onPress={() => setIsEditing(true)} />
          )}
        </View>
      );
    } else if (item.type === "fixedRating" && !isEditing) {
      return (
        <View style={styles.ratingContainer}>
          <Text style={styles.fixedRatingText}>Puntuación del Evento: </Text>
          <Rating
            imageSize={30}
            readonly
            startingValue={item.content}
            style={styles.rating}
            tintColor="#f4f6f9"
            ratingBackgroundColor="#f4f6f9"
          />
        </View>
      );
    } else if (item.type === "RSVP" && !isEditing) {
      return (
        <View style={styles.RSVPContainer}>
          {!item.content ? (
            <Button title="Confirmar Asistencia" onPress={handleRSVP} />
          ) : (
            <Text style={styles.confirmedText}>¡Asistencia Confirmada!</Text>
          )}
        </View>
      );
    } else if (item.type === "users" && !isEditing) {
      return (
        <>
           {/* Botón para abrir el modal de usuarios asistentes */}
            <Button
              title="Ver Usuarios que Asistiran"
              style={styles.button}
              onPress={() => setIsModalVisible(true)}
            />
            <Modal
            visible={isModalVisible}
            animationType="slide"
            onRequestClose={() => setIsModalVisible(false)}
            transparent={true}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Usuarios que asistirán</Text>
                <ScrollView style={styles.modalList}>
                  {usersAttending.map((user) => (
                    <Text key={user.id} style={styles.modalItem}>
                      {user.name}
                    </Text>
                  ))}
                </ScrollView>
                <Button title="Cerrar" onPress={() => setIsModalVisible(false)} style={styles.button}></Button>
              </View>
            </View>
          </Modal>
        </>
      )
    } else if (item.type === "commentForm" && !isEditing) {
      return (
        <View style={styles.commentSection}>
          <Text style={styles.subtitle}>Deja un comentario y calificación:</Text>

          <Rating
            showRating
            onFinishRating={setRating}
            style={styles.rating}
            ratingCount={5}
            startingValue={item.content.rating}
            tintColor="#f4f6f9"
            ratingBackgroundColor="#f4f6f9"
          />

          <TextInput
            style={styles.textInput}
            value={item.content.comment}
            theme={{
              colors: {
                primary: "#007bff", // Azul para label y línea
                background: "#f4f6f9",
              },
            }}
            onChangeText={setComment}
            placeholder="Escribe tu comentario aquí..."
            multiline
          />

          <View>
            <Button title="Enviar Comentario" onPress={handleCommentSubmit} />
          </View>
        </View>
      );
    } else if (item.type === "comment" && !isEditing) {
      return (
        <View style={styles.commentCard}>
          <Text>{item.content.comment}</Text>
          <Text>Calificación: {item.content.rating} ⭐</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.type + index}
        contentContainerStyle={styles.container}
        ListFooterComponent={!isEditing && commentsList.length === 0 ? (
          <View style={styles.noCommentsContainer}>
            <Text style={styles.noCommentsText}>No hay comentarios, ¡sé el primero en comentar!</Text>
          </View>
        ) : null} />
      
      {isEditing ? (
        <View style={styles.saveButtonContainer}>
          <Button title="Guardar Cambios" onPress={handleSaveChanges} />
        </View>
      ) : (
        <View style={styles.shareButtonContainer}>
          <Button title="Compartir Evento" onPress={shareEvent} />
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f4f6f9", 
    padding: 20,
  },
  eventInfo: { padding: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  details: { fontSize: 16, marginBottom: 10 },
  confirmedText: { fontSize: 16, color: "green", marginBottom: 15 },
  commentSection: { marginVertical: 20 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  textInput: {
    marginBottom: 15, 
    backgroundColor: "#f4f6f9"
  },
  rating: { marginVertical: 15 },
  fixedRatingText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  datePickerContainer: {
    marginBottom: 15,
  },
  selectedDate: {
    fontSize: 16,
    marginBottom: 10,
    color: "#007BFF",
  },
  commentCard: {
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  saveButtonContainer: {
    marginVertical: 20,
    alignItems: 'center'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalList: {
    maxHeight: 200,
  },
  modalItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  noCommentsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noCommentsText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
  },
  ratingContainer: { marginVertical: 15 },
  RSVPContainer: { marginVertical: 20 },
  shareButtonContainer: {
    marginVertical: 30,
    alignItems: 'center'
  },
});