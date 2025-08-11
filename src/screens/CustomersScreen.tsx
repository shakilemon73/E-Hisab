"use client"

import { useState } from "react"
import { View, FlatList, StyleSheet } from "react-native"
import { Card, Text, FAB, Avatar, Surface } from "react-native-paper"
import { theme } from "../theme/theme"

interface Customer {
  id: string
  name: string
  phone: string
  address: string
  totalPurchases: number
  outstandingAmount: number
}

export default function CustomersScreen() {
  const [customers] = useState<Customer[]>([
    {
      id: "1",
      name: "রহিম উদ্দিন",
      phone: "০১৭১১১১১১১১",
      address: "ঢাকা, বাংলাদেশ",
      totalPurchases: 25000,
      outstandingAmount: 2000,
    },
    {
      id: "2",
      name: "করিম আহমেদ",
      phone: "০১৮২২২২২২২২",
      address: "চট্টগ্রাম, বাংলাদেশ",
      totalPurchases: 18000,
      outstandingAmount: 0,
    },
  ])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const renderCustomerItem = ({ item }: { item: Customer }) => (
    <Card style={styles.customerCard}>
      <Card.Content>
        <View style={styles.customerHeader}>
          <View style={styles.customerInfo}>
            <Avatar.Text size={50} label={getInitials(item.name)} style={styles.avatar} />
            <View style={styles.customerDetails}>
              <Text style={styles.customerName}>{item.name}</Text>
              <Text style={styles.customerPhone}>{item.phone}</Text>
              <Text style={styles.customerAddress}>{item.address}</Text>
            </View>
          </View>
        </View>

        <View style={styles.customerStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>৳{item.totalPurchases.toLocaleString()}</Text>
            <Text style={styles.statLabel}>মোট ক্রয়</Text>
          </View>
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statValue,
                {
                  color: item.outstandingAmount > 0 ? theme.colors.error : "#4CAF50",
                },
              ]}
            >
              ৳{item.outstandingAmount.toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>বকেয়া</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  )

  const totalCustomers = customers.length
  const totalOutstanding = customers.reduce((sum, customer) => sum + customer.outstandingAmount, 0)

  return (
    <View style={styles.container}>
      <Surface style={styles.header}>
        <View style={styles.summaryCards}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{totalCustomers}</Text>
            <Text style={styles.summaryLabel}>মোট গ্রাহক</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>৳{totalOutstanding.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>মোট বকেয়া</Text>
          </View>
        </View>
      </Surface>

      <FlatList
        data={customers}
        renderItem={renderCustomerItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.customersList}
      />

      <FAB
        icon="person-add"
        style={styles.fab}
        onPress={() => {
          // Navigate to add customer
        }}
        label="নতুন গ্রাহক"
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
  customersList: {
    padding: 15,
  },
  customerCard: {
    marginBottom: 15,
    borderRadius: 12,
    elevation: 2,
  },
  customerHeader: {
    marginBottom: 15,
  },
  customerInfo: {
    flexDirection: "row",
    flex: 1,
  },
  avatar: {
    backgroundColor: "#2E7D32",
    marginRight: 15,
  },
  customerDetails: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  customerPhone: {
    fontSize: 14,
    color: "#2E7D32",
    marginBottom: 3,
  },
  customerAddress: {
    fontSize: 12,
    color: "#666",
  },
  customerStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#2E7D32",
  },
})
