<template>
  <Teleport to="body">
    <div v-if="isVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">Blog Post Information</h2>
          <button class="modal-close" @click="closeModal">
            <span>&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <div class="post-info">
            <div class="info-item">
              <span class="info-label">Title:</span>
              <span class="info-value">{{ post.title }}</span>
            </div>

            <div class="info-item">
              <span class="info-label">Category:</span>
              <span class="info-value">{{ post.category }}</span>
            </div>

            <div class="info-item">
              <span class="info-label">Author:</span>
              <span class="info-value">{{
                post.author || "NepSite Team"
              }}</span>
            </div>

            <div class="info-item">
              <span class="info-label">Created Date:</span>
              <span class="info-value">{{ formatDate() }}</span>
            </div>

            <div class="info-item">
              <span class="info-label">Post ID:</span>
              <span class="info-value">#{{ post.id }}</span>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="modal-btn secondary" @click="closeModal">Close</button>
          <router-link
            :to="`/posts/${post.id}`"
            class="modal-btn primary"
            @click="closeModal"
          >
            View Full Post
          </router-link>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { onMounted, onBeforeUnmount } from "vue";

export default {
  name: "BlogModal",
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    post: {
      type: Object,
      required: true,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    let escapeKeyListener = null;
    let focusTrap = null;

    const closeModal = () => {
      emit("close");
    };

    const formatDate = () => {
      // Always return current date and time
      const now = new Date();
      return now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    // Lifecycle hooks
    onMounted(() => {
      // Add escape key listener for accessibility
      escapeKeyListener = (event) => {
        if (event.key === "Escape" && props.isVisible) {
          closeModal();
        }
      };

      document.addEventListener("keydown", escapeKeyListener);

      // Prevent body scroll when modal is open
      if (props.isVisible) {
        document.body.style.overflow = "hidden";
      }
    });

    onBeforeUnmount(() => {
      // Remove event listeners
      if (escapeKeyListener) {
        document.removeEventListener("keydown", escapeKeyListener);
        escapeKeyListener = null;
      }

      // Restore body scroll
      document.body.style.overflow = "";

      // Clear any timers or intervals
      if (focusTrap) {
        focusTrap = null;
      }
    });

    return {
      closeModal,
      formatDate,
    };
  },
};
</script>
