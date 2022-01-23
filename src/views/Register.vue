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
                        <template v-if="username !== '' && !validateUsername" #message-danger>
                            Username not valid
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
            <vs-row>
                <vs-col w="12">
                    <vs-input
                        icon-after
                        v-model="password2"
                        type="password"
                        :visiblePassword="showPassword2"
                        label-placeholder="Confirm password"
                        @click-icon="showPassword2 = !showPassword2"
                    >
                        <template #icon>
                            <unicon v-if="showPassword2" name="eye-slash" fill="royalblue" />
                            <unicon v-else name="eye" fill="royalblue" />
                        </template>
                        <template v-if="validatePassword2" #message-success>
                            Password match
                        </template>
                        <template v-if="!validatePassword2 && password2 !== ''" #message-danger>
                            Password doesn't match
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
import {mapActions, mapGetters} from 'vuex'
import {getUsers} from '../api/auth.api'
export default {
    name: 'Registration',
    metaInfo: {
        title: 'Create new account'
    },
    data: () => {
        return {
            username: '',
            email: '',
            password: '',
            password2: '',
            showPassword: false,
            showPassword2: false,
            registeredUsers: []
        }
    },
    computed: {
        ...mapGetters(['currentUser', 'isLogined']),
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
        validatePassword2() {
            if (this.password === this.password2 && this.password !== '') {
                return true
            }
            else return false
        },
        validateEmail() {
            let valid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email)

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
    watch: {
        currentUser() {
            console.log(this.currentUser)
        }
    },
    methods: {
        ...mapActions(['setLoading', 'register']),
        async registerUser() {
            this.setLoading(true)
            if(this.username == '' || this.email == '' || this.password == '') {
                this.$vs.notification({
                    color: 'warning',
                    icon: '<unicon name="exclamation-triangle" fill="white"/>',
                    position: 'top-center',
                    title: "Some fields in the form are empty",
                    text: "Please fill your username, email or password, they can be empty!"
                })
            }
            else {
                if(this.validateEmail && this.validateUsername && this.getProgressPassword >= 60 && this.validatePassword2) {
                    await this.register({
                        username: this.username,
                        email: this.email,
                        password: this.password}
                    )
                    this.$router.push('/qa')
                }
                else {
                    this.$vs.notification({
                            color: 'danger',
                            icon: '<unicon name="exclamation-triangle" fill="white"/>',
                            position: 'top-center',
                            title: "Some fields in the form are invalid",
                            text: "Please check your username, email or password, they can be invalid!"
                    })
                }
            }
            this.setLoading(false)
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
    width: 350px;
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
