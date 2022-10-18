# Funções de Controle e regras de negócio
# Essas funções são chamadas por rotas
# As rotas estão no smartgames.urls e api.urls 

# from django.shortcuts import render
from django.http import JsonResponse

# Escreva as rotas aqui
def api_index(request):
    """
    Rota inicial para teste da api
    """
    return JsonResponse({"msg": "Olá mundo!"})