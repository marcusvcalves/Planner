from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

class AppUserManager(BaseUserManager):
    def create_user(self, first_name, last_name, email, password):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')

        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')

        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user

    

class Task(models.Model):
    time = models.TimeField(auto_now=False, auto_now_add=False, default='00:00')
    monday_task = models.TextField(max_length=300)
    tuesday_task = models.TextField(max_length=300)
    wednesday_task = models.TextField(max_length=300)
    thursday_task = models.TextField(max_length=300)
    friday_task = models.TextField(max_length=300)
    saturday_task = models.TextField(max_length=300)
    sunday_task = models.TextField(max_length=300)


class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50, unique=True)

    is_active = models.BooleanField(default=True)  # Required for AbstractBaseUser
    is_staff = models.BooleanField(default=False)  # Required for superuser

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    task = models.ForeignKey(Task, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def get_name(self):
        return self.first_name or self.email.split('@')[0]
    
    objects = AppUserManager()
    
    def __str__(self):
        return self.email