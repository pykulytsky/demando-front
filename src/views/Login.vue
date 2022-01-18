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
                <vs-button @click="onLogin" block>Login</vs-button>
            </vs-row>
            <vs-row>
                <router-link class="register-link" to="/register">Don't have an account yet, register here</router-link>
            </vs-row>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    data: () => {
        return {
            username: '',
            password: '',
        }
    },
    computed: {
        ...mapGetters(['isLogined', 'currentUser']),
        isEmail() {
            if(this.username.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                return true
            }
            return false
        }
    },
    methods: {
        ...mapActions(['login', 'setLoading']),
        async onLogin() {
            if(this.username !== '' && this.password !== '') {
                await this.login({
                    username: this.username,
                    password: this.password,
                    isEmail: this.isEmail
                })
                console.log("isLogined: ", this.isLogined)
                console.log("currentUser: ", this.currentUser)
                if(this.isLogined) {
                    this.$router.push('/qa')
                }
                else {
                    this.$vs.notification({
                        color: 'danger',
                        icon: '<unicon name="exclamation-triangle" fill="white"/>',
                        position: 'top-center',
                        title: "No account with such data was found",
                        text: "Username, email or password is incorect, please check them and try again!"
                    })
                }
            }
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
    width: 350px;
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
h3 {
    font-weight: 600;
}
</style>
