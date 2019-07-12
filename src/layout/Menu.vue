<template>
  <ion-menu-toggle auto-hide="false">
  <div class="ion-page sidebar">
    <ion-header no-border>
      <!-- <ion-toolbar> -->
      <ion-item>
        <div id="site-logo"></div>
      </ion-item>

      <ion-item
        v-if="$store.state.user.user.email"
        button
        @click="$router.push('/profile')"
      >
        <div style="min-height:120px;">
          <div style="margin-top:20px">
            <ion-row>

                <ion-col size="4">
                  <ion-avatar v-if="avatar">
                    <img :src="avatar"/>
                  </ion-avatar>
                </ion-col>

              <ion-col size="8" style="padding:12px">
                <p style="margin:4px">
                  {{ $store.state.user.user.name }}<br />
                  {{ username }}
                </p>
              </ion-col>
            </ion-row>
          </div>
        </div>
      </ion-item>

      <ion-item
        v-if="!$store.state.user.user.email"
        button
        @click="$router.push('/profile/login')"
      >
        <ion-icon slot="start" name="person"></ion-icon>
        <ion-label>
          Login
        </ion-label>
      </ion-item>

      <!-- </ion-toolbar> -->
    </ion-header>

    <ion-content>
      <ion-list lines="none">
        <!--
        <ion-list-header>
          Navigate
        </ion-list-header>
        -->
          <!-- dynamic menu items -->

          <ion-item-group v-for="(item, idx) in menuItems" :key="idx">
            <ion-item button @click="menuItemClicked(item)">
              <ion-icon v-if="item.icon" slot="start" :name="item.icon"></ion-icon>
              <ion-label>
                {{ item.title }}
              </ion-label>
            </ion-item>
          </ion-item-group>

          <ion-item v-if="$store.state.user.user.email" button @click="logout">
            <ion-icon slot="start" name="exit" @click="logout"></ion-icon>
            <ion-label>
              Logout
            </ion-label>
          </ion-item>
      </ion-list>
    </ion-content>
  </div>
  </ion-menu-toggle>
</template>
<script>
export default {
  data() {
    return {};
  },

  computed: {
    avatar() {
      if (!this.$store.state.user.user || !this.$store.state.user.user.email) {
        return null;
      }
      let name = (this.$store.state.user.user.email).replace('@','-');
      return `https://api.adorable.io/avatars/285/${name}@adorable.io.png`;
    },
    menuItems() {
      return this.$store.state.ui.menu || [];
    },
    username() {
      return (this.$store.state.user.user.email || "").split("@")[0];
    }
  },

  methods: {
    logout() {
      this.$firebase.auth().signOut();
      this.$store.commit("user/setUser", null);
    },

    menuItemClicked(item) {
      if (item.route) {
        this.$router.push(item.route);
      }
      if (item.emit) {
        this.$root.$emit(item.emit, item);
      }
    }
  }
};
</script>

