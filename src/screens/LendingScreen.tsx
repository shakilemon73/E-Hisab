"use client"

import { useState } from "react"
import { View, FlatList, StyleSheet } from "react-native"
import { Card, Text, FAB, Surface, Badge } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialIcons"

interface Lending {
  id: string
  type: "given" | "taken"
  amount: number
  description: string
  customerName?: string
  dueDate?: string
  isPaid: boolean
  lendingDate: string
}

export default function LendingScreen() {
  const [lendings] = useState<Lending[]>([
    {
      id: "1",
      type: "given",
      amount: 5000,
      description: "জরুরি প্রয়োজনে",
      customerName: "রহিম উদ্দিন",
      dueDate: "২০২৪-০২-১৫",
      isPaid: false,
      lendingDate: "২০২৪-০১-১৫",
    },
    {
      id: "2",
      type: "taken",
      amount: 10000,
      description: "ব্যবসার জন্য",
      customerName: "করিম আহমেদ",
      dueDate: "২০২৪-০১-৩০",
      isPaid: false,
      lendingDate: "২০২৪-০১-০১",
    },
  ])

  const totalGiven = lendings.filter((l) => l.type === "given" && !l.isPaid).reduce((sum, l) => sum + l.amount, 0)

  const totalTaken = lendings.filter((l) => l.type === "taken" && !l.isPaid).reduce((sum, l) => sum + l.amount, 0)

  const renderLendingItem = ({ item }: { item: Lending }) => (
    <Card style={styles.lendingCard}>
      <Card.Content>
        <View style={styles.lendingHeader}>
          <View style={styles.lendingInfo}>
            <View style={styles.lendingTitleRow}>
              <Icon
                name={item.type === "given" ? "call-made" : "call-received"}
                size={20}
                color={item.type === "given" ? "#D32F2F" : "#4CAF50"}
              />
              <Text style={styles.lendingDescription}>{item.description}</Text>
              <Badge
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: item.isPaid ? "#4CAF50" : "#D32F2F",
                  },
                ]}
              >
                {item.isPaid ? "পরিশোধিত" : "অপরিশোধিত"}
              </Badge>
            </View>
            {item.customerName && (
              <Text style={styles.customerName}>
                {item.type === "given" ? "দেওয়া হয়েছে" : "নেওয়া হয়েছে"}: {item.customerName}
              </Text>
            )}
            <Text style={styles.lendingDate}>তারিখ: {item.lendingDate}</Text>
            {item.dueDate && <Text style={styles.dueDate}>মেয়াদ: {item.dueDate}</Text>}
          </View>
          <Text
            style={[
              styles.amountText,
              {
                color: item.type === "given" ? "#D32F2F" : "#4CAF50",
              },
            ]}
          >
            {item.type === "given" ? "-" : "+"}৳{item.amount.toLocaleString()}
          </Text>
        </View>
      </Card.Content>
    </Card>
  )

  return (
    <View style={styles.container}>
      <Surface style={styles.header}>
        <View style={styles.summaryCards}>
          <View style={[styles.summaryCard, { backgroundColor: "#D32F2F" }]}>
            <Text style={styles.summaryValue}>৳{totalGiven.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>মোট দেওয়া</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: "#4CAF50" }]}>
            <Text style={styles.summaryValue}>৳{totalTaken.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>মোট নেওয়া</Text>
          </View>
        </View>
      </Surface>

      <FlatList
        data={lendings}
        renderItem={renderLendingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lendingsList}
      />

      <FAB
        icon="add"
        style={styles.fab}
        onPress={() => {
          // Navigate to add lending
        }}
        label="নতুন ঋণ"
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
  lendingsList: {
    padding: 15,
  },
  lendingCard: {
    marginBottom: 10,
    borderRadius: 12,
    elevation: 2,
  },
  lendingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  lendingInfo: {
    flex: 1,
  },
  lendingTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  lendingDescription: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
    flex: 1,
  },
  statusBadge: {
    fontSize: 10,
    height: 20,
  },
  customerName: {
    fontSize: 14,
    color: "#2E7D32",
    marginBottom: 3,
  },
  lendingDate: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  dueDate: {
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
