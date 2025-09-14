// This script helps set up your Supabase project programmatically
// Note: You need to run this with admin privileges (service role key)

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Replace these with your actual service role key (not anon key)
const supabaseUrl = 'https://kbnurwcwnxokpkeojpdu.supabase.co';
// ⚠️ IMPORTANT: This should be your service role key, NOT your anon key
// You can find it in your Supabase dashboard under Project Settings > API
const supabaseServiceKey = 'YOUR_SERVICE_ROLE_KEY';

// Function to set up Supabase project
async function setupSupabase() {
  if (!supabaseServiceKey || supabaseServiceKey === 'YOUR_SERVICE_ROLE_KEY') {
    console.error('❌ Please add your Supabase service role key to this script');
    return;
  }

  // Create Supabase client with service role key for admin privileges
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  try {
    console.log('🔧 Setting up Supabase project...');
    
    // Read the SQL file
    const sqlPath = path.join(__dirname, '../supabase/setup.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    // Split SQL into statements
    const statements = sqlContent.split(';')
      .map(statement => statement.trim())
      .filter(statement => statement);
    
    // Execute each statement
    for (const statement of statements) {
      console.log(`Executing SQL: ${statement.substring(0, 50)}...`);
      const { error } = await supabase.rpc('exec_sql', { sql_string: statement });
      
      if (error) {
        console.error('❌ Error executing SQL:', error);
        return;
      }
    }
    
    console.log('✅ Successfully set up Supabase project!');
    
    // Verify the setup
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
    
    if (tablesError) {
      console.error('❌ Error verifying tables:', tablesError);
      return;
    }
    
    console.log('📋 Available tables:', tables.map(t => t.table_name));
    
    // Check storage buckets
    const { data: buckets, error: bucketsError } = await supabase
      .from('storage.buckets')
      .select('id, name');
    
    if (bucketsError) {
      console.error('❌ Error verifying storage buckets:', bucketsError);
      return;
    }
    
    console.log('🗂️ Available storage buckets:', buckets.map(b => b.name));
    
  } catch (error) {
    console.error('❌ Error setting up Supabase project:', error);
  }
}

// Run the setup
setupSupabase();