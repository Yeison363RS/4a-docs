from django.contrib import admin
from .models.user import Tourist
from .models.user import Guide
from .models.place import Place
from .models.tour import Tour
from .models.reservation import Reservation

admin.site.register(Tourist)
admin.site.register(Guide)
admin.site.register(Place)
admin.site.register(Tour)
admin.site.register(Reservation)
