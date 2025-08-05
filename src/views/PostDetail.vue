<template>
  <div class="post-detail">
    <div v-if="post" class="container">
      <!-- Breadcrumb Navigation -->
      <nav class="breadcrumb">
        <router-link to="/" class="breadcrumb-item">Home</router-link>
        <span class="breadcrumb-separator">/</span>
        <router-link to="/posts" class="breadcrumb-item">Posts</router-link>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">{{ post.title }}</span>
      </nav>

      <!-- Article Header -->
      <header class="article-header">
        <div class="article-meta">
          <span class="post-category">{{ post.category }}</span>
          <span class="post-date">Published on {{ formatPostDate() }}</span>
        </div>
        <h1 class="article-title">{{ post.title }}</h1>
        <div class="article-author">
          <div class="author-avatar">🏔️</div>
          <div class="author-info">
            <span class="author-name">NepSite Team</span>
            <span class="author-role">Nepal Travel Experts</span>
          </div>
        </div>
      </header>

      <!-- Article Content -->
      <article class="article-content">
        <div class="content-wrapper">
          <div class="content-text" v-html="formattedContent"></div>
        </div>
      </article>

      <!-- Article Footer -->
      <footer class="article-footer">
        <div class="footer-actions">
          <router-link to="/posts" class="back-link">
            <span class="back-icon">←</span>
            Back to Posts
          </router-link>
        </div>
      </footer>
    </div>

    <!-- Loading State -->
    <div v-else class="loading-container">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>Loading article...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostDetailPage",
  // NESTED ROUTE COMPONENT: Handles individual post display
  // Receives route parameter :id from /posts/:id route
  data() {
    return {
      post: null,
      allPosts: [],
    };
  },
  computed: {
    formattedContent() {
      if (!this.post) return "";
      return this.post.content
        .replace(/\*\*(.*?)\*\*/g, '<h2 class="content-heading">$1</h2>')
        .replace(/\n\n/g, "</p><p>")
        .replace(/^/, "<p>")
        .replace(/$/, "</p>");
    },
  },

  methods: {
    async loadPosts() {
      try {
        // First try to load from localStorage
        const savedPosts = localStorage.getItem("nepSitePosts");

        if (savedPosts) {
          this.allPosts = JSON.parse(savedPosts);
        } else {
          // If no saved posts, load from the JSON file
          const response = await fetch("/posts.json");
          this.allPosts = await response.json();
        }
      } catch (error) {
        console.error("Error loading posts:", error);
        this.allPosts = [];
      }
    },
    async loadPost() {
      // Extract post ID from route parameter (nested route)
      const postId = parseInt(this.$route.params.id);
      await this.loadPosts();
      this.post = this.allPosts.find((p) => p.id === postId);

      if (!this.post) {
        console.error("Post not found:", postId);
        // Redirect to posts page if post not found
        this.$router.push("/posts");
      }
    },

    formatPostDate() {
      // Always return current date for consistency
      return new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  mounted() {
    this.loadPost();
  },
  watch: {
    $route() {
      this.loadPost();
    },
  },
};
</script>
