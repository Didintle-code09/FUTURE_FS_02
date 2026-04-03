1. Open your Supabase project dashboard.
2. Go to `SQL Editor`.
3. Run the SQL in [schema.sql](/c:/Projects/CRM/supabase/schema.sql).
4. Start the backend with `npm run dev` inside `backend`.
5. Start the frontend with `npm run dev` inside `frontend`.

Notes:
- This migration keeps your existing Express API and JWT flow.
- Supabase is now used as the database backing the `users` and `leads` tables.
- The backend reads `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from `backend/.env`.
