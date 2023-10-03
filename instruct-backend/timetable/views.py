from django.shortcuts import get_object_or_404
from rest_framework import permissions, generics, status
from datetime import datetime
from rest_framework.response import Response
from instruct.permissons import IsAdminUserOrReadOnly
from .models import TimeTable
from .serializers import TimeTableSerializer
from .utils import get_current_school_period



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
        
        current_school_period = get_current_school_period()
        school_period = {"school_period": current_school_period}
        
        return Response(school_period, status=status.HTTP_200_OK)
