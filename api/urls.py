from django.urls import path
from . import views

urlpatterns = [
    # Rotas da api com prefixo api/ (ver smartgames.urls)
    path("", views.api_index, name="api_index"),
    path("jogos", views.api_jogos, name="api_jogos"),
    path("jogos/<int:id_jogo>", views.api_jogo, name="api_jogo"),
]