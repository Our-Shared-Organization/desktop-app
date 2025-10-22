<template>
    <nav class="navbar">
        <div class="container">
            <div class="nav-content">
                <a class="logo">Ω</a>
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

.nav-content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    gap: 3rem;
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
    font-size: 2.5rem;
    color: #fafafa;
    transition: color 0.3s;
}

.logo:hover {
    color: #daa520;
}
</style>