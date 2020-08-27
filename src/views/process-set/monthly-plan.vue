<template>
    
    <div class="most-warapper">     
       <iframe :src="$GLOBAL.htmlUrl + 'monthlyPlan' " style="width:100%;height:764px;border:0px;padding:0px;"  class="monthlyPlan"></iframe>
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
    .monthlyPlan {
        z-index: 0;
        position: absolute;
    }
    .tags {
        z-index:999;
    }
    .monthlyPlan .page-heading  {
        padding-top:0px !important;
    }
</style>