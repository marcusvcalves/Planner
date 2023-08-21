from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

class AppUserManager(BaseUserManager):
    def create_user(self, email, username, password):
        if not email:
            raise ValueError('An email is required.')
        if not username:
            raise ValueError('A username is required.')
        if not password:
            raise ValueError('A password is required.')

        email = self.normalize_email(email)
        user = self.model(email=email, username=username)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, username, password):
        if not email:
            raise ValueError('An email is required.')
        if not username:
            raise ValueError('A username is required.')
        if not password:
            raise ValueError('A password is required.')

        user = self.create_user(email, username, password)
        user.is_superuser = True
        user.is_staff = True  # Make superuser staff as well
        user.save()

        return user

    
class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)  # Required for AbstractBaseUser
    is_staff = models.BooleanField(default=False)  # Required for superuser
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    objects = AppUserManager()
    
    def __str__(self):
        return self.email

class Task(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    time = models.TimeField(auto_now=False, auto_now_add=False, default='00:00')
    monday_task = models.TextField(max_length=300)
    tuesday_task = models.TextField(max_length=300)
    wednesday_task = models.TextField(max_length=300)
    thursday_task = models.TextField(max_length=300)
    friday_task = models.TextField(max_length=300)
    saturday_task = models.TextField(max_length=300)
    sunday_task = models.TextField(max_length=300)
