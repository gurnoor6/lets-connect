from rest_framework import viewsets
from rest_framework import permissions
from .models import *
from .serializers import *
from django.http import HttpResponse
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt


class NewProfileView(viewsets.ModelViewSet):
	queryset = NewProfile.objects.all()
	serializer_class = NewProfileSerializer

	def post(self,request,*args,**kwargs):
		try:
			email = request.data['email']
			password = request.data['password']
			username = request.data['username']
			profilepicture = request.data['profilepicture']
			NewProfile.objects.create(email=email,password=password,username=username,profilepicture=profilepicture)
			return JsonResponse({"response":"pass"})
		except:
			return JsonResponse({"response":"fail"})

@csrf_exempt
def LoginView(request):
	if request.method=='POST':
		profiles = NewProfile.objects.all()
		email = request.POST['email']
		password = request.POST['password']
		if email is not None and password is not None:
			profiles = profiles.filter(email=email,password=password)
		
		profile_serializer = NewProfileSerializer(profiles,many=True)
		if(len(profiles)==1):
			return JsonResponse(profile_serializer.data,safe=False)
		else:
			return JsonResponse({"response":"fail"})


@csrf_exempt
def uploadImage(request):
	if request.method=='POST':
		username = request.POST['username']
		pic = request.FILES['picture']
		try:
			caption = request.POST['caption']
		except:
			caption=""
		Pictures.objects.create(username=username,picture=pic,caption=caption)
		return JsonResponse({"response":"pass"})

	if request.method=='GET':
		username = request.GET.get('username',None)
		pictures = Pictures.objects.all().filter(username=username)
		if pictures is not None:
			picture_serializer = PictureSerializer(pictures,many=True)
			return JsonResponse(picture_serializer.data,safe=False)
		else:
			return JsonResponse({"response":"fail"})

@csrf_exempt
def updateProfilePicture(request):
	if request.method=='POST':
		username = request.POST['username']
		profiles = NewProfile.objects.all().filter(username=username)
		if len(profiles)==1:
			profiles.update(profilepicture='images/'+str(request.FILES['profilepicture']))		#images/ was added because due to some reason, it was not automatically picking it up. It was storing directly to '/media/'
			return JsonResponse({"response":"pass"})
		else:
			return JsonResponse({"response":"fail"})

@csrf_exempt
def deleteUser(request):
	if request.method=='POST':
		username = request.POST['username']
		profiles = NewProfile.objects.all().filter(username=username)
		if len(profiles)==1:
			profiles.delete()
			return JsonResponse({"response":"pass"})
	return JsonResponse({"response":"fail"})

@csrf_exempt
def updateTitle(request):
	if request.method=='POST':
		username = request.POST['username']
		title = request.POST['title']
		profiles = NewProfile.objects.all().filter(username=username)
		if len(profiles)==1:
			profiles.update(title= title)
			return JsonResponse({"response":"pass"})
		return JsonResponse({"response":"fail"})

@csrf_exempt
def updateDescription(request):
	if request.method=='POST':
		username = request.POST['username']
		description = request.POST['description']
		profiles = NewProfile.objects.all().filter(username=username)
		if len(profiles)==1:
			profiles.update(description= description)
			return JsonResponse({"response":"pass"})
		return JsonResponse({"response":"fail"})










