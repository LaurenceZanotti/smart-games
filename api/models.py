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
    pass

class Compra(models.Model):
    """
    Modelo Compra
    """
    pass