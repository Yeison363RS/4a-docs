
from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)
from tourApp import views
urlpatterns = [
 path('login/', TokenObtainPairView.as_view()),
 path('refresh/', TokenRefreshView.as_view()),
 path('tourist/', views.TouristCreateView.as_view()),
 path('guide/', views.GuideCreateView.as_view()),
 path('guide/<int:pk>/', views.GuideDetailView.as_view()),
 path('tourist/<int:pk>/', views.TouristDetailView.as_view()),
 path('user/<int:pk>/', views.UserDetailView.as_view()),
 path('verifyToken/', views.VerifyTokenView.as_view()),
]
