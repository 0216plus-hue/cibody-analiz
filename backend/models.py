from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, nullable=True)

    hashed_password = Column(String, nullable=False)
    role = Column(String, default="therapist")  # "superadmin" veya "therapist"
    is_active = Column(Boolean, default=True)
    monthly_limit = Column(Integer, default=100)
    created_at = Column(DateTime, default=datetime.utcnow)

    patients = relationship("Patient", back_populates="owner")


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    name = Column(String, index=True)
    age = Column(Integer)
    weight = Column(Float)
    gender = Column(String)
    phone = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="patients")
    analyses = relationship("PostureAnalysis", back_populates="patient", cascade="all, delete-orphan")
    foot_analyses = relationship("FootAnalysis", back_populates="patient", cascade="all, delete-orphan")
    spine_analyses = relationship("SpineAnalysis", back_populates="patient", cascade="all, delete-orphan")


class PostureAnalysis(Base):
    __tablename__ = "posture_analyses"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))

    front_image_path = Column(String, nullable=True)
    back_image_path = Column(String, nullable=True)
    left_image_path = Column(String, nullable=True)
    right_image_path = Column(String, nullable=True)

    analysis_data = Column(Text, nullable=True)
    clinical_notes = Column(Text, nullable=True)
    ai_report_text = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship("Patient", back_populates="analyses")
    prescribed_exercises = relationship("PrescribedExercise", back_populates="analysis", cascade="all, delete-orphan")


class Exercise(Base):
    __tablename__ = "exercises"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    category = Column(String)
    description = Column(Text)
    video_url = Column(String)
    category_id = Column(Integer)
    image_path = Column(String)


class PrescribedExercise(Base):
    __tablename__ = "prescribed_exercises"

    id = Column(Integer, primary_key=True, index=True)
    posture_analysis_id = Column(Integer, ForeignKey("posture_analyses.id"))
    exercise_id = Column(Integer, ForeignKey("exercises.id"))
    
    sets = Column(String, default="3")
    reps = Column(String, default="12")
    
    exercise = relationship("Exercise")
    analysis = relationship("PostureAnalysis", back_populates="prescribed_exercises")



class FootAnalysis(Base):
    __tablename__ = "foot_analyses"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))

    original_pdf_path = Column(String, nullable=True)
    ai_report_text = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship("Patient", back_populates="foot_analyses")


class SpineAnalysis(Base):
    __tablename__ = "spine_analyses"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))

    back_image_path = Column(String, nullable=True)   # Arka (Koronal)
    side_image_path = Column(String, nullable=True)   # Yan (Sagital)

    coronal_data  = Column(Text, nullable=True)   # JSON: marker coords + deviations
    sagittal_data = Column(Text, nullable=True)   # JSON: angles (kyphosis, lordosis, FHP)
    ai_report_text = Column(Text, nullable=True)  # Gemini klinik raporu

    created_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship("Patient", back_populates="spine_analyses")


