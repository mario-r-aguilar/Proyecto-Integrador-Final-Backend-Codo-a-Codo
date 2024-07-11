from django.shortcuts import render
from .models import Activitie

# Create your views here.
def inicio (request):
    activities = Activitie.objects.all()
    return render(request,"provincia/index.html", {"activities":activities})

def provincia (request, id):
    provinces = Activitie.objects.get(id=id)
    return render(request, "provincia/provincia.html", {"provinces":provinces})