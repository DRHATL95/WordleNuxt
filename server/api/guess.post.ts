import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { Database } from '~/types/database.types';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { guess } = body;

  const supabase = await serverSupabaseClient<Database>(event);
  const user = await serverSupabaseUser(event);
  const today = new Date().toISOString().split('T')[0];

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  // Fetch the word of the day
  const { data, error } = await supabase
    .from('words')
    .select('id, word')
    .eq('created_at', today)
    .single();

  if (error) {
    console.error('Error fetching word of the day:', error);
    throw createError({ statusCode: 500, statusMessage: 'Error fetching word of the day' });
  }

  // Save the guess
  const { data: guessData, error: guessError } = await supabase
    .from('guesses')
    .insert({ 
      word_id: data.id,
      user_id: user.id,
      guess 
    });

  if (guessError) {
    console.error('Error saving guess:', guessError);
    throw createError({ statusCode: 500, statusMessage: 'Error saving guess' });
  }

  // Check if the guess is correct
  const correct = data.word === guess;

  return { success: correct, word: data.word };
})
