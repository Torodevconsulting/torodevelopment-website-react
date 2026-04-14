import { supabase } from './supabaseClient'

export interface LeadData {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  turnstileToken: string
}

export async function submitLead(data: LeadData) {
  const { turnstileToken, ...lead } = data

  const { error } = await supabase
    .from('leads')
    .insert([lead])

  if (error) throw new Error(error.message)

  return { success: true }
}