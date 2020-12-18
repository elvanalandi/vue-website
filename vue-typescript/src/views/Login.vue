<template>
  <div class="user">
    <router-link :to="isRegister ? '/' : '/?register=true'">
      Sign {{isRegister ? 'In' : 'Up'}}
    </router-link>
    <h1>Sign {{isRegister ? 'Up' : 'In'}}</h1>
    <form @submit.prevent="doSubmit" @reset.prevent="doReset">
      <input type="email" v-model="user.username" placeholder="Email" required>
      <div v-if="isRegister">
        <input type="text" v-model="user.profileName" placeholder="Profile Name" required>
      </div>
      <div v-if="isRegister">
        <input type="text" v-model="user.address" placeholder="Address" required>
      </div>
      <input type="password" v-model="user.password" placeholder="*********" required>
      <br>
      <button type="submit">
        {{isLoading ? "Loading..." : isRegister ? 'Register' : 'Login'}}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import {get} from "lodash";
import { Component, Vue } from 'vue-property-decorator';
import Axios, {AxiosResponse, AxiosError} from 'axios';

import LibraryUser from '../entity/LibraryUser';
import StatusCode from '../common/StatusCode';
import Session from '../common/Session';

@Component
export default class Login extends Vue {

  public user: LibraryUser = new LibraryUser();

  public isLoading: boolean = false;

  public get isRegister() {
    return this.$route.query.register === "true";
  }

  public doReset() {
    this.user = new LibraryUser();
  }

  public doSubmit() {
    if(!this.isLoading) {
      let valid:boolean = this.user.username !== "" && this.user.password !== "";

      if(this.isRegister) {
        valid = valid && this.user.profileName !== "";
      }

      if(valid) {
        this.isLoading = true;

        const baseApi: string = "http://202.152.159.164:8088/perpus/";
        const url: string = `${baseApi}auth/${this.isRegister ? 'do-register' : 'do-login'}` ;

        Axios.post(url, this.user.serialize(), {responseType: 'json'}).then((response: AxiosResponse) => {
          if(get(response, "data.status") === StatusCode.SAVE_SUCCESS) {
            this.$router.push("/");
          } else if (get(response, "data.status") === StatusCode.LOGIN_SUCCESS) {
            Session.set(LibraryUser.InstanceFrom(response.data.data));

            this.$router.push("/home");

            this.$notify({
                group: 'userNotification',
                title: 'Login Success!'
            });
          }
        }).catch((error: AxiosError) => {
          console.error(error);

          this.$notify({
                group: 'userNotification',
                title: 'Connection Failed!'
            });
        }).finally(() => {
          this.isLoading = false;
        })
      }
    }
  }
}
</script>