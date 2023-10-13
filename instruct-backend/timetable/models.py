from django.db import models


class TimeTable(models.Model):
    school_period = models.IntegerField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_current_period = models.BooleanField(default=False)
