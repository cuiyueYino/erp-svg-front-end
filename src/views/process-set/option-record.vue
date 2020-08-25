<template>
    
    <div class="most-warapper">     
       <iframe src="http://192.168.85.96:6013/optionRecord" style="width:100%;height:764px;border:0px;padding:0px;"  class="optionRecord"></iframe>
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
    .optionRecord {
        z-index: 0;
        position: absolute;
    }
    .tags {
        z-index:999;
    }
    .optionRecord .page-heading  {
        padding-top:0px !important;
    }
</style>