import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function EditProfileScreen({ navigation }) {
  // Datos del perfil que pueden ser editados
  const [username, setUsername] = useState("Juan Pérez");
  const [email, setEmail] = useState("juan.perez@email.com");
  const [password, setPassword] = useState("");

  const handleSaveChanges = () => {
    // Aquí se puede agregar la lógica para guardar los cambios, como una llamada a la API
    console.log("Cambios guardados:", { username, email, password });
    navigation.goBack(); // Regresar a la pantalla de perfil
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      {/* Formulario de edición */}
      <View style={styles.form}>
        <Text style={styles.label}>Nombre de Usuario:</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          theme={{
            colors: {
              primary: "#007bff", // Azul para label y línea
              background: "#f4f6f9",
            },
          }}
        />

        <Text style={styles.label}>Correo:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          theme={{
            colors: {
              primary: "#007bff", // Azul para label y línea
              background: "#f4f6f9",
            },
          }}
        />

        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          theme={{
            colors: {
              primary: "#007bff", // Azul para label y línea
              background: "#f4f6f9",
            },
          }}
        />

        <Button title="Guardar Cambios" onPress={handleSaveChanges} />
      </View>
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
  form: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    marginBottom: 15, 
    backgroundColor: "#f4f6f9"
  },
});
