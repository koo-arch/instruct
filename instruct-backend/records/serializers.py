from rest_framework import serializers
from .models import PatrolPlaces, PatrolRecord, CountUsersProps, CountUsersRecord
from datetime import date
from timetable.utils import TimetableManageer


class PatrolPlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatrolPlaces
        fields = "__all__"



class PatrolRecordSerializer(serializers.ModelSerializer):
    place = serializers.PrimaryKeyRelatedField(queryset=PatrolPlaces.objects.all())
    published_date=serializers.DateField(read_only=True)
    published_time=serializers.TimeField(read_only=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = PatrolRecord
        fields ="__all__"

    def to_representation(self, instance):
        # GETリクエスト時には関連オブジェクトをネスト
        representation = super().to_representation(instance)
        representation['place'] = PatrolPlaceSerializer(instance.place).data
        return representation
    
    def validate(self, data):
        place = data.get("place")
        
        # ネストされたPatrolPlacesのデータの取得
        place_id = place.id
        is_active = place.is_active
        is_pm_rounds_twice = place.is_pm_rounds_twice
        
        # 指定された場所がアクティブであるか
        if not is_active:
            raise serializers.ValidationError({"detail" : "指定された巡回場所は現在対象ではありません。"})
        

        AM_or_PM = data.get("AM_or_PM")

        # 送信された場所、日付、午前午後が同じレコードを取得
        record = PatrolRecord.objects.filter(place=place_id, published_date=date.today(), AM_or_PM=AM_or_PM)

        # 巡回が完了しているか
        is_pm_twice_completed = AM_or_PM != "午後" or not is_pm_rounds_twice or len(record) > 1

        # レコードが存在し、さらに巡回が完了している場合にエラーを発生させる
        if record.exists() and is_pm_twice_completed:
            raise serializers.ValidationError({"place": "この場所はすでに記録済みです。"})
        return data



class CountUsersPropsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountUsersProps
        fields = "__all__"



class CountUsersRecordSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    props = serializers.PrimaryKeyRelatedField(queryset=CountUsersProps.objects.all())
    published_date = serializers.DateField(read_only=True)
    published_time = serializers.TimeField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    class Meta:
        model = CountUsersRecord
        fields = "__all__"
    
    def to_representation(self, instance):
        # GETリクエスト時には関連オブジェクトをネスト
        representation = super().to_representation(instance)
        representation['props'] = CountUsersPropsSerializer(instance.props).data
        return representation

    def validate(self, data):
        props = data.get("props")

        props_id = props.id
        seats_num = props.seats_num
        is_active = props.is_active
        is_count_own_pc = props.is_count_own_pc
        
        # 指定された場所がアクティブであるか
        if not is_active:
            raise serializers.ValidationError({"detail": "指定された巡回場所は現在対象ではありません。"})
        
        univ_users_num = data.get("univ_users_num", 0)
        own_users_num = data.get("own_users_num", 0)

        if not is_count_own_pc:
            data["own_users_num"] = 0

        if seats_num < univ_users_num + own_users_num:
            raise serializers.ValidationError(
                {"univ_users_num": "入力席数の合計が利用可能数を超えています。", 
                "own_users_num": "入力席数の合計が利用可能数を超えています。"},
                )
        
        timetable_manager = TimetableManageer()
        current_school_period = timetable_manager.get_current_school_period()
        
        exists_record = CountUsersRecord.objects.filter(
            props=props_id,
            school_period=current_school_period,
            published_date=date.today()
            ).exists()
        
        if exists_record:
            raise serializers.ValidationError(
                {"place": "この場所はすでに記録済みです。",
                "room_type": "この場所はすでに記録済みです。"}
                 )
        
        return data
