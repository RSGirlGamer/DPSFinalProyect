import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LoginScreen from './login';
import HomeScreen from './home';
import RegisterScreen from './register';
import EventDetailsScreen from './eventdetail';
import CreateEventScreen from './createevent';
import UserProfileScreen from './userprofile';
import EditProfileScreen from './editprofile';

// Crear Stack y Tab Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Tab Navigator: Home y Perfil de Usuario
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "event";
          } else if (route.name === "UserProfile") {
            iconName = "person";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: "Eventos", 
          headerStyle: { backgroundColor: "#007bff" }, 
          headerTintColor: "#fff" 
        }} 
      />
      <Tab.Screen 
        name="UserProfile" 
        component={UserProfileScreen} 
        options={{ 
          title: "Perfil",
          headerStyle: { backgroundColor: "#007bff" }, 
          headerTintColor: "#fff" 
        }} 
      />
    </Tab.Navigator>
  );
}

// Root Stack Navigator: Login, Register, Tab Navigator, etc.
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Login">
        {/* Pantallas fuera del Tab Navigator */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="CreateEvent" 
          component={CreateEventScreen} 
          options={{ 
            title: "Crear Evento", 
            headerStyle: { backgroundColor: "#007bff" }, 
            headerTintColor: "#fff" 
          }} 
        />
        <Stack.Screen name="EditProfile" component={EditProfileScreen}  options={{ 
            title: "Editar Perfil", 
            headerStyle: { backgroundColor: "#007bff" }, 
            headerTintColor: "#fff" 
          }} />
        <Stack.Screen 
          name="EventDetails" 
          component={EventDetailsScreen} 
          options={({ route }) => ({ 
            title: route?.params?.event?.name, 
            headerStyle: { backgroundColor: "#007bff" }, 
            headerTintColor: "#fff" 
          })} 
        />

        {/* Tab Navigator */}
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
