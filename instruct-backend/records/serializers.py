from rest_framework import serializers
from .models import PatrolPlaces, PatrolRecord, CountUsersProps, CountUsersRecord
from datetime import date


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
        
        # place が存在し、place フィールドが設定されているか確認
        if place and hasattr(place, 'name'):
            place_id = place.id
        else:
            raise serializers.ValidationError("name フィールドが存在しません。")
        
        # is_active フィールドが設定されているか確認
        if hasattr(place, 'is_active'):
            is_active = place.is_active
        else:
            raise serializers.ValidationError("is_active フィールドが存在しません。")
        
        # is_pm_rounds_twice フィールドが設定されているか確認
        if hasattr(place, 'is_pm_rounds_twice'):
            is_pm_rounds_twice = place.is_pm_rounds_twice
        else:
            raise serializers.ValidationError("is_pm_rounds_twice フィールドが存在しません。")
        
        # 指定された場所がアクティブであるか
        if not is_active:
            raise serializers.ValidationError("指定された巡回場所はアクティブではありません。")
        
        AM_or_PM = data.get("AM_or_PM")

        # 送信された場所、日付、午前午後が同じレコードを取得
        record = PatrolRecord.objects.filter(place=place_id, published_date=date.today(), AM_or_PM=AM_or_PM)

        # 巡回が完了しているか
        is_patrol_completed = AM_or_PM != "午後" or not is_pm_rounds_twice or len(record) > 1

        # レコードが存在し、さらに巡回が完了している場合にエラーを発生させる
        if record.exists():
            if is_patrol_completed:
                raise serializers.ValidationError("この場所はすでに記録済みです。")
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
        
       # props が存在し、seats_num フィールドが設定されているか確認
        if props and hasattr(props, 'seats_num'):
            seats_num = props.seats_num
        else:
            raise serializers.ValidationError("seats_numフィールドが存在しません。")
        
        # is_active フィールドが設定されているか確認
        if hasattr(props, 'is_active'):
            is_active = props.is_active
        else:
            raise serializers.ValidationError("is_activeフィールドが存在しません。")
        
        # 指定された場所がアクティブであるか
        if not is_active:
            raise serializers.ValidationError("指定された巡回場所はアクティブではありません。")
        
        univ_users_num = data.get("univ_users_num")
        own_users_num = data.get("own_users_num")

        if seats_num < univ_users_num + own_users_num:
            raise serializers.ValidationError("入力席数の合計が利用可能数を超えています。")
        return data
