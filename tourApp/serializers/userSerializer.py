from rest_framework import serializers
from tourApp.models.user import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'name', 'surename',
         'telephone','type_user']