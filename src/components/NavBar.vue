<script setup>
import { useRouter } from "vue-router";
import { clearToken } from '@/lib/stronghold';

const router = useRouter();

const handleLogout = async () => {
    try {
        await clearToken();
        router.push({ name: 'signin' });
    } catch (error) {
        console.error("Error during logout:", error);
    }
};
</script>

<template>
    <nav class="navbar">
        <div class="container">
            <div class="nav-content">
                <div class="nav-links-left">
                    <RouterLink to="/" class="nav-link">Home</RouterLink>
                    <RouterLink to="/masters" class="nav-link">Masters</RouterLink>
                </div>
                <RouterLink to="/" class="logo">Ω</RouterLink>
                <div class="nav-links-right">
                    <RouterLink to="/services" class="nav-link">Services</RouterLink>
                    <RouterLink to="/contacts" class="nav-link">Contacts</RouterLink>
                    <a href="#" @click.prevent="handleLogout" class="nav-link logout-link">Logout</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(10, 10, 10, 0.98);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #2d2d2d;
    z-index: 1000;
}

.logout-link {
    color: #ff4444;
    cursor: pointer;
}

.logout-link:hover {
    color: #ff6666;
}

.nav-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    gap: 3rem;
}

.nav-links-left,
.nav-links-right {
    display: flex;
    gap: 2rem;
}

.nav-link {
    font-size: 0.875rem;
    font-weight: 300;
    letter-spacing: 0.5px;
    color: rgba(250, 250, 250, 0.8);
    transition: color 0.3s;
}

.nav-link:hover,
.nav-link.active {
    color: #daa520;
}

.logo {
    font-size: 2rem;
    color: #fafafa;
    transition: color 0.3s;
}

.logo:hover {
    color: #daa520;
}
</style>