import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY

export const supabase = createClient(supabaseUrl, supabaseServiceKey)


async function testDatabaseConnection() {
    let location = import.meta.env.VITE_LOCATION
    const { data, error } = await supabase
    .from('users')
    .select('*')
    .limit(1);

    console.log('location =', location);
    if (error) {
        console.error('Connection failed:', error);
        return;
    }

    console.log('Successful connection:', data);
}
testDatabaseConnection();
