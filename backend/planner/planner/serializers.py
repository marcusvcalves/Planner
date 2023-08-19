from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = (
            'id', 'time',
            'monday_task', 'tuesday_task', 'wednesday_task',
            'thursday_task', 'friday_task', 'saturday_task', 'sunday_task'
        )