import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AuthScreen from './src/screens/Auth/AuthScreen';

import Courses from './src/screens/Course/courses';
import AddCourseScreen from './src/screens/Course/addCourseScreen';
import CourseAdministration from './src/screens/Course/courseAdministration';
import AttendingStudents from './src/screens/Course/attendingStudents';
import AddStudentToCourse from './src/screens/Course/addStudentToCourse';
import CourseChart from './src/screens/Course/courseChart';


import EditGradePoints from './src/screens/Grade/editGradePoints';
import StudentDetails from './src/screens/Student/studentDetails';

import Students from './src/screens/Student/students';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AddStudentScreen from "./src/screens/Student/addStudentScreen";




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


function CourseStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Courses" component={Courses} options={{ headerShown: true }} />
            <Stack.Screen name="AddCourseScreen" component={AddCourseScreen} options={{ headerShown: true }} />
            <Stack.Screen name="CourseAdministration" component={CourseAdministration} options={{ headerShown: true }} />
            <Stack.Screen name="AttendingStudents" component={AttendingStudents} options={{ headerShown: true }} />
            <Stack.Screen name="AddStudentToCourse" component={AddStudentToCourse} options={{ headerShown: true }} />
            <Stack.Screen name="EditGradePoints" component={EditGradePoints} options={{ headerShown: true }} />
            <Stack.Screen name="CourseChart" component={CourseChart} options={{ headerShown: true }} />
        </Stack.Navigator>
    );
}

function StudentStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Students" component={Students} options={{ headerShown: true }} />
            <Stack.Screen name="AddStudentScreen" component={AddStudentScreen} options={{ headerShown: true }} />
            <Stack.Screen name="StudentDetails" component={StudentDetails} options={{ headerShown: true }} />
        </Stack.Navigator>
    );
}



function MyTabs() {
  return (
      <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Course Administration') {
                iconName = focused ? 'school' : 'school-outline';
              } else if (route.name === 'Students Administration') {
                iconName = focused ? 'people' : 'people-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
      >
        <Tab.Screen name="Course Administration" component={CourseStack} />
        <Tab.Screen name="Students Administration" component={StudentStack} />
      </Tab.Navigator>
  );
}

export default function App() {
    const [user, setUser] = useState(null); // State to keep track of user's authentication status

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
            } else {
                // User is signed out
                setUser(null);
            }
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    user ? (
                        // If the user is logged in, go directly to the main tabs
                        <Stack.Screen name="Main" component={MyTabs} options={{ headerShown: false }} />
                    ) : (
                        // If not logged in, show the authentication stack
                        <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}
