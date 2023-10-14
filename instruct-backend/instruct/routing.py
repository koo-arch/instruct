from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from records.routing import websoket_urlpatterns as records_urlpatterns
from timetable.routing import websoket_urlpatterns as timetable_urlpatterns

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket": AllowedHostsOriginValidator(
            AuthMiddlewareStack(URLRouter(records_urlpatterns + timetable_urlpatterns))
        ),
    }
)
