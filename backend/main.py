from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database import Base, engine
from app.routers import auth, users, profiles, matches, chat, stories, events
from app.routers import payments, gifts, admin, voice, filters, ai

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()

app = FastAPI(
    title="MatchGen AI",
    description="AI-powered dating app with self-hosted LLM",
    version="2.2.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://matchgen.ai", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(profiles.router, prefix="/api/profiles", tags=["profiles"])
app.include_router(matches.router, prefix="/api/matches", tags=["matches"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(stories.router, prefix="/api/stories", tags=["stories"])
app.include_router(events.router, prefix="/api/events", tags=["events"])
app.include_router(payments.router, prefix="/api/payments", tags=["payments"])
app.include_router(gifts.router, prefix="/api/gifts", tags=["gifts"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])
app.include_router(voice.router, prefix="/api/voice", tags=["voice"])
app.include_router(filters.router, prefix="/api/filters", tags=["filters"])
app.include_router(ai.router, prefix="/api/ai", tags=["ai"])

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "2.2.0"}

@app.get("/")
async def root():
    return {"message": "MatchGen AI API v2.2", "docs": "/docs"}
