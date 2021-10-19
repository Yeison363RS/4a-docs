from rest_framework import status, views
from rest_framework.response import Response
from tourApp.serializers.reservationSerializer import ReservationSerializer

class ReservationCreateView(views.APIView):

    def post(self, request, *args, **kwargs):
        serializer = ReservationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = {
            "confirm":True
            }
        return Response(data,status=status.HTTP_201_CREATED)