<template>
<div>
  <preloader v-if="loading"/>
  <div v-if="!loading" class="container about">
    <iframe width="560" height="315" :src="info.url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <h2 class="title">{{ info.snippet.title }}</h2>
    <div class="content"> {{ info.snippet.description }} </div>
  </div>

  <div v-if="error" class="error">Что-то пошло не так</div>
</div>
</template>

<script>
import { getVideo } from '../http'
import Preloader from '../components/Preloader'

export default {
  name: 'videoItem',
  components: {
    Preloader
  },
  data () {
    return {
      error: false,
      info: null,
      loading: true
    }
  },

  mounted () {
    getVideo(this.$route.params.id).then(res => {
      const { id, snippet } = res.items[0]

      this.info = {
        url: `https://www.youtube.com/embed/${id}`,
        snippet
      }

      this.error = false
      this.loading = false
    }).catch(err => {
      this.loading = false
      this.error = true
    })
  }
}
</script>