from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum

class SubscriptionTier(str, Enum):
    FREE = "free"
    PRO = "pro"
    ORACLE = "oracle"
    ULTRA = "ultra"

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str

class UserResponse(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str
    subscription_tier: SubscriptionTier
    credits: int
    created_at: datetime
    class Config:
        from_attributes = True

class ProfileCreate(BaseModel):
    bio: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    location: Optional[str] = None
    interests: Optional[List[str]] = []

class ProfileResponse(BaseModel):
    id: int
    user_id: int
    bio: Optional[str]
    age: Optional[int]
    ai_generated_bio: Optional[str]
    photos: List[str]
    created_at: datetime
    class Config:
        from_attributes = True

class MatchResponse(BaseModel):
    id: int
    matched_user_id: int
    match_score: float
    ai_compatibility: float
    created_at: datetime
    class Config:
        from_attributes = True

class MessageCreate(BaseModel):
    match_id: int
    content: str

class MessageResponse(BaseModel):
    id: int
    sender_id: int
    content: str
    is_ai_starter: bool
    created_at: datetime
    class Config:
        from_attributes = True

class StoryCreate(BaseModel):
    caption: Optional[str] = None

class StoryResponse(BaseModel):
    id: int
    user_id: int
    media_url: str
    media_type: str
    caption: Optional[str]
    created_at: datetime
    class Config:
        from_attributes = True

class EventCreate(BaseModel):
    title: str
    description: Optional[str] = None
    location: Optional[str] = None
    event_date: datetime
    max_attendees: Optional[int] = 50

class EventResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    location: Optional[str]
    event_date: datetime
    attendees: List[int]
    created_at: datetime
    class Config:
        from_attributes = True

class GiftResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    icon: str
    price: int
    class Config:
        from_attributes = True

class AIBioRequest(BaseModel):
    interests: List[str]
    personality_traits: Optional[List[str]] = []
    tone: Optional[str] = "funny"

class AIChatStarterRequest(BaseModel):
    match_profile: ProfileResponse
    my_profile: ProfileResponse
    context: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
