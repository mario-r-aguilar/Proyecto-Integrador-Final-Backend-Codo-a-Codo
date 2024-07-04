from django.db import models

# Create your models here.
class Activitie(models.Model):
    name = models.CharField(max_length=200, verbose_name="Nombre de la provincia")
    province_image = models.ImageField(verbose_name="Imagen de la Provincia", upload_to="province_images")
    description_one = models.CharField(max_length=200, verbose_name="Titulo de la actividad 1")
    image_one = models.ImageField(verbose_name="Imagen de la actividad 1", upload_to="province_images")
    detail_one = models.TextField(verbose_name="Detalle de la actividad 1")
    price_one = models.IntegerField(verbose_name="Precio de la actividad 1")
    description_two = models.CharField(max_length=200, verbose_name="Titulo de la actividad 2")
    image_two = models.ImageField(verbose_name="Imagen de la actividad 2", upload_to="province_images")
    detail_two = models.TextField(verbose_name="Detalle de la actividad 2")
    price_two = models.IntegerField(verbose_name="Precio de la actividad 2")
    description_three = models.CharField(max_length=200, verbose_name="Titulo de la actividad 3")
    image_three = models.ImageField(verbose_name="Imagen de la actividad 3", upload_to="province_images")
    detail_three = models.TextField(verbose_name="Detalle de la actividad 3")
    price_three = models.IntegerField(verbose_name="Precio de la actividad 3")
    description_four = models.CharField(max_length=200, verbose_name="Titulo de la actividad 4")
    image_four = models.ImageField(verbose_name="Imagen de la actividad 4", upload_to="province_images")
    detail_four = models.TextField(verbose_name="Detalle de la actividad 4")
    price_four = models.IntegerField(verbose_name="Precio de la actividad 4")
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de modificación")
    
    def __str__(self):
        return self.name    
    
    class Meta:
        verbose_name = "Actividad"
        verbose_name_plural = "Actividades"