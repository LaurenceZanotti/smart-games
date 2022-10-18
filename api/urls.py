from django.urls import path
from . import views

urlpatterns = [
    # Rotas da api com prefixo api/ (ver smartgames.urls)
    path("", views.api_index, name="api_index"),
]