# Previsao-de-Tempo-API

Aplicação web de previsão do tempo desenvolvida com **HTML, CSS e JavaScript**, consumindo APIs externas para exibir informações climáticas de acordo com a cidade pesquisada pelo usuário.

## Sobre o projeto

Este projeto foi desenvolvido como prática de **desenvolvimento front-end**, com foco em consumo de APIs, manipulação do DOM, tratamento de erros e atualização dinâmica da interface.

A aplicação permite que o usuário pesquise uma cidade e visualize dados como temperatura, descrição do clima, umidade, velocidade do vento, bandeira do país e uma imagem de fundo relacionada ao local pesquisado.

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* OpenWeather API
* Unsplash API
* Flags API
* Font Awesome
* Google Fonts

## Funcionalidades

* Busca de clima por cidade
* Consumo de API externa de previsão do tempo
* Exibição de temperatura, umidade, vento e descrição climática
* Exibição dinâmica da bandeira do país
* Alteração da imagem de fundo com base na cidade pesquisada
* Validação para campo vazio
* Tratamento de erro para buscas inválidas
* Estado de carregamento no botão de pesquisa
* Interface simples e responsiva

## Estrutura do projeto

```text
Previsao-de-Tempo-API/
├── index.html
├── scripts.js
└── styles.css
```

## Configuração das APIs

Para utilizar o projeto, é necessário adicionar suas próprias chaves de API no arquivo `scripts.js`.

```javascript
const apiKey = "SUA_CHAVE_OPENWEATHER";
const unsplashApiKey = "SUA_CHAVE_UNSPLASH";
```

Por segurança, este repositório não inclui chaves reais de API.

As chaves podem ser obtidas em:

* OpenWeather: para dados climáticos
* Unsplash: para imagens relacionadas à cidade pesquisada

## Como executar

Clone o repositório:

```bash
git clone https://github.com/vinichociai/Previsao-de-Tempo-API.git
```

Acesse a pasta do projeto:

```bash
cd Previsao-de-Tempo-API
```

Abra o arquivo `index.html` no navegador.

## Observação

Como o projeto depende de chaves externas de API, ele não funcionará corretamente sem a configuração das chaves no arquivo `scripts.js`.

## Status

Projeto acadêmico/de estudo utilizado para prática de desenvolvimento front-end, consumo de APIs e manipulação de dados com JavaScript.
