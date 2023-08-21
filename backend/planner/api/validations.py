from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
UserModel = get_user_model()

def custom_validation(data):
    email = data['email'].strip()
    password = data['password'].strip()
    ##
    if not email or UserModel.objects.filter(email=email).exists():
        raise ValidationError('Email indisponível')
    ##
    if not password or len(password) < 8:
        raise ValidationError('Senha muito curta, necessário no mínimo 8 caracteres')
    ##
    return data


def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError('É necessário inserir um email')
    return True


def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError('É necessário inserir uma senha')
    return True