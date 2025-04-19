import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const WEBHOOK_ENDPOINT = import.meta.env.VITE_SUPABASE_URL'; // Change this if needed

export const handler = async () => {
  const { data: queue, error } = await supabase
    .from('webhook_queue')
    .select('*')
    .eq('processed', false)
    .order('created_at', { ascending: true })
    .limit(10);

  if (error) {
    console.error('❌ Error fetching queue:', error);
    return { statusCode: 500, body: 'Failed to fetch queue' };
  }

  for (const event of queue) {
    try {
      const res = await fetch(WEBHOOK_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: event.event_type,
          payload: event.payload
        })
      });

      if (res.ok) {
        await supabase
          .from('webhook_queue')
          .update({
            processed: true,
            processed_at: new Date().toISOString()
          })
          .eq('id', event.id);
        console.log(`✅ Webhook sent for event: ${event.id}`);
      } else {
        console.warn(`⚠️ Webhook failed: ${res.statusText}`);
      }
    } catch (err) {
      console.error(`❌ Error processing event ${event.id}:`, err);
    }
  }

  return {
    statusCode: 200,
    body: 'Webhook queue processed'
  };
};
