"use client"

import { useState, useEffect } from "react"
import { View, ScrollView, StyleSheet, RefreshControl } from "react-native"
import { Card, Title, Text, Button, Avatar, Chip, Surface, DataTable, IconButton } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialIcons"
import { theme } from "../theme/theme"

export default function CustomerDetailScreen({ route, navigation }: any) {
  const { customer } = route.params
  const [refreshing, setRefreshing] = useState(false)
  const [customerData, setCustomerData] = useState(customer)
  const [transactions, setTransactions] = useState<any[]>([])
  const [lendings, setLendings] = useState<any[]>([])

  const loadCustomerDetails = async () => {
    // Mock data - replace with actual database queries
    const mockTransactions = [
      {
        id: "1",
        type: "sale",
        amount: 2500,
        description: "চাল ১০ কেজি",
        date: "২০২৪-০১-১৫",
        time: "১০:৩০",
      },
      {
        id: "2",
        type: "payment",
        amount: 2000,
        description: "আংশিক পেমেন্ট",
        date: "২০২৪-০১-১২",
        time: "১৪:২০",
      },
    ]

    const mockLendings = [
      {
        id: "1",
        type: "given",
        amount: 5000,
        description: "জরুরি প্রয়োজনে",
        dueDate: "২০২৪-০২-১৫",
        isPaid: false,
      },
    ]

    setTransactions(mockTransactions)
    setLendings(mockLendings)
  }

  useEffect(() => {
    loadCustomerDetails()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await loadCustomerDetails()
    setRefreshing(false)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const totalPurchases = transactions.filter((t) => t.type === "sale").reduce((sum, t) => sum + t.amount, 0)

  const totalPayments = transactions.filter((t) => t.type === "payment").reduce((sum, t) => sum + t.amount, 0)

  const outstandingAmount = totalPurchases - totalPayments

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Customer Info Card */}
      <Card style={styles.customerCard}>
        <Card.Content>
          <View style={styles.customerHeader}>
            <Avatar.Text size={80} label={getInitials(customerData.name)} style={styles.avatar} />
            <View style={styles.customerInfo}>
              <Title style={styles.customerName}>{customerData.name}</Title>
              <View style={styles.contactInfo}>
                <Icon name="phone" size={16} color={theme.colors.primary} />
                <Text style={styles.contactText}>{customerData.phone}</Text>
              </View>
              {customerData.email && (
                <View style={styles.contactInfo}>
                  <Icon name="email" size={16} color={theme.colors.primary} />
                  <Text style={styles.contactText}>{customerData.email}</Text>
                </View>
              )}
              <View style={styles.contactInfo}>
                <Icon name="location-on" size={16} color={theme.colors.primary} />
                <Text style={styles.contactText}>{customerData.address}</Text>
              </View>
            </View>
            <View style={styles.customerActions}>
              <IconButton
                icon="phone"
                size={24}
                onPress={() => {
                  /* Handle phone call */
                }}
                style={styles.actionButton}
              />
              <IconButton
                icon="message"
                size={24}
                onPress={() => {
                  /* Handle SMS */
                }}
                style={styles.actionButton}
              />
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Summary Cards */}
      <View style={styles.summarySection}>
        <View style={styles.summaryCards}>
          <Surface style={[styles.summaryCard, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.summaryValue}>৳{totalPurchases.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>মোট ক্রয়</Text>
          </Surface>
          <Surface style={[styles.summaryCard, { backgroundColor: theme.colors.success }]}>
            <Text style={styles.summaryValue}>৳{totalPayments.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>মোট পেমেন্ট</Text>
          </Surface>
        </View>
        <Surface style={[styles.outstandingCard, { backgroundColor: outstandingAmount > 0 ? "#FFEBEE" : "#E8F5E8" }]}>
          <Text style={styles.outstandingLabel}>বকেয়া পরিমাণ</Text>
          <Text
            style={[
              styles.outstandingValue,
              {
                color: outstandingAmount > 0 ? theme.colors.error : theme.colors.success,
              },
            ]}
          >
            ৳{Math.abs(outstandingAmount).toLocaleString()}
          </Text>
        </Surface>
      </View>

      {/* Recent Transactions */}
      <Card style={styles.transactionsCard}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Title>সাম্প্রতিক লেনদেন</Title>
            <Button
              mode="text"
              onPress={() => {
                /* Navigate to all transactions */
              }}
            >
              সব দেখুন
            </Button>
          </View>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>বিবরণ</DataTable.Title>
              <DataTable.Title>তারিখ</DataTable.Title>
              <DataTable.Title numeric>পরিমাণ</DataTable.Title>
            </DataTable.Header>

            {transactions.slice(0, 5).map((transaction) => (
              <DataTable.Row key={transaction.id}>
                <DataTable.Cell>
                  <View style={styles.transactionCell}>
                    <Icon
                      name={transaction.type === "sale" ? "shopping-cart" : "payment"}
                      size={16}
                      color={transaction.type === "sale" ? theme.colors.primary : theme.colors.success}
                    />
                    <Text style={styles.transactionDescription}>{transaction.description}</Text>
                  </View>
                </DataTable.Cell>
                <DataTable.Cell>{transaction.date}</DataTable.Cell>
                <DataTable.Cell numeric>
                  <Text
                    style={[
                      styles.transactionAmount,
                      {
                        color: transaction.type === "sale" ? theme.colors.primary : theme.colors.success,
                      },
                    ]}
                  >
                    {transaction.type === "sale" ? "+" : "-"}৳{transaction.amount.toLocaleString()}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      {/* Lending Information */}
      {lendings.length > 0 && (
        <Card style={styles.lendingCard}>
          <Card.Content>
            <Title>ঋণের তথ্য</Title>
            {lendings.map((lending) => (
              <View key={lending.id} style={styles.lendingItem}>
                <View style={styles.lendingInfo}>
                  <Text style={styles.lendingDescription}>{lending.description}</Text>
                  <Text style={styles.lendingDate}>মেয়াদ: {lending.dueDate}</Text>
                </View>
                <View style={styles.lendingAmount}>
                  <Text
                    style={[
                      styles.lendingAmountText,
                      {
                        color: lending.type === "given" ? theme.colors.error : theme.colors.success,
                      },
                    ]}
                  >
                    ৳{lending.amount.toLocaleString()}
                  </Text>
                  <Chip
                    size="small"
                    style={[
                      styles.lendingStatus,
                      {
                        backgroundColor: lending.isPaid ? theme.colors.success : theme.colors.error,
                      },
                    ]}
                    textStyle={{ color: "white", fontSize: 10 }}
                  >
                    {lending.isPaid ? "পরিশোধিত" : "অপরিশোধিত"}
                  </Chip>
                </View>
              </View>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <Button
          mode="contained"
          icon="add"
          onPress={() => navigation.navigate("AddSale", { customerId: customerData.id })}
          style={styles.actionButton}
        >
          নতুন বিক্রয়
        </Button>
        <Button
          mode="outlined"
          icon="payment"
          onPress={() => {
            /* Handle payment */
          }}
          style={styles.actionButton}
        >
          পেমেন্ট নিন
        </Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  customerCard: {
    margin: 15,
    borderRadius: 12,
    elevation: 3,
  },
  customerHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    backgroundColor: theme.colors.primary,
    marginRight: 15,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  contactText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  customerActions: {
    flexDirection: "row",
  },
  actionButton: {
    marginLeft: 5,
  },
  summarySection: {
    paddingHorizontal: 15,
  },
  summaryCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryCard: {
    flex: 0.48,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
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
  outstandingCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    elevation: 2,
  },
  outstandingLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  outstandingValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  transactionsCard: {
    margin: 15,
    borderRadius: 12,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  transactionCell: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionDescription: {
    marginLeft: 8,
    fontSize: 14,
  },
  transactionAmount: {
    fontWeight: "600",
  },
  lendingCard: {
    margin: 15,
    borderRadius: 12,
    elevation: 3,
  },
  lendingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  lendingInfo: {
    flex: 1,
  },
  lendingDescription: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  lendingDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  lendingAmount: {
    alignItems: "flex-end",
  },
  lendingAmountText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  lendingStatus: {
    height: 20,
  },
  actionSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    paddingBottom: 30,
  },
})
