from django.urls import include, path,re_path
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register('profile',views.NewProfileView)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    re_path(r'^login/.*',views.LoginView,name='LoginView'),
    path('upload/',views.uploadImage,name='uploadImage'),
    path('update/',views.updateProfilePicture,name='updateProfilePicture'),
    path('delete/',views.deleteUser,name="deleteUser")
]

