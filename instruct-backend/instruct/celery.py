from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# Djangoの設定をCeleryにロード
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'instruct.settings')

app = Celery('instruct')

# デフォルトの設定を読み込む
app.config_from_object('django.conf:settings', namespace='CELERY')

broker_connection_retry_on_startup = True

# タスクモジュールを自動的に見つける
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))
