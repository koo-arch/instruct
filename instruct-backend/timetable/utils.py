from django.http import QueryDict
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Max, Min
from .models import TimeTable
from datetime import datetime, time

class SchoolPeriodManager:
    def __init__(self):
        self.queryset = TimeTable.objects.all()
  
    def get_current_school_period(self):
        queryset = self.queryset
        current_time = datetime.now().time()

        current_timetable = get_object_or_404(
            queryset,
            start_time__lte=current_time,
            end_time__gt=current_time)
        
        if current_timetable:
            school_period = current_timetable.school_period
            return school_period
        else:
            return Response({"error": "授業時間外です。"}, status=status.HTTP_400_BAD_REQUEST)

    def judge_AM_or_PM(self):
        queryset = self.queryset
        current_time = datetime.now().time()

        min_school_period = queryset.aggregate(min_school_period=Min('school_period'))['min_school_period']
        max_school_period = queryset.aggregate(max_school_period=Max('school_period'))['max_school_period']


        start_school = queryset.filter(school_period=min_school_period)[0].start_time
        end_school = queryset.filter(school_period=max_school_period)[0].end_time
        noon = time(12, 0, 0)

        if start_school <= current_time < noon:
            AM_or_PM = "午前"
        elif noon <= current_time < end_school:
            AM_or_PM = "午後"
        else:
            return Response({"error": "授業時間外です。"}, status=status.HTTP_400_BAD_REQUEST)
        
        return AM_or_PM
        
    def add_data_to_Querydict(self, data, key, value):
        processed_data = dict(data)  # QueryDictを辞書に変換
        processed_data[key] = value
        processed_querydict = QueryDict('', mutable=True)
        processed_querydict.update(processed_data)  # 辞書をQueryDictに変換

        return processed_querydict