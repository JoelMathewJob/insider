from fastapi import APIRouter, HTTPException
from services.email_analyzer import analyze_emails, get_malicious_history

router = APIRouter()

@router.get("/scan-emails", tags=["Email Security"])
async def scan_emails():
    """
    Fetch and analyze emails for threats (phishing, malicious links, etc.)
    """
    try:
        result = analyze_emails()
        return {"message": "Email scan completed", "details": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/malicious-history", tags=["Email Security"])
async def malicious_history():
    """
    Retrieve past detected malicious emails
    """
    try:
        history = get_malicious_history()
        return {"malicious_emails": history}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
