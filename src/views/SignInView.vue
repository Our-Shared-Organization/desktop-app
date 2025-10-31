<script setup>
import { invoke } from "@tauri-apps/api/core";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { storeToken, loadToken } from "@/lib/stronghold";
import { isTokenValid } from "@/lib/jwt";

const router = useRouter();
const route = useRoute();

const login = ref("");
const password = ref("");
const errorMessage = ref("");
const statusMessages = ref([]);
const isSubmitting = ref(false);
const isCheckingToken = ref(true);

const pushStatus = (message) => {
  statusMessages.value = [...statusMessages.value, message];
};

// Check for valid token on mount
onMounted(async () => {
  try {
    const token = await loadToken();
    
    if (token && isTokenValid(token)) {
      pushStatus("Valid token found. Logging in automatically...");
      
      // Redirect to the intended page or main page
      const redirectPath = route.query.redirect || '/';
      router.push(redirectPath);
    }
  } catch (error) {
    console.error("Ошибка проверки токена:", error);
  } finally {
    isCheckingToken.value = false;
  }
});

const handleSubmit = async (event) => {
  event.preventDefault();
  errorMessage.value = "";
  statusMessages.value = [];
  isSubmitting.value = true;

  pushStatus("Подключение к API...");

  try {
    const result = await invoke("authenticate", {
      login: login.value,
      password: password.value,
    });

    if (result.token) {
      pushStatus("Шифрование учетных данных...");
      try {
        await storeToken(result.token);
        pushStatus("Токен успешно сохранен.");
      } catch (storeError) {
        console.error("Не удалось сохранить токен авторизации", storeError);
        pushStatus("Не удалось сохранить токен. Шифрование не выполнено.");
      }
      
      // Redirect to the intended page or main page
      const redirectPath = route.query.redirect || '/';
      router.push(redirectPath);
    } else {
      pushStatus("Authentication succeeded but no token returned.");
      errorMessage.value = "Не удалось получить токен авторизации.";
    }
  } catch (error) {
    pushStatus("API request failed.");
    errorMessage.value = error || "Ошибка входа. Проверьте данные.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="login-container">
    <h1 class="login-title">Вход</h1>

    <div v-if="isCheckingToken" class="checking-message">
      Проверка сохраненных учетных данных...
    </div>

    <form v-else @submit="handleSubmit">
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <ul v-if="statusMessages.length" class="status-list">
        <li v-for="status in statusMessages" :key="status">
          {{ status }}
        </li>
      </ul>
      
      <div class="form-group">
        <label for="login">Логин:</label>
        <input type="text" id="login" name="login" v-model="login" required>
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" id="password" name="password" v-model="password" required>
      </div>

      <button type="submit" class="login-button" :disabled="isSubmitting">
        {{ isSubmitting ? "Подождите..." : "Вход" }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  margin-top: 35px;
  background-color: rgba(255, 255, 255, 0.86);
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 40px;
  color: #6B6B6B;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #6B6B6B;
}

input {
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
  color: #FCF5F5;
  outline: none;
  border: 0;
  background-color: #6B6B6B;
}

input:focus {
  outline: none;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #6B6B6B;
  color: rgba(255, 255, 255, 0.64);
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.login-button:hover {
  background-color: #464646;
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
}

.status-list {
  background-color: rgba(255, 255, 255, 0.7);
  color: #464646;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
  list-style: none;
}

.status-list li {
  margin-bottom: 4px;
}

.status-list li:last-child {
  margin-bottom: 0;
}

.checking-message {
  background-color: rgba(107, 107, 107, 0.1);
  color: #6B6B6B;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
}
</style>
