import { supabase } from './supabaseClient'

export interface LeadData {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
}

export async function submitLead(data: LeadData) {
  const { error } = await supabase
    .from('leads')
    .insert([data])

  if (error) throw new Error(error.message)

  return { success: true }
}