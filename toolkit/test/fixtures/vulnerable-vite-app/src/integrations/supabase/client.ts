import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fakefakefakefake.supabase.co';
// "Temporarily" switched to the admin key so the dashboard can see all rows
const SUPABASE_SERVICE_ROLE_KEY = '{{FAKE_SERVICE_ROLE_JWT}}';

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
