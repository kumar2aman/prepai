# PrepAI 🎙️

**PrepAI** is an open-source AI interviewer platform that conducts interviews in **voice mode**, evaluates your performance, and provides a score based on your answers.  
Built as a modern web application using a **Turborepo** monorepo structure, it leverages cutting-edge technologies like **Next.js**, **Node.js**, **Express**, **WebSockets**, **Prisma**, and **PostgreSQL**.

> ⚠️ This project is under active development. We are continuously adding features and fixing bugs. Contributions and bug reports are welcome!

---

## Features

- Voice-based AI interviews  
- Real-time performance scoring  
- User authentication with **Google OAuth 2.0**  
- Modern tech stack with Turborepo + PNPM  
- Open-source and community-driven  

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js, React, WebSockets |
| Backend | Node.js, Express, Passport.js (Google OAuth) |
| Database | PostgreSQL, Prisma ORM |
| Package Manager | PNPM |
| Monorepo | Turborepo |
| APIs | Google APIs (OAuth, Speech/Voice APIs) |

---

## Requirements

1. **Node.js** >= 18  
2. **PNPM**  
3. **PostgreSQL** database  
4. **Google API credentials** (for OAuth & voice features)  

You need to create a Google project and obtain:  

- `GOOGLE_CLIENT_ID`  
- `GOOGLE_CLIENT_SECRET`  
- Set the authorized redirect URI:  



---

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/prepai.git
cd prepai
```
```bash

pnpm install

```

Environment Setup
Copy the example environment file and fill in your credentials:

```bash

cp .env.example .env

```

Update .env with your:

DATABASE_URL (PostgreSQL connection string)

GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET

JWT_SECRET

FRONTEND_URL / BACKEND_URL


## Database Setup


Generate Prisma client:

```bash

pnpm prisma generate

```

Run migrations:

```bash

pnpm prisma migrate dev --name init

```

## 💻 Development

### Frontend

```bash
pnpm dev:frontend
```

Runs Next.js frontend on http://localhost:3000


### Backend

```bash
pnpm dev:backend
```


Runs Express API server on http://localhost:3001

## Usage :-

Open frontend in your browser

Sign in with Google or your email/password

Start an AI voice interview

Receive a performance score at the end

## Contributing:-

We welcome contributions!

Found a bug? Open an issue

Want to add a feature? Fork and submit a PR

## Guidelines:-

1. Follow the existing code style (Next.js + TypeScript best practices)

2. Document any new APIs or components

3. Ensure database migrations are included for backend changes

## Roadmap / Upcoming Features:-

- Improve AI voice analysis

- Add question categories and custom interview templates

- Real-time interviewer feedback and suggestions

- UI/UX improvements

- Performance optimization

## License:-

- This project is MIT Licensed — feel free to contribute and use it freely.



### Report: Bugs / Request Features: Issues

### PrepAI — AI interviewing made smarter, faster, and open-source. 🚀


---