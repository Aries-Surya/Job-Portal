from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .utils import createUser, login_user, getUserDetails, logoutUser, getJobs, approveUser
from rest_framework.decorators import api_view
# Create your views here.

@api_view(['POST'])
def register(request):
    return createUser(request)

@api_view(['POST', 'OPTIONS'])
def loginUser(request):
    if request.method == "POST":
        return login_user(request)
    elif request.method == "OPTIONS":
        response = HttpResponse()
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, X-CSRFToken'
        response['Access-Control-Max-Age']= '3600'
        return response

@api_view(["GET"])
def getDetails(request):
    return getUserDetails(request)

@api_view(["GET"])
def logout(request):
    
    return logoutUser(request)

@api_view(["GET"])
def jobs(request):
    return getJobs(request)


def index(request):
    return render(request, 'index.html', {})

@api_view(["POST", "OPTIONS"])
def approve(request):
    print("Hello world")
    if request.method == "POST":
        return approveUser(request) 
    elif request.method == "OPTIONS":
        response = HttpResponse()
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, X-CSRFToken'
        response['Access-Control-Max-Age']= '3600'
        return response