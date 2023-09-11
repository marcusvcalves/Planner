from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('register', views.UserRegister.as_view(), name='register'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('tasks/', views.TaskView.as_view(), name='task'),
    path('task/update/<int:pk>/', views.UpdateTaskView.as_view(), name='update_task'),
    path('task/delete/<int:pk>/', views.DeleteTaskView.as_view(), name='delete_task'),
]