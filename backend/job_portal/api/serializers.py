from rest_framework.serializers import ModelSerializer
from .models import User, JobData

class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"

class JobSerializer(ModelSerializer):

    class Meta:
        model=JobData
        fields="__all__"
    