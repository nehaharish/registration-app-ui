<template>
<v-container>
    <v-card width="800" class="pa-5 ml-10">
        <v-container>
            <h4 v-if="loginRegister">{{loginRegister}}</h4>
       <v-text-field
      v-model="firstName"
      :rules="[rules.nameRules]"
      label="First Name"
      required
    ></v-text-field>
     <v-text-field
      v-model="lastName"
      :rules="[rules.nameRules]"
      label="Last Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      :rules="[rules.emailRules]"
      label="Email"
      required
    >
    </v-text-field>
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
    <v-btn @click="registerUser()" color="rgb(226, 226, 214)">Register</v-btn>
   </v-container>

    </v-card>
</v-container>
</template>
<script>
export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      show: false,
      rules: {
        nameRules: (v) => !!v || 'Name is required',
        emailRules: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      },
    };
  },
  computed: {
    loginRegister() {
      return this.$store.state.registerError;
    },
  },
  methods: {
    async registerUser() {
      await this.$store.dispatch('register', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      });
      if (this.$store.state.registerSuccess) {
        this.$router.push({ path: '/' });
      }
    },
  },
};
</script>
