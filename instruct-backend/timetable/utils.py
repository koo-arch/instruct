from django.shortcuts import get_object_or_404
from .models import TimeTable
from datetime import datetime


def get_current_school_period():
    queryset = TimeTable.objects.all()
    current_time = datetime.now().time()

    current_timetable = get_object_or_404(
        queryset,
        start_time__lte=current_time,
        end_time__gt=current_time)
    
    school_period = current_timetable.school_period

    return school_period