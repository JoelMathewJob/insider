import pickle
import pandas as pd
import scapy.all as scapy
import re
from datetime import datetime

# --- Global Counters ---
prediction_summary = {0: 0, 1: 0}
global_multiple_login_counter = 0  # Counts packets with multiple login attempts

def extract_http_fields(raw_payload):
    text = raw_payload.decode(errors='ignore')
    method, url, host, user_agent = None, None, None, None
    request_line_match = re.search(r"^(GET|POST|PUT|DELETE|OPTIONS|HEAD)\s+(\S+)\s+HTTP", text)
    if request_line_match:
        method = request_line_match.group(1)
        url = request_line_match.group(2)
    host_match = re.search(r"Host:\s*([^\r\n]+)", text)
    if host_match:
        host = host_match.group(1)
    user_agent_match = re.search(r"User-Agent:\s*([^\r\n]+)", text)
    if user_agent_match:
        user_agent = user_agent_match.group(1)
    return method, url, host, user_agent

def extract_packet_info(packet):
    packet_info = {
        "Timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "Packet Length": len(packet),
        "Source IP": packet[scapy.IP].src if packet.haslayer(scapy.IP) else None,
        "Destination IP": packet[scapy.IP].dst if packet.haslayer(scapy.IP) else None,
        "Protocol": packet[scapy.IP].proto if packet.haslayer(scapy.IP) else None,
        "IP Flags": packet[scapy.IP].flags if packet.haslayer(scapy.IP) else None,
        "Source Port": packet.sport if packet.haslayer(scapy.TCP) or packet.haslayer(scapy.UDP) else None,
        "Destination Port": packet.dport if packet.haslayer(scapy.TCP) or packet.haslayer(scapy.UDP) else None,
        "TCP Flags": packet[scapy.TCP].flags if packet.haslayer(scapy.TCP) else None,
        "Host (HTTP)": None,
        "User-Agent (HTTP)": None,
        "Request Method (HTTP)": None,
        "URL": None,
        "DNS Queries": packet[scapy.DNS].qd.qname.decode() if packet.haslayer(scapy.DNS) and packet[scapy.DNS].qd else None,
        # Feature flags: mark as 1 if condition is met, else 0.
        "FTP Detected": 1 if packet.haslayer(scapy.TCP) and (packet.sport == 21 or packet.dport == 21) else 0,
        "Protocol Mismatch": 1 if packet.haslayer(scapy.TCP) and packet.haslayer(scapy.UDP) else 0,
        "Multiple Login Attempts": 1 if packet.haslayer(scapy.Raw) and b"login" in packet[scapy.Raw].load.lower() else 0,
    }
    
    if packet.haslayer(scapy.Raw):
        try:
            raw_data = packet[scapy.Raw].load
            method, url, host, user_agent = extract_http_fields(raw_data)
            packet_info["Request Method (HTTP)"] = method
            packet_info["URL"] = url
            packet_info["Host (HTTP)"] = host
            packet_info["User-Agent (HTTP)"] = user_agent
        except Exception as e:
            print("Error parsing HTTP fields:", e)
    
    return packet_info

# Load the trained model pipeline (ensure the file exists in your working directory).
with open("F:\\HackIIT\\theproject\\insider\\server\\models\\xgboost_modelanuj1.pkl", "rb") as f:
    model_pipeline = pickle.load(f)

# The candidate features expected by the model.
candidate_features = ["FTP Detected", "Protocol Mismatch", "Multiple Login Attempts"]

def process_and_classify(packet):
    """
    Extracts features from a scapy packet and applies the model logic.
    Overrides the model if the number of multiple login attempts exceeds a threshold.
    Returns:
      - pred: 0 for non-threat, 1 for threat.
    """
    global global_multiple_login_counter, prediction_summary
    info = extract_packet_info(packet)
    candidate = {feat: info.get(feat, 0) for feat in candidate_features}
    for feat in candidate_features:
        candidate[feat] = 1 if candidate[feat] else 0
    
    if candidate["Multiple Login Attempts"] == 1:
        global_multiple_login_counter += 1
    
    # Override prediction if multiple login attempts exceed the threshold.
    if global_multiple_login_counter >= 4:
        pred = 1
    else:
        df_candidate = pd.DataFrame([candidate], columns=candidate_features)
        pred = model_pipeline.predict(df_candidate)[0]
    
    prediction_summary[pred] += 1
    src_ip = info.get("Source IP", "unknown")
    dst_ip = info.get("Destination IP", "unknown")
    print(f"[{info['Timestamp']}] Packet from {src_ip} to {dst_ip} predicted as: {pred}")
    return pred
