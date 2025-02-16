from fastapi import FastAPI, HTTPException
import requests
import imaplib
import email
from email.header import decode_header
import re
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# VirusTotal API Key (Replace with actual key)
VIRUSTOTAL_API_KEY = "af1f3f6b17232ad8d12562263702702f84747ec3f2104dceef256ba87d972c15"
VT_HEADERS = {"x-apikey": VIRUSTOTAL_API_KEY}

# Gmail Credentials (Replace with user's app password)
GMAIL_USER = "10.joel.youth@gmail.com"
GMAIL_PASS = "keav yfvp ejxh dtqc"

# Enable CORS for frontend
app.add_middleware( 
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Function to extract URLs from email body
def extract_urls(text):
    url_pattern = r"https?://[^\s]+"
    return re.findall(url_pattern, text)

# Function to fetch emails via IMAP
def fetch_emails():
    try:
        mail = imaplib.IMAP4_SSL("imap.gmail.com")
        mail.login(GMAIL_USER, GMAIL_PASS)
        mail.select("inbox")

        status, messages = mail.search(None, "ALL")
        email_ids = messages[0].split()[-5:]  # Fetch latest 5 emails

        email_data = []
        for e_id in email_ids:
            _, msg_data = mail.fetch(e_id, "(RFC822)")
            for response_part in msg_data:
                if isinstance(response_part, tuple):
                    msg = email.message_from_bytes(response_part[1])
                    subject, encoding = decode_header(msg["Subject"])[0]
                    if isinstance(subject, bytes):
                        subject = subject.decode(encoding or "utf-8")
                    sender = msg.get("From")

                    # Extract email body
                    body = ""
                    if msg.is_multipart():
                        for part in msg.walk():
                            content_type = part.get_content_type()
                            if content_type == "text/plain":
                                body = part.get_payload(decode=True).decode("utf-8", errors="ignore")
                    else:
                        body = msg.get_payload(decode=True).decode("utf-8", errors="ignore")

                    # Extract links
                    links = extract_urls(body)

                    email_data.append({"email": sender, "subject": subject, "links": links})

        mail.logout()
        return email_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Email Fetch Error: {str(e)}")


# Function to check a URL with VirusTotal
def check_url(url):
    vt_url = "https://www.virustotal.com/api/v3/urls"
    try:
        response = requests.post(vt_url, headers=VT_HEADERS, data={"url": url})
        response_data = response.json()

        scan_id = response_data.get("data", {}).get("id")
        if not scan_id:
            return {"url": url, "verdict": "Unknown"}

        # Fetch scan results
        report_url = f"https://www.virustotal.com/api/v3/analyses/{scan_id}"
        report_response = requests.get(report_url, headers=VT_HEADERS)
        report_data = report_response.json()

        malicious_count = report_data.get("data", {}).get("attributes", {}).get("stats", {}).get("malicious", 0)
        return {"url": url, "verdict": "Malicious" if malicious_count > 0 else "Safe"}

    except Exception as e:
        return {"url": url, "verdict": f"Error: {str(e)}"}


# API to fetch emails and check for malicious links
@app.get("/email-security/malicious-history")
def get_malicious_history():
    try:
        emails = fetch_emails()
        results = []

        for email_data in emails:
            scanned_links = [check_url(link) for link in email_data["links"]]

            threat_level = "low"
            if any(link["verdict"] == "Malicious" for link in scanned_links):
                threat_level = "high"

            results.append({
                "email": email_data["email"],
                "subject": email_data["subject"],
                "threat_level": threat_level,
                "malicious_links": scanned_links,
            })

        return {"malicious_emails": results}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


@app.get("/")
def home():
    return {"message": "VirusTotal Email Security API is running!"}
