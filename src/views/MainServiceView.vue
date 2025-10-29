<script setup>

</script>

<template>
  <div class="container">
    <header>
      <h1>Услуги</h1>
      <div class="welcome">Здравствуйте, Дмитрий</div>
    </header>

    <div class="navigation">
      <a href="/">
        <button class="nav-btn">
          <RouterLink to="/">Заявки</RouterLink>
        </button>
      </a>

      <a href="/main-service">
        <button class="nav-btn">
          <RouterLink to="/main-service">Услуги</RouterLink>
        </button>
      </a>
      <a href="/main-users">
        <button class="nav-btn">
          <RouterLink to="/main-users">Пользователи</RouterLink>
        </button>
      </a>
      <button class="nav-btn">Редактировать</button>
      <button class="nav-btn">Добавить</button>
      <button class="nav-btn" onclick="openDelModal()">Удалить</button>
      <button class="nav-btn">Выход</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Название</th>
          <th>Описание</th>
          <th>Цена</th>
          <th>Категория</th>
        </tr>
      </thead>

      <tbody>
        <tr
          onclick="openModal('Окрашивание волос', 'Процесс изменения натурального цвета волос с помощью химических или натуральных красителей', '2000', 'Парикмахерские')">
          <td>Окрашивание волос</td>
          <td>Процесс изменения натурального цвета волос
            <p></p>
            с помощью химических или натуральных красителей
          </td>
          <td>2000</td>
          <td class="status">Парикмахерские</td>
        </tr>
        <tr
          onclick="openModal('Хим. завивка волос', 'Процедура, которая позволяет создать долговременные кудри или локоны на волосах', '2500', 'Парикмахерские')">
          <td>Хим. завивка волос</td>
          <td>Процедура, которая позволяет создать
            <p></p>
            долговременные кудри или локоны на волосах
          </td>
          <td>2500</td>
          <td class="status">Парикмахерские</td>
        </tr>
        <tr
          onclick="openModal('Женская укладка', 'Процесс создания определённой формы, объёма или текстуры волос с помощью различных инструментов и средств', '1000', 'Парикмахерские')">
          <td>Женская укладка</td>
          <td>Процесс создания определённой формы, объёма или текстуры
            <p></p>
            волос с помощью различных инструментов и средств
          </td>
          <td>1000</td>
          <td class="status">Парикмахерские</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Основное модальное окно -->
  <div id="clientModal" class="modal">
    <div class="modal-content">
      <button class="close-btn" onclick="closeModal()">&times;</button>

      <div class="modal-header">
        <h2>Услуга</h2>
        <p>Редактирование</p>
      </div>

      <div class="form-group">
        <label for="clientName">Название</label>
        <input type="text" id="clientName" value="Арина Акульшина">
      </div>

      <div class="form-group">
        <label for="service">Описание</label>
        <input type="text" id="service" value="Женская укладка">
      </div>

      <div class="form-group">
        <label for="sessionDate">Цена</label>
        <input type="text" id="sessionDate" value="08.11.2024 16:00">
      </div>

      <div class="form-group">
        <label for="status">Категория</label>
        <select id="status">
          <option value="Парикмахерские">Парикмахерские</option>
          <option value="Парикмахерские">Парикмахерские</option>
          <option value="Парикмахерские" selected>Парикмахерские</option>
        </select>
      </div>

      <button class="save-btn">Сохранить</button>
    </div>
  </div>

  <div id="delModal" class="modal">
    <div class="modal-content">
      <button class="close-btn" onclick="closeDelModal()">&times;</button>

      <div class="modal-header">
        <h2>Удаление</h2>
      </div>

      <label class="del-label">Вы уверены что хотите удалить услугу?</label>

      <div class="form-del">
        <button class="save-btn">Удалить</button>
        <button class="save-btn">Отмена</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
