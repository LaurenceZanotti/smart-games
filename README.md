# Smart Games

Site de jogos eletrônicos para uma loja fictícia. Feito com Django, MySQL e React.

## Como rodar

### Rodando a API

1. Criar ambiente virtual `python -m venv venv`
2. Ativar ambiente virtual (Windows) `.\venv\Scripts\activate`
3. Instalar dependências `pip install -r requirements.txt`
4. Migrar banco de dados `python manage.py migrate`
5. Carregar dados de teste iniciais `python manage.py loaddata dados_iniciais`
6. Criar arquivo `.env` na pasta raiz do projeto e insira

```
DJANGO_SECRET_KEY="insirasuasecretkeyaqui-4629f2d1f561fe23c6062f522f5c37093c20eea0"
DEBUG=True
DESCONTO20=desconto-smart-games-20-a2468cb34a5bf75d9861628d258d1f01
DESCONTO50=desconto-smart-games-50-0b767dc57983564719fef11542173554
DESCONTO70=desconto-smart-games-70-69dd604b962e9def4eee5e1b54d2fe50
```

6. Rodar a api com `python manage.py runserver 0.0.0.0:8000`
8. Acessar `localhost:8000/admin` no seu navegador e entrar com usuário `admin` e senha `secret` (por favor mude o usuário e senha se rodar em produção)

Agora você pode ver o backend funcionando e manipular os dados pelo painel de administração

### Rodando o Front-end

1. Entre na pasta frontend pelo terminal `cd .\frontend\`
2. Instale as dependências com `yarn`
3. Rode o frontend com `yarn dev --host` (note os IPs que o terminal indicar)
4. Acesse o app em `localhost:5173` no computador

### Acessando no celular

Para ver o app mobile (PWA), siga os passos a seguir:

1. No seu celular, acesse o frontend pelo IP indicado no passo 3 acima (Ex: `http://ip.do.frontend:5173`)
2. De preferência use Chrome, e nas opções, clique em "Adicionar à tela inicial"
3. Clique em Adicionar
4. Quando terminar de instalar, vá para a tela inicial do celular e procure o app SmartGames
5. Clique no app SmartGames

*OBS: Essa seção ainda será melhorada, e provavelmente terá como rodar o projeto inteiro com [Docker](https://www.docker.com/) (`docker-compose up`).*

## Entendendo o projeto

Essa seção tem uma breve explicação da estrutura de arquivos do projeto e seus propósitos.

Ao se familiarizar com a estrutura de arquivos, note que 

- O diretório `/smartgames` que define configurações do projeto, rotas, e aplicações WSGI ou ASGI para deploy.

- O diretório `/api` que tem um aplicativo Django que serve rotas seguindo o padrão de *APIs RESTful* e interage com o banco de dados

- O diretório `/frontend` tem um aplicativo React configurado para ser baixado como aplicativo para celular como um PWA

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

### Diretório */frontend*

Esse diretório tem um aplicativo React que roda com [Vite](https://vitejs.dev/), um conjunto de ferramentas para desenvolvimento frontend em diversos frameworks, como React, Vue, Svelte e etc.

`/src` tem os componentes React onde `App.jsx` é o componente principal

### Arquivo *.env*

Esse arquivo deve ser criado conforme as instruções da seção [Como rodar](#como-rodar). Sem ele, o projeto não funciona.