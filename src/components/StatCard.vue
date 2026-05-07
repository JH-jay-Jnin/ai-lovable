<template>
  <div class="card stat-card p-3">
    <div class="d-flex align-items-center">
      <div :class="['icon', bg]"><i :class="icon"></i></div>
      <div class="ms-3">
        <div class="text-muted small">{{ label }}</div>
        <div class="fs-4 fw-bold">{{ formatted }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({ label:String, value:Number, icon:String, bg:String, isCurrency:{type:Boolean,default:true} });
const formatted = computed(() => props.isCurrency ? props.value.toLocaleString() + '원' : props.value.toLocaleString() + '건');
</script>
