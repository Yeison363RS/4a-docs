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
 
]
