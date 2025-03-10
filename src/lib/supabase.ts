import { createClient } from '@supabase/supabase-js';

// Получение переменных окружения для подключения к Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Проверка наличия необходимых переменных окружения
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials. Please check your environment variables.');
}

// Создание и экспорт экземпляра клиента Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);