import base64
from kafka import KafkaProducer
import scapy.all as scapy

# Set up the Kafka producer (update bootstrap_servers with your broker's IP and port).
producer = KafkaProducer(bootstrap_servers=['localhost:9092'])
topic = "packets"

def send_packet(packet):
    """
    Encodes a packet to a base64 string and sends it to the Kafka topic.
    """
    try:
        raw_bytes = bytes(packet)
        encoded = base64.b64encode(raw_bytes).decode('utf-8')
        producer.send(topic, value=encoded.encode('utf-8'))
        producer.flush()
        print("Packet sent to Kafka")
    except Exception as e:
        print("Error sending packet:", e)

def sniff_and_stream():
    """
    Sniffs packets in realtime and sends each to Kafka.
    """
    print("Starting packet sniffing and streaming to Kafka...")
    scapy.sniff(prn=send_packet, store=False)

if __name__ == "__main__":
    sniff_and_stream()
