import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/database.types';

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('words')
    .select('word')
    .eq('created_at', today)
    .single();

  if (error) {
    console.error('Error fetching word of the day:', error);
    throw createError({ statusCode: 500, statusMessage: 'Error fetching word of the day' });
  }

  if (!data) {
    console.error('No word of the day found for today:', today);
    throw createError({ statusCode: 404, statusMessage: 'No word of the day found for today' });
  }

  return { word: data.word };
});
