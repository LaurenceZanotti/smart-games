# Contribuições

No momento ainda não aceitamos contribuições. No futuro essa seção pode mudar.

Se quiser entender melhor como o projeto funciona, leia os tópicos abaixo ou me mande uma mensagem. ;)

Voltar para o [README](README.md)

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