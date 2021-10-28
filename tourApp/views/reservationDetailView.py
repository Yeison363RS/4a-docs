from django.conf import settings
from django.shortcuts import resolve_url
from rest_framework import generics
from tourApp.models.reservation import Reservation
from tourApp.serializers.reservationSerializer import ReservationSerializer

class ReservationDetailView(generics.RetrieveAPIView):
 queryset = Reservation.objects.all()
 serializer_class = ReservationSerializer

 def get(self, request, *args, **kwargs):
    return super().get(request, *args, **kwargs)

class ReservationListDetailView(generics.ListAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def get_queryset(self):
        queryset=Reservation.objects.filter(tour__guide__id=self.kwargs['pk'])
        return queryset

class TouristReservationsView(generics.ListAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def get_queryset(self):
        queryset=Reservation.objects.filter(tourist_id=self.kwargs['pk'])
        return queryset
class ReservationDeleteView(generics.DestroyAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)