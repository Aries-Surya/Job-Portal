import smtplib, ssl
from .models import User, JobData
from django.http.response import JsonResponse
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer, JobSerializer
# from django.shortcuts import render    
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
    


def approveUser(request):
    if request.method == "POST":
        id = request.data["jobId"]
        # port = 465  # For SSL
        password = "Test@1234"
        s= smtplib.SMTP("smtp.gmail.com", 587)
        s.starttls()
        s.login("suryatest81@gmail.com", password=password)
        # Create a secure SSL context
        # context = ssl.create_default_context()

        try:
            user_email = request.user.email
            appliedJob = JobData.objects.filter(id=id)
            jobTitle  = appliedJob.title
            jobBy = appliedJob.provider_name
            s.sendmail("suryatest81@gmail.com", user_email, f"Congratulations You have been selected for {appliedJob} by {jobBy}")
        finally:
            s.quit()
        # with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
        #     server.login("suryatest81@gmail.com", password)
    return JsonResponse({"success": "email sent"})


