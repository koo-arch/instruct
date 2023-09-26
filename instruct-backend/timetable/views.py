from django.shortcuts import get_object_or_404
from rest_framework import permissions, generics, status
from datetime import datetime
from rest_framework.response import Response
from instruct.permissons import IsAdminUserOrReadOnly
from .models import TimeTable
from .serializers import TimeTableSerializer



class TimeTableListView(generics.ListCreateAPIView):
    permission_classes = (IsAdminUserOrReadOnly,)
    queryset = TimeTable.objects.all()
    serializer_class = TimeTableSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class TimeTableDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAdminUserOrReadOnly,)
    queryset = TimeTable.objects.all()
    serializer_class = TimeTableSerializer


class CurrentTimeTableView(generics.RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = TimeTable.objects.all()
    serializer_class = TimeTableSerializer

    def retrieve(self, request, *args, **kwargs):

        queryset = self.queryset
        current_time = datetime.now().time()
        current_timetable = get_object_or_404(queryset, start_time__lte=current_time, end_time__gt=current_time)

        serializer = self.get_serializer(current_timetable)
        return Response(serializer.data)
