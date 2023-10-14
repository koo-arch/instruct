import json
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import TimeTable
from .utils import TimetableManager, Timetable400Exception
from datetime import datetime


class TimetableConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

        self.group_name = 'timetable_group'

        await self.channel_layer.group_add(self.group_name, self.channel_name)


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

        await self.close()


    @sync_to_async
    def get_current_timetable(self):
        timetable_manager = TimetableManager()
        try:
            current_school_period = timetable_manager.get_current_school_period()
        except Timetable400Exception as e:
            error_message = {"detail": str(e)}
            return error_message
        school_period = {"school_period": current_school_period}

        return school_period
    

    async def receive(self, text_data):
        if text_data == 'get_current_timetable':
            current_timetable = await self.get_current_timetable()
            await self.send(text_data=json.dumps(current_timetable))
    
    async def send_timetable(self, event):
        # WebSocketを通じてデータをクライアントに送信
        message = event['message']
        await self.send(json.dumps(message))
