"""
ASGI config for instruct project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "instruct.settings")
django.setup()
from channels.routing import get_default_application
import records.routing
import timetable.routing
from .celery import app as celery_app

application = get_default_application()

__all__ = ("celery_app",)