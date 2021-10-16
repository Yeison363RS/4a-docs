from rest_framework import serializers
from tourApp.models.tour import Tour
from tourApp.models.user import Guide
from tourApp.models.place import Place
from tourApp.serializers.guideSerializer import GuideSerializer
from tourApp.serializers.placeSerializer import PlaceSerializer

class TourSerializer(serializers.ModelSerializer):
    guide = GuideSerializer()
    place = PlaceSerializer()

    class Meta:
        model = Tour
        fields = ['id', 'costo', 'description', 'typeTour', 'guide',
         'place']
        
    def create(self, validated_data):
        guideInstance = Guide.objects.get(id=validated_data.pop('idGuide'))  
        placeInstance = Place.objects.get(id=validated_data.pop('idPlace'))
        tourInstance = Tour.objects.create(guide=guideInstance, 
        place=placeInstance, **validated_data)
        return tourInstance

    def to_representation(self, obj):
        tour = Tour.objects.get(id=obj.id)
        guide = Guide.objects.get(id=tour.guide)      
        place = Place.objects.get(id=tour.place)
        return {
                'id': tour.id,
                'costo': tour.costo,
                'description': tour.description,
                'typeTour': tour.typeTour,
                'guide': {
                'id': guide.id,
                'name': guide.name,
                'surname': guide.surname,
                'telephone': guide.telephone
                },
                'place': {
                'id': place.id,
                'name': place.namePlace,
                }
            }
            