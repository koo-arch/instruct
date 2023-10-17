from celery import shared_task
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .utils import TimetableManager, Timetable400Exception
from records.utils import StatusManager

# 前回の学校の時間割を保持するための変数
pre_school_period = 0


@shared_task
def check_school_period():
    global pre_school_period

    timetable_manager = TimetableManager()
    try:
        # 現在の時限を取得
        current_school_period = timetable_manager.get_current_school_period()
    except Timetable400Exception:
        # 授業時間外の場合は0
        current_school_period = 0


    diff_period = current_school_period - pre_school_period

    # 現在と前回の時限の差が正の時、時限の変更を送信
    if diff_period > 0:
        channel_layer = get_channel_layer()

        # 送信するデータをセット
        status_manager = StatusManager()
        patrol_status_data = status_manager.get_patrol_status()
        count_users_status_data = status_manager.get_count_users_status()
        school_period_data = {"school_period": current_school_period}

        # Channelsを使用してフロント側に時限の変更を通知
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


    # 差が負の時、授業時間外を通知（一度通知したら翌1限まで通知しない）
    if diff_period < 0:
        
        channel_layer = get_channel_layer()
        school_period_data = {"detail": "授業時間外です"}

        async_to_sync(channel_layer.group_send)(
            "timetable_group",
            {
                "type": "send_timetable",
                "message": school_period_data,
            }
        )
    
    # 前回の時限を更新
    pre_school_period = current_school_period


    return current_school_period, pre_school_period
