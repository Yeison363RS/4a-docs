from django.conf import settings
from rest_framework import generics
from tourApp.models.tour import Tour
from tourApp.serializers.tourSerializer import TourSerializer

class TourDetailView(generics.RetrieveAPIView):
 queryset = Tour.objects.all()
 serializer_class = TourSerializer

 def get(self, request, *args, **kwargs):
   return super().get(request, *args, **kwargs)