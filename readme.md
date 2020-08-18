# Descrição do Problema

O propósito desta solução é gerar um cronograma de palestras de um evento de programação
baseado em algumas restrições. A entrada consiste em uma lista contendo todas as palestras a
serem ministradas no dia com a sua respectiva duração. As restrições que devem ser
consideradas são as seguintes:

- As palestras serão organizadas em trilhas que possuem duas sessões: uma de manhã e outra
  de tarde;
- A sessão da manhã deve ser finalizada até o horário de almoço;
- A sessão da tarde deve ser finalizada até o horário do happy hour;
- O happy hour possui um horário estimado para começar.
- Múltiplas trilhas podem existir, desde que respeitem as limitações acima e tenham o mesmo
  horário de happy hour

# Arquitetura

Para resolver o problema, uma API será construída utilizando Node.js. A solução será montada
seguindo um modelo de arquitetura em três camadas que pode ser visualizado na figura
abaixo:

![Modelo de Arquitetura de três camadas](https://drive.google.com/uc?export=view&id=1sPmtOnXl2cuFbhWOD2cMQ6-oOTM4GLCg)

## Camada de controle

A camada de controle é responsável por expor os endpoints da API e realizar o roteamento das
requisições para o serviço pertinente. No caso desta solução, a camada de controle expõe um
endpoint que permite a entrada de uma lista de palestras e redireciona esta requisição para o
serviço que cria o cronograma. Nenhuma regra de negócio está presente nesta camada, sendo
ela exclusivamente dedicada para o correto roteamento das requisições.

Além disso, nesta camada estão implementados os middlewares. Esta solução possui um
middleware customizado que é responsável por realizar o parsing da entrada. Logo, uma vez
que a requisição contendo a lista de palestras é disparada, primeiramente ela será &quot;parseada&quot;
pelo middleware para que o serviço pertinente possa realizar o processamento dos dados. É
importante destacar que este middleware considera apenas palestras que possuem um input
válido, isto é, palestras que estejam no formato:

- Nome da Palestra XXmin
- Nome da Palestra lightning

Palestra que não estejam neste formato, são descartadas.

## Camada de serviço

Esta camada é responsável por toda lógica referente as regras de negócio. Nesta camada, o
input já &quot;parseado&quot; pelo middleware será processado para que o cronograma com as diversas
trilhas e seções sejam gerados.

Para esta solução, as seções são geradas através do algoritmo Knapsack 0-1 (ou comumente
conhecido como &quot;algoritmo da mochila&quot;). Este algoritmo recebe como entrada todas as
palestras e uma dada quantidade de tempo em minutos. O retorno deste algoritmo são os IDs
das palestras que serão alocadas dentro daquele período de tempo. O algoritmo é repetido até
que todas as palestras da entrada sejam alocadas em alguma seção. Caso não seja possível
alocar todas as palestras numa mesma trilha, uma nova é criada.

Este algoritmo em a complexidade média de O(n\*t) onde n se refere ao número de palestras e
t se refere a quantidade de tempo disponível. Como o valor de tempo para este projeto é
sempre constante, a complexidade média pode ser considerada como sendo apenas O(n).

O algoritmo do Knapsack 0-1 foi encapsulado numa seção de utilitários permitindo assim uma
maior reusabilidade de código e maior facilidade nos testes da aplicação.

## Camada de acesso a dados

Para este problema, não existe uma camada de acesso a dados implementada. Contudo,
vamos supor que caso fosse necessário persistir os cronogramas gerados em algum banco de
dados, esta camada seria responsável por realizar esta operação.

Além de operações de inserção, esta camada seria responsável por toda e qualquer relação da
aplicação com o banco de dados. Esta arquitetura permite um bom desacoplamento da
estrutura do código e facilita os testes unitários.

# Estrutura final

Segue abaixo a organização de arquivos da aplicação

```
package.json  --Dependências do projeto
/src          --Pasta contendo todo o código fonte da aplicação
    app.js    --Arquivo de entrada da aplicação
    /loaders  --Arquivos necessário para inicialização da aplicação
    /api      --Arquivos relacionados com a camada de controle
    /services --Arquivos relacionados com a camada de serviço
    /utils    --Utilitários
    /models   --Arquivos que seriam relacionados a camada de dados
    /config   --Configuraçoes globais
/tests        --Arquivos relacionados a testes unitários
```

# Rodando a aplicação

Para rodar a aplicação localmente, siga os comandos abaixo:

```
git clone https://github.com/gabrifer/quero-api.git
cd quero-api
npm i
npm start
```

Para rodar os testes unitários, basta executar:

```
npm test
```

# Testando a aplicação

A aplicação está publicada no seguinte caminho do heroku:

```
https://morning-sierra-43845.herokuapp.com/
```

Aceitando chamadas no seguinte endpoint:

```
POST /api/lectures/schedule
body: dados referente as palestras conforme especificado
```

Para realizar uma requisição neste endpoint, utilize o Postman conforme imagem abaixo:

1NWc7zbbBiTEslVs0VMY9Lk3PvdSt1bUn

![Exemplo no de requisição no Postman](https://drive.google.com/uc?export=view&id=1NWc7zbbBiTEslVs0VMY9Lk3PvdSt1bUn)

Utilizando os seguintes dados de entrada:

```json
{
  "data": [
    "Writing Fast Tests Against Enterprise Rails 60min",
    "Overdoing it in Python 45min",
    "Lua for the Masses 30min",
    "Ruby Errors from Mismatched Gem Versions 45min",
    "Common Ruby Errors 45min",
    "Rails for Python Developers lightning",
    "Communicating Over Distance 60min",
    "Accounting-Driven Development 45min",
    "Woah 30min",
    "Sit Down and Write 30min",
    "Pair Programming vs Noise 45min",
    "Rails Magic 60min",
    "Ruby on Rails: Why We Should Move On 60min",
    "Clojure Ate Scala (on my project) 45min",
    "Programming in the Boondocks of Seattle 30min",
    "Ruby vs. Clojure for Back-End Development 30min",
    "Ruby on Rails Legacy App Maintenance 60min",
    "A World Without HackerNews 30min",
    "User Interface CSS in Rails Apps 30min"
  ]
}
```

A saída esperada para esta entrada é a seguinte:

```json
{
  "data": [
    {
      "title": "Track 1",
      "data": [
        "9:00AM Programming in the Boondocks of Seattle 30min",
        "9:30AM Sit Down and Write 30min",
        "10:00AM Woah 30min",
        "10:30AM Rails for Python Developers lightning",
        "10:35AM Lua for the Masses 30min",
        "11:5AM Overdoing it in Python 45min",
        "12:00PM Lunch",
        "13:00PM A World Without HackerNews 30min",
        "13:30PM Ruby vs. Clojure for Back-End Development 30min",
        "14:00PM Pair Programming vs Noise 45min",
        "14:45PM Accounting-Driven Development 45min",
        "15:30PM Common Ruby Errors 45min",
        "16:15PM Ruby Errors from Mismatched Gem Versions 45min",
        "17:00PM Networking Event"
      ]
    },
    {
      "title": "Track 2",
      "data": [
        "9:00AM Rails Magic 60min",
        "10:00AM Communicating Over Distance 60min",
        "11:00AM Writing Fast Tests Against Enterprise Rails 60min",
        "12:00PM Lunch",
        "13:00PM User Interface CSS in Rails Apps 30min",
        "13:30PM Ruby on Rails Legacy App Maintenance 60min",
        "14:30PM Clojure Ate Scala (on my project) 45min",
        "15:15PM Ruby on Rails: Why We Should Move On 60min",
        "17:00PM Networking Event"
      ]
    }
  ]
}
```
