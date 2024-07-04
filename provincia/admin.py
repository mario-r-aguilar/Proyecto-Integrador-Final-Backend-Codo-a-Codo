from django.contrib import admin
from .models import Activitie

# Register your models here.
class ProvinciaAdmin(admin.ModelAdmin):
    readonly_fields = ('created','updated')

admin.site.register(Activitie,ProvinciaAdmin)