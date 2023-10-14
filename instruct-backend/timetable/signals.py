from django.db.models.signals import post_save
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import TimeTable
from .utils import set_current_school_period

channel_layer = get_channel_layer()

set_current_school_period()

@receiver(post_save, sender=TimeTable)
def send_timetable_update(sender, instance, **kwargs):
    # WebSocketにデータを送信
    data = { "school_period": instance.school_period }
    async_to_sync(channel_layer.group_send)(
        "timetable_group", 
        {
            "type": "send_timetable",
            "message": data,
        }
    )
