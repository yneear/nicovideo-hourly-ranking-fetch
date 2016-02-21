<template>
  <div class="wrapper">
    <header>
      <h1>Nico Ranking</h1>
      <ul class="category">
        <li><a v-link="{ path: '/' }">Vocaloid</a></li>
        <li><a v-link="{ path: '/singer' }">Singer</a></li>
      </ul>
    </header>
    <section class="item-list">
      <h4 class="loading" v-if="loading">{{ msg }}</h4>
      <ul v-if="!loading">
        <template v-for="item in vocaloidData" track-by="rankingId">
          <Item :item="item" transition="item"></Item>
        </template>
      </ul>
    </section>
  </div>
</template>
<script>
import Item from '../components/Item.vue';

export default {
  data() {
    return {
      loading: true,
      msg: 'Loading...',
      vocaloidData: []
    }
  },
  ready() {
    this.$http({url: 'getVocaloid', method: 'GET'}).then(response => {
      this.vocaloidData = response.data;
      this.loading = false;
    }, err => {
      this.msg = 'Error! please reload this page.'
      console.log(err);
    })
  },
  components: {
     Item
  }
};
</script>
