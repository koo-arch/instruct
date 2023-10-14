from __future__ import absolute_import, unicode_literals

# Celeryの設定を読み込んで初期化
from .celery import app as celery_app

__all__ = ('celery_app',)
