<template>
    
    <div class="most-warapper">     
       <iframe :src="$GLOBAL.htmlUrl + 'indexLibrary' " style="width:100%;height:764px;border:0px;padding:0px;"  class="indexLibrary"></iframe>
    </div>
</template>
indexLibrary
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
    .indexLibrary {
        z-index: 0;
        position: absolute;
    }
    .tags {
        z-index:999;
    }
    .indexLibrary .page-heading  {
        padding-top:0px !important;
    }
</style>