from django.conf import settings
from rest_framework import generics
from tourApp.models.place import Place
from tourApp.serializers.placeSerializer import PlaceSerializer

class PlaceDetailView(generics.RetrieveAPIView):
 queryset = Place.objects.all()
 serializer_class = PlaceSerializer
 
 def get(self, request, *args, **kwargs):
    return super().get(request, *args, **kwargs)

