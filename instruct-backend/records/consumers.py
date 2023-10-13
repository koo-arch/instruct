import json
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from.utils import StatusManager

class PatrolStatusConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

        self.group_name = 'patrol_status_group'

        await self.channel_layer.group_add(self.group_name, self.channel_name)


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)
        await self.close()


    async def get_patrol_status(self):
        status_manager = StatusManager()
        patrol_status = await status_manager.get_patrol_status()
        return patrol_status


    async def receive(self, text_data):
        if text_data == 'get_patrol_status':
            patrol_status = await self.get_patrol_status()
            await self.send(text_data=json.dumps(patrol_status))
    

    async def send_data(self, event):
        data_to_send = event['message']
        # データをクライアントに送信
        await self.send(text_data=json.dumps(data_to_send))



class CountUsersStatusConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

        self.group_name = 'count_users_status_group'

        await self.channel_layer.group_add(self.group_name, self.channel_name)


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)
        await self.close()

    
    async def get_count_users_status(self):
        status_manager = StatusManager()
        count_users_status = await status_manager.get_count_users_status()
        return count_users_status


    
    async def receive(self, text_data):
        if text_data == 'get_count_users_status':
            count_users_status = await self.get_count_users_status()
            await self.send(text_data=json.dumps(count_users_status))


    async def send_data(self, event):
        data_to_send = event['data']
        # データをクライアントに送信
        await self.send(text_data=json.dumps(data_to_send))
