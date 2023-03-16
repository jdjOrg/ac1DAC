# Atividade Colaborativa 1 - DAC ( ADS - IFPB CZ )

### Objetivos de aprendizagem

- Saber identificar as características de uma image e container Docker.
- Possuir um overview sobre os principais comandos e customizações.
- Propor estratégias para manutenção de um sistema fazendo uso de containers.

### Metodologia

Esta atividade prática está planejada para ser executada em equipes (duas ou três pessoas) e em duas etapas. A primeira etapa será um levantamento teórico, onde cada equipe deve responder às cinco questões listadas no Teste de objetivos de aprendizagem. As respostas devem estar em um arquivo no repositório. Por fim, a segunda etapa consiste em realizar a atividade prática descrita na Atividade Prática.
Todos os artefatos devem ser entregues em um repositório do Github e o link (apenas um link por equipe) adicionado à atividade no Google Classroom.

### Teste de objetivos de aprendizagem

**1. Qual a diferença entre `image` e `container`?**

Uma imagem (image) é um pacote de software autônomo que contém tudo o que é necessário para executar um aplicativo, enquanto um contêiner (container) é uma instância em execução de uma imagem. Para ser mais específico, uma imagem é um arquivo imutável que contém o código do aplicativo, suas bibliotecas e dependências, bem como outras informações necessárias para executar o aplicativo. As imagens são criadas a partir de um arquivo Dockerfile e podem ser armazenadas em um registro de imagem (como o Docker Hub) para que outras pessoas possam baixá-las e usá-las. Por outro lado, um contêiner é uma instância em execução de uma imagem, é criado a partir de uma imagem e contém o código do aplicativo em execução, bem como qualquer estado ou dados temporários associados a ele, sendo os containers, isolados uns dos outros e do host, o que significa que podem executar em diferentes sistemas operacionais ou versões de bibliotecas sem afetar outros contêineres ou o host.

**2. Qual a diferença entre os comandos `COPY`, `EXPOSE` e `ADD`?**

**Copy**: A instrução copia novos arquivos ou diretórios de uma fonte e adiciona eles aos arquivos do sistema do container em um caminho determinado;

**Add**: O add faz o mesmo que o Copy com a diferença que ele pode copiar arquivos remotamente utilizando uma URL;

**Expose**: Essa instrução informa ao docker quais portas o container deve utilizar em tempo de execução. Você pode especificar para utilizar UDP ou TCP, mas por padrão ele usa o TCP.

**3. Qual a diferença entre os comandos `RUN`, `CMD` e `ENTRYPOINT`?**

Os 3 comandos são usados para finalidades diferentes. O RUN é usado para executar um comando durante o processo de construção da imagem, por exemplo, no comando abaixo, que atualiza o cache do apt e instala o curl na imagem.

```
RUN apt-get update && apt-get install -y curl
```

É importante saber que os comandos RUN são executados apenas durante a construção da imagem e não durante a execução do contêiner.

Já o CMD, é usado para definir o comando padrão que será executado quando o contêiner for iniciado e pode ser substituído por um comando diferente quando o contêiner for iniciado com o argumento docker run. Por exemplo:

```
CMD ["npm", "start"]
```

que define o comando padrão como npm start. Quando o contêiner for iniciado com docker run my-image, o comando npm start será executado por padrão.

Por fim, o comando ENTRYPOINT é semelhante ao CMD, mas é usado para definir um executável que será sempre executado quando o contêiner for iniciado e é executado com os argumentos fornecidos na linha de comando, a exemplo:

```
ENTRYPOINT ["npm", "start"]
```

define o npm start como o executável que será executado sempre que o contêiner for iniciado.

**4. Qual a diferença entre as estratégias de `shell` e `exec`?**

Em Docker, as estratégias de **shell** e **exec** são duas formas diferentes de executar comandos em um contêiner. A estratégia de shell, também conhecida como "shell form", executa o comando dentro de um shell padrão, como o shell bash, a exemplo, para executar o comando **ls -l** dentro de um contêiner, pode-se usar a estratégia de shell da seguinte maneira:

```
docker run myimage ls -l
```

Dessa forma, o comando **ls -l** é executado dentro de um shell dentro do contêiner.

Já a estratégia de **exec**, também conhecida como "exec form", executa o comando diretamente, sem usar um shell padrão e para usá-la precisa-se especificar o comando como uma lista de argumentos, a exemplo, para executar o comando **ls -l** usando a estratégia de exec, pode-se usar o seguinte comando:

```
docker exec mycontainer ls -l
```

Nesse contexto, o comando **ls -l** é executado diretamente no contêiner, sem usar um shell padrão. Em geral, a estratégia de exec é mais eficiente do que a estratégia de shell, pois evita a sobrecarga de execução de um shell dentro do contêiner, bem como a estratégia de exec permite que você execute comandos em um contêiner em execução, enquanto a estratégia de shell só pode ser usada quando você está iniciando um novo contêiner.

**5. Qual a diferença entre os comandos `docker stop <container_id>` e `docker kill <container_id>`?**

O docker stop faz o container parar de uma forma mais suave mandando para ele o comando **SIGTERM** primeiramente e após um tempo ele manda o comando **SIGKILL** para finalizar o processo. Já o docker kill manda apenas o comando **SIGKILL** para finalizar o processo imediatamente.

### Atividade prática

Desenvolva uma aplicação que realize as operações de CRUD para a entidade Livro e Editora. A funcionalidade precisa estar disponível com UI (interface para o usuário) com um template usável. A aplicação desenvolvida precisa estar disponível em contêiner. As demais informações de cadastro podem ser inseridas via script sql.

```
class Livro {
   private int id;
   private String titulo;
   private LocalDate dataDeLancamento;
}

class Editora {
   private int codigo;
   private String localDeOrigem;
   private String nomeFantasia;
}
```

### Requisitos

- RF01 - Implementar classes de acesso aos dados (em memória e via JDBC);
- RF02 - Criar as páginas para edição e listagem da entidade Livro;
- RF03 - Criar as páginas para edição e listagem da entidade Editora;
- RF04 - Criar uma página para realizar uma busca de Livro por titulo;
- RF05 - Criar uma página para realizar uma busca de Editora por localDeOrigem;
- RF06 - Realizar o deploy da aplicação no Docker usando uma das images do Payara.
- RF07 - Realizar o deploy da aplicação usando o Docker Compose.

### Script do banco

```
CREATE TABLE livro(
id serial PRIMARY KEY,
titulo VARCHAR(80),
dataDeLancamento DATE
);

CREATE TABLE editora(
codigo SERIAL PRIMARY KEY,
localDeOrigem VARCHAR(100),
nomeFantasia VARCHAR(100)
);
```

### DotEnv

EXPRESS_HOST = localhost

EXPRESS_PORT = 3003

MONGO_HOST = localhost

MONGO_PORT = 27017

MONGO_DB = ProjetoLivros

REDIS_HOST = localhost

REDIS_PORT = 6379


### Participantes da Equipe

Daniel Oliveira | João Alfredo Alves Marinho Neto | Junior Silva
:------: | :------: | :------:
[![Foto do Integrante Daniel](https://avatars.githubusercontent.com/u/91296669?v=4)](https://github.com/Nadjiel) *Idealizador e Desenvolvedor* | [![Foto do Integrante João Alfredo](https://avatars.githubusercontent.com/u/68473607?v=4)](https://github.com/JoaoAlfredoAlves) *Idealizador e Desenvolvedor* | [![Foto do Integrante Junior](https://avatars.githubusercontent.com/u/47036951?v=4)](https://github.com/juniorsilva2) *Idealizador e Desenvolvedor*
