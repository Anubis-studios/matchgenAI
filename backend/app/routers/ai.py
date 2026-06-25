from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import User
from app.schemas import AIBioRequest, AIChatStarterRequest, ProfileResponse
from app.routers.auth import get_current_user
import httpx
from app.config import settings

router = APIRouter()

async def generate_with_ollama(prompt: str, system: str = "", max_tokens: int = 500) -> str:
    """Generate text using self-hosted Ollama - ZERO API COST"""
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                f"{settings.OLLAMA_BASE_URL}/api/generate",
                json={
                    "model": settings.AI_MODEL,
                    "prompt": prompt,
                    "system": system,
                    "stream": False,
                    "options": {
                        "temperature": 0.7,
                        "num_predict": max_tokens
                    }
                }
            )
            response.raise_for_status()
            return response.json().get("response", "").strip()
    except Exception as e:
        return f"AI service temporarily unavailable. Error: {str(e)}"

@router.post("/generate-bio")
async def generate_bio(
    request: AIBioRequest,
    current_user: User = Depends(get_current_user)
):
    """Generate a dating bio using local LLM - FREE, no API tokens"""
    system = "You are a creative dating profile writer. Write engaging, authentic bios."
    prompt = f"""Write a {request.tone} dating app bio for someone who loves: {', '.join(request.interests)}.
    Traits: {', '.join(request.personality_traits) if request.personality_traits else 'friendly and outgoing'}.
    Keep it under 150 words. Make it catchy and authentic."""

    bio = await generate_with_ollama(prompt, system, max_tokens=300)
    return {"bio": bio, "model": settings.AI_MODEL}

@router.post("/chat-starter")
async def generate_chat_starter(
    request: AIChatStarterRequest,
    current_user: User = Depends(get_current_user)
):
    """Generate an opening message using local LLM - FREE"""
    system = "You are a dating coach. Write natural, engaging opening messages."
    prompt = f"""Write a friendly opening message for a dating app conversation.
    Their interests: {', '.join(request.match_profile.interests or [])}
    My interests: {', '.join(request.my_profile.interests or [])}
    Context: {request.context or 'We just matched'}
    Keep it under 50 words. Be genuine and specific."""

    message = await generate_with_ollama(prompt, system, max_tokens=150)
    return {"message": message, "model": settings.AI_MODEL}

@router.post("/analyze-compatibility")
async def analyze_compatibility(
    profile1: ProfileResponse,
    profile2: ProfileResponse,
    current_user: User = Depends(get_current_user)
):
    """AI compatibility analysis using local LLM - FREE"""
    system = "You are a relationship compatibility expert. Be objective and constructive."
    prompt = f"""Analyze compatibility between two dating profiles:

    Person A: Age {profile1.age or 'unknown'}, Interests: {', '.join(profile1.interests or [])}
    Bio: {profile1.bio or 'No bio'}

    Person B: Age {profile2.age or 'unknown'}, Interests: {', '.join(profile2.interests or [])}
    Bio: {profile2.bio or 'No bio'}

    Provide:
    1. Compatibility score (0-100)
    2. Key shared interests
    3. Potential conversation topics
    4. One fun date idea

    Format as JSON-like structure."""

    analysis = await generate_with_ollama(prompt, system, max_tokens=400)
    return {"analysis": analysis, "model": settings.AI_MODEL}

@router.get("/model-info")
async def get_model_info():
    """Get info about the currently loaded AI model"""
    return {
        "model": settings.AI_MODEL,
        "provider": "Ollama (self-hosted)",
        "cost": "$0.00 (local inference)",
        "base_url": settings.OLLAMA_BASE_URL
    }
