from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()
    

class PatrolPlaces(models.Model):
    """
    巡回場所一覧
    """
    name = models.CharField(max_length=30)
    is_pm_rounds_twice = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.name


class PatrolRecord(models.Model):
    """
    巡回時間記録
    """
    place = models.ForeignKey(PatrolPlaces, on_delete=models.PROTECT)
    published_date = models.DateField(auto_now_add=True)
    published_time = models.TimeField(auto_now_add=True)
    AM_or_PM = models.CharField(max_length=10)
    user = models.ForeignKey(User, on_delete=models.PROTECT)

    def __str__(self) -> str:
        return f"{self.place} {self.published_date} {self.published_time}"


class CountUsersProps(models.Model):
    """
    利用人数記録の設定
    """
    place = models.CharField(max_length=30)
    room_type = models.CharField(max_length=30)
    seats_num = models.IntegerField(default=0)
    is_count_own_pc = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f"{self.place} {self.room_type}"


class CountUsersRecord(models.Model):
    props = models.ForeignKey(CountUsersProps, on_delete=models.PROTECT)
    school_period = models.IntegerField()
    univ_users_num = models.IntegerField(default=0)
    own_users_num = models.IntegerField(default=0)
    published_date = models.DateField(auto_now_add=True)
    published_time = models.TimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT)

    def __str__(self) -> str:
        return f"{self.props} {self.univ_users_num} {self.own_users_num}"
