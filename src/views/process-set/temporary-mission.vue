<template>
    
    <div class="most-warapper">     
       <iframe :src="$GLOBAL.htmlUrl + 'temporaryMission' " style="width:100%;height:764px;border:0px;padding:0px;"  class="temporaryMission"></iframe>
    </div>
</template>



7 <script>
export default {
     data () {
        return {
        }
    },
    mounted () {
       
    },
}
 </script>
<style>
    .header {
        z-index:999;
    }
    .sidebar {
        z-index:999;
    }
    .temporaryMission {
        z-index: 0;
        position: absolute;
    }
    .tags {
        z-index:999;
    }
    .temporaryMission .page-heading  {
        padding-top:0px !important;
    }
</style>