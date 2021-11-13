from django.conf import settings
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.backends import TokenBackend
from rest_framework.permissions import IsAuthenticated
from tourApp.models.user import Guide
from tourApp.serializers.guideSerializer import GuideSerializer

class GuideDetailView(generics.RetrieveAPIView):

    queryset = Guide.objects.all()
    serializer_class = GuideSerializer