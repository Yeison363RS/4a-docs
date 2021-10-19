from rest_framework import serializers
from tourApp.models.user import Guide
##from tourApp.models.tour import Tour
#from authApp.serializers.accountSerializer import AccountSerializer

class GuideSerializer(serializers.ModelSerializer):
 #   account = AccountSerializer()
    class Meta:
        model = Guide
        fields = ['id', 'email', 'password', 'name', 'surename',
         'telephone','score','name_agency','description','facebook','instagram']
