from rest_framework import serializers
from tourApp.models.tour import Tour
from tourApp.models.user import Guide
from tourApp.models.place import Place
from tourApp.serializers.guideSerializer import GuideSerializer
from tourApp.serializers.placeSerializer import PlaceSerializer

class TourSerializer(serializers.ModelSerializer):
    #guide = GuideSerializer()
    #place = PlaceSerializer()

    class Meta:
        model = Tour
        fields = ['id','title', 'costo', 'description', 'typeTour','place','guide']
        
    def create(self, validated_data):
        print("VA CREAR INSTANCIAS")
        datasguide=validated_data.pop('guide')
        datasplace=validated_data.pop('place')
        print(datasguide)
        print(datasplace)
        guideInstance = Guide.objects.get(id=datasguide)  
        placeInstance = Place.objects.get(id=datasplace)
        print("VA A CONSTRUIR")
        tourInstance = Tour.objects.create(guide=guideInstance, 
        place=placeInstance, **validated_data)
        return tourInstance

    def to_representation(self, obj):
        tour = Tour.objects.get(id=obj.id)
        guide = Guide.objects.get(id=tour.guide)      
        place = Place.objects.get(id=tour.place)
        return {
                'id': tour.id,
                'title': tour.title,
                'costo': tour.costo,
                'description': tour.description,
                'typeTour': tour.typeTour,
                'guide': {
                'id': guide.id,
                'name': guide.name,
                'surename': guide.surname,
                'telephone': guide.telephone
                },
                'place': {
                'id': place.id,
                'name': place.namePlace,
                }
            }
            