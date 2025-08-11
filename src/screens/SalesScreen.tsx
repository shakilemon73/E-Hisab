"use client"

import { useState } from "react"
import { View, FlatList, StyleSheet } from "react-native"
import { Card, Text, FAB, Surface } from "react-native-paper"

interface Sale {
  id: string
  customerName?: string
  amount: number
  profit: number
  description: string
  date: string
  time: string
}

export default function SalesScreen() {
  const [sales] = useState<Sale[]>([
    {
      id: "1",
      customerName: "রহিম উদ্দিন",
      amount: 2500,
      profit: 500,
      description: "চাল ১০ কেজি",
      date: "২০২৪-০১-১৫",
      time: "১০:৩০",
    },
    {
      id: "2",
      customerName: "করিম আহমেদ",
      amount: 1800,
      profit: 300,
      description: "ডাল ৫ কেজি",
      date: "২০২৪-০১-১৫",
      time: "১১:১৫",
    },
  ])

  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0)
  const totalProfit = sales.reduce((sum, sale) => sum + sale.profit, 0)

  const renderSaleItem = ({ item }: { item: Sale }) => (
    <Card style={styles.saleCard}>
      <Card.Content>
        <View style={styles.saleHeader}>
          <View style={styles.saleInfo}>
            <Text style={styles.saleDescription}>{item.description}</Text>
            {item.customerName && <Text style={styles.customerName}>গ্রাহক: {item.customerName}</Text>}
            <Text style={styles.saleDateTime}>
              {item.date} • {item.time}
            </Text>
          </View>
          <View style={styles.saleAmounts}>
            <Text style={styles.saleAmount}>৳{item.amount.toLocaleString()}</Text>
            <Text style={styles.profitAmount}>লাভ: ৳{item.profit.toLocaleString()}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  )

  return (
    <View style={styles.container}>
      <Surface style={styles.header}>
        <View style={styles.summaryCards}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>৳{totalSales.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>মোট বিক্রয়</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>৳{totalProfit.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>মোট লাভ</Text>
          </View>
        </View>
      </Surface>

      <FlatList
        data={sales}
        renderItem={renderSaleItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.salesList}
      />

      <FAB
        icon="add"
        style={styles.fab}
        onPress={() => {
          // Navigate to add sale
        }}
        label="নতুন বিক্রয়"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    padding: 15,
    backgroundColor: "white",
    elevation: 2,
  },
  summaryCards: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryCard: {
    flex: 0.48,
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  summaryLabel: {
    fontSize: 12,
    color: "white",
    marginTop: 5,
  },
  salesList: {
    padding: 15,
  },
  saleCard: {
    marginBottom: 10,
    borderRadius: 12,
    elevation: 2,
  },
  saleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  saleInfo: {
    flex: 1,
  },
  saleDescription: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  customerName: {
    fontSize: 14,
    color: "#2E7D32",
    marginBottom: 5,
  },
  saleDateTime: {
    fontSize: 12,
    color: "#666",
  },
  saleAmounts: {
    alignItems: "flex-end",
  },
  saleAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  profitAmount: {
    fontSize: 14,
    color: "#4CAF50",
    marginTop: 2,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#2E7D32",
  },
})
