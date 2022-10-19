# Smart Games

Site de jogos eletrônicos para uma loja fictícia. Feito com Django, MySQL e React.

## Como rodar

1. Criar ambiente virtual `python -m venv venv`
2. Ativar ambiente virtual (Windows) `.\venv\Scripts\activate`
3. Instalar dependências `pip install -r requirements.txt`
4. Migrar banco de dados `python manage.py migrate`
5. Carregar dados de teste iniciais `python manage.py loaddata dados_iniciais`
6. Criar arquivo `.env` e insira

```
DJANGO_SECRET_KEY="insirasuasecretkeyaqui-4629f2d1f561fe23c6062f522f5c37093c20eea0"
DEBUG=True
```

6. Rodar o server de teste `python manage.py runserver`
7. Acessar `localhost:8000/admin` no seu navegador e entrar com usuário `admin` e senha `secret` (por favor mude o usuário e senha se rodar em produção)

Essa seção ainda será melhorada, e provavelmente terá como rodar o projeto inteiro com [Docker](https://www.docker.com/) (`docker-compose up`).

## Entendendo o projeto

Essa seção tem uma breve explicação da estrutura de arquivos do projeto e seus propósitos.

Ao se familiarizar com a estrutura de arquivos, note que 

- Há um diretório `/smartgames` que define configurações do projeto, rotas, e aplicações WSGI ou ASGI para deploy.

- Há um diretório `/api` que tem um aplicativo Django que serve rotas seguindo o padrão de *APIs RESTful* e interage com o banco de dados

Abaixo tem uma explicação mais detalhada de cada arquivo de cada diretório.

### Diretório */smartgames*

Esse diretório tem as configurações e rotas do projeto Django.

`settings.py` tem as configurações de todos os aplicativos do projeto

`urls.py` tem todas as rotas de todos os aplicativos (note que tem rotas para o aplicativo `admin` e `api`)  

### Diretório */api*

Esse diretório tem todos os pacotes Python que constituem o **app** `api` do projeto. Esse app vai intermediar o front-end com o banco de dados.

`urls.py` tem todas as rotas do aplicativo `api` que direcionam para uma função do arquivo `views.py`

`views.py` tem funções (camada Controller) que tratam requisições HTTP e dão uma resposta de acordo com as regras de negócio

`models.py` tem classes que representam entidades (camada Model) da base de dados. O Django controla a base de dados com o seu [ORM próprio](https://docs.djangoproject.com/pt-br/4.1/topics/db/queries/) e [migrations](https://docs.djangoproject.com/pt-br/4.1/topics/migrations/).

`admin.py` tem classes que registram os modelos que serão manipulados pelos usuários administradores do site na rota `/admin`

`/migrations` é um diretório que tem todas as migrações geradas pelo comando `makemigrations` (ou que raramente são criadas manualmente) e que são aplicadas a base de dados.

### Arquivo *.env*

Esse arquivo deve ser criado conforme as instruções da seção [Como rodar](#como-rodar). Sem ele, o projeto não funciona.