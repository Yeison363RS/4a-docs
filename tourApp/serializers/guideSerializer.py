from rest_framework import serializers
from tourApp.models.user import Guide


class GuideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guide
        fields = ['id', 'email', 'password', 'name', 'surename',
         'telephone','type_user','score','name_agency','description','facebook','instagram']
