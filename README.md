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