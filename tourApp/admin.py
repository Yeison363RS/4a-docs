from django.contrib import admin
from .models.user import Tourist
from .models.user import Guide

admin.site.register(Tourist)
admin.site.register(Guide)
