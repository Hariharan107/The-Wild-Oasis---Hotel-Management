import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zhwpqjjjronwhdoaffta.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpod3Bxampqcm9ud2hkb2FmZnRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkxNjAwNTgsImV4cCI6MjAwNDczNjA1OH0.WXqnsOlhmA4r-R1-rhxV4oG4qGAk8KvXyhoYNXIh6mA";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
