import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zrzmowcwycvgvpwdixgm.supabase.co'
const supabaseAnonKey = 'sb_publishable_Ok7KKqWIfzpNAjOWdw69FA_2X27aGik'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)