import json
from utils.gmail_utils import get_gmail_service, list_emails, get_email_details, extract_email_metadata
from services.virustotal import VirusTotalAnalyzer

# Load VirusTotal API key from .env
import os
from dotenv import load_dotenv
load_dotenv()
VIRUSTOTAL_API_KEY = os.getenv("VIRUSTOTAL_API_KEY")

# Initialize VirusTotal
vt_analyzer = VirusTotalAnalyzer(VIRUSTOTAL_API_KEY)

HISTORY_FILE = "data/history.json"

def save_history(history):
    """Save analysis history to JSON file"""
    with open(HISTORY_FILE, "w") as f:
        json.dump(history, f, indent=4)

def load_history():
    """Load analysis history from JSON file"""
    try:
        with open(HISTORY_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def analyze_emails():
    """Fetch and analyze emails for threats"""
    service = get_gmail_service()
    emails = list_emails(service)

    suspicious_emails = []
    
    for email_info in emails:
        email_details = get_email_details(service, email_info['id'])
        metadata = extract_email_metadata(email_details)

        email_suspicious = False
        analyzed_links = []
        analyzed_ips = []

        # Scan URLs
        for url in metadata['urls']:
            result = vt_analyzer.analyze_url(url)
            analyzed_links.append({url: result})
            if result['detected']:
                email_suspicious = True

        # Scan IPs
        for ip in metadata['ips']:
            result = vt_analyzer.analyze_ip(ip)
            analyzed_ips.append({ip: result})
            if result['detected']:
                email_suspicious = True

        # Store if malicious
        if email_suspicious:
            suspicious_email_record = {
                'links': analyzed_links,
                'ips': analyzed_ips,
                'headers': metadata['headers']
            }
            suspicious_emails.append(suspicious_email_record)

            history = load_history()
            history.append(suspicious_email_record)
            save_history(history)

    return suspicious_emails

def get_malicious_history():
    """Retrieve malicious history"""
    return load_history()
