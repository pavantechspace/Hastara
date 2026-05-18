// services/reading-service/index.ts
// Supabase Edge Function — Palm reading analysis pipeline
// Handles: image validation → GPT-5 Vision extraction → Claude synthesis → caching
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
    const body = await req.json();
    // TODO: Validate palm image
    // TODO: Call GPT-5 Vision for feature extraction
    // TODO: Call Claude Opus for narrative synthesis
    // TODO: Cache result in Redis
    // TODO: Store reading in database
    const _mode = body.mode;
    const _palmImageUrl = body.palmImageUrl;

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
