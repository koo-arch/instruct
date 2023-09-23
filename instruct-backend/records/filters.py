import django_filters
from .models import CountUsersRecord


class CountUsersRecordFilter(django_filters.FilterSet):
    class Meta:
        models = CountUsersRecord
        fields = {
            "props": ["exact"],
            "school_period": ["exact"],
            "date": ["exact"],
        }