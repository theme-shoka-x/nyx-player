<script setup lang="ts">
import AudioCover from './AudioCover.vue'
import AudioInfo from './AudioInfo.vue'
</script>

<template>
  <div class="preview">
    <AudioCover />
    <AudioInfo />
  </div>
</template>

<style lang="stylus" scoped>
.preview {
    display: flex;
    align-items: center;
    padding: 1.25rem 1.25rem 0;

    @media (max-width: 867px) {
      padding: 1.25rem .625rem 0;
      flex-direction: column;
    }
}
</style>
