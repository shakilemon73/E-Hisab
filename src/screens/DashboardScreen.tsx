"use client"

import { useState } from "react"
import { View, ScrollView, StyleSheet, Dimensions, RefreshControl } from "react-native"
import { Card, Title, Text, Surface } from "react-native-paper"
import { LineChart } from "react-native-chart-kit"
import Icon from "react-native-vector-icons/MaterialIcons"
import { theme } from "../theme/theme"

const screenWidth = Dimensions.get("window").width

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false)
  const [dashboardData, setDashboardData] = useState({
    todaySales: 15000,
    todayProfit: 3000,
    monthSales: 450000,
    totalCustomers: 125,
  })

  const salesData = {
    labels: ["সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র", "শনি", "রবি"],
    datasets: [
      {
        data: [12000, 15000, 18000, 14000, 22000, 25000, 20000],
        color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  }

  const onRefresh = async () => {
    setRefreshing(true)
    // Load data from database
    setRefreshing(false)
  }

  const StatCard = ({ title, value, icon, color }: any) => (
    <Surface style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statCardContent}>
        <View style={styles.statCardLeft}>
          <Text style={styles.statValue}>৳{value.toLocaleString()}</Text>
          <Text style={styles.statTitle}>{title}</Text>
        </View>
        <Icon name={icon} size={30} color={color} />
      </View>
    </Surface>
  )

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Title style={styles.headerTitle}>আজকের সারসংক্ষেপ</Title>
        <Text style={styles.headerDate}>
          {new Date().toLocaleDateString("bn-BD", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          title="আজকের বিক্রয়"
          value={dashboardData.todaySales}
          icon="trending-up"
          color={theme.colors.primary}
        />
        <StatCard title="আজকের লাভ" value={dashboardData.todayProfit} icon="account-balance-wallet" color="#4CAF50" />
        <StatCard title="মাসিক বিক্রয়" value={dashboardData.monthSales} icon="bar-chart" color="#1976D2" />
        <StatCard title="মোট গ্রাহক" value={dashboardData.totalCustomers} icon="people" color="#F57C00" />
      </View>

      <Card style={styles.chartCard}>
        <Card.Content>
          <Title>সাপ্তাহিক বিক্রয় প্রবণতা</Title>
          <LineChart
            data={salesData}
            width={screenWidth - 60}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: theme.colors.primary,
              },
            }}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    padding: 20,
    backgroundColor: "white",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  headerDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  statCard: {
    width: "48%",
    margin: "1%",
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    elevation: 2,
  },
  statCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statCardLeft: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statTitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  chartCard: {
    margin: 10,
    borderRadius: 12,
    elevation: 3,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
})
