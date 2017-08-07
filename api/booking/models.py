from django.db import models


class Booking(models.Model):
    date = models.DateField()
    level = models.IntegerField()
    room = models.IntegerField()
    am_dept = models.CharField(max_length=258)
    pm_dept = models.CharField(max_length=258)
    am_surg = models.CharField(max_length=258)
    pm_surg = models.CharField(max_length=258)
    valid = models.IntegerField()
    created = models.DateTimeField()
    status = models.IntegerField()
    am_confirmed = models.IntegerField()
    pm_confirmed = models.IntegerField()


    def __str__(self):
        return f'{self.date}, L{self.level}, R{self.room}'
