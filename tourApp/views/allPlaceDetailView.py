from django.conf import settings
from rest_framework import generics
from tourApp.models.place import Place
from tourApp.serializers.placeSerializer import PlaceSerializer

class AllPlaceDetailView(generics.ListAPIView):
 queryset = Place.objects.all()
 serializer_class = PlaceSerializer