from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

UserModel = get_user_model()


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

def confirm_password(data):
    password = data['password']
    confirm_password = data['confirm_password']
    if password != confirm_password:
        raise ValidationError('Senha e confirmação de senha são diferentes')
    return True