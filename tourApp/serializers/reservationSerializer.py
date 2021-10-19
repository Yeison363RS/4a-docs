from rest_framework import serializers
from tourApp.models.tour import Tour
from tourApp.models.user import Tourist
from tourApp.models.reservation import Reservation
from tourApp.serializers.touristSerializer import TouristSerializer
from tourApp.serializers.tourSerializer import TourSerializer

class ReservationSerializer(serializers.ModelSerializer):
    tour = TourSerializer()
    tourist = TouristSerializer()
    
    class Meta:
        model = Reservation
        fields = ['id', 'time', 'numberHours', 'tour', 'tourist']
        
    def create(self, validated_data):
        tourInstance = Tour.objects.get(id=validated_data.pop('tour'))  
        touristInstance = Tourist.objects.get(id=validated_data.pop('tourist'))
        reservationInstance = Reservation.objects.create(tour=tourInstance, 
        tourist=touristInstance, **validated_data)
        return reservationInstance

    def to_representation(self, obj):
        reservation = Reservation.objects.get(id=obj.id)
        tour = Tour.objects.get(id=reservation.tour)
        tourist = Tourist.objects.get(id=reservation.tourist)      

        return {
                'id': reservation.id,
                'time': reservation.time,
                'numberHours': reservation.numberHours,
                'tourist': {
                'id': tourist.id,
                'name': tourist.name,
                'surname': tourist.surename,
                'telephone': tourist.telephone,
                'nacionality': tourist.nacionality                   
                },
                'tour': {
                'id': tour.id,
                'title': tour.title,
                'costo': tour.costo,
                'description': tour.description,
                'typeTour': tour.typeTour,
                }
            }
            