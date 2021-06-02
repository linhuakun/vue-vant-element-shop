<template>
  <div class="PraiseListItem">
    <PraiseListItem
      v-for="(item, index) in praises"
      :key="index"
      :praise="item"
    ></PraiseListItem>
  </div>
</template>

<script>
import PraiseListItem from "@/components/content/praises/PraiseListItem";
export default {
  name: "PraiseList",
  components: {
    PraiseListItem,
  },
  props: {
    praises: {
      type: Array,
      defalut() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.PraiseListItem {
  margin-top: 3px;
}

</style>