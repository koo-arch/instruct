from django.urls import path
from .views import TimeTableListView, TimeTableDetailView, CurrentTimeTableView


urlpatterns = [
    path("timetable/", TimeTableListView.as_view()),
    path("timetable/<int:pk>/", TimeTableDetailView.as_view()),
    path("timetable/current/", CurrentTimeTableView.as_view()),
]