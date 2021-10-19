from rest_framework import status, views
from rest_framework.response import Response
from tourApp.serializers.placeSerializer import PlaceSerializer

class PlaceCreateView(views.APIView):

    def post(self, request, *args, **kwargs):
        serializer = PlaceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = {
            "confirm":True
            }
        return Response(data,status=status.HTTP_201_CREATED)