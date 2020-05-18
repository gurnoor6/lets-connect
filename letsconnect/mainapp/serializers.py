
from rest_framework import serializers
from .models import *

class ProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = Profile
		fields = ['email','password']

class NewProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model= NewProfile
		fields=['username','email','password','profilepicture','description','title','followers','followerNames',
				'following','followingNames']

class PictureSerializer(serializers.ModelSerializer):
	class Meta:
		model = Pictures
		fields=['picture','caption']