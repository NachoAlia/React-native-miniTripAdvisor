import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { RankingScreen } from "../screens/RankingScreen";

const Stack = createNativeStackNavigator();

export function RankingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.ranking.ranking}
        component={RankingScreen}
        options={{
          title: "Ranking",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
