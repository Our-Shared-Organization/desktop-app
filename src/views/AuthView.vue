<script setup lang="ts">
import NavBar from '../components/NavBar.vue';

</script>

<template>

    <body>
        <NavBar />

        <main class="container">
            <div class="login-container">
                <h2 class="login-title">Вход</h2>
                <form>
                    <div class="form-group">
                        <label for="login" class="form-label">Логин:</label>
                        <input type="text" id="login" class="form-input" placeholder="Введите логин">
                    </div>
                    <div class="form-group">
                        <label for="password" class="form-label">Пароль:</label>
                        <input type="password" id="password" class="form-input" placeholder="Введите пароль">
                    </div>
                    <button type="submit" class="login-button">Вход</button>
                </form>
            </div>
        </main>
    </body>
</template>

<style scoped>
.login-container {
    width: 350px;
    padding: 55px;
    background-color: #e0e0e0;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    text-align: center;
}

.login-title {
    font-size: 24px;
    margin-bottom: 35px;
    color: #555;
}

.form-group {
    margin-bottom: 20px;
    text-align: left;
}

.form-label {
    display: block;
    margin-bottom: 5px;
    color: #555;
}

.form-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #999;
    color: white;
}

.login-button {
    width: 100px;
    padding: 8px;
    background-color: #777;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
}

.login-button:hover {
    background-color: #666;
}
</style>