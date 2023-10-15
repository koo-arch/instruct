from django.urls import path
from .views import (AllPatrolPlaceListView, ActivePatrolPlaceListView, PatrolPlaceDetailView, 
                    PatrolRecordListView, PatrolRecordDetailView, PatrolStatusView,
                    AllCountUsersPropsListView, ActiveCountUsersPropsListView, CountUsersPropsDetailView,
                    CountUsersRecordListView, CountUsersRecordDetailView, CountUsersStatusView, ExportCountUsersDataView)

urlpatterns = [
    path("patrol/places/", AllPatrolPlaceListView.as_view()),
    path("patrol/places/active/", ActivePatrolPlaceListView.as_view()),
    path("patrol/places/<int:pk>/", PatrolPlaceDetailView.as_view()),

    path("patrol/record/", PatrolRecordListView.as_view()),
    path("patrol/record/<int:pk>/", PatrolRecordDetailView.as_view()),
    path("patrol/status/", PatrolStatusView.as_view()),

    path("count/users/props/", AllCountUsersPropsListView.as_view()),
    path("count/users/props/active/", ActiveCountUsersPropsListView.as_view()),
    path("count/users/props/<int:pk>/", CountUsersPropsDetailView.as_view()),
    
    path("count/users/record/", CountUsersRecordListView.as_view()),
    path("count/users/record/<int:pk>/", CountUsersRecordDetailView.as_view()),
    path("count/users/status/", CountUsersStatusView.as_view()),
    path("count/users/export/csv/", ExportCountUsersDataView.as_view()),
]
