from asgiref.sync import sync_to_async
from timetable.utils import TimetableManageer, Timetable400Exception
from .models import PatrolRecord, PatrolPlaces, CountUsersRecord, CountUsersProps
from datetime import datetime

class StatusManager:
    @sync_to_async
    def get_patrol_status(self):
        timetable_manager = TimetableManageer()
        try:
            current_AM_or_PM = timetable_manager.judge_AM_or_PM()
            current_school_period = timetable_manager.get_current_school_period()
        except Timetable400Exception as e:
            error_message = {"detail": str(e)}
            return error_message

        today = datetime.now().date()
        queryset = PatrolRecord.objects.filter(
            published_date=today,
            AM_or_PM=current_AM_or_PM
        )

        patrol_status = []
        places = PatrolPlaces.objects.filter(is_active=True)

        for place in places:
            search_records = queryset.filter(place=place)
            is_completed = search_records.exists()

            is_need_twice = is_completed and current_AM_or_PM == "午後" and place.is_pm_rounds_twice

            if is_need_twice:
                school_period = search_records[0].school_period
                is_completed = len(
                    search_records) > 1 or current_school_period <= school_period

            patrol_status.append({
                "id": place.pk,
                "place": place.name,
                "is_completed": is_completed
            })

        return patrol_status

    @sync_to_async
    def get_count_users_status(self):
        timetable_manager = TimetableManageer()
        try:
            current_school_period = timetable_manager.get_current_school_period()
        except Timetable400Exception as e:
            error_message = {"detail": str(e)}
            return error_message

        today = datetime.now().date()
        queryset = CountUsersRecord.objects.filter(
            published_date=today,
            school_period=current_school_period
        )

        count_users_status = []
        props_list = CountUsersProps.objects.filter(is_active=True)

        for props in props_list:
            is_completed = queryset.filter(props=props).exists()

            count_users_status.append({
                "id": props.pk,
                "place": props.place + props.room_type,
                "is_completed": is_completed
            })

        return count_users_status
