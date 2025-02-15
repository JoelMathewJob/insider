from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

# Global instance for managing WebSocket connections.
manager = ConnectionManager()

@router.websocket("/")
async def websocket_endpoint(websocket: WebSocket):
    """
    WebSocket endpoint for receiving realtime threat alerts.
    Clients (e.g. the admin frontend) should connect here.
    """
    await manager.connect(websocket)
    try:
        while True:
            # Optionally, receive messages from the client.
            data = await websocket.receive_text()
            await websocket.send_text(f"Received: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
