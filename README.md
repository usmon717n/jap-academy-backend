# JAP Academy — Backend (NestJS + PostgreSQL)

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy env and configure DATABASE_URL
cp .env.example .env

# 3. Run migrations
npx prisma migrate dev --name init

# 4. Seed database
npx prisma db seed

# 5. Start dev server
npm run start:dev
```

API runs on `http://localhost:4000/api`
Swagger docs: `http://localhost:4000/api/docs`

## Railway Deployment

1. Push this repo to GitHub
2. Create new project on Railway
3. Add **PostgreSQL** service in Railway
4. Connect your GitHub repo
5. Set environment variables:
   - `DATABASE_URL` — Railway provides this automatically from PostgreSQL service
   - `JWT_SECRET` — generate a strong random string
   - `FRONTEND_URL` — your Vercel frontend URL (e.g. `https://jap-academy.vercel.app`)
   - `PORT` — `4000`
6. Railway auto-detects Dockerfile and deploys

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | - | Register |
| POST | /api/auth/login | - | Login |
| GET | /api/auth/me | JWT | Current user |
| GET | /api/topics | - | All topics |
| GET | /api/topics/:id | - | Topic with questions |
| POST | /api/topics | Admin | Create topic |
| PUT | /api/topics/:id | Admin | Update topic |
| DELETE | /api/topics/:id | Admin | Delete topic |
| GET | /api/questions/topic/:id | - | Questions by topic |
| POST | /api/questions | Admin | Create question |
| PUT | /api/questions/:id | Admin | Update question |
| DELETE | /api/questions/:id | Admin | Delete question |
| POST | /api/results/submit | JWT | Submit test result |
| GET | /api/results/my | JWT | User results |
| GET | /api/results/all | Admin | All results |
| GET | /api/notifications | JWT | User notifications |
| GET | /api/notifications/unread-count | JWT | Unread count |
| PATCH | /api/notifications/:id/read | JWT | Mark read |
| PATCH | /api/notifications/read-all | JWT | Mark all read |
| POST | /api/contacts | - | Submit contact form |
| GET | /api/contacts | Admin | All contacts |

## Default Admin
- Email: `admin@japacademy.uz`
- Password: `admin123`
