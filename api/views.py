# Funções de Controle e regras de negócio
# Essas funções são chamadas por rotas
# As rotas estão no smartgames.urls e api.urls 

# from django.shortcuts import render
from django.forms import model_to_dict
from django.http import JsonResponse
from .models import Jogo, Compra

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
    if request.method == "GET":
        # Para cada jogo:
        # 1. Transformar jogo em dictionary com model_to_dict
        # 2. Adicionar dictionary a lista (com list comprehension)
        # 3. Passar lista para dados
        dados = [model_to_dict(jogo) for jogo in Jogo.objects.all()]
        # Retornar resposta JSON com dados
        return JsonResponse({"jogos": dados})
    else:
        # Retornar erro se método não for GET
        return JsonResponse({"msg": "Método inválido"}, status=405)

def api_jogo(request, id_jogo):
    """
    Retorna um único jogo
    """
    if request.method == "GET":
        dado = None
        try:
            # Tentar obter jogo
            jogo = Jogo.objects.get(id=id_jogo)
            # Transformar model em dictionary
            dado = model_to_dict(jogo)
        except Jogo.DoesNotExist:
            # Se não existir, avisar que jogo não existe
            return JsonResponse({"msg": "Jogo não existe"}, status=404)

        # Retornar jogo
        return JsonResponse({"jogo": dado})
    else:
        # Retornar erro se método não for GET
        return JsonResponse({"msg": "Método inválido"}, status=405)

def api_jogo_comprar(request, id_jogo):
    """
    Registrar compra de jogo
    """
    if request.method == "POST":
        try:
            # Tentar obter jogo
            jogo = Jogo.objects.get(id=id_jogo)
            compra = Compra.objects.create(jogo=jogo)
            compra.save()
            return JsonResponse({"msg": "Obrigado pela compra! Entraremos em contato com mais detalhes sobre a entrega."})
        except Jogo.DoesNotExist:
            # Se não existir, avisar que jogo não existe
            return JsonResponse({"msg": "Jogo não existe"}, status=404)
        except Exception as e:
            print(e)
            return JsonResponse({"msg":"Algum erro aconteceu"}, status=500)
    else:
        # Retornar erro se método não for POST
        return JsonResponse({"msg": "Método inválido"}, status=405)