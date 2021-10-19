from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.contrib.auth.hashers import make_password
from django.db.models.fields import IntegerField

class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a user with the given username and password.
        """
        if not email:
            raise ValueError('Users must have an username')
        user = self.model(username=email)
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, username, password):
        """
        Creates and saves a superuser with the given username and password.
        """
        user = self.create_user(
            username=username,password=password,
            )
        user.is_admin = True
        user.save(using=self._db)
        return user
class User(AbstractBaseUser, PermissionsMixin):

    id = models.BigAutoField(primary_key=True)
    email = models.EmailField('Email', max_length = 100, unique=True)
    password = models.CharField('Password', max_length = 256)
    name = models.CharField('Name', max_length = 30)
    surename = models.CharField('SureName', max_length = 30)
    telephone = models.CharField('Telephone', max_length = 30)

    def save(self, **kwargs):
        some_salt = 'mMUj0DrIK6vgtdIYepkIxN'
        self.password = make_password(self.password, some_salt)
        super().save(**kwargs)

    objects = UserManager()
    USERNAME_FIELD = 'email'

class Tourist(User):
     placeResidence = models.CharField('PlaceResidence', max_length = 70)
     nacionality = models.CharField('Nacionality', max_length = 30)

class Guide(User):
     score = models.IntegerField('Score',default=1)
     name_agency = models.CharField('NameAgency', max_length = 30)
     description = models.CharField('Description', max_length = 450)
     facebook = models.CharField('Facebook', max_length = 450)
     instagram = models.CharField('Instagram', max_length = 450)



