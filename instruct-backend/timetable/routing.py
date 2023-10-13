from django.urls import re_path
from .consumers import TimetableConsumer

websoket_urlpatterns = [
    re_path(r"ws/timetable/current/", TimetableConsumer.as_asgi()),
]
