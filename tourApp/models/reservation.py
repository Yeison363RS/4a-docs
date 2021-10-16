from django.db import models
from  tourProject.settings import DATE_INPUT_FORMATS  
from .tour import Tour
from .user import Tourist

class Reservation(models.Model):
    id = models.AutoField(primary_key=True)
    tour = models.ForeignKey(Tour, related_name='Tour', on_delete=models.CASCADE)
    tourist = models.ForeignKey(Tourist, related_name='Tourist', on_delete=models.CASCADE)
    numberHours = models.IntegerField('NumberHours',default=1)
    time = models.DateTimeField('Time')
