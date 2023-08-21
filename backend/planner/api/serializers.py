from django.forms import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('email', 'username', 'password')

    def create(self, validated_data):
        user_obj = UserModel.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user_obj
    
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    class Meta:
        model = UserModel
        fields = ('email', 'password')
        
    def check_user(self, validated_data):
        user = authenticate(
            username=validated_data['email'],
            password=validated_data['password']
        )
        if not user:
            raise ValidationError('Erro nas credenciais')
        
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('email', 'username')
