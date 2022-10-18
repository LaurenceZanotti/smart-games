# https://docs.djangoproject.com/pt-br/4.1/ref/contrib/admin/#modeladmin-objects

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from api.models import User, Jogo, Compra

# Esse arquivo registra os Models que podem ser editados
# pelo site de administração que já vem com o Django
# É necessário criar uma conta superusuário se não tiver uma

class JogoAdmin(admin.ModelAdmin):
    pass

class CompraAdmin(admin.ModelAdmin):
    pass

admin.site.register(User, UserAdmin)
admin.site.register(Jogo, JogoAdmin)
admin.site.register(Compra, CompraAdmin)