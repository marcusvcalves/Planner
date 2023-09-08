from django.contrib.auth import get_user_model, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, TaskSerializer, CreateTaskSerializer
from rest_framework import permissions, status
from .validations import confirm_password
from .models import Task
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['email'] = user.email
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
	serializer_class = MyTokenObtainPairSerializer

class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		data = request.data
		serializer = UserRegisterSerializer(data=data)
		assert confirm_password(data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(serializer.validated_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)



class TaskView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	def get(self, request):
		tasks = Task.objects.filter(user=request.user)
		serializer = TaskSerializer(tasks, many=True)
		return Response({'tasks': serializer.data})


class CreateTaskView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	def post(self, request):
        # Serialize os dados recebidos na requisição
		serializer = CreateTaskSerializer(data=request.data, context={'request': request})
		
		if serializer.is_valid():
			# Crie a tarefa usando o serializer
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


