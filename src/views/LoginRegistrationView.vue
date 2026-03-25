<template>

    <div v-if="!isNewUser">
        <div class="flex-container-parent">
            <div class="flex-container">
                <div style="margin: 20px;">
                    <div class="fields">
                        <div>User ID</div>
                        <div>
                            <input disabled="true" v-model="registeredUser.userId">
                        </div>
                    </div>

                    <div class="fields">
                        <div>
                            Password
                        </div>
                        <div>
                            <input type="password" v-model="registeredUser.password">
                        </div>
                    </div>

                    <div class="fields">
                        <div style="display: flex; gap: 10px;">
                            <button @click="login">Login</button>
                            <spinner v-if="inProgress" size="small"></spinner>
                        </div>
                        <a v-if="!isRegisteredAlready" href="javascript:void(0)" @click="toogleRegistration">New User? Register Here</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-else>
        <div class="flex-container-parent">
            <div class="flex-container">
                <div style="margin: 20px;">
                    <div class="fields">
                        <div>Insert user mail</div>
                        <div>
                            <input type="email" v-model="newUser.mail" placeholder="demo123@gmail.com">
                        </div>
                    </div>

                    <div class="fields">
                        <div>
                            Password
                        </div>
                        <div>
                            <input v-model="newUser.password">
                        </div>
                    </div>

                    <div class="fields">
                        <div style="display: flex; gap: 10px;">
                            <button @click="register">Register</button>
                            <spinner v-if="inProgress" size="small"></spinner>
                        </div>
                        <a href="javascript:void(0)" @click="gotoLogin">{{ registrationMessage }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<style>
.flex-container-parent {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: aqua;
}

.flex-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: aliceblue;
    width: 500px;
    height: 200px;
    justify-content: space-around;
}

.fields {
    display: flex;
    justify-content: space-between;
    gap: 40px;
    margin-bottom: 20px;
}
</style>

<script>
import axios from "axios"
import spinner from "@/components/spinner.vue";

export default {
    name: "LoginRegistration",
    components: {
        spinner
    },
    data() {
        return {
            isNewUser: false,
            newUser: {
                mail: null,
                password: null
            },
            registeredUser: {
                userId: null,
                password: null
            },
            registrationMessage: 'Registered already? Goto login',
            isRegisteredAlready: true,
            inProgress: false
        }
    },
    methods: {
        toogleRegistration() {
            debugger;
            this.isNewUser = true;
        },

        async register() {
            debugger;
            this.inProgress = true;
            var userMail = this.newUser.mail;
            var password = this.newUser.password;
            if (!userMail || !password) {
                alert('mail or, password is not included.');
                this.inProgress = false;
                return;
            }
            var res = await axios.get("https://express-app-r2vg.onrender.com/register/userMail/" + userMail + "/password/" + password); //https://express-app-r2vg.onrender.com/ //http://localhost:5000/events/
            res = res.data;
            if (!res || !res.ok) {
                alert("Couldn't register user. Status:" + res.status);
                this.inProgress = false;
                return;
            }
            localStorage.setItem('userId', res.userId);
            this.registrationMessage = 'Registration successful. Go to login';
            this.registeredUser.userId = res.userId;
            this.inProgress = false;
            alert('User Registered Successfully.');
        },

        gotoLogin() {
            debugger;
            this.isNewUser = false;
        },

        async login() {
            debugger;
            this.inProgress = true;
            var userId = this.registeredUser.userId;
            var password = this.registeredUser.password;
            if(!userId || !password) {
                alert('userId or, password not provided.');
                this.inProgress = false;
                return;
            }
            var res = await axios.get("https://express-app-r2vg.onrender.com/login/userId/" + userId + "/password/" + password); //https://express-app-r2vg.onrender.com/ //http://localhost:5000/events/
            res = res.data;
            if (!res || !res.ok) {
                alert("User data unavailable. Status:" + res.status);
                this.inProgress = false;
                return;
            }
            var userData = res.data;
            this.inProgress = false;
            if(userData.password === password) {
                alert('Login Successful!');
            } else {
                alert('Incorrect password.');
            }
        }

    },
    created() {
        debugger;
        var userId = localStorage.getItem('userId');
        if (!userId) {
            this.isRegisteredAlready = false;
            alert('UserId unavailable. Please register.');
            return;
        }
        this.registeredUser.userId = userId;
    }
}


</script>