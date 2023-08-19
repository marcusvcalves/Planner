from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    time = models.TimeField(auto_now=False, auto_now_add=False, default='00:00')
    monday_task = models.TextField(max_length=300)
    tuesday_task = models.TextField(max_length=300)
    wednesday_task = models.TextField(max_length=300)
    thursday_task = models.TextField(max_length=300)
    friday_task = models.TextField(max_length=300)
    saturday_task = models.TextField(max_length=300)
    sunday_task = models.TextField(max_length=300)
