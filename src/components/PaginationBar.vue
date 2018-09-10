<template>
  <div class="pagination-container">
    <nav class="pagination-nav">
      <uib-pagination
        v-model="pagination"
        :total-items="totalItems"
        :force-ellipses="true"
        :boundary-link-numbers="true"
        previous-text="❮"
        next-text="❯"
        :max-size="5  "
        @change="onChange"
      >
      </uib-pagination>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'PaginationBar',
  props: ['totalItems'],
  data: () => ({
    pagination: {
      currentPage: 1
    }
  }),
  methods: {
    onChange: function() {
      this.$emit('change', this.pagination.currentPage)
    }
  }
}
</script>

<style scoped lang="scss">
@import "~bulma/sass/utilities/_all";
@import "~bulma/sass/components/pagination";

.pagination-container {
  margin-top: 2em;

  /deep/ {
    .pagination-nav {
      @extend .pagination;
    }

    .pagination {
      @extend .pagination-list;
      justify-content: center;
      padding-left: 0;
    }

    a[disabled],
    .pagination-page.disabled,
    .pagination-prev.disabled,
    .pagination-next.disabled {
      @extend .pagination-link[disabled];
    }

    .pagination-page,
    .pagination-prev,
    .pagination-next {
      @extend .pagination-link;
      padding-left: 0;
      padding-right: 0;

      &.active {
        @extend .is-current;

        a {
          color: white;
        }
      }

      a {
        display: block;
        padding-bottom: calc(0.8em - 1px);
        padding-left: calc(1.3em - 1px);
        padding-right: calc(1.3em - 1px);
        padding-top: calc(0.8em - 1px);
      }
    }
  }
}
</style>
