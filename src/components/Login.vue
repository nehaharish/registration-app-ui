<template>
<v-container>
    <v-card width="800" class="pa-5 ml-10">
        <v-container>
            <h4 v-if="loginError">{{loginError}}</h4>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Email"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show ? 'text' : 'password'"
      label="Password"
      hint="At least 10 characters"
      @click:append="show = !show"
      required
    >
    </v-text-field>
    <v-row>
        <v-col>
    <v-checkbox
        class="mt-0"
        v-model="rememberMe"
        label="Remember Me"
        hide-details
    ></v-checkbox>
        </v-col>
        <v-col><p class="red--text">Forgot Password ?</p></v-col>
    </v-row>
    <v-btn @click="loginMethod" color="rgb(226, 226, 214)">Login</v-btn>
    <v-card-text class="mt-5">Don't have account? <span class="red--text">Register Now!</span>
    </v-card-text>
    <v-btn @click="$router.push({ path: '/register' })" color="rgb(226, 226, 214)">Register</v-btn>
   </v-container>
    </v-card>
</v-container>
</template>
<script>
// import { mapState } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: '',
      show: false,
      nameRules: [
        (v) => !!v || 'Name is required',
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    };
  },
  computed: {
    loginError() {
      return this.$store.state.loginError;
    },
  },
  methods: {
    async loginMethod() {
      await this.$store.dispatch('login', { email: this.email, password: this.password });
      if (this.$store.state.loginSuccess) {
        if (this.$route.path !== '/') this.$router.push({ path: '/' });
      }
    },
  },
};
</script>
