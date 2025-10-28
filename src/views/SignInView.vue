<script setup>
import { invoke } from "@tauri-apps/api/core";
import { ref } from "vue";

const login = ref("");
const password = ref("");
const authResult = ref("");
const isLoading = ref(false);

const handleSubmit = async (event) => {
  event.preventDefault();
  isLoading.value = true;

  try {
    const response = await invoke("auth", { login: login.value, password: password.value });
    authResult.value = response;
  } catch (error) {
    console.error("Authentication failed:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="login-container">
    <h1 class="login-title">Вход</h1>

    <form @submit="handleSubmit">
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
</style>
