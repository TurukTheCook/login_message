<template>
<div class="container logreg-div md-elevation-10">
	<form novalidate class="md-layout" @submit.prevent="login">
		<md-card class="md-layout-item flex flex-column no-box-shadow">
			<md-card-header class="main-color-bg">
				<div class="md-title text-center">LOG IN</div>
			</md-card-header>
			<div class="p-1" :class="{'alert alert-danger': !success}" v-if="success == false">
				{{message}}
			</div>
			<div class="p-1" :class="{'alert alert-success': success}" v-if="success == true">
				{{message}}
			</div>
			<md-card-content class="flex-grow">
				<md-field>
					<label for="username">Username</label>
					<md-input name="username" id="username" v-model="logUser.username"></md-input>
				</md-field>
				<md-field>
					<label for="password">Password</label>
					<md-input name="password" id="password" v-model="logUser.password" type="password"></md-input>
				</md-field>
			</md-card-content>
			<md-card-actions>
				<md-button type="submit" class="main-color-bg" :disabled="sending">Sign In</md-button>
			</md-card-actions>
			<div class="p-1">
				<p class="text-center">Don't have an account ? 
					<router-link :to="{ name: 'register' }">Sign up</router-link>
				</p>
			</div>
		</md-card>
	</form>
</div>
</template>

<script>
import http from '@/helpers/http'
export default {
  name: 'Login',
  data () {
    return {
      logUser: {
				username: '',
				password: ''
      },
      sending: false,
      success: null,
      message: 'An error has occured..'
    }
  },
  methods: {
		login() {
			this.sending = true
			http.post('auth/login', this.logUser)
				.then(res => {
					this.sending = false
					localStorage.setItem('token', res.data.content.token)
					this.success = res.data.success
					this.message = res.data.message
					
					setTimeout(()=>{
						this.$router.push({ name: 'home' })
					},500);
				})
				.catch(err => {
					this.sending = false
					this.success = err.response.data.success
					this.message = err.response.data.message
				})
		}
  }
}
</script>
