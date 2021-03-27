<template>
  <div class="mt-4 mb-4 flex-grow-1">
    <b-form-input
      v-model="search"
      @input="page = 1"
      placeholder="Enter package name"
    ></b-form-input>

    <div class="d-flex align-items-center mt-4">
      <b-button @click="() => pageChange(+page - 1)" :disabled="page == 1">Prev</b-button>
      <p class="page">{{ page }}</p>
      <b-button @click="() => pageChange(+page + 1)" :disabled="page == maxPage">Next</b-button>
    </div>

    <b-table
      hover
      :items="pagedPackages"
      class="table mt-4"
      @row-clicked="packageHandle"
      tbody-tr-class="table-row"
    ></b-table>
    <div v-if="!pagedPackages.length">
      <strong>No packages for your search</strong>
    </div>
    <b-modal v-model="modalShow" :title="modalTitle" scrollable>
      <div v-if="Object.keys(pickedPackage).length">
        <div v-if="Object.keys(pickedPackage.tags).length" class="mb-4">
          <h5>Tags:</h5>
          <div v-for="(item, name) in pickedPackage.tags" :key="item">
            <strong>{{ name }}</strong> : {{ item }}
          </div>
        </div>
        <div>
          <h5>Verions:</h5>
          <div v-for="item in pickedPackage.versions" :key="item">
            {{ item }}
          </div>
        </div>
      </div>
      <div v-else>
        <strong>Loading error</strong>
      </div>
      <template #modal-footer="{ cancel }">
        <b-button size="sm" variant="primary" @click="cancel()"> Close </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { loadPackages, loadPackageInfo } from "../api";

export default {
  created() {
    this.loadPackagesFromApi();
  },
  // (10 * 1) - 10
  // (10 * 1)
  data() {
    return {
      search: "",
      mostPopularPackages: [],
      countPackagesOnPage: 10,
      page: 1,
      modalShow: false,
      modalTitle: "Package",
      pickedPackage: []
    };
  },
  methods: {
    async loadPackagesFromApi() {
      this.mostPopularPackages = await loadPackages();
    },
    pageChange(count) {
      if (count > 0 && count <= this.maxPage) {
        this.page = count;
      }
    },
    async packageHandle(data) {
      const packageData = await loadPackageInfo(data);
      this.modalTitle = data.name;
      this.pickedPackage = packageData !== "Loading error" ? packageData : [];
      this.modalShow = true;
    }
  },
  computed: {
    startIndex() {
      return this.countPackagesOnPage * this.page - this.countPackagesOnPage;
    },
    endIndex() {
      return this.countPackagesOnPage * this.page;
    },
    maxPage() {
      return Math.ceil(this.filteredPackages.length / this.countPackagesOnPage);
    },
    pagedPackages() {
      return this.filteredPackages.slice(this.startIndex, this.endIndex);
    },
    filteredPackages() {
      return this.mostPopularPackages.filter((item) => item.name.includes(this.search));
    }
  }
};
</script>

<style lang="sass">
.page
  margin: 0 20px
  font-size: 20px
  font-weight: 700
.table-row
  cursor: pointer
</style>
