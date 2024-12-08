import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { registerUser } from "../services/authService"; // Asegúrate de ajustar la ruta


const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);

    // Crea el objeto con los datos del usuario
    const userData = {
      nombre: fullName,
      usuario: username,
      email,
      contraseña: password,
    };

    try {
      // Llama al servicio de registro
      const response = await registerUser(userData);
      alert("¡Registro exitoso!"); // Notifica al usuario
      navigation.navigate("Login"); // Redirige al login después de registro
    } catch (error) {
      console.log(error)
      alert(`Error al registrarse: ${error}`); // Maneja errores
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Image
              source={{ uri: "https://via.placeholder.com/80" }} // Logo aquí
              style={styles.logo}
            />
            <Text style={styles.title}>Registro</Text>
            <TextInput
              label="Nombre completo"
              mode="flat"
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
              placeholder="Tu nombre completo"
              theme={{
                colors: {
                  primary: "#007bff", // Azul para label y línea
                  background: "#f4f6f9",
                },
              }}
            />
            <TextInput
              label="Usuario"
              mode="flat"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              autoCapitalize="none"
              placeholder="Tu nombre de usuario"
              theme={{
                colors: {
                  primary: "#007bff", // Azul para label y línea
                  background: "#f4f6f9",
                },
              }}
            />
            <TextInput
              label="Correo electrónico"
              mode="flat"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Tu correo electrónico"
              theme={{
                colors: {
                  primary: "#007bff", // Azul para label y línea
                  background: "#f4f6f9",
                },
              }}
            />
            <TextInput
              label="Contraseña"
              mode="flat"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
              placeholder="Tu contraseña"
              theme={{
                colors: {
                  primary: "#007bff", // Azul para label y línea
                  background: "#f4f6f9",
                },
              }}
            />
            <Button
              mode="contained"
              onPress={handleRegister}
              style={styles.button}
              loading={loading}
            >
              Registrarme
            </Button>
            <Text style={styles.footerText}>
              ¿Ya tienes una cuenta?{" "}
              <Text
                onPress={() => navigation.navigate("Login")}
                style={styles.link}
              >
                Inicia sesión
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f9",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#343a40",
    marginBottom: 20,
  },
  input: { marginBottom: 15, backgroundColor: "#f4f6f9" },
  button: {
    backgroundColor: "#007bff",
    marginBottom: 15,
    borderRadius: 5,
  },
  footerText: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
    marginTop: 5,
  },
  link: {
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
