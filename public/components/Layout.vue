<template>
  <div class="wrapper">
    <header>
      <h1>Nico Ranking</h1>
      <ul class="category">
        <li><a @click="fetchData('Vocaloid')">Vocaloid</a></li>
        <li><a @click="fetchData('Singer')">Singer</a></li>
        <li><a @click="fetchData('Player')">Player</a></li>
      </ul>
    </header>
    <section class="item-list">
      <h4 class="loading" v-if="loading">{{ msg }}</h4>
      <ul v-if="!loading">
        <Item v-for="item in nicoData | orderBy 'rankingId'" :item="item" transition="item"></Item>
      </ul>
    </section>
  </div>
</template>
<script>
import Item from './Item.vue';

export default {
  data() {
    return {
      loading: true,
      msg: 'Loading...',
      nicoData: []
    }
  },
  ready() {
    this.fetchData('Vocaloid');
  },
  methods: {
    fetchData(type) {
      this.$http({url: 'get' + type, method: 'GET'}).then(response => {
        this.nicoData = response.data;
        this.loading = false;
      }, err => {
        this.msg = 'Error! please reload this page.'
        console.log(err);
      })
    }
  },
  components: {
     Item
  }
};
</script>
