from celery import shared_task
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .utils import TimetableManageer, Timetable400Exception
from records.utils import StatusManager

# 前回の学校の時間割を保持するための変数
pre_school_period = 0


@shared_task
def check_school_period():
    global pre_school_period
    # 現在の時刻を取得
    timetable_manager = TimetableManageer()
    try:
        # 現在の学校の時間割を取得しようとするが、エラーが発生する可能性がある
        current_school_period = timetable_manager.get_current_school_period()
    except Timetable400Exception:
        # エラーが発生した場合、前回の学校の時間割を使用
        current_school_period = pre_school_period
        pre_school_period = 0

    # 前回の学校の時間割と現在の学校の時間割を比較
    if pre_school_period < current_school_period:
        channel_layer = get_channel_layer()

        status_manager = StatusManager()
        patrol_status_data = status_manager.get_patrol_status()
        count_users_status_data = status_manager.get_count_users_status()
        school_period_data = {"school_period": current_school_period}

        # Channelsを使用してクライアントに学校の時間割の変更を通知
        async_to_sync(channel_layer.group_send)(
            "timetable_group",
            {
                "type": "send_timetable",
                "message": school_period_data,
            }
        )

        async_to_sync(channel_layer.group_send)(
            "patrol_status_group",
            {
                "type": "send_data",
                "message": patrol_status_data,
            }
        )

        async_to_sync(channel_layer.group_send)(
            "count_users_status_group",
            {
                "type": "send_data",
                "message": count_users_status_data,
            }
        )

        pre_school_period = current_school_period

    # 前回と今回で時限数だけの差がある時、授業時間外であることを通知
    if current_school_period - pre_school_period == current_school_period:
        channel_layer = get_channel_layer()
        school_period_data = {"detail": "授業時間外です"}
        # Channelsを使用してクライアントに授業時間外であることを通知
        async_to_sync(channel_layer.group_send)(
            "timetable_group",
            {
                "type": "send_timetable",
                "message": school_period_data,
            }
        )
        # 前回の時間割をリセット（これ以降は時間外でも翌1限まで通知しない）
        pre_school_period = 0

    # 現在の学校の時間割と前回の学校の時間割を返す
    return current_school_period, pre_school_period
