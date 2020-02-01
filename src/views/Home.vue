<template>
  <div class="container">
    <div class="row">
      <form action="" @submit.prevent="() => fetchData()">
        <div class="inp col m10">
          <input type="text" v-model="query">
        </div>

        <button @click="() => fetchData()" class="btn col m2" type="submit">Поиск</button>
      </form>
    </div>

    <div v-if="notEmpty" class="collection row">
      <router-link v-for="item in list" :to="{name: 'video', params: { id: item.id.videoId }}" class="collection-item" :key="item.id.videoId"> {{ item.snippet.title  }} </router-link>
    </div>

    <preloader v-if="loading"/>

    <div v-if="notEmpty" class="row pagination">
      <button @click="() => fetchData(prevPageToken)" class="col m3 btn" :disabled="!prevPageToken">Предыдущая</button>
      <button @click="() => fetchData(nextPageToken)" class="btn col m3 offset-m1" :disabled="!nextPageToken">Следующая</button>
    </div>

    <div v-if="error" class="error">Что-то пошло не так</div>
  </div>
</template>

<script>
// @ is an alias to /src

import { getVideos } from '../http'
import Preloader from '../components/Preloader'

export default {
  name: 'home',
  components: {
    Preloader
  },

  data () {
    return {
      error: false,
      list: [],
      loading: false,
      nextPageToken: null,
      prevPageToken: null,
      query: ''
    }
  },

  computed: {
    notEmpty () {
      return this.list.length > 0
    }
  },

  methods: {
    fetchData (pageToken = '') {
      this.loading = true
      this.list = []

      const res = getVideos(this.query, pageToken).then(res => {
        this.error = false
        this.nextPageToken = res.nextPageToken
        this.prevPageToken = res.prevPageToken
        this.list = res.items
        this.loading = false
      }).catch(err => {
        this.loading = false
        this.error = true
      })
    }
  }
}
</script>
