import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/wizard/session?wizardId=xxx — load saved session
export async function GET(req: NextRequest) {
  const wizardId = req.nextUrl.searchParams.get('wizardId')
  if (!wizardId) {
    return NextResponse.json({ error: 'wizardId is required' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('wizard_sessions')
    .select('*')
    .eq('user_id', user.id)
    .eq('wizard_id', wizardId)
    .single()

  if (error || !data) {
    return NextResponse.json(null, { status: 404 })
  }

  return NextResponse.json({
    wizardId: data.wizard_id,
    currentStepIndex: data.current_step_index,
    values: data.values,
    completedSteps: data.completed_steps,
    lastSavedAt: data.last_saved_at,
    startedAt: data.started_at,
  })
}

// POST /api/wizard/session — save / upsert session
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { wizardId, currentStepIndex, values, completedSteps, startedAt } = body

  if (!wizardId) {
    return NextResponse.json({ error: 'wizardId is required' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { error } = await supabase
    .from('wizard_sessions')
    .upsert(
      {
        user_id: user.id,
        wizard_id: wizardId,
        current_step_index: currentStepIndex ?? 0,
        values: values ?? {},
        completed_steps: completedSteps ?? [],
        started_at: startedAt ?? new Date().toISOString(),
        last_saved_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,wizard_id' }
    )

  if (error) {
    console.error('[Wizard API] Save error:', error)
    return NextResponse.json({ error: 'Failed to save session' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

// DELETE /api/wizard/session?wizardId=xxx — clear session
export async function DELETE(req: NextRequest) {
  const wizardId = req.nextUrl.searchParams.get('wizardId')
  if (!wizardId) {
    return NextResponse.json({ error: 'wizardId is required' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await supabase
    .from('wizard_sessions')
    .delete()
    .eq('user_id', user.id)
    .eq('wizard_id', wizardId)

  return NextResponse.json({ ok: true })
}
