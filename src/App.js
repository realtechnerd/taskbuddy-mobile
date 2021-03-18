import React from "react";
import Login from "./views/Login";
import Signup from "./views/Signup";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppLoading from "expo-app-loading";
import { Manrope_700Bold as Manrope_Bold } from "@expo-google-fonts/manrope";
import {
  useFonts,
  Inter_700Bold as Inter_Bold,
  Inter_400Regular as Inter_Regular,
  Inter_500Medium as Inter_Medium,
} from "@expo-google-fonts/inter";
import { LeckerliOne_400Regular as LeckerliOne } from "@expo-google-fonts/leckerli-one";
import { useAuth } from "./contexts/AuthContext";
import Dash from "./views/Dash";
import { Provider as PaperProvider } from "react-native-paper";
const Stack = createStackNavigator();

export default function App() {
  const { currentUser } = useAuth();

  let [fontsLoaded] = useFonts({
    Inter_Bold,
    Inter_Regular,
    Inter_Medium,
    Manrope_Bold,
    LeckerliOne,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator>
          {currentUser ? (
            <>
              <Stack.Screen
                name="Dash"
                component={Dash}
                options={{
                  headerShown: false,
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                  cardStyle: { backgroundColor: "#fff" },
                }}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{
                  headerShown: false,
                  cardStyle: { backgroundColor: "#fff" },
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
