from django.db import models
from .user import Guide
from .place import Place

class Tour(models.Model):
    id = models.AutoField(primary_key=True)
    guide = models.ForeignKey(Guide, related_name='tour', on_delete=models.CASCADE)
    place = models.ForeignKey(Place, related_name='tour', on_delete=models.CASCADE)
    title = models.CharField('Title', max_length = 100)
    costo = models.IntegerField('Costo',default=0)
    description = models.CharField('Description', max_length = 500)
    typeTour = models.CharField('TypeTour', max_length = 20,default="Regular")