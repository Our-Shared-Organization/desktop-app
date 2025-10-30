<script setup>
import { invoke } from "@tauri-apps/api/core";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const login = ref("");
const password = ref("");
const errorMessage = ref("");

const handleSubmit = async (event) => {
  event.preventDefault();
  errorMessage.value = "";

  try {
    const result = await invoke("authenticate", {
      login: login.value,
      password: password.value,
    });

    if (result.token) {
      router.push({ name: 'main' });
    }
  } catch (error) {
    errorMessage.value = error || "Ошибка входа. Проверьте данные.";
  }
};
</script>

<template>
  <div class="login-container">
    <h1 class="login-title">Вход</h1>

    <form @submit="handleSubmit">
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <div class="form-group">
        <label for="login">Логин:</label>
        <input type="text" id="login" name="login" v-model="login" required>
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" id="password" name="password" v-model="password" required>
      </div>

      <button type="submit" class="login-button">Вход</button>
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
</style>
