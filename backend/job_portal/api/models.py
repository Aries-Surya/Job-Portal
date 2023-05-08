from djongo import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone
# Create your models here.
import uuid

class UserManager(BaseUserManager):

    def create_user(self, email, password, **extra_field):
        if not email:
            raise ValueError("Email is not provided")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_field)
        user.set_password(password)
        user.save(using=self.db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser):
    id = models.CharField(primary_key=True, max_length=128, default=uuid.uuid4)
    email = models.EmailField(unique=True, max_length=30)
    password = models.CharField(max_length=128)
    name = models.CharField(max_length=30)
    created_at = models.DateTimeField(default=timezone.now)
    jobs_applied = models.IntegerField(default=0)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:

        db_table ='User-info'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True


class JobData(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    provider_name = models.CharField(max_length=120, default="Anonymous")
    profile_url = models.URLField(unique=False)
    job_title = models.CharField(max_length=30, default="Job Title")
    job_description = models.TextField()
    popularity = models.IntegerField(default=0)
    location = models.CharField(max_length=120, default="Not Provided")



    class Meta:
        db_table = "Job-Data"
    
    def __str__(self):
        return self.job_title