from .models import User, JobData
from django.http.response import JsonResponse
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer, JobSerializer
def createUser(request):
    email = request.data['email']
    password = request.data['password']
    name = request.data['username']

    user = User.objects.create_user(email=email, password=password, name=name)
    print(user)
    if user:
        login_user(request)
        return JsonResponse({"isLogged": True})
    return JsonResponse({"isLogged": False})

def login_user(request):

    email = request.data['email']
    password = request.data['password']
    print(email, password)
    user = authenticate(request, username=email, password=password)

    if user is not None:
        login(request, user=user)
        request.session.save()
        
        return JsonResponse({"isLogged": True})
    else:
        return JsonResponse({'error': "User does not exist", "isLogged": False})
    
def getUserDetails(request):

    if request.user.is_authenticated:
        user = request.user
        serialized_data = UserSerializer(user)
        return JsonResponse(serialized_data.data)
    else:
        return JsonResponse({"error": "User is not authenticated"})

def logoutUser(request):
    if request.user.is_authenticated:
        logout(request)
        return JsonResponse({"isLoggedOut": True})
    return JsonResponse({"isLoggedOut": False, "error": "Error while loging the user"})

def getJobs(request):

    if request.user.is_authenticated:
        data = JobData.objects.all()
        serializer_data = JobSerializer(instance=data, many=True)
        return JsonResponse(serializer_data.data, safe=False)