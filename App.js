
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from "./screens/Home";
import History from "./screens/History";
import { Text, Platform } from "react-native"
import Colors from "./styles/Colors";
import { HistoryProvider } from './context/HistoryContext';

const Stack = createStackNavigator();

const App = () => {
  const [history, setHistory] = useState([]);

  const updateHistory = history => {
    setHistory([...history]);
  };

  const resetHistory = history => {
    setHistory([]);
  };

  return (
    <HistoryProvider
      value={{
        history: history,
        updateHistory: updateHistory,
        resetHistory: resetHistory,
      }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen}
                options={({ navigation, route }) => ({
                  safeAreaInsets: { top: 0, bottom: 0 },
                  headerShown: false
                })}
              />
              <Stack.Screen name="History" component={History}
                options={({ navigation, route }) => ({
                  safeAreaInsets: { top: 0, bottom: 0 },
                  headerTintColor: Platform.OS === "android" ? 'white' : Colors.link,
                  headerTitle: "",
                  headerStyle: {
                    backgroundColor: Colors.blue,
                    elevation: 0,
                    borderBottomWidth: 0,
                    shadowColor: "transparent"
                  },
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </HistoryProvider>
  );
}

export default App;