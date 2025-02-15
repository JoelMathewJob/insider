import asyncio
import threading
from fastapi import FastAPI
from routers import ws_router
from kafka_consumer import run_kafka_consumer

app = FastAPI(title="Threat Detection Backend with Kafka")

# Include the websocket router for realtime alerts.
app.include_router(ws_router.router, prefix="/ws", tags=["Alerts"])

@app.on_event("startup")
async def startup_event():
    # Capture the main event loop.
    loop = asyncio.get_event_loop()
    # Start the Kafka consumer in a background thread, passing the main loop.
    thread = threading.Thread(target=run_kafka_consumer, args=(loop,), daemon=True)
    thread.start()

# (Additional routes such as admin endpoints can be added here.)
