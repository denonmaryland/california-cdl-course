create table if not exists public.cdl_course_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_key text not null,
  progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, course_key)
);

alter table public.cdl_course_progress enable row level security;

drop policy if exists "Users can read their own CDL progress" on public.cdl_course_progress;
create policy "Users can read their own CDL progress"
on public.cdl_course_progress
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their own CDL progress" on public.cdl_course_progress;
create policy "Users can insert their own CDL progress"
on public.cdl_course_progress
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own CDL progress" on public.cdl_course_progress;
create policy "Users can update their own CDL progress"
on public.cdl_course_progress
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
