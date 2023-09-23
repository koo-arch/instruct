from django.http import QueryDict
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions, generics, status
from rest_framework.response import Response
from datetime import datetime, time
from instruct.permissons import IsAdminUserOrReadOnly, IsAuthenticatedOrReadOnly
from .models import PatrolPlaces, PatrolRecord, CountUsersProps, CountUsersRecord
from .serializers import PatrolPlaceSerializer, PatrolRecordSerializer, CountUsersPropsSerializer, CountUsersRecordSerializer
from .filters import CountUsersRecordFilter



class AllPatrolPlaceListView(generics.ListCreateAPIView):
    permission_classes = (IsAdminUserOrReadOnly,)
    queryset = PatrolPlaces.objects.all()
    serializer_class = PatrolPlaceSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ActivePatrolPlaceListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = PatrolPlaces.objects.all()
    serializer_class = PatrolPlaceSerializer

    def get_queryset(self):
        return PatrolPlaces.objects.filter(is_active=True)


class PatrolPlaceDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAdminUserOrReadOnly,)
    queryset = PatrolPlaces.objects.all()
    serializer_class = PatrolPlaceSerializer



class PatrolRecordListView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = PatrolRecord.objects.all()
    serializer_class = PatrolRecordSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        processed_data = self.process_data(data)

        if not processed_data:
            return Response({"error": "授業時間外です。"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=processed_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def process_data(self, data):
        """
        現在時刻から午前、午後を判定したデータを追加
        """
        AM_or_PM = ""
        current_time = datetime.now().time()
        AM_start, AM_end = time(9, 0, 0), time(12, 0, 0)
        PM_start, PM_end = time(12, 0, 0), time(18, 0, 0)

        if AM_start <= current_time < AM_end:
            AM_or_PM = "午前"
        elif PM_start <= current_time < PM_end:
            AM_or_PM = "午後"
        else:
            return None

        processed_data = dict(data)  # QueryDictを辞書に変換
        processed_data["AM_or_PM"] = AM_or_PM
        processed_querydict = QueryDict('', mutable=True)
        processed_querydict.update(processed_data)  # 辞書をQueryDictに変換

        return processed_querydict


class CurrentPatrolRecordView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = PatrolRecord.objects.all()
    serializer_class = PatrolRecordSerializer

    def get_queryset(self):
        now = datetime.now()
        current_time = now.time()

        if current_time.hour < 12:
            queryset = PatrolRecord.objects.filter(published_date=now.date(), AM_or_PM="午前")
        else:
            queryset = PatrolRecord.objects.filter(published_date=now.date(), AM_or_PM="午後")

        return queryset


class PatrolRecordDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = PatrolRecord.objects.all()
    serializer_class = PatrolRecordSerializer



class AllCountUsersPropsListView(generics.ListCreateAPIView):
    permission_classes = (IsAdminUserOrReadOnly,)
    queryset = CountUsersProps.objects.all()
    serializer_class = CountUsersPropsSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ActiveCountUsersPropsListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = CountUsersProps.objects.all()
    serializer_class = CountUsersPropsSerializer

    def get_queryset(self):
        return CountUsersProps.objects.filter(is_active=True)


class CountUsersPropsDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAdminUserOrReadOnly,)
    queryset = CountUsersProps.objects.all()
    serializer_class = CountUsersPropsSerializer



class CountUsersRecordListView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = CountUsersRecord.objects.all()
    filter_backends = [DjangoFilterBackend]
    serializer_class = CountUsersRecordSerializer
    filterset_class = CountUsersRecordFilter


class CountUsersRecordDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = CountUsersRecord.objects.all()
    serializer_class = CountUsersRecordSerializer
