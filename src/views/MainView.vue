<script setup>
import { useRouter } from "vue-router";
import { clearToken } from "@/lib/stronghold";

const router = useRouter();

// Функция выхода из системы
async function handleLogout() {
	try {
		await clearToken();
		router.push({ name: "signin" });
	} catch (error) {
		console.error("Error during logout:", error);
		alert("Ошибка при выходе из системы");
	}
}

// Общее модальное окно
function openModal(client, service, date, status) {
  const modal = document.getElementById('clientModal');
  document.getElementById('clientName').value = client;
  document.getElementById('service').value = service;
  document.getElementById('sessionDate').value = date;
  document.getElementById('status').value = status;
  modal.style.display = 'flex';
}

// Функция для закрытия модального окна
function closeModal() {
  document.getElementById('clientModal').style.display = 'none';
}

// Закрытие модального окна при клике вне его
window.onclick = function (event) {
  const modal = document.getElementById('clientModal');
  if (event.target === modal) {
    closeModal();
  }
}

// // Кнопка - сохранить
// document.querySelector('.save-btn').addEventListener('click', function () {
//   alert('Удаление системы!!!');
//   closeModal();
// });


// Удаление модальное окно
function openDelModal() {
  const modal = document.getElementById('delModal');
  modal.style.display = 'flex';
}

function closeDelModal() {
  document.getElementById('delModal').style.display = 'none';
}

window.onclick = function (event) {
  const modal = document.getElementById('delModal');
  if (event.target === modal) {
    closeDelModal();
  }
}

// document.querySelector('.save-btn').addEventListener('click', function () {
//     alert('Удаление системы!!!');
//     closeDelModal();
// });
</script>

<template>
  <div class="container">
    <header>
      <h1>Главная</h1>
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
      <button class="nav-btn" @click="handleLogout">Выход</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Клиент</th>
          <th>Услуга</th>
          <th>Дата сеанса</th>
          <th>Статус</th>
        </tr>
      </thead>

      <tbody>
        <tr onclick="openModal('Анастасия Садник', 'Окрашивание волос', '12.01.2025 12:00', 'Забронирован')">
          <td>Анастасия Садник</td>
          <td>Окрашивание волос</td>
          <td>12.01.2025 12:00</td>
          <td class="status">Забронирован</td>
        </tr>
        <tr onclick="openModal('Екатерина Ветникова', 'Хим. завивка волос', '11.01.2025 10:30', 'Выполняется')">
          <td>Екатерина Ветникова</td>
          <td>Хим. завивка волос</td>
          <td>11.01.2025 10:30</td>
          <td class="status">Выполняется</td>
        </tr>
        <tr onclick="openModal('Арина Акульшина', 'Женская укладка', '08.11.2024 16:00', 'Завершен')">
          <td>Арина Акульшина</td>
          <td>Женская укладка</td>
          <td>08.11.2024 16:00</td>
          <td class="status">Завершен</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Основное модальное окно -->
  <div id="clientModal" class="modal">
    <div class="modal-content">
      <button class="close-btn" onclick="closeModal()">&times;</button>

      <div class="modal-header">
        <h2>Заявка</h2>
        <p>Редактирование</p>
      </div>

      <div class="form-group">
        <label for="clientName">Клиент</label>
        <input type="text" id="clientName" value="Арина Акульшина">
      </div>

      <div class="form-group">
        <label for="service">Услуга</label>
        <select id="service">
          <option value="Окрашивание волос">Окрашивание волос</option>
          <option value="Хим. завивка волос">Хим. завивка волос</option>
          <option value="Женская укладка" selected>Женская укладка</option>
        </select>

      </div>

      <div class="form-group">
        <label for="sessionDate">Дата сеанса</label>
        <input type="text" id="sessionDate" value="08.11.2024 16:00">
      </div>

      <div class="form-group">
        <label for="status">Статус</label>
        <select id="status">
          <option value="Забронирован">Забронирован</option>
          <option value="Выполняется">Выполняется</option>
          <option value="Завершен" selected>Завершен</option>
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

      <label class="del-label">Вы уверены что хотите удалить запить?</label>

      <div class="form-del">
        <button class="save-btn">Удалить</button>
        <button class="save-btn">Отмена</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
