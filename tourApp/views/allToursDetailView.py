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
 #permission_classes = (IsAuthenticated,)
  #Porbar este para hacer una consulta con filtro
  #def get_queryset(self):
  #   return Tour.objects.filter(costo=1)

 #    return super().get_queryset()

# def get(self, request, *args, **kwargs):
  # token = request.META.get('HTTP_AUTHORIZATION')[7:]
   #tokenBackend = TokenBackend(algorithm=settings.SIMPLE_JWT['ALGORITHM'])
   #valid_data = tokenBackend.decode(token,verify=False)
   #if valid_data['tour_id'] != kwargs['pk']:
    #  stringResponse = {'detail':'Unauthorized Request'}
     # return Response(stringResponse, status=status.HTTP_401_UNAUTHORIZED)
#   return super().get(request, *args, **kwargs)