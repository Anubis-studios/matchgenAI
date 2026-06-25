from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.routers.auth import get_current_user

router = APIRouter()

@router.get("/")
async def get_events(current_user = Depends(get_current_user)):
    return {"message": "events endpoint - implement as needed"}
