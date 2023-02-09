Neste respositório contem o código javascript usado para gerar os níveis do jogo Scrollzz *(v2.\*)*. Você pode acessar seu repositório neste link: https://github.com/refusado/scrollzz.

A partir do desenvolvimento 100% manual da primeira versão do Scrollzz, percebi a necessidade da automação de alguns processos para versões futuras que poderiam surgir e, entre eles, o processo de posicionamento de peças em cada nível do jogo era um trabalho manual extremamente exaustivo, demorado e propenso a erros, sendo assim, aqui está a resolução deste problema.

---

Scrollzz é construído apenas com HTML e CSS, sem linguagens de programação. Objetivando manter o repositório do jogo dessa forma, este script foi desenvolvido em um repositório à parte, uma vez também que é um script de desenvolvimento e não se relaciona com a gameplay ou com a interface do resultado.

Através da lógica presente no `level-generator.js`, um arquivo CSS é gerado, criando estilos a partir de um padrão de seletores de peças e aplicando a devida imagem de background para a mesma. Tudo isso é feito se baseando no nível selecionado e na quantidade de peças escolhidas para o nível - configurados no início do script, com uma combinação aleatória de peças e seguindo algumas regras que se assemalham às regras de um sudoku.

A lógica se assemalha às regras de um sudoku pois o primeiro passo para a randomização das pessas é a construção de uma grade, onde cada coluna representa um bloco do nível e suas linhas representam cada peça em sua posição. Por exemplo, essa é uma grade gerada para um nível de 9 blocos:

```
3 5 4 6 8 1 7 2 9 
4 7 7 7 1 7 5 4 8 
2 3 8 5 4 6 9 9 5 
8 2 6 4 5 4 2 6 7 
6 9 3 3 2 8 8 5 6 
5 4 1 2 7 2 6 3 4 
7 6 2 8 3 3 3 7 2 
1 8 9 9 6 9 1 1 3 
9 1 5 1 9 5 4 8 1 
```
*(Este é um log da variável `compactGrid`, que armazena a grade das peças - um array bidimensional - compactada em uma string)*

A primeira coluna (iniciada com o número 3) é o primeiro bloco do nível e as linhas dessa coluna são as peças em suas respectiva posições. Ou seja, para conseguir colocar a peça correta neste bloco, o jogador precisaria rolar até a penúltima peça pois para o primeiro bloco, deve ser colocada a peça número 1, que se encontra na penúltima posição.

A partir disso, uma nova lógica é executada para criar o conteúdo do arquivo que será gerado, percorrendo pela grade e organiza os seletores e o posicionamento das peças randomicamente. Um exemplo de como a peça é posicionada dentro das folhas de estilo:

```
#b21 .tile:nth-child(8),
#b22 .tile:nth-child(4),
#b23 .tile:nth-child(7),
#b24 .tile:nth-child(1),
#b25 .tile:nth-child(3),
#b26 .tile:nth-child(3),
#b27 .tile:nth-child(9),
#b28 .tile:nth-child(2),
#b29 .tile:nth-child(3) {
  background-image: var(--circle-1);
}
```

<!-- * Esta sequência de código adiciona a primeira peça do puzzle (imagem número 1) à oitava posição do primeiro bloco (`#b21 .tile:nth-child(8)`), à quarta posição do segundo bloco (``) -->
<!-- Cada bloco de um nível tem o seu ID único, nomeados pelo número do nível somado a sua posíção: `#b23` representa o terceiro bloco do nível dois. -->