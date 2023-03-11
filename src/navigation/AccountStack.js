import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { AccountScreen } from "../screens/Account/AccountScreen";
import { UserGuestScreen } from "../screens/Account/UserGuestScreen/UserGuestScreen";
import { UserLoggedScreen } from "../screens/Account/UserLoggedScreen";
import { LoginScreen } from "../screens/Account/LoginScreen";
import { RegisterScreen } from "../screens/Account/RegisterScreen";
const Stack = createNativeStackNavigator();

export function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.account.account}
        component={AccountScreen}
        options={{
          title: "Mi Cuenta",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name={screen.account.guest}
        component={UserGuestScreen}
        options={{
          title: "Invitado",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name={screen.account.logged}
        component={UserLoggedScreen}
        options={{
          title: "Logueado",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name={screen.account.login}
        component={LoginScreen}
        options={{
          title: "Iniciar Sesión",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name={screen.account.register}
        component={RegisterScreen}
        options={{
          title: "Registrarse",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
