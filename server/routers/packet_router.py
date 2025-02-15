import base64
import scapy.all as scapy
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils.packet_processor import process_and_classify

router = APIRouter()

class PacketData(BaseModel):
    packet_data: str  # base64 encoded packet bytes

@router.post("/ingest")
async def ingest_packet(data: PacketData):
    """
    Receives a base64 encoded packet from the employee PC,
    decodes it, reconstructs the scapy packet, processes it
    using the model, and broadcasts an alert if a threat is detected.
    """
    try:
        raw_bytes = base64.b64decode(data.packet_data)
        # Use Ether() to reconstruct the full packet
        packet = scapy.Ether(raw_bytes)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid packet data")

    prediction = process_and_classify(packet)

    # If a threat is detected, broadcast an alert
    # (We import the manager from ws_router to send realtime alerts)
    from routers.ws_router import manager
    if prediction == 1:
        await manager.broadcast("Threat detected!")

    return {"prediction": prediction}
