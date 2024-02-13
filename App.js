import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { View, Text, TextInput, Button, FlatList, StyleSheet, GestureHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AuthScreen from './AuthScreen';



const coursesData = [
  { id: '1', title: 'IKT205' },
  { id: '2', title: 'FYS123' },
  { id: '3', title: 'MAT423' },
];

const studentsData = [
  { id: '1', name: 'Nikolai Sæterhaug' },
  { id: '2', name: 'Per Persen' },
  { id: '3', name: 'Olav Markussen' },
];

function Courses() {
  return (
      <FlatList
          data={coursesData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
              <View style={{ paddingVertical: 20, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#cccccc' }}>
                <Text style={{ fontSize: 18 }}>{item.title}</Text>
              </View>
          )}
      />
  );
}
function Students() {
  return (
      <FlatList
          data={studentsData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
              <View style={{ paddingVertical: 20, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#cccccc' }}>
                <Text style={{ fontSize: 18 }}>{item.name}</Text>
              </View>
          )}
      />
  );
}


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
            {/* You can add more screens here that should be accessible without bottom tabs */}
        </Stack.Navigator>
    );
}


function MyTabs() {
  return (
      <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Courses') {
                iconName = focused ? 'school' : 'school-outline';
              } else if (route.name === 'Students') {
                iconName = focused ? 'people' : 'people-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
      >
        <Tab.Screen name="Courses" component={Courses} />
        <Tab.Screen name="Students" component={Students} />
      </Tab.Navigator>
  );
}

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
              <Stack.Screen name="Main" component={MyTabs} options={{ headerShown: false }} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}
