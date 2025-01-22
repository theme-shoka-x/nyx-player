<script setup lang="ts">
import BackBtn from './BackBtn.vue'
import ForwardBtn from './ForwardBtn.vue'
import OrderBtn from './OrderBtn.vue'
import PlayBtn from './PlayBtn.vue'
import VolumeBtn from './VolumeBtn.vue'
</script>

<template>
  <div class="controller flex cursor-pointer items-center text-align-center">
    <OrderBtn />
    <BackBtn />
    <PlayBtn />
    <ForwardBtn />
    <VolumeBtn />
  </div>
</template>

<style lang="stylus">
.controller {
    font-size: 14px;
    justify-content: space-around;

    div {
      color: var(--primary-text);
      width: 18%;

      &:hover {
        color: var(--hover-btn);
      }
    }
  }
</style>
