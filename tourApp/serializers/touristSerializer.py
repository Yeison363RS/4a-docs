from rest_framework import serializers
from tourApp.models.user import Tourist


class TouristSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tourist
        fields = ['id', 'email', 'password', 'name', 'surename',
         'telephone','type_user','placeResidence','nacionality']