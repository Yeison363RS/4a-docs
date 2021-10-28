"""tourProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)
from tourApp import views
urlpatterns = [
 path('login/', TokenObtainPairView.as_view()),
 path('refresh/', TokenRefreshView.as_view()),
 path('tourist/', views.TouristCreateView.as_view()),
 path('guide/', views.GuideCreateView.as_view()),
 path('c_place/', views.PlaceCreateView.as_view()),
 path('c_reservation/', views.ReservationCreateView.as_view()),
 path('c_tour/', views.TourCreateView.as_view()),

 path('guide/<int:pk>/', views.GuideDetailView.as_view()),
 path('tourist/<int:pk>/', views.TouristDetailView.as_view()),
 path('user/<int:pk>/', views.UserDetailView.as_view()),
 path('place/<int:pk>/', views.PlaceDetailView.as_view()),
 path('tour/<int:pk>/', views.TourDetailView.as_view()),
 path('reservation/<int:pk>/', views.ReservationDetailView.as_view()),
 path('reservations/<int:pk>/', views.ReservationListDetailView.as_view()),
 path('reservationsT/<int:pk>/', views.TouristReservationsView.as_view()),
 path('deleteR/<int:pk>/', views.ReservationDeleteView.as_view()),

 path('all_tours/', views.AllToursDetailView.as_view()),
 path('all_places/', views.AllPlaceDetailView.as_view()),
 
 

]
