import base64
from kafka import KafkaConsumer
import scapy.all as scapy
import asyncio
from utils.packet_processor import process_and_classify
from routers.ws_router import manager

def run_kafka_consumer(loop):
    consumer = KafkaConsumer(
        'packets',
        bootstrap_servers=['localhost:9092'],
        auto_offset_reset='earliest',
        group_id='fastapi-consumer-group'
    )

    print("Kafka consumer started...")
    for msg in consumer:
        try:
            # Decode the message (base64-encoded string).
            encoded_data = msg.value.decode('utf-8')
            raw_bytes = base64.b64decode(encoded_data)
            # Reconstruct the full packet using scapy.
            packet = scapy.Ether(raw_bytes)
            prediction = process_and_classify(packet)
            if prediction == 1:
                # Schedule the alert broadcast on the main event loop.
                asyncio.run_coroutine_threadsafe(manager.broadcast("Threat detected!"), loop)
        except Exception as e:
            print("Error processing Kafka message:", e)
