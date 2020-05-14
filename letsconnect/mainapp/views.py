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
		NewProfile.objects.create(email=email,password=password,username=username)
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









