from rest_framework import serializers
from tourApp.models.tour import Tour

class TourSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tour
        fields = ['id','title', 'costo', 'description', 'typeTour','place','guide']
        
   
            