from django.conf import settings
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.backends import TokenBackend
from rest_framework.permissions import IsAuthenticated
from tourApp.models.place import Place
from tourApp.serializers.placeSerializer import PlaceSerializer

class PlaceDetailView(generics.RetrieveAPIView):
 queryset = Place.objects.all()
 serializer_class = PlaceSerializer
 permission_classes = (IsAuthenticated,)
 def get(self, request, *args, **kwargs):
    return super().get(request, *args, **kwargs)

