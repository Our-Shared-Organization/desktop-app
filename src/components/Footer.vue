<template>

</template>

<style scoped>
.footer {
    border-top: 1px solid #2d2d2d;
    background-color: #0a0a0a;
}

.footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 3rem 0;
}

@media (min-width: 768px) {
    .footer-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

.footer-logo {
    font-size: 2.5rem;
    color: #fafafa;
}

.footer-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.footer-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.footer-info p {
    font-size: 0.875rem;
    color: rgba(250, 250, 250, 0.6);
}
</style>