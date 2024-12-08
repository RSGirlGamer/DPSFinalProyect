import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError(""); // Resetea cualquier error previo

    try {
      const response = await axios.post('http://your-backend-url.com/api/login', {
        username,
        password,
      });
      const { data } = response;
      if (data.success) {
        // Si la respuesta es exitosa, redirigir al Home
        navigation.navigate("MainTabs");
      } else {
        navigation.navigate("MainTabs");
        setError("Credenciales inválidas");
      }
    } catch (err) {
      setError("Ocurrió un error, intenta nuevamente");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.card}>
          <Image
            source={{ uri: "https://via.placeholder.com/80" }} // Logo aquí
            style={styles.logo}
          />
          <Text style={styles.title}>Don Bosco Community</Text>
          {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
          <TextInput
            label="Usuario"
            mode="flat"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            autoCapitalize="none"
            placeholder="Nombre de Usuario"
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
            theme={{
              colors: {
                primary: "#007bff", // Azul para label y línea
                background: "#f4f6f9",
              },
            }}
          />
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            loading={loading}
          >
            Iniciar sesión
          </Button>
          <Text style={styles.footerText}>
            ¿No tienes cuenta?{" "}
            <Text
              onPress={() => navigation.navigate("Register")}
              style={styles.link}
            >
              Regístrate
            </Text>
          </Text>
        </View>
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
  card: {
    width: "90%",
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

export default LoginScreen;
