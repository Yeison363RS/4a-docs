from rest_framework import serializers
from tourApp.models.user import Tourist
##from tourApp.models.tour import Tour
#from authApp.serializers.accountSerializer import AccountSerializer

class TouristSerializer(serializers.ModelSerializer):
 #   account = AccountSerializer()
    class Meta:
        model = Tourist
        fields = ['id', 'email', 'password', 'name', 'surname',
         'telephone','placeResidence','nacionality']