# Funções de Controle e regras de negócio
# Essas funções são chamadas por rotas
# As rotas estão no smartgames.urls e api.urls 

# from django.shortcuts import render
from django.forms import model_to_dict
from django.http import JsonResponse
from .models import Jogo

# Escreva as rotas aqui
def api_index(request):
    """
    Rota inicial para teste da api
    """
    return JsonResponse({"msg": "Olá mundo!"})

def api_jogos(request):
    """
    Retorna uma lista de jogos
    """
    # Para cada jogo:
    # 1. Transformar jogo em dictionary com model_to_dict
    # 2. Adicionar dictionary a lista (com list comprehension)
    # 3. Passar lista para dados
    dados = [model_to_dict(jogo) for jogo in Jogo.objects.all()]
    # Retornar resposta JSON com dados
    return JsonResponse({"jogos": dados})