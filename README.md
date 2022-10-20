# Smart Games

Site de jogos eletrônicos para uma loja fictícia. Feito com Django, MySQL e React.

## Como rodar

Resumindo, é necessário rodar a API e o Frontend separadamente, seguindo os passos abaixo. 

No futuro, há planos para rodar o projeto com Docker, usando apenas 1 comando: `docker-compose up`.

Requisitos:

- Python 3+
- Node / Yarn

O projeto usa comandos de terminal Windows PowerShell, mas é possível usar qualquer terminal de sua preferência. (Que tal tentar rodar o projeto no seu celular com [Termux](https://termux.dev/en/)?)

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

Agora você pode ver o backend funcionando e manipular os dados pelo painel de administração na rota `/admin` da API.

### Rodando o Front-end

1. Entre na pasta frontend pelo terminal `cd .\frontend\`
2. Instale as dependências com `yarn`
3. Rode o frontend com `yarn dev --host` (note os IPs que o terminal indicar)
4. Acesse o app em `localhost:5173` no computador

### Acessando no celular

Para ver o app mobile (PWA), siga os passos a seguir:

1. No seu celular, acesse o frontend por um dos IPs indicados no passo 3 acima (Ex: `http://ip.do.frontend:5173`) *OBS: O celular precisa estar na mesma rede que o dispositivo que estiver rodando o projeto*
2. De preferência use Chrome, e nas opções, clique em "Adicionar à tela inicial"
3. Clique em Adicionar
4. Quando terminar de instalar, vá para a tela inicial do celular e procure o app SmartGames
5. Clique no app SmartGames

*OBS: Essa seção ainda será melhorada, e provavelmente terá como rodar o projeto inteiro com [Docker](https://www.docker.com/) (`docker-compose up`).*

## Entendendo o projeto

Movido para [`CONTRIBUTE.md`](CONTRIBUTE.md)

Se desejar entender o projeto com mais detalhes, veja o arquivo [CONTRIBUTE.md](CONTRIBUTE.md)