from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.dependencies import get_db
import openai

router = APIRouter(prefix="/chat", tags=["Chat"])

openai.api_key = "YOUR_OPENAI_API_KEYsk-proj-AsGDuuqyeKnZdqX4_bpL6_PVERHCW0UEEWryPFD3LWWoTPfVgmHVvmFf7VnZu-xPh9wCTrV0FyT3BlbkFJd2BHozkBuFnIILiErmJ_-olu346E2LHFfetmFSHe2XvfIkAkDiPNGfHjxiWidTRSBcRJ9-VQcA"  # secure this in env in real usage

class ChatRequest(BaseModel):
    user_id: int
    message: str

@router.post("/")
def chat_with_bot(request: ChatRequest, db: Session = Depends(get_db)):
    user_id = request.user_id
    message = request.message

    # You can build context like this:
    # - Get user's expenses, groups, balances etc.
    # - Format it into a text chunk
    context = f"User ID: {user_id}\nExpenses: [mocked for demo]\nGroups: [mocked]"

    prompt = f"""You are a Splitwise assistant. Answer the following query using the context.
Context: {context}
Question: {message}
Answer:"""

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{ "role": "user", "content": prompt }],
        temperature=0.7,
        max_tokens=150
    )

    return {"response": response.choices[0].message["content"]}
