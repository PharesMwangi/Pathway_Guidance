const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase configuration is missing. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
