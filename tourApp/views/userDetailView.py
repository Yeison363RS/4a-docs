from django.conf import settings
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.backends import TokenBackend
from rest_framework.permissions import IsAuthenticated
from tourApp.models.user import  User
from tourApp.serializers.userSerializer import UserSerializer

class UserDetailView(generics.RetrieveAPIView):

 queryset = User.objects.all()

 serializer_class = UserSerializer