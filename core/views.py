from django.shortcuts import render

# Create your views here.
def inicio (request):
    return render(request,"core/index.html")

def consultas (request):
    return render(request, "core/pages/consultas.html")

def quienessomos (request):
    return render(request, "core/pages/quienes-somos.html")

def provincia (request):
    return render(request, "core/pages/provincia.html")

def servicios (request):
    return render(request, "core/pages/servicios.html")

def login (request):
    return render(request, "core/pages/login.html")

def registro (request):
    return render(request, "core/pages/registro.html")

def perfildeusuario (request):
    return render(request, "core/pages/perfil-de-usuario.html")

def editarusuario (request):
    return render(request, "core/pages/editar-usuario.html")
