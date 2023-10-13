from django.urls import re_path
from .consumers import PatrolStatusConsumer, CountUsersStatusConsumer

websoket_urlpatterns = [
    re_path(r"ws/patrol/status/", PatrolStatusConsumer.as_asgi()),
    re_path(r"ws/count/users/status/", CountUsersStatusConsumer.as_asgi()),
]