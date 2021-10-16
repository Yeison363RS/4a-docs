from tourApp.models.place import Place
from rest_framework import serializers

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ['namePlace']