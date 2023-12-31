from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions, generics, status
from rest_framework.response import Response
from django.http import HttpResponse
from datetime import datetime
from instruct.permissons import IsAdminUserOrReadOnly, IsAuthenticatedOrReadOnly
from .models import PatrolPlaces, PatrolRecord, CountUsersProps, CountUsersRecord
from .serializers import PatrolPlaceSerializer, PatrolRecordSerializer, CountUsersPropsSerializer, CountUsersRecordSerializer
from .filters import CountUsersRecordFilter
from timetable.utils import TimetableManager
import csv
import codecs



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

        timetable_manager = TimetableManager()

        # dataにschool_periodフィールドを追加
        current_school_period = timetable_manager.get_current_school_period()
        data = timetable_manager.add_data_to_Querydict(data, "school_period", current_school_period)

        # AM_or_PMフィールドを追加
        AM_or_PM = timetable_manager.judge_AM_or_PM() 
        processed_data = timetable_manager.add_data_to_Querydict(data, "AM_or_PM", AM_or_PM)

        serializer = self.get_serializer(data=processed_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PatrolStatusView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = PatrolRecordSerializer
    timetable_manager = TimetableManager()

    def get_queryset(self):
        now = datetime.now()
        AM_or_PM = self.timetable_manager.judge_AM_or_PM()
        # PatrolRecordモデルから条件に合致するレコードを検索
        queryset = PatrolRecord.objects.filter(
            published_date=now.date(),
            AM_or_PM=AM_or_PM
        )

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        current_AM_or_PM = self.timetable_manager.judge_AM_or_PM()
        current_patrol_record = self.timetable_manager.get_current_school_period()
        patrol_status = []
        places = PatrolPlaces.objects.filter(is_active=True)

        for place in places:
            # 条件に合致するレコードが存在する場合はTrue、存在しない場合はFalseを格納
            search_records = queryset.filter(place=place)
            is_completed = search_records.exists()
            
            is_need_twice = is_completed and current_AM_or_PM == "午後" and place.is_pm_rounds_twice

            # ２回目の巡回がある場合、レコードが2つ以上でTrue
            if is_need_twice:
                school_period = search_records[0].school_period
                is_completed = len(search_records) > 1 or current_patrol_record <= school_period
                                                                # 登録した時限中はTrueにする
                
            patrol_status.append({
                "id": place.pk,
                "place": place.name, 
                "is_completed": is_completed
            })

        return Response(patrol_status, status=status.HTTP_200_OK)



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

    def post(self, request, *args, **kwargs):
        data = request.data
        timetable_manager = TimetableManager()
        current_school_period = timetable_manager.get_current_school_period()
        processed_data = timetable_manager.add_data_to_Querydict(data, "school_period", current_school_period)

        serializer = self.get_serializer(data=processed_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



class CountUsersStatusView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = PatrolRecordSerializer

    def get_queryset(self):
        today = datetime.now().date()
        timetable_manager = TimetableManager()
        current_school_period = timetable_manager.get_current_school_period()

        queryset = CountUsersRecord.objects.filter(
            published_date=today,
            school_period=current_school_period
        )
        return queryset
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        count_users_status = []
        props_list = CountUsersProps.objects.filter(is_active=True)

        # 巡回が完了している場所はTrueを格納
        for props in props_list:
            is_completed = queryset.filter(props=props).exists()

            count_users_status.append({
                "id": props.pk,
                "place": props.place + props.room_type,
                "is_completed": is_completed
            })

        return Response(count_users_status, status=status.HTTP_200_OK)


class CountUsersRecordDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = CountUsersRecord.objects.all()
    serializer_class = CountUsersRecordSerializer


class ExportCountUsersDataView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = CountUsersRecord.objects.all()
    serializer_class = CountUsersRecordSerializer

    def list(self, request, *args, **kwargs):
        data = self.get_queryset()

        # HTTPレスポンスを作成し、CSVファイルとして返す
        response = HttpResponse(content_type='text/csv; charset=utf-8')
        response.write(codecs.BOM_UTF8)  # UTF-8のBOM（バイト順マーク）を追加（日本語表示に必要）

        # CSVライターを作成し、ヘッダーレコードを書き込む
        writer = csv.writer(response, delimiter=',', quotechar='"')
        writer.writerow(['id', '日付', '時限', '場所', '部屋タイプ',
                         '座席数', '大学PC利用人数', '私物PC利用人数'])

        # データベースから取得したレコードをCSVファイルに書き込む
        for row in data:
            props = row.props  # ネストされたフィールドにアクセス

            writer.writerow([
                row.id,
                row.published_date,
                row.school_period,
                props.place,
                props.room_type,
                props.seats_num,
                row.univ_users_num,
                row.own_users_num,
            ])

        return response