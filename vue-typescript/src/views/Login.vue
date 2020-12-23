<template>
  <div class="content-full d-flex no-block justify-content-center align-items-center position-relative">
    <div class="card">
      <article class="card-body">
        <router-link :to="isRegister ? '/' : '/?register=true'" class="float-right btn btn-outline-primary">
          Sign {{isRegister ? 'In' : 'Up'}}
        </router-link>
        <h4 class="card-title mb-4 mt-1">Sign {{isRegister ? 'Up' : 'In'}}</h4>
        <form @submit.prevent="doSubmit" @reset.prevent="doReset">
          <div class="form-group">
            <input class="form-control" type="email" v-model="user.username" placeholder="Email" required>
          </div>
          <div v-if="isRegister" class="form-group">
            <input class="form-control" type="text" v-model="user.profileName" placeholder="Profile Name" required>
          </div>
          <div v-if="isRegister" class="form-group">
            <input class="form-control" type="text" v-model="user.address" placeholder="Address" required>
          </div>
          <div class="form-group">
            <input class="form-control" type="password" v-model="user.password" placeholder="Password" required>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block"> 
              {{isLoading ? "Loading..." : isRegister ? 'Register' : 'Login'}}
              <span v-if="isLoading" class="spinner-border spinner-border-sm text-light" role="status">
                <span class="sr-only"></span>
              </span>
            </button>
          </div>
        </form>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import {get} from "lodash";
import { Component, Vue, Prop } from 'vue-property-decorator';
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