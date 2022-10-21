# Funções de Controle e regras de negócio
# Essas funções são chamadas por rotas
# As rotas estão no smartgames.urls e api.urls 

# from django.shortcuts import render
import os
from json import loads
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
        # Apenas para que simule a demora e o frontend exiba status de carregando
        import time
        time.sleep(2)
        # Processar compra
        try:
            # Tentar obter jogo
            jogo = Jogo.objects.get(id=id_jogo)
            preco_descontado = None
            
            # Criar um registro de Compra
            compra = Compra.objects.create(jogo=jogo)
            compra.preco_final = jogo.preco
            # Aplicar desconto se houver
            if request.session.get("desconto"):
                # Obter cupom e desconto
                cupom = request.session['desconto']
                desconto = float(f"0.{cupom[21:22]}")
                # Calcular preço final
                preco_descontado = jogo.preco - (jogo.preco * desconto)
                # Retirar cupom de desconto do usuário após uso
                request.session['desconto'] = None
                # Adicionar desconto no registro de compras
                compra.preco_final = preco_descontado
                compra.desconto = cupom

            

            # Registrar Compra no banco de dados
            compra.save()

            # Responder se compra ocorreu com ou sem desconto
            if preco_descontado:
                return JsonResponse({"msg": f"Você comprou {jogo.nome} por R$ {preco_descontado} usando cupom! Volte sempre!"})
            else:
                return JsonResponse({"msg": f"Você comprou {jogo.nome} por R$ {jogo.preco}! Volte sempre!"})
        except Jogo.DoesNotExist:
            # Se não existir, avisar que jogo não existe
            return JsonResponse({"msg": "Jogo não existe"}, status=404)
        except Exception as e:
            # O ideal é trocar esse print por alguma função de biblioteca de
            # logging para registrar o erro
            print(e)
            # Avisar que um erro inesperado aconteceu
            return JsonResponse({"msg":"Ops! Algum erro inesperado aconteceu"}, status=500)
    else:
        # Retornar erro se método não for POST
        return JsonResponse({"msg": "Método inválido"}, status=405)

def api_desconto(request):
    """
    Valida desconto e guarda na sessão do usuário
    """
    descontos = [
        os.environ.get("DESCONTO20"),
        os.environ.get("DESCONTO50"),
        os.environ.get("DESCONTO70"),
    ]
    
    # Processar desconto
    if request.method == "POST":
        # Obter texto do QR Code
        body = loads(request.body)
        desconto = body.get("desconto")

        is_valido = False
        desconto_aplicado = None
        # Validar se código de desconto bate com códigos do servidor
        if desconto in descontos:
            is_valido = True
            # Obter primeira parte do texto de desconto válido
            desconto_aplicado = desconto

        # Responder se cupom é válido ou não
        if is_valido:
            # Salvar desconto na sessão do usuário
            request.session['desconto'] = desconto_aplicado
            return JsonResponse({"msg": f"Desconto de {desconto_aplicado[21:23]}% aplicado!"})
        else:
            # Avisar que cupom não é válido
            return JsonResponse({"msg": f"Seu cupom de desconto não é válido!"})
    else:
        # Retornar erro se método não for POST
        return JsonResponse({"msg": "Método inválido"}, status=405)