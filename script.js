/* =========================================
   FIAP GameList — script.js
   Toda a lógica organizada em funções nomeadas
   ========================================= */

// ─── Credenciais ───────────────────────────
const VALID_USER = 'aluno';
const VALID_PASS = 'fiap2025';

// ─── Estado da aplicação ───────────────────
let games = ['Minecraft', 'GTA V', 'Valorant'];

// ─────────────────────────────────────────────────────────────
//  FUNÇÕES DE AUTENTICAÇÃO
// ─────────────────────────────────────────────────────────────

/**
 * handleLogin
 * Lê os campos de usuário e senha, valida (campos vazios e
 * credenciais) e, em caso de sucesso, exibe a tela principal.
 */
function handleLogin() {
  const username  = document.getElementById('username').value.trim();
  const password  = document.getElementById('password').value;
  const errorEl   = document.getElementById('login-error');

  clearError(errorEl);

  if (!username || !password) {
    showError(errorEl, 'Preencha usuário e senha para continuar.');
    return;
  }

  if (username !== VALID_USER || password !== VALID_PASS) {
    showError(errorEl, 'Usuário ou senha inválidos. Tente novamente.');
    return;
  }

  showScreen('main-screen');
  renderList();
}

/**
 * handleLogout
 * Limpa os campos do formulário de login e retorna à tela inicial.
 */
function handleLogout() {
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  clearError(document.getElementById('login-error'));
  showScreen('login-screen');
}

// ─────────────────────────────────────────────────────────────
//  FUNÇÕES DE MANIPULAÇÃO DO ARRAY
// ─────────────────────────────────────────────────────────────

/**
 * addGameAtEnd
 * Lê o input de novo jogo e insere o valor no FINAL do array.
 */
function addGameAtEnd() {
  const input = getNewGameInput();
  if (!input) return;

  games.push(input.value);
  input.value = '';
  clearError(document.getElementById('add-error'));
  renderList();
}

/**
 * addGameAtStart
 * Lê o input de novo jogo e insere o valor no INÍCIO do array
 * usando unshift().
 */
function addGameAtStart() {
  const input = getNewGameInput();
  if (!input) return;

  games.unshift(input.value);
  input.value = '';
  clearError(document.getElementById('add-error'));
  renderList();
}

/**
 * editGame
 * Exibe um prompt para o usuário digitar um novo nome para o
 * item na posição `index`. Se o usuário cancelar ou deixar
 * vazio, o valor original é mantido.
 *
 * @param {number} index - Posição do item no array
 */
function editGame(index) {
  const current  = games[index];
  const newName  = prompt(`Editar jogo #${index + 1}:\n\nNome atual: "${current}"\n\nNovo nome:`, current);

  // Usuário cancelou (null) ou deixou vazio → mantém original
  if (newName === null || newName.trim() === '') return;

  games[index] = newName.trim();
  renderList();
}

/**
 * removeGame
 * Remove o item pela sua POSIÇÃO (índice) no array usando splice(),
 * independente do valor que ele contém.
 *
 * @param {number} index - Posição do item no array
 */
function removeGame(index) {
  games.splice(index, 1);
  renderList();
}

// ─────────────────────────────────────────────────────────────
//  FUNÇÕES DE RENDERIZAÇÃO
// ─────────────────────────────────────────────────────────────

/**
 * renderList
 * Reconstrói completamente a lista no DOM a partir do array `games`,
 * atualizando também o contador de itens. Exibe um estado vazio
 * quando o array estiver sem elementos.
 */
function renderList() {
  const listEl  = document.getElementById('game-list');
  const countEl = document.getElementById('game-count');

  listEl.innerHTML  = '';
  countEl.textContent = games.length;

  if (games.length === 0) {
    listEl.innerHTML = `
      <li class="empty-state">
        <span>🎮</span>
        Nenhum jogo na lista. Adicione o primeiro!
      </li>`;
    return;
  }

  games.forEach(function (gameName, index) {
    const li = createGameItem(gameName, index);
    listEl.appendChild(li);
  });
}

/**
 * createGameItem
 * Cria e retorna um elemento <li> completo para um jogo,
 * com número de posição, nome e botões de ação.
 *
 * @param {string} name  - Nome do jogo
 * @param {number} index - Posição no array
 * @returns {HTMLElement}
 */
function createGameItem(name, index) {
  const li = document.createElement('li');
  li.className = 'game-item';

  li.innerHTML = `
    <span class="game-index">${String(index + 1).padStart(2, '0')}</span>
    <span class="game-name">${escapeHTML(name)}</span>
    <div class="game-actions">
      <button class="btn-edit"   onclick="editGame(${index})">Editar</button>
      <button class="btn-remove" onclick="removeGame(${index})">Remover</button>
    </div>`;

  return li;
}

// ─────────────────────────────────────────────────────────────
//  FUNÇÕES AUXILIARES
// ─────────────────────────────────────────────────────────────

/**
 * showScreen
 * Troca a tela visível removendo a classe 'active' de todas e
 * adicionando à tela com o id informado.
 *
 * @param {string} screenId - ID do elemento de tela a exibir
 */
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(function (el) {
    el.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}

/**
 * getNewGameInput
 * Lê e valida o campo de texto para adição de novo jogo.
 * Exibe mensagem de erro e retorna null se o campo estiver vazio.
 *
 * @returns {HTMLInputElement|null}
 */
function getNewGameInput() {
  const input   = document.getElementById('new-game-input');
  const errorEl = document.getElementById('add-error');

  clearError(errorEl);

  if (!input.value.trim()) {
    showError(errorEl, 'O nome do jogo não pode estar vazio.');
    input.focus();
    return null;
  }

  input.value = input.value.trim();
  return input;
}

/**
 * showError
 * Exibe uma mensagem de erro em um elemento específico.
 *
 * @param {HTMLElement} el  - Elemento onde a mensagem será exibida
 * @param {string}      msg - Texto da mensagem
 */
function showError(el, msg) {
  el.textContent = msg;
}

/**
 * clearError
 * Limpa a mensagem de erro de um elemento.
 *
 * @param {HTMLElement} el - Elemento a limpar
 */
function clearError(el) {
  el.textContent = '';
}

/**
 * escapeHTML
 * Sanitiza uma string substituindo caracteres especiais HTML
 * para evitar injeção de código na interface.
 *
 * @param {string} str - String a sanitizar
 * @returns {string}
 */
function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─────────────────────────────────────────────────────────────
//  ATALHOS DE TECLADO
// ─────────────────────────────────────────────────────────────

/**
 * Permite acionar o login pressionando Enter nos campos de login,
 * e adicionar ao final da lista com Enter no campo de novo jogo.
 */
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('username').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') document.getElementById('password').focus();
  });

  document.getElementById('password').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') handleLogin();
  });

  document.getElementById('new-game-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addGameAtEnd();
  });
});
