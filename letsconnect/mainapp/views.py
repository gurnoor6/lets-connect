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
		email = request.data['email']
		password = request.data['password']
		username = request.data['username']
		profilepicture = request.data['profilepicture']
		NewProfile.objects.create(email=email,password=password,username=username,profilepicture=profilepicture)
		return HttpResponse({'message':'Registered Successfully'},status=200)

# def LoginView(request):
# 	if request.method=='GET':
# 		profiles = NewProfile.objects.all()
# 		email = request.GET.get('email',None)
# 		password = request.GET.get('password',None)
# 		if email is not None and password is not None:
# 			profiles = profiles.filter(email=email,password=password)
		
# 		profile_serializer = NewProfileSerializer(profiles,many=True)
# 		if(len(profiles)==1):
# 			return JsonResponse(profile_serializer.data,safe=False)
# 		else:
# 			return JsonResponse({"response":"fail"})

# 		# return JsonResponse(profile_serializer.data,safe=False)

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
		Pictures.objects.create(username=username,picture=pic)
		return JsonResponse({"response":"pass"})

	if request.method=='GET':
		username = request.GET.get('username',None)
		pictures = Pictures.objects.all().filter(username=username)
		if pictures is not None:
			picture_serializer = PictureSerializer(pictures,many=True)
			return JsonResponse(picture_serializer.data,safe=False)
		else:
			return JsonResponse({"response":"fail"})










