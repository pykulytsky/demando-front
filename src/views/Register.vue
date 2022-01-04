<template>
    <div class="register-main">
        <div class="center grid login-input content-inputs">
            <vs-row align="center" justify="center">
                <h3 class="center">Welcome to Demando!</h3>
            </vs-row>
            <vs-row>
                <vs-col w="12">
                    <vs-input icon-after v-model="username" label-placeholder="Username">
                        <template #icon>
                            <unicon name="user" fill="royalblue" />
                        </template>
                        <template v-if="validateUsername" #message-success>
                            Valid username
                        </template>
                    </vs-input>
                </vs-col>
            </vs-row>
            <vs-row>
                <vs-col w="12">
                    <vs-input
                        type="email"
                        icon-after
                        v-model="email"
                        label-placeholder="E-mail"
                    >
                        <template #icon>
                            <unicon name="mailbox" fill="royalblue" />
                        </template>
                        <template v-if="validateEmail" #message-success>
                            Valid email
                        </template>
                        <template #message-danger v-if="email !== '' && !validateEmail">
                            Email not valid
                        </template>
                    </vs-input>
                </vs-col>
            </vs-row>
            <vs-row>
                <vs-col w="12">
                    <vs-input
                        icon-after
                        v-model="password"
                        type="password"
                        :visiblePassword="showPassword"
                        :progress="getProgressPassword"
                        label-placeholder="Password"
                        @click-icon="showPassword = !showPassword"
                    >
                        <template #icon>
                            <unicon v-if="showPassword" name="eye-slash" fill="royalblue" />
                            <unicon v-else name="eye" fill="royalblue" />
                        </template>
                        <template v-if="getProgressPassword >= 100" #message-success>
                            Secure password
                        </template>
                    </vs-input>
                </vs-col>
            </vs-row>
            <vs-row justify="flex-end" align="center">
                <vs-checkbox>Remember me</vs-checkbox>
            </vs-row>
            <vs-row>
                <vs-button @click="registerUser" block>Register</vs-button>
            </vs-row>
            <vs-row>
                <router-link class="register-link" to="/login">Already have an account? Login here</router-link>
            </vs-row>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import {getUsers} from '../api/auth.api'
export default {
    data: () => {
        return {
            username: '',
            email: '',
            password: '',
            showPassword: false,
            registeredUsers: []
        }
    },
    watch: {
        email() {
            console.log("not valid: ", this.email !== '' && !this.validateEmail)
        }
    },
    computed: {
        getProgressPassword() {
            let progress = 0

          // at least one number

          if (/\d/.test(this.password)) {
            progress += 20
          }

          // at least one capital letter

          if (/(.*[A-Z].*)/.test(this.password)) {
            progress += 20
          }

          // at menons a lowercase

          if (/(.*[a-z].*)/.test(this.password)) {
            progress += 20
          }

          // more than 5 digits

          if (this.password.length >= 6) {
            progress += 20
          }

          // at least one special character

          if (/[^A-Za-z0-9]/.test(this.password)) {
            progress += 20
          }

          return progress
        },
        validateEmail() {
            let valid = false
            if(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email)) {
                valid = true
            }

            let isEmailUsed = false
            this.registeredUsers.forEach((user) => {
                if(user.email === this.email) {
                    isEmailUsed = true
                }
            })

            return valid && !isEmailUsed
        },
        validateUsername() {
            if(/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(this.username)) {
                return true
            }
            else {
                return false
            }
        }
    },
    methods: {
        ...mapActions(),
        registerUser() {

        }
    },
    async created() {
        this.registeredUsers = await (await getUsers()).data
    }
}
</script>


<style>
.register-main {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
}

.register-main .vs-input {
    width: 100%;
    font-size: 20px;

}

.register-main .vs-row {
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
