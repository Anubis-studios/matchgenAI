from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, Text, ForeignKey, Enum, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum

class SubscriptionTier(str, enum.Enum):
    FREE = "free"
    PRO = "pro"
    ORACLE = "oracle"
    ULTRA = "ultra"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    first_name = Column(String(100))
    last_name = Column(String(100))
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    subscription_tier = Column(Enum(SubscriptionTier), default=SubscriptionTier.FREE)
    credits = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    profile = relationship("Profile", back_populates="user", uselist=False)
    matches = relationship("Match", foreign_keys="Match.user_id", back_populates="user")
    sent_messages = relationship("Message", foreign_keys="Message.sender_id", back_populates="sender")

class Profile(Base):
    __tablename__ = "profiles"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    bio = Column(Text)
    age = Column(Integer)
    gender = Column(String(20))
    location = Column(String(255))
    latitude = Column(Float)
    longitude = Column(Float)
    interests = Column(JSON, default=list)
    photos = Column(JSON, default=list)
    ai_generated_bio = Column(Text)
    voice_intro_url = Column(String(500))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    user = relationship("User", back_populates="profile")

class Match(Base):
    __tablename__ = "matches"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    matched_user_id = Column(Integer, ForeignKey("users.id"))
    match_score = Column(Float)
    ai_compatibility = Column(Float)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    user = relationship("User", foreign_keys=[user_id], back_populates="matches")

class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True, index=True)
    match_id = Column(Integer, ForeignKey("matches.id"))
    sender_id = Column(Integer, ForeignKey("users.id"))
    content = Column(Text)
    is_ai_starter = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    sender = relationship("User", foreign_keys=[sender_id], back_populates="sent_messages")

class Story(Base):
    __tablename__ = "stories"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    media_url = Column(String(500), nullable=False)
    media_type = Column(String(20), default="image")
    caption = Column(String(500))
    expires_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    location = Column(String(255))
    latitude = Column(Float)
    longitude = Column(Float)
    event_date = Column(DateTime(timezone=True))
    max_attendees = Column(Integer)
    attendees = Column(JSON, default=list)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Gift(Base):
    __tablename__ = "gifts"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(String(500))
    icon = Column(String(50), default="heart")
    price = Column(Integer, default=10)
    is_active = Column(Boolean, default=True)

class GiftTransaction(Base):
    __tablename__ = "gift_transactions"
    id = Column(Integer, primary_key=True, index=True)
    gift_id = Column(Integer, ForeignKey("gifts.id"))
    sender_id = Column(Integer, ForeignKey("users.id"))
    recipient_id = Column(Integer, ForeignKey("users.id"))
    message = Column(String(500))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class VoiceNote(Base):
    __tablename__ = "voice_notes"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    audio_url = Column(String(500), nullable=False)
    duration_seconds = Column(Integer)
    transcript = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
