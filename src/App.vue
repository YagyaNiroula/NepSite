<template>
  <div id="app">
    <!-- Navigation component with router-link elements -->
    <Navigation />

    <!-- ROUTER VIEW: Main content area for route components -->
    <!-- Displays different components based on current route -->
    <!-- Home, Posts, About, or PostDetail components -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <div v-if="loading" class="loading-container">
          <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
        <component :is="Component" v-else />
      </transition>
    </router-view>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation,
  },
  data() {
    return {
      loading: false,
    };
  },
  watch: {
    $route() {
      // Show loading for lazy-loaded routes (not Home)
      if (this.$route.path !== "/") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 500); // Minimum loading time for better UX
      }
    },
  },
};
</script>
