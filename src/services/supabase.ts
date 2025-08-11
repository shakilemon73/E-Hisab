import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "YOUR_SUPABASE_URL"
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Tables Schema
export interface Customer {
  id: string
  name: string
  phone: string
  address: string
  email?: string
  created_at: string
  updated_at: string
}

export interface Sale {
  id: string
  customer_id?: string
  amount: number
  cost: number
  profit: number
  description: string
  sale_date: string
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  customer_id?: string
  type: "income" | "expense"
  amount: number
  description: string
  category: string
  transaction_date: string
  is_temporary: boolean
  created_at: string
  updated_at: string
}

export interface Lending {
  id: string
  customer_id?: string
  type: "given" | "taken"
  amount: number
  description: string
  due_date?: string
  is_paid: boolean
  lending_date: string
  created_at: string
  updated_at: string
}
