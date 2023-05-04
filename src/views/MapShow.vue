<template>
  <div id="mapShow-bodyer">
    <mapShowBody :earseLoad="earseLoad"></mapShowBody>
  </div>
</template>

<script>
  import mapShowBody from '../component/MapShowBody.vue'

  export default{
    components:{
      mapShowBody
    },
    props:{
      earseLoad:Function
    }
  }
</script>

<style>

</style>
