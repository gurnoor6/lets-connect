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
	description = models.TextField(null=True)
	title = models.TextField(null=True)
	followers = models.IntegerField(default=0)
	followerNames = models.TextField(default="")


class Pictures(models.Model):
	username = models.CharField(max_length=50)
	picture = models.ImageField(upload_to='images/uploads/')
	caption = models.CharField(max_length=128,null=True)

