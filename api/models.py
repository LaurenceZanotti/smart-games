from django.db import models
from django.contrib.auth.models import AbstractUser

# O Django controla o banco de dados com migrações
# Definições de tabelas (Models) ficam aqui
class User(AbstractUser):
    """
    Modelo User padrão do Django

    Veja a necessidade de implementar esse Model abaixo:
    Substituindo um modelo de Usuário personalizado
    https://docs.djangoproject.com/pt-br/4.1/topics/auth/customizing/#substituting-a-custom-user-model
    
    """
    pass

class Jogo(models.Model):
    """
    Modelo Jogo
    """
    # Atributos
    # https://docs.djangoproject.com/pt-br/4.1/ref/models/fields/
    nome = models.CharField(max_length=128, default="")
    descricao = models.TextField(default="")
    imagem = models.CharField(max_length=500, default="")
    preco = models.FloatField(default=0.00)
    plataformas = models.CharField(max_length=128, default="")
    lojas = models.CharField(max_length=256, default="")

    # Métodos
    def __str__(self) -> str:
        return f"{self.nome}: {self.id}"

class Compra(models.Model):
    """
    Modelo Compra
    """
    # Atributos
    # https://docs.djangoproject.com/pt-br/4.1/ref/models/fields/
    jogo = models.ForeignKey(
        Jogo, 
        related_name="compras", 
        on_delete=models.SET_NULL, 
        null=True
    )
    preco_final = models.FloatField(default=0.00)
    desconto = models.CharField(max_length=60, default="")
    data_compra = models.DateTimeField(auto_now_add=True)

    # Métodos
    def __str__(self) -> str:
        return f"{self.jogo.nome} {self.data_compra} : {self.id}"