<template>
  <div class="home">
    <!-- Full-screen Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Welcome to NepSite</h1>
        <p class="hero-subtitle">
          Discover the beauty, culture, and adventure of Nepal through stories
          and experiences
        </p>
        <router-link to="/posts" class="cta-button">Explore Posts</router-link>
      </div>

      <!-- Scroll Indicator -->
      <div class="scroll-indicator">
        <span class="scroll-text">Scroll to explore</span>
        <div class="scroll-arrow">↓</div>
      </div>
    </div>

    <!-- Scrollable Featured Posts Section -->
    <div class="featured-section">
      <div class="container">
        <section class="featured-posts">
          <h2>Featured Posts</h2>
          <div class="posts-grid">
            <div v-for="post in featuredPosts" :key="post.id" class="post-card">
              <div class="post-category">{{ post.category }}</div>
              <h3 class="post-title">{{ post.title }}</h3>
              <p class="post-excerpt">{{ getExcerpt(post.content) }}</p>
              <div class="post-meta">
                <span class="post-id">#{{ post.id }}</span>
                <button class="info-btn" @click="showPostInfo(post)">
                  <span class="info-icon">ℹ️</span>
                  Info
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- Modal Component -->
    <BlogModal
      :is-visible="modalVisible"
      :post="selectedPost"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import BlogModal from "@/components/BlogModal.vue";

export default {
  name: "HomePage",
  components: {
    BlogModal,
  },
  setup() {
    const posts = ref([]);
    const modalVisible = ref(false);
    const selectedPost = ref(null);
    let abortController = null;

    const featuredPosts = computed(() => {
      return posts.value.slice(0, 4);
    });

    const loadPosts = async () => {
      try {
        // Create abort controller for cleanup
        abortController = new AbortController();

        const response = await fetch("/posts.json", {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        posts.value = data;
      } catch (error) {
        if (error.name === "AbortError") {
          // Fetch was aborted
        } else {
          console.error("Error loading posts:", error);
          posts.value = [];
        }
      }
    };

    const getExcerpt = (content) => {
      return content.length > 150 ? content.substring(0, 150) + "..." : content;
    };

    const showPostInfo = (post) => {
      selectedPost.value = post;
      modalVisible.value = true;
    };

    const closeModal = () => {
      modalVisible.value = false;
      selectedPost.value = null;
    };

    // Lifecycle hooks
    onMounted(() => {
      loadPosts();
    });

    onBeforeUnmount(() => {
      // Abort any ongoing fetch requests
      if (abortController) {
        abortController.abort();
        abortController = null;
      }

      // Clear any timers or intervals
      // Clear any event listeners
      // Reset reactive data
      posts.value = [];
      modalVisible.value = false;
      selectedPost.value = null;
    });

    return {
      posts,
      modalVisible,
      selectedPost,
      featuredPosts,
      loadPosts,
      getExcerpt,
      showPostInfo,
      closeModal,
    };
  },
};
</script>
