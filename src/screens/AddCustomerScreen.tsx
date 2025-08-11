"use client"

import { useState } from "react"
import { View, ScrollView, StyleSheet, Alert } from "react-native"
import { TextInput, Button, Card, Title, HelperText } from "react-native-paper"
import { theme } from "../theme/theme"

export default function AddCustomerScreen({ navigation }: any) {
  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  })
  const [errors, setErrors] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors: any = {}

    if (!customerData.name.trim()) {
      newErrors.name = "গ্রাহকের নাম প্রয়োজন"
    }

    if (!customerData.phone.trim()) {
      newErrors.phone = "ফোন নম্বর প্রয়োজন"
    } else if (!/^01[3-9]\d{8}$/.test(customerData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "সঠিক ফোন নম্বর দিন"
    }

    if (customerData.email && !/\S+@\S+\.\S+/.test(customerData.email)) {
      newErrors.email = "সঠিক ইমেইল ঠিকানা দিন"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const newCustomer = {
        id: Date.now().toString(),
        name: customerData.name.trim(),
        phone: customerData.phone.trim(),
        address: customerData.address.trim(),
        email: customerData.email.trim() || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      // Save to local database first
      // await saveToLocalDatabase(newCustomer);

      // Try to sync with Supabase if online
      // await syncWithSupabase(newCustomer);

      Alert.alert("সফল", "গ্রাহক সফলভাবে যোগ করা হয়েছে", [{ text: "ঠিক আছে", onPress: () => navigation.goBack() }])
    } catch (error) {
      Alert.alert("ত্রুটি", "গ্রাহক যোগ করতে সমস্যা হয়েছে")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>গ্রাহকের তথ্য</Title>

          <TextInput
            label="গ্রাহকের নাম *"
            value={customerData.name}
            onChangeText={(text) => setCustomerData({ ...customerData, name: text })}
            style={styles.input}
            error={!!errors.name}
            placeholder="যেমন: রহিম উদ্দিন"
          />
          <HelperText type="error" visible={!!errors.name}>
            {errors.name}
          </HelperText>

          <TextInput
            label="ফোন নম্বর *"
            value={customerData.phone}
            onChangeText={(text) => setCustomerData({ ...customerData, phone: text })}
            keyboardType="phone-pad"
            style={styles.input}
            error={!!errors.phone}
            placeholder="০১৭১১১১১১১১"
            left={<TextInput.Icon icon="phone" />}
          />
          <HelperText type="error" visible={!!errors.phone}>
            {errors.phone}
          </HelperText>

          <TextInput
            label="ঠিকানা"
            value={customerData.address}
            onChangeText={(text) => setCustomerData({ ...customerData, address: text })}
            style={styles.input}
            placeholder="যেমন: ঢাকা, বাংলাদেশ"
            left={<TextInput.Icon icon="map-marker" />}
            multiline
            numberOfLines={2}
          />

          <TextInput
            label="ইমেইল (ঐচ্ছিক)"
            value={customerData.email}
            onChangeText={(text) => setCustomerData({ ...customerData, email: text })}
            keyboardType="email-address"
            style={styles.input}
            error={!!errors.email}
            placeholder="example@email.com"
            left={<TextInput.Icon icon="email" />}
          />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email}
          </HelperText>
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
  input: {
    marginBottom: 5,
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
