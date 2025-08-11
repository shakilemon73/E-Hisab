"use client"

import { useState } from "react"
import { View, ScrollView, StyleSheet, Dimensions } from "react-native"
import { Card, Title, Text, Button, Surface } from "react-native-paper"
import { LineChart } from "react-native-chart-kit"
import { theme } from "../theme/theme"

const screenWidth = Dimensions.get("window").width

export default function ReportsScreen() {
  const [reportData] = useState({
    salesTrend: {
      labels: ["জান", "ফেব", "মার", "এপ্র", "মে", "জুন"],
      datasets: [
        {
          data: [120000, 150000, 180000, 140000, 220000, 250000],
          color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
          strokeWidth: 3,
        },
      ],
    },
    summary: {
      totalSales: 450000,
      totalProfit: 90000,
      totalCustomers: 125,
      profitMargin: 20,
    },
  })

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header}>
        <Title style={styles.headerTitle}>ব্যবসায়িক রিপোর্ট</Title>
      </Surface>

      {/* Summary Cards */}
      <View style={styles.summarySection}>
        <Title style={styles.sectionTitle}>সারসংক্ষেপ</Title>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>৳{reportData.summary.totalSales.toLocaleString()}</Text>
            <Text style={styles.statTitle}>মোট বিক্রয়</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>৳{reportData.summary.totalProfit.toLocaleString()}</Text>
            <Text style={styles.statTitle}>মোট লাভ</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{reportData.summary.totalCustomers}</Text>
            <Text style={styles.statTitle}>মোট গ্রাহক</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{reportData.summary.profitMargin}%</Text>
            <Text style={styles.statTitle}>লাভের হার</Text>
          </View>
        </View>
      </View>

      {/* Sales Trend Chart */}
      <Card style={styles.chartCard}>
        <Card.Content>
          <Title>বিক্রয় প্রবণতা</Title>
          <LineChart
            data={reportData.salesTrend}
            width={screenWidth - 60}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16 },
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

      {/* Export Options */}
      <Card style={styles.exportCard}>
        <Card.Content>
          <Title style={styles.exportTitle}>রিপোর্ট এক্সপোর্ট</Title>
          <View style={styles.exportButtons}>
            <Button
              mode="outlined"
              icon="file-pdf-box"
              onPress={() => {
                // Export as PDF
              }}
              style={styles.exportButton}
            >
              PDF
            </Button>
            <Button
              mode="outlined"
              icon="file-excel"
              onPress={() => {
                // Export as Excel
              }}
              style={styles.exportButton}
            >
              Excel
            </Button>
          </View>
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
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  summarySection: {
    padding: 20,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2E7D32",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -5,
  },
  statCard: {
    width: "48%",
    margin: "1%",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#2E7D32",
    alignItems: "center",
    elevation: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  statTitle: {
    fontSize: 12,
    color: "white",
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
  exportCard: {
    margin: 10,
    marginBottom: 30,
    borderRadius: 12,
    elevation: 3,
  },
  exportTitle: {
    marginBottom: 15,
  },
  exportButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  exportButton: {
    flex: 0.45,
  },
})
