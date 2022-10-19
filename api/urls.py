from django.urls import path
from . import views

urlpatterns = [
    # Rotas da api com prefixo api/ (ver smartgames.urls)
    path("", views.api_index, name="api_index"),
    path("jogos", views.api_jogos, name="api_jogos"),
    path("jogos/<int:id_jogo>", views.api_jogo, name="api_jogo"),
    path("jogos/<int:id_jogo>/comprar", views.api_jogo_comprar, name="api_jogo_comprar"),
    path("desconto", views.api_desconto, name="api_desconto"),
]