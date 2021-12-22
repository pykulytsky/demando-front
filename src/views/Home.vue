<template>
  <div class="center">
      <h1 class="main-header">Find poll by putting id in the field below</h1>
    </div>
</template>

<script>
import httpClient from '@/api/axios.js'
export default {
  name: 'Home',
  data: () => {
    return {
      users: []
    }
  },
  mounted () {
    httpClient.get('auth/users')
    .then((response) => {
      console.log(response.data)
      this.users = response.data
    })
  }
}
</script>

<style scoped>


.tbl {
  margin-top: 50px;
}
</style>
