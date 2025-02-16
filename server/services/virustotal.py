import requests
import os

class VirusTotalAnalyzer:
    def __init__(self, api_key):
        self.api_key = api_key
        self.headers = {"x-apikey": api_key}

    def analyze_url(self, url):
        url_id = url.encode('utf-8').hex()
        response = requests.get(f"https://www.virustotal.com/api/v3/urls/{url_id}", headers=self.headers)
        return response.json()

    def analyze_ip(self, ip):
        response = requests.get(f"https://www.virustotal.com/api/v3/ip_addresses/{ip}", headers=self.headers)
        return response.json()
