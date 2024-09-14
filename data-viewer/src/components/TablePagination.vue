<!-- Pagination.vue -->
<template>
  <div class="flex justify-center mt-4">
    <!-- Previous Button -->
    <!-- <button
      @click="previousPage"
      :disabled="currentPage === 1"
      class="px-4 py-2 mx-1 bg-gray-300 text-white rounded hover:bg-gray-400 disabled:opacity-50"
    >
      Previous
    </button> -->

    <!-- First Page Button -->
    <button
      v-if="showFirstPage"
      @click="goToPage(1)"
      class="px-4 py-2 mx-1 bg-gray-300 text-black rounded hover:bg-gray-400"
    >
      1
    </button>

    <!-- Ellipsis for the gap -->
    <span v-if="showEllipsisStart" class="px-4 py-2 mx-1 text-gray-600">...</span>

    <!-- Page Numbers -->
    <button
      v-for="page in pagesToShow"
      :key="page"
      @click="goToPage(page)"
      :class="{'bg-blue-500 text-white': currentPage === page, 'bg-gray-300 text-black': currentPage !== page}"
      class="px-4 py-2 mx-1 rounded hover:bg-blue-600"
    >
      {{ page }}
    </button>

    <!-- Ellipsis for the gap -->
    <span v-if="showEllipsisEnd" class="px-4 py-2 mx-1 text-gray-600">...</span>

    <!-- Last Page Button -->
    <button
      v-if="showLastPage"
      @click="goToPage(totalPages)"
      class="px-4 py-2 mx-1 bg-gray-300 text-black rounded hover:bg-gray-400"
    >
      {{ totalPages }}
    </button>

    <!-- Next Button -->
    <!-- <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 mx-1 bg-gray-300 text-white rounded hover:bg-gray-400 disabled:opacity-50"
    >
      Next
    </button> -->
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  computed: {
    pagesToShow() {
      let start = Math.max(this.currentPage - 1, 1);
      let end = Math.min(this.currentPage + 1, this.totalPages);
      let pages = [];

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    },
    showFirstPage() {
      return this.currentPage > 2;
    },
    showLastPage() {
      return this.currentPage < this.totalPages - 1;
    },
    showEllipsisStart() {
      return this.showFirstPage && this.currentPage > 3;
    },
    showEllipsisEnd() {
      return this.showLastPage && (this.currentPage < this.totalPages - 2 || this.totalPages <= 0);
    }
  },
  methods: {
    goToPage(page) {
      this.$emit('update:currentPage', page);
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.$emit('update:currentPage', this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('update:currentPage', this.currentPage + 1);
      }
    }
  }
}
</script>

<style scoped>
/* Optional: Add custom styles if needed */
</style>
