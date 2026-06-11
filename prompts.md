# CP3 — Prompts e Análise das IAs

**Tema escolhido:** Lista de jogos favoritos  
**IA base do projeto final:** Claude

---

## IAs consultadas

1. **ChatGPT** (OpenAI)
2. **Google Gemini**
3. **Claude** (Anthropic)

---

## Prompt utilizado

Prompt inicial enviado às três IAs (sem refinamentos posteriores):

```
Crie uma aplicação web completa utilizando apenas HTML, CSS e JavaScript puro.

Requisitos:

Tela de login inicial
Usuário: aluno
Senha: fiap2025
Exibir mensagem de erro na tela caso login seja inválido
Não permitir envio de campos vazios no login
Após login bem-sucedido, exibir uma lista de jogos favoritos
A lista deve possuir inicialmente:
Minecraft
GTA V
Valorant
Os dados devem ser armazenados em um array de strings
Permitir adicionar item ao final da lista
Permitir adicionar item ao início da lista
Permitir editar qualquer item individualmente
Permitir remover qualquer item individualmente
A remoção deve ocorrer pela posição do item e não pelo valor
Não permitir adicionar itens vazios
Ao editar um item, se o usuário cancelar ou deixar o campo vazio, o valor original deve ser mantido
Atualizar a interface automaticamente após qualquer alteração
Organizar toda a lógica em funções nomeadas
Não utilizar frameworks ou bibliotecas externas

Gere os arquivos separados:

index.html
style.css
script.js

Explique brevemente as principais funções utilizadas.
```

---

## Análise das respostas

### ChatGPT

**Principais problemas:**
- Validação de item vazio na adição usa `alert()` em vez de mensagem na interface
- Interface visual mais simples, sem botão de logout
- Menos organização entre funções de validação e renderização

---

### Google Gemini

**Principais problemas:**
- Também usa `alert()` ao tentar adicionar jogo vazio (não atende totalmente o requisito de erro na tela)
- Função `obterValorInputValido` mistura leitura do input com exibição de alerta

---

### Claude

**Principais problemas:**
- Código mais extenso, com recursos extras (`escapeHTML`, atalhos de teclado, `DOMContentLoaded`) que não estão explicitamente nos materiais da disciplina

---

## IA escolhida como base: Claude

**Justificativa:**

Escolhi o código gerado pelo **Claude** porque foi a resposta que melhor atendeu aos requisitos obrigatórios da atividade:

- Mensagens de erro visíveis na tela (login e adição de itens)
- Lógica organizada em funções nomeadas por responsabilidade
- Remoção pela posição do item no array, e não pelo valor
- Preservação do valor original na edição quando o usuário cancela ou confirma vazio
- Atualização automática da interface após cada operação CRUD

O projeto final utiliza o código do Claude sem alterações.
