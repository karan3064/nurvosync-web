-- ============================================================
-- NurvoSync: Patients + Gait Sessions schema
-- Run once in Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ============================================================

-- 1. PATIENTS TABLE
create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  doctor_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  age integer not null check (age > 0 and age < 130),
  condition text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists patients_doctor_id_idx on public.patients(doctor_id);

alter table public.patients enable row level security;

create policy "Doctors can view own patients"
  on public.patients for select
  using (auth.uid() = doctor_id);

create policy "Doctors can insert own patients"
  on public.patients for insert
  with check (auth.uid() = doctor_id);

create policy "Doctors can update own patients"
  on public.patients for update
  using (auth.uid() = doctor_id)
  with check (auth.uid() = doctor_id);

create policy "Doctors can delete own patients"
  on public.patients for delete
  using (auth.uid() = doctor_id);

-- 2. GAIT SESSIONS TABLE
create table if not exists public.gait_sessions (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  doctor_id uuid not null references auth.users(id) on delete cascade,
  recorded_at timestamptz not null default now(),

  -- WalkReport fields (src/hooks/gaitAnalysis.ts)
  symmetry numeric not null,
  balance_score numeric not null,
  step_count integer not null,
  cadence numeric not null,
  stance_percent numeric not null,
  swing_percent numeric not null,
  step_variability numeric not null,
  asymmetry_index numeric not null,
  stride_length numeric not null,
  risk_level text not null check (risk_level in ('Low','Moderate','High')),
  risk_reason text not null,
  left_heel_toe_ratio numeric not null,
  right_heel_toe_ratio numeric not null,

  created_at timestamptz not null default now()
);

create index if not exists gait_sessions_patient_id_idx on public.gait_sessions(patient_id);
create index if not exists gait_sessions_doctor_id_idx on public.gait_sessions(doctor_id);
create index if not exists gait_sessions_recorded_at_idx on public.gait_sessions(recorded_at desc);

alter table public.gait_sessions enable row level security;

create policy "Doctors can view own sessions"
  on public.gait_sessions for select
  using (auth.uid() = doctor_id);

create policy "Doctors can insert own sessions"
  on public.gait_sessions for insert
  with check (auth.uid() = doctor_id);

create policy "Doctors can update own sessions"
  on public.gait_sessions for update
  using (auth.uid() = doctor_id)
  with check (auth.uid() = doctor_id);

create policy "Doctors can delete own sessions"
  on public.gait_sessions for delete
  using (auth.uid() = doctor_id);
