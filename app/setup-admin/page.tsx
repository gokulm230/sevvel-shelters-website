"use client";

import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function CreateAdminPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({ success: false, message: "" });
  
  const createAdmin = async () => {
    setLoading(true);
    setResult({ success: false, message: "" });
    
    try {
      // This only works when using the service_role key, not the anon key
      // You would need to provide your service role key for this to work
      // WARNING: Never expose your service role key in client-side code
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseServiceKey = 'your-service-role-key'; // Replace this with your actual service role key
      
      // Create a Supabase client with the service role key
      const supabase = createClient(supabaseUrl!, supabaseServiceKey);
      
      // Create the admin user
      const { data, error } = await supabase.auth.admin.createUser({
        email: 'admin@sevvel.com',
        password: 'Admin123!',
        email_confirm: true
      });
      
      if (error) throw error;
      
      setResult({
        success: true,
        message: "Admin user created successfully! You can now login."
      });
      
    } catch (error: any) {
      setResult({
        success: false,
        message: `Error creating admin user: ${error.message}`
      });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Admin User</CardTitle>
          <p className="text-muted-foreground">
            This will create an admin user with credentials:<br/>
            Email: admin@sevvel.com<br/>
            Password: Admin123!
          </p>
        </CardHeader>
        <CardContent>
          {result.message && (
            <Alert variant={result.success ? "default" : "destructive"} className="mb-4">
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
          )}
          
          <Button 
            onClick={createAdmin} 
            className="w-full bg-primary hover:bg-primary/90" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating admin user...
              </>
            ) : (
              "Create Admin User"
            )}
          </Button>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              Note: This approach requires your Supabase service role key to be
              added to the code. For security reasons, it's better to create the
              admin user directly in the Supabase dashboard.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}