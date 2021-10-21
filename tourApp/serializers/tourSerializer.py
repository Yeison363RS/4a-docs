from rest_framework import serializers
from tourApp.models.tour import Tour
from tourApp.models.user import Guide
from tourApp.models.place import Place
from tourApp.serializers.guideSerializer import GuideSerializer
from tourApp.serializers.placeSerializer import PlaceSerializer

class TourSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tour
        fields = ['id','title', 'costo', 'description', 'typeTour','place','guide']
        
    def create(self, validated_data):
        guideInstance = Guide.objects.get(id=validated_data.pop('guide').id)  
        placeInstance = Place.objects.get(id=validated_data.pop('place').id)
        tourInstance = Tour.objects.create(guide=guideInstance, 
        place=placeInstance, **validated_data)
        return tourInstance

    def to_representation(self, obj):
        tour = Tour.objects.get(id=obj.id)
        guide = Guide.objects.get(id=obj.guide.id)      
        place = Place.objects.get(id=obj.place.id)
        return {
                'id': tour.id,
                'title': tour.title,
                'costo': tour.costo,
                'description': tour.description,
                'typeTour': tour.typeTour,
                'guide': {
                'id': guide.id,
                'name': guide.name,
                'surename': guide.surename,
                'telephone': guide.telephone
                },
                'place': {
                'id': place.id,
                'name': place.namePlace,
                }
            }
            