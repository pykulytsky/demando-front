<template>
    <div class="login-main">
        <div class="center grid login-input content-inputs">
            <vs-row align="center" justify="center">
                <h3 class="center">Welcome to Demando!</h3>
            </vs-row>
            <vs-row>
                <vs-col w="12">
                    <vs-input v-model="username" label-placeholder="Username or E-mail">
                        <template #icon>
                            <unicon name="user" fill="royalblue" />
                        </template>
                    </vs-input>
                </vs-col>
            </vs-row>
            <vs-row>
                <vs-col w="12">
                    <vs-input v-model="password" type="password" label-placeholder="Password">
                        <template #icon>
                            <unicon name="lock" fill="royalblue" />
                        </template>
                    </vs-input>
                </vs-col>
            </vs-row>
            <vs-row justify="space-between" align="center">
                <vs-col w="5">
                    <router-link to="/password" class="register-link">Forgot password</router-link>
                </vs-col>
                <vs-col w="6">
                    <vs-checkbox>Remember me</vs-checkbox>
                </vs-col>
            </vs-row>
            <vs-row>
                <vs-button block>Login</vs-button>
            </vs-row>
            <vs-row>
                <router-link class="register-link" to="/register">Don't have an account yet, register here</router-link>
            </vs-row>
        </div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            username: '',
            password: ''
        }
    }
}
</script>


<style>
.login-main {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
}

.login-main .vs-input {
    width: 100%;
    font-size: 20px;

}

.login-main .vs-row {
    margin-bottom: 18px;
}

.register-link {
    font-size: 14px;
    color: royalblue;
}
.register-link:hover {
    color: rgb(132, 132, 187);
}
</style>
