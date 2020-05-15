from django.db import models

# Create your models here.

class Profile(models.Model):
	email = models.CharField(max_length=50)
	password = models.CharField(max_length=50)

	def __str__(self):
		return self.email

class NewProfile(models.Model):
	username = models.CharField(max_length=50)
	email = models.CharField(max_length=50)
	password = models.CharField(max_length=50)
	profilepicture = models.ImageField(upload_to='images/')

