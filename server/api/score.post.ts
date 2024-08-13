import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { Database } from '~/types/database.types';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { score } = body;

  const supabase = await serverSupabaseClient<Database>(event);
  const user = await serverSupabaseUser(event);
  const today = new Date().toISOString().split('T')[0];

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  // Save or update the user's score
  const { data, error } = await supabase
    .from('scores')
    .upsert({
      created_at: today,
      user_id: user.id,
      score
    })
    
  if (error) {
    console.error('Error saving score:', error);
    throw createError({ statusCode: 500, statusMessage: 'Error saving score' });
  }

  return { success: true };
})
