<script setup>

</script>

<template>
  <div class="container">
    <header>
      <h1>Пользователи</h1>
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
          <th>Логин</th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Пол</th>
          <th>Телефон</th>
          <th>Роль</th>
          <th>Статус</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>admin</td>
          <td>Даниил</td>
          <td>Лузянин</td>
          <td>М</td>
          <td>+79991234567</td>
          <td>Клиент</td>
          <td class="status">Заблокировать</td>
        </tr>
        <tr>
          <td>klient</td>
          <td>Камиль</td>
          <td>Каспранов</td>
          <td>М</td>
          <td>+79991234567</td>
          <td>Менеджер</td>
          <td class="status">Заблокировать</td>
        </tr>
        <tr>
          <td>dadanet</td>
          <td>Арина</td>
          <td>Акульшина</td>
          <td>Ж</td>
          <td>+79991234567</td>
          <td>Клиент</td>
          <td class="status">Заблокировать</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div id="delModal" class="modal">
    <div class="modal-content">
      <button class="close-btn" onclick="closeDelModal()">&times;</button>

      <div class="modal-header">
        <h2>Удаление</h2>
      </div>

      <label class="del-label">Вы уверены что хотите удалить пользователя?</label>

      <div class="form-del">
        <button class="save-btn">Удалить</button>
        <button class="save-btn">Отмена</button>
      </div>
    </div>
  </div>
</template>
