// services/daily-oracle-service/index.ts
// Supabase Edge Function — Daily oracle generation
// Handles: Overnight batch cron, personalised oracle text, tarot draw, moon phase
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

Deno.serve(async (req: Request) => {
  const jwt = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!jwt) return new Response('Unauthorized', { status: 401 });

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(jwt);
  if (authError || !user) return new Response('Unauthorized', { status: 401 });

  try {
    const _body = await req.json();
    // TODO: Generate personalised oracle using Claude
    // TODO: Draw seeded tarot card
    // TODO: Calculate current moon phase
    return new Response(JSON.stringify({ message: 'Not implemented' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (_err) {
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
