from django.shortcuts import render

# Create your views here.
def consultas (request):
    return render(request, "core/pages/consultas.html")

def quienessomos (request):
    return render(request, "core/pages/quienes-somos.html")

def servicios (request):
    return render(request, "core/pages/servicios.html")
