"use client"

import { useState } from "react"
import { View, FlatList, StyleSheet } from "react-native"
import { Card, Text, FAB, Surface } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialIcons"

interface Transaction {
  id: string
  type: "income" | "expense"
  amount: number
  description: string
  category: string
  date: string
  time: string
}

export default function TransactionsScreen() {
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "income",
      amount: 5000,
      description: "পণ্য বিক্রয়",
      category: "বিক্রয়",
      date: "২০২৪-০১-১৫",
      time: "১০:৩০",
    },
    {
      id: "2",
      type: "expense",
      amount: 2000,
      description: "দোকান ভাড়া",
      category: "ভাড়া",
      date: "২০২৪-০১-১৫",
      time: "০৯:০০",
    },
  ])

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <Card style={styles.transactionCard}>
      <Card.Content>
        <View style={styles.transactionHeader}>
          <View style={styles.transactionInfo}>
            <View style={styles.transactionTitleRow}>
              <Icon
                name={item.type === "income" ? "trending-up" : "trending-down"}
                size={20}
                color={item.type === "income" ? "#4CAF50" : "#D32F2F"}
              />
              <Text style={styles.transactionDescription}>{item.description}</Text>
            </View>
            <Text style={styles.transactionCategory}>বিভাগ: {item.category}</Text>
            <Text style={styles.transactionDateTime}>
              {item.date} • {item.time}
            </Text>
          </View>
          <Text
            style={[
              styles.amountText,
              {
                color: item.type === "income" ? "#4CAF50" : "#D32F2F",
              },
            ]}
          >
            {item.type === "income" ? "+" : "-"}৳{item.amount.toLocaleString()}
          </Text>
        </View>
      </Card.Content>
    </Card>
  )

  return (
    <View style={styles.container}>
      <Surface style={styles.header}>
        <View style={styles.summaryCards}>
          <View style={[styles.summaryCard, { backgroundColor: "#4CAF50" }]}>
            <Text style={styles.summaryValue}>৳{totalIncome.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>মোট আয়</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: "#D32F2F" }]}>
            <Text style={styles.summaryValue}>৳{totalExpense.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>মোট খরচ</Text>
          </View>
        </View>
      </Surface>

      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.transactionsList}
      />

      <FAB
        icon="add"
        style={styles.fab}
        onPress={() => {
          // Navigate to add transaction
        }}
        label="নতুন লেনদেন"
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
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  summaryLabel: {
    fontSize: 12,
    color: "white",
    marginTop: 5,
  },
  transactionsList: {
    padding: 15,
  },
  transactionCard: {
    marginBottom: 10,
    borderRadius: 12,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
    flex: 1,
  },
  transactionCategory: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },
  transactionDateTime: {
    fontSize: 12,
    color: "#666",
  },
  amountText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#2E7D32",
  },
})
