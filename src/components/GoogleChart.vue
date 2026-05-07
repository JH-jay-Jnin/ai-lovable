<template><div ref="chartEl" :style="{ width:'100%', height: height + 'px' }"></div></template>
<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  type: { type: String, required: true },        // 'PieChart' | 'ColumnChart' | 'LineChart'
  data: { type: Array, required: true },         // [['Label','Val'], ...]
  options: { type: Object, default: () => ({}) },
  height: { type: Number, default: 320 },
});

const chartEl = ref(null);
let chart = null;
let loaded = false;

const ensureLoaded = () => new Promise(resolve => {
  if (window.google && window.google.charts) {
    window.google.charts.load('current', { packages: ['corechart'] });
    window.google.charts.setOnLoadCallback(() => { loaded = true; resolve(); });
  } else { setTimeout(() => ensureLoaded().then(resolve), 100); }
});

const draw = () => {
  if (!loaded || !chartEl.value || !props.data.length) return;
  const dt = window.google.visualization.arrayToDataTable(props.data);
  chart = new window.google.visualization[props.type](chartEl.value);
  chart.draw(dt, props.options);
};

onMounted(async () => { await ensureLoaded(); draw(); });
watch(() => props.data, draw, { deep: true });
</script>
