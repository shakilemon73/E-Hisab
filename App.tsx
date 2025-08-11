"use client"

import { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { Provider as PaperProvider } from "react-native-paper"
import { StatusBar } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

// Screens
import DashboardScreen from "./src/screens/DashboardScreen"
import SalesScreen from "./src/screens/SalesScreen"
import CustomersScreen from "./src/screens/CustomersScreen"
import TransactionsScreen from "./src/screens/TransactionsScreen"
import LendingScreen from "./src/screens/LendingScreen"
import ReportsScreen from "./src/screens/ReportsScreen"

// Services
import { initializeDatabase } from "./src/services/database"

// Theme
import { theme } from "./src/theme/theme"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string

          if (route.name === "ড্যাশবোর্ড") {
            iconName = "dashboard"
          } else if (route.name === "বিক্রয়") {
            iconName = "point-of-sale"
          } else if (route.name === "গ্রাহক") {
            iconName = "people"
          } else if (route.name === "লেনদেন") {
            iconName = "receipt"
          } else if (route.name === "ঋণ") {
            iconName = "account-balance-wallet"
          } else if (route.name === "রিপোর্ট") {
            iconName = "assessment"
          } else {
            iconName = "dashboard"
          }

          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#e0e0e0",
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
        },
      })}
    >
      <Tab.Screen name="ড্যাশবোর্ড" component={DashboardScreen} />
      <Tab.Screen name="বিক্রয়" component={SalesScreen} />
      <Tab.Screen name="গ্রাহক" component={CustomersScreen} />
      <Tab.Screen name="লেনদেন" component={TransactionsScreen} />
      <Tab.Screen name="ঋণ" component={LendingScreen} />
      <Tab.Screen name="রিপোর্ট" component={ReportsScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initializeDatabase()
        setIsReady(true)
      } catch (error) {
        console.error("Failed to initialize app:", error)
        setIsReady(true) // Continue even if database fails
      }
    }

    initializeApp()
  }, [])

  if (!isReady) {
    return null // You can add a loading screen here
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
        <Stack.Navigator>
          <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
