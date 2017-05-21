
from django.conf.urls import url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', 'app.views.home'),
    url(r'^modelos$', 'app.views.modelos'),
    url(r'^colores$', 'app.views.colores'),
    url(r'^ubicacion$', 'app.views.ubicacion'),
    url(r'^ingreso$', 'app.views.ingreso'),
    url(r'^tallas$', 'app.views.tallas'),
    url(r'^listado$', 'app.views.listado'),
    url(r'^proveedores$', 'app.views.proveedores'),
    url(r'^entrada$', 'app.views.entrada'),
    url(r'^salida$', 'app.views.salida'),
    url(r'^totalizador/(\w+)/(\w+)$', 'app.views.totalizador'),
    url(r'^elimina/(\w+)$', 'app.views.elimina'),
    url(r'^total/(\w+)$', 'app.views.total'),

]
