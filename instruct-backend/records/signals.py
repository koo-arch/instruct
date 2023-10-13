from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import PatrolRecord, CountUsersRecord
from .utils import StatusManager

channel_layer = get_channel_layer()


@receiver([post_save, post_delete], sender=PatrolRecord)
def send_patrol_status(sender, instance, **kwargs):
    status_manager = StatusManager()
    data_to_send = status_manager.get_patrol_status()

    async_to_sync(channel_layer.group_send)(
        "patrol_status_group",
        {
            "type": "send_data",
            "message": data_to_send,
        },
    )


@receiver([post_save, post_delete], sender=CountUsersRecord)
def send_count_users_status(sender, instance, **kwargs):
    status_manager = StatusManager()
    data_to_send = status_manager.get_count_users_status()

    async_to_sync(channel_layer.group_send)(
        "count_users_status_group",
        {
            "type": "send_data",
            "message": data_to_send
        },
    )
