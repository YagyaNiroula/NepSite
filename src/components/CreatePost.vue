<template>
  <div class="create-post">
    <div class="form-container">
      <h2>Create New Post</h2>
      <form @submit.prevent="submitPost">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            v-model="form.title"
            required
            placeholder="Enter post title"
          />
        </div>

        <div class="form-group">
          <label for="category">Category</label>
          <select id="category" v-model="form.category" required>
            <option value="">Select a category</option>
            <option value="Travel">Travel</option>
            <option value="Mountains">Mountains</option>
            <option value="Culture">Culture</option>
            <option value="Heritage">Heritage</option>
            <option value="Adventure">Adventure</option>
            <option value="Cuisine">Cuisine</option>
            <option value="History">History</option>
            <option value="History">Politics</option>
          </select>
        </div>

        <div class="form-group">
          <label for="excerpt">Short Excerpt</label>
          <textarea
            id="excerpt"
            v-model="form.excerpt"
            required
            rows="3"
            placeholder="Write a short excerpt for the posts list..."
          ></textarea>
        </div>

        <div class="form-group">
          <label for="content">Full Content</label>
          <textarea
            id="content"
            v-model="form.content"
            required
            rows="8"
            placeholder="Write your full blog post content here..."
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="button" @click="$emit('cancel')" class="cancel-btn">
            Cancel
          </button>
          <button type="submit" class="submit-btn" :disabled="!isFormValid">
            Create Post
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreatePostForm",
  data() {
    return {
      form: {
        title: "",
        category: "",
        excerpt: "",
        content: "",
      },
    };
  },
  computed: {
    isFormValid() {
      return (
        this.form.title.trim() &&
        this.form.category &&
        this.form.excerpt.trim() &&
        this.form.content.trim()
      );
    },
  },
  methods: {
    async submitPost() {
      if (!this.isFormValid) return;

      try {
        // Get the next available ID
        const response = await fetch("/posts.json");
        const existingPosts = await response.json();
        const nextId = Math.max(...existingPosts.map((post) => post.id)) + 1;

        const newPost = {
          id: nextId,
          title: this.form.title.trim(),
          category: this.form.category,
          author: "NepSite Team",
          createdDate: new Date().toISOString(),
          excerpt: this.form.excerpt.trim(),
          content: this.form.content.trim(),
        };

        // Emit the new post to parent component
        this.$emit("post-created", newPost);

        // Reset form
        this.form = {
          title: "",
          category: "",
          excerpt: "",
          content: "",
        };
      } catch (error) {
        console.error("Error creating post:", error);
        this.$emit("post-error", "Error creating post. Please try again.");
      }
    },
  },
};
</script>
