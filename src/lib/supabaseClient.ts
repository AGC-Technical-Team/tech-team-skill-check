console.log('SUPABASE_API_URL:', process.env.SUPABASE_API_URL);
console.log('SUPABASE_API_KEY:', process.env.SUPABASE_API_KEY);
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_API_URL!;
const supabaseKey = process.env.SUPABASE_API_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey); 