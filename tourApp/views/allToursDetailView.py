from django.conf import settings
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.backends import TokenBackend
from rest_framework.permissions import IsAuthenticated
from tourApp.models.tour import Tour
from tourApp.serializers.tourSerializer import TourSerializer

class AllToursDetailView(generics.ListAPIView):
 queryset = Tour.objects.all()
 serializer_class = TourSerializer
 