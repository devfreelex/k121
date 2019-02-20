# **App para amigo secreto**

 O App foi desenvolvido com uma biblioteca que eu mesmo estou criando.
 Você pode ler mais sobre ela aqui: <https://github.com/devfreelex/pam>

 A idéia da biblioteca orinalmente é fazer com javascript simples, es6+
 o que os grandes frameworks fazem com um monte de mágica.

 A biblioteca implementa alguns padrões, inclusive segue os pricipios básicos
 de orientação a objetos.

## Introdution

O App utiliza em sua estrutura algumas bibliotecas de javascript e procurei manter
a estrutura o mais simples possível, embora não ter sido fácil arranjar tempo para
cuidar disso, já que meus dias estão super corridos no trabalho.

Veja a estrutura de diretórios dos app:

```
api {Aqui está tudo que a api realiza no back end}
|---controllers
|---middlewares
|---models
|---routes
|---schemas
configs { Aqui temos configurações básicas do app}

public { Aqui temos o front end da aplicação}
|---lib
    |---src
    |---assets
    |   |--css
    |      |--global.css
    |      |--reset.css
    |
    |---components
    |   |--your componts
    |
    |---directives
    |   |--your directives
    |
    |---services
    |   |--your services
    |
    |---helpers
    |   |--your helpers
    |
    |---validators
    |   |--your validators
    |
    |---store
    |   |--index
    |   |--state
    |   |--actions
    |   |--mutations
    |
    main.js
    index.html

app.js
package.json
REAMDE.md
```

**##Back End**

A api foi desenvolvida com KOA que é um framework criando pela mesma equipe
que criou o express.

A grande vantagem do koa é sua simplicidade e modularidade.

Veja mais sobre KOA aqui: <https://koajs.com/>

Além de usar koa, também estou utilizando a api do google para realizar
envio de e-mails através do gmail com autenticação segura baseada no OAuth2.

Leia mais sobre a api do google aqui: <https://developers.google.com/gmail/api/?hl=pt>

Utilizei também o mongodb na mLab, caso não a conheça, basta acessar: <https://mlab.com/>
eles oferecem um montão de coisas legais pra nós (devs), algumas com sandbox gratuíto como
é o caso do mongodb.

Pra fechar o assunto de db, o ODM utilizado foi o Mongoose mesmo.

**Obs:**

Sei que na sua análise, observará que não há um middleware para tratamento de erros, nem
tão pouco para retorno de respostas padrão.

&#1F605 Fico devendo!

### **Get Started**
---
Para rodar o projeto você pode utilizar o comando, `npm run dev`. Isso,
disponibilizará na porta 3200 para rodar a aplicação.

Você também precisará do `nodemon`, se ainda não o tem instalado globalmente,
faça isso utilizando o comando `npm install nodemon -g`

As demais dependências já estão listadas no package.json então, basta rodar
um npm install.

Se ficou é uma decepção ter que rodar o app localmente, por favor, me perdoe.

Infelizmente meu trabalho está me impondo uma rotina ferrenha e não estou tendo
muito tempo, mesmo, para fazer coisas muito importantes para mim, como é o caso
aqui.

```
  "dependencies": {
    "gmail-send": "^1.2.14",
    "googleapis": "^37.2.0",
    "joi": "^14.3.1",
    "koa": "^2.7.0",
    "koa-body": "^4.0.8",
    "koa-logger": "^3.2.0",
    "koa-router": "^7.4.0",
    "koa-static": "^5.0.0",
    "mailgun-js": "^0.22.0",
    "mongoose": "^5.4.13",
    "nodemailer": "^5.1.1"
  },

```

**Obs:**
Se por acaso algo der errado durante a instalação ou mesmo rodando o app.
Delete o arquivo **package-lock.json** e **node_modules** presente na raiz do projeto
e execute novamente `npm install`.

**## App Resources**

O front end da aplicação conta com recursos simples como
uma tela contendo os componentes de header, users e raffle.

Traduzindo...

Significa que ao clicar no botão novo, um formulário será exibido
para que possa realizar um cadastro de usuário.

Esse botão também tem uma função de toggle, para exibir e ocultar o formulário.

Significa também que o component users, exibe caixas contendo imagem, nome e email
de usuários cadastrados e disponibiliza em sua interface 2 botões (editar e remover),
acredito que essas funcionalidades dos botões são óbvias, por tanto, não falarei
mais detalhes.

Por fim, temos o component raffle no rodapé da página. Ele contém um botão (sortear)
responsável por disparar a action que consome o serviço dedicado a combinar randomicamente
os usuários cadastrados, realizando assim o sorteio do amigo secreto e em último estágio,
enviando o e-mail notificando cada usuário sobre o seu par na brincadeira.

**## Last considerations**

Sei que o teste deveria ter sido feito com react. Mas, não resisti a tentação
de desenvolver com o PAM (<https://github.com/devfreelex/pam>).

Espero que levem em consideração todo o esforço que fiz para demonstrar meus
conhecimentos.

Eu sinceramente ficaria muito feliz se pensassem assim:
O cara desenvolveu um app reativo utilizando simplismente javascript, criou uma 
biblioteca para isso... Imagina o que ele pode fazer com grandes frameworks como
Angular, react ou Viu por exemplo.

Por último, como está nas minhas entranhas sempre colaborar com algo, peço carinhosamente
que acessem <https://svelte.technology/> e <https://sapper.svelte.technology/>.

Esses frameworks são a nova tendência para os próximos anos quando pensamos em frameworks sem
frameworks.

Achei os dois muito interessante e quero compartilhar esse conhecimento também com você.