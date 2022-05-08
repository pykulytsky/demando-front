<template>
    <div class="error-block">
        <h1 class="error-message">404</h1>
        <i>Requested page was not found!  </i>
        <router-link to="/qa">Go to main</router-link>
    </div>
</template>

<style>
.error-block {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    text-align: center;
}
.error-message {
    font-size: 150px;
    margin-bottom: 10px;
}
</style>
