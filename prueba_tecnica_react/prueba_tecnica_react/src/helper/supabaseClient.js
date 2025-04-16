import { createClient } from '@supabase/supabase-js';
const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonkey = import.meta.env.VITE_SUPABASE_ANONKEY;
console.log(supabaseURL);
const supabase = createClient(supabaseURL, supabaseAnonkey);
export default supabase;