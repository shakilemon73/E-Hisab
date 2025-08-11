"use client"

import { useState, useEffect } from "react"
import { View, ScrollView, StyleSheet, Alert } from "react-native"
import { TextInput, Button, Card, Title, Text, Divider, HelperText, Chip } from "react-native-paper"
import { theme } from "../theme/theme"

interface Customer {
  id: string
  name: string
  phone: string
}

export default function AddSaleScreen({ navigation }: any) {
  const [saleData, setSaleData] = useState({
    customerId: "",
    customerName: "",
    amount: "",
    cost: "",
    description: "",
    saleDate: new Date(),
  })
  const [customers, setCustomers] = useState<Customer[]>([])
  const [errors, setErrors] = useState<any>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    // Mock customers - replace with actual database query
    const mockCustomers: Customer[] = [
      { id: "1", name: "রহিম উদ্দিন", phone: "০১৭১১১১১১১১" },
      { id: "2", name: "করিম আহমেদ", phone: "০১৮২২২২২২২২" },
      { id: "3", name: "সালমা খাতুন", phone: "০১৯৩৩৩৩৩৩৩৩" },
    ]
    setCustomers(mockCustomers)
  }

  const validateForm = () => {
    const newErrors: any = {}

    if (!saleData.amount || Number.parseFloat(saleData.amount) <= 0) {
      newErrors.amount = "বিক্রয় মূল্য প্রয়োজন"
    }

    if (!saleData.cost || Number.parseFloat(saleData.cost) <= 0) {
      newErrors.cost = "ক্রয় মূল্য প্রয়োজন"
    }

    if (Number.parseFloat(saleData.amount) < Number.parseFloat(saleData.cost)) {
      newErrors.amount = "বিক্রয় মূল্য ক্রয় মূল্যের চেয়ে কম হতে পারে না"
    }

    if (!saleData.description.trim()) {
      newErrors.description = "পণ্যের বিবরণ প্রয়োজন"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const profit = Number.parseFloat(saleData.amount) - Number.parseFloat(saleData.cost)

      // Here you would save to both local database and Supabase
      const newSale = {
        id: Date.now().toString(),
        customer_id: saleData.customerId || null,
        amount: Number.parseFloat(saleData.amount),
        cost: Number.parseFloat(saleData.cost),
        profit: profit,
        description: saleData.description,
        sale_date: saleData.saleDate.toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      // Save to local database first
      // await saveToLocalDatabase(newSale);

      // Try to sync with Supabase if online
      // await syncWithSupabase(newSale);

      Alert.alert("সফল", "বিক্রয় সফলভাবে যোগ করা হয়েছে", [{ text: "ঠিক আছে", onPress: () => navigation.goBack() }])
    } catch (error) {
      Alert.alert("ত্রুটি", "বিক্রয় যোগ করতে সমস্যা হয়েছে")
    } finally {
      setLoading(false)
    }
  }

  const selectCustomer = (customer: Customer) => {
    setSaleData({
      ...saleData,
      customerId: customer.id,
      customerName: customer.name,
    })
  }

  const profit =
    saleData.amount && saleData.cost ? Number.parseFloat(saleData.amount) - Number.parseFloat(saleData.cost) : 0

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>গ্রাহক নির্বাচন (ঐচ্ছিক)</Title>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.customerChips}>
            <Chip
              selected={!saleData.customerId}
              onPress={() => setSaleData({ ...saleData, customerId: "", customerName: "" })}
              style={styles.customerChip}
            >
              নগদ বিক্রয়
            </Chip>
            {customers.map((customer) => (
              <Chip
                key={customer.id}
                selected={saleData.customerId === customer.id}
                onPress={() => selectCustomer(customer)}
                style={styles.customerChip}
              >
                {customer.name}
              </Chip>
            ))}
          </ScrollView>

          {saleData.customerName && <Text style={styles.selectedCustomer}>নির্বাচিত গ্রাহক: {saleData.customerName}</Text>}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>বিক্রয়ের তথ্য</Title>

          <TextInput
            label="পণ্যের বিবরণ *"
            value={saleData.description}
            onChangeText={(text) => setSaleData({ ...saleData, description: text })}
            style={styles.input}
            error={!!errors.description}
            placeholder="যেমন: চাল ১০ কেজি"
          />
          <HelperText type="error" visible={!!errors.description}>
            {errors.description}
          </HelperText>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <TextInput
                label="বিক্রয় মূল্য *"
                value={saleData.amount}
                onChangeText={(text) => setSaleData({ ...saleData, amount: text })}
                keyboardType="numeric"
                style={styles.input}
                error={!!errors.amount}
                left={<TextInput.Icon icon="currency-bdt" />}
              />
              <HelperText type="error" visible={!!errors.amount}>
                {errors.amount}
              </HelperText>
            </View>

            <View style={styles.halfWidth}>
              <TextInput
                label="ক্রয় মূল্য *"
                value={saleData.cost}
                onChangeText={(text) => setSaleData({ ...saleData, cost: text })}
                keyboardType="numeric"
                style={styles.input}
                error={!!errors.cost}
                left={<TextInput.Icon icon="currency-bdt" />}
              />
              <HelperText type="error" visible={!!errors.cost}>
                {errors.cost}
              </HelperText>
            </View>
          </View>

          {profit !== 0 && (
            <View style={[styles.profitCard, profit > 0 ? styles.profitPositive : styles.profitNegative]}>
              <Text style={styles.profitLabel}>{profit > 0 ? "লাভ" : "ক্ষতি"}:</Text>
              <Text style={styles.profitAmount}>৳{Math.abs(profit).toLocaleString()}</Text>
            </View>
          )}

          <Divider style={styles.divider} />

          <Button mode="outlined" onPress={() => {}} style={styles.dateButton} icon="calendar">
            তারিখ: {saleData.saleDate.toLocaleDateString("bn-BD")}
          </Button>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.cancelButton}>
          বাতিল
        </Button>
        <Button mode="contained" onPress={handleSave} loading={loading} disabled={loading} style={styles.saveButton}>
          সংরক্ষণ করুন
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
  card: {
    margin: 15,
    borderRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: theme.colors.primary,
  },
  customerChips: {
    marginBottom: 10,
  },
  customerChip: {
    marginRight: 8,
  },
  selectedCustomer: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: "500",
    marginTop: 10,
  },
  input: {
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  profitCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  profitPositive: {
    backgroundColor: "#E8F5E8",
    borderColor: theme.colors.success,
    borderWidth: 1,
  },
  profitNegative: {
    backgroundColor: "#FFEBEE",
    borderColor: theme.colors.error,
    borderWidth: 1,
  },
  profitLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  profitAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 15,
  },
  dateButton: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    paddingBottom: 30,
  },
  cancelButton: {
    flex: 0.45,
  },
  saveButton: {
    flex: 0.45,
  },
})
