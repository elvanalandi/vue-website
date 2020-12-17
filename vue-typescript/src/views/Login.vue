<template>
  <div class="login">
    <LoginPage/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginPage from '../components/LoginPage.vue'; // @ is an alias to /src
import LibraryUser from '../entity/LibraryUser';
import axios from 'axios';

@Component({
  components: {
    LoginPage,
  },
})

export default class Home extends Vue {

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

        axios.post(url, this.user.serialize(), {responseType: 'json'})
      }
    }
  }
}
</script>