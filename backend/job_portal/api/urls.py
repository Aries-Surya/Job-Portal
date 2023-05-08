from django.urls import path
from .views import register, loginUser, getDetails, logout, jobs, index,approve

urlpatterns = [
    path("", index, name="index"),
    path('api/register',register,name="register"),
    path('api/login', loginUser, name="login"),
    path('api/getDetails', getDetails, name="get_details"),
    path('api/logout', logout, name="get_details"),
    path('api/getJobs', jobs, name="Jobs"),
    path("api/approve", approve, name="approve")
]
