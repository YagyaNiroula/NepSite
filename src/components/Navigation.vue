<template>
  <!-- Navigation Bar Component -->
  <!-- Uses Vue Router's router-link for client-side navigation -->
  <nav class="navigation">
    <div class="nav-container">
      <!-- Logo with router-link to home page -->
      <router-link to="/" class="nav-logo">
        <span class="logo-icon">🏔️</span>
        <span class="logo-text">NepSite</span>
      </router-link>

      <!-- Navigation links using router-link for SPA navigation -->
      <div class="nav-links">
        <router-link to="/" class="nav-link" active-class="active">
          Home
        </router-link>
        <router-link to="/posts" class="nav-link" active-class="active">
          Posts
        </router-link>
        <router-link to="/about" class="nav-link" active-class="active">
          About
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavigationBar",
};
</script>
