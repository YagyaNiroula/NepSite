<template>
  <div class="posts">
    <div class="container">
      <div class="header">
        <h1>Blog Posts</h1>
        <button @click="toggleCreateForm" class="create-btn">
          {{ buttonText }}
        </button>
      </div>

      <!-- Search Bar -->
      <div class="search-section">
        <div class="search-container">
          <span class="search-icon">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search posts by title or category..."
            class="search-input"
          />
          <button
            @click="clearSearch"
            class="clear-search-btn"
            v-if="searchQuery"
          >
            ✕
          </button>
        </div>
        <div class="search-stats" v-if="searchQuery">
          <span
            >{{ filteredPosts.length }} of {{ posts.length }} posts found</span
          >
        </div>
      </div>

      <!-- Create New Post Form -->
      <CreatePostForm
        v-if="showCreateForm"
        @post-created="handlePostCreated"
        @post-error="showErrorMessage"
        @cancel="showCreateForm = false"
      />

      <!-- Posts Grid -->
      <div class="posts-grid">
        <div v-for="post in filteredPosts" :key="post.id" class="post-card">
          <div class="post-header">
            <span class="post-category">{{ post.category }}</span>
            <span class="post-id">#{{ post.id }}</span>
          </div>
          <h3 class="post-title">{{ post.title }}</h3>
          <p class="post-content">{{ post.excerpt || post.content }}</p>
          <div class="post-actions">
            <!-- NESTED ROUTE LINK: Links to individual post detail page -->
            <!-- Uses dynamic route parameter :id for specific post -->
            <router-link :to="`/posts/${post.id}`" class="view-btn"
              >View Details</router-link
            >
            <button @click="deletePost(post.id)" class="delete-btn">
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredPosts.length === 0" class="empty-state">
        <h3 v-if="searchQuery">No posts found</h3>
        <h3 v-else>No posts yet</h3>
        <p v-if="searchQuery">
          Try adjusting your search terms or browse all posts.
        </p>
        <p v-else>Create your first blog post to get started!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import CreatePostForm from "../components/CreatePost.vue";

export default {
  name: "PostsPage",
  components: {
    CreatePostForm,
  },
  setup() {
    const posts = ref([]);
    const showCreateForm = ref(false);
    const searchQuery = ref("");
    let abortController = null;

    // Computed property for button text
    const buttonText = computed(() => {
      return showCreateForm.value ? "Cancel" : "Create New Post";
    });

    // Computed property for filtered posts
    const filteredPosts = computed(() => {
      if (!searchQuery.value.trim()) {
        return posts.value;
      }

      const query = searchQuery.value.toLowerCase().trim();
      return posts.value.filter((post) => {
        const title = post.title.toLowerCase();
        const category = post.category.toLowerCase();
        const content = (post.excerpt || post.content || "").toLowerCase();

        return (
          title.includes(query) ||
          category.includes(query) ||
          content.includes(query)
        );
      });
    });

    const loadPosts = async () => {
      try {
        // First try to load from localStorage
        const savedPosts = localStorage.getItem("nepSitePosts");

        if (savedPosts) {
          posts.value = JSON.parse(savedPosts);
        } else {
          // If no saved posts, load from the JSON file
          abortController = new AbortController();

          const response = await fetch("/posts.json", {
            signal: abortController.signal,
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          posts.value = data;

          // Save to localStorage for future use
          localStorage.setItem("nepSitePosts", JSON.stringify(data));
        }
      } catch (error) {
        if (error.name === "AbortError") {
          // Fetch was aborted
        } else {
          console.error("Error loading posts:", error);
          posts.value = [];
        }
      }
    };

    const savePosts = async () => {
      try {
        // Save to localStorage for persistence
        localStorage.setItem("nepSitePosts", JSON.stringify(posts.value));

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Show success message
        showSuccessMessage(
          "Post saved successfully! Your posts are now persistent."
        );

        // Note: In a real app, you'd make an API call to save to the JSON file
      } catch (error) {
        console.error("Error saving posts:", error);
        showErrorMessage("Error saving post. Please try again.");
      }
    };
    const showSuccessMessage = (message) => {
      // Create a temporary success message
      const successDiv = document.createElement("div");
      successDiv.className = "success-message";
      successDiv.textContent = message;
      successDiv.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #DC143C;
          color: white;
          padding: 15px 20px;
          border-radius: 8px;
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          animation: slideIn 0.3s ease;
        `;

      document.body.appendChild(successDiv);

      // Remove after 3 seconds
      setTimeout(() => {
        successDiv.style.animation = "slideOut 0.3s ease";
        setTimeout(() => {
          if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
          }
        }, 300);
      }, 3000);
    };

    const showErrorMessage = (message) => {
      // Create a temporary error message
      const errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      errorDiv.textContent = message;
      errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dc3545;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
      `;

      document.body.appendChild(errorDiv);

      // Remove after 3 seconds
      setTimeout(() => {
        errorDiv.style.animation = "slideOut 0.3s ease";
        setTimeout(() => {
          if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
          }
        }, 300);
      }, 3000);
    };

    const handlePostCreated = (newPost) => {
      posts.value.push(newPost);
      showCreateForm.value = false;

      // Save to localStorage immediately
      localStorage.setItem("nepSitePosts", JSON.stringify(posts.value));

      savePosts();
    };

    const deletePost = (postId) => {
      posts.value = posts.value.filter((post) => post.id !== postId);

      // Save to localStorage immediately
      localStorage.setItem("nepSitePosts", JSON.stringify(posts.value));

      savePosts();
    };

    const toggleCreateForm = () => {
      showCreateForm.value = !showCreateForm.value;
    };

    const clearSearch = () => {
      searchQuery.value = "";
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
      showCreateForm.value = false;
    });

    return {
      posts,
      showCreateForm,
      searchQuery,
      filteredPosts,
      buttonText,
      toggleCreateForm,
      clearSearch,
      loadPosts,
      savePosts,
      showSuccessMessage,
      showErrorMessage,
      handlePostCreated,
      deletePost,
    };
  },
};
</script>
