<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="mb-1"><i class="fa-solid fa-gauge me-2 text-primary"></i>대시보드</h2>
        <p class="text-muted mb-0">한눈에 보는 나의 가계부 현황</p>
      </div>
      <button class="btn btn-outline-primary" @click="store.fetchAll()">
        <i class="fa-solid fa-rotate me-1"></i>새로고침
      </button>
    </div>

    <div v-if="store.error" class="alert alert-warning">
      <i class="fa-solid fa-triangle-exclamation me-2"></i>
      json-server 연결 실패: {{ store.error }} — <code>npm run server</code> 실행 필요
    </div>

    <div class="row g-3 mb-4">
      <div class="col-md-3"><StatCard label="총 수입" :value="store.totalIncome" icon="fa-solid fa-arrow-trend-up" bg="bg-income"/></div>
      <div class="col-md-3"><StatCard label="총 지출" :value="store.totalExpense" icon="fa-solid fa-arrow-trend-down" bg="bg-expense"/></div>
      <div class="col-md-3"><StatCard label="잔액" :value="store.balance" icon="fa-solid fa-sack-dollar" bg="bg-balance"/></div>
      <div class="col-md-3"><StatCard label="거래 수" :value="store.count" icon="fa-solid fa-receipt" bg="bg-count" :isCurrency="false"/></div>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-lg-7">
        <div class="chart-card">
          <h5 class="mb-3"><i class="fa-solid fa-chart-column me-2 text-primary"></i>월별 수입/지출</h5>
          <GoogleChart type="ColumnChart" :data="monthlyData" :options="monthlyOptions" :height="340" />
        </div>
      </div>
      <div class="col-lg-5">
        <div class="chart-card">
          <h5 class="mb-3"><i class="fa-solid fa-chart-pie me-2 text-danger"></i>카테고리별 지출</h5>
          <GoogleChart type="PieChart" :data="categoryData" :options="categoryOptions" :height="340" />
        </div>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12">
        <div class="chart-card">
          <h5 class="mb-3"><i class="fa-solid fa-chart-line me-2 text-success"></i>월별 잔액 추이</h5>
          <GoogleChart type="LineChart" :data="trendData" :options="trendOptions" :height="300" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useTransactionStore } from '../stores/transaction';
import StatCard from '../components/StatCard.vue';
import GoogleChart from '../components/GoogleChart.vue';

const store = useTransactionStore();
onMounted(() => store.fetchAll());

const monthlyData = computed(() => {
  const rows = [['월', '수입', '지출']];
  store.monthlyStats.forEach(([m, v]) => rows.push([m, v.income, v.expense]));
  return rows;
});
const monthlyOptions = { legend: { position: 'top' }, colors: ['#10b981', '#ef4444'], chartArea:{width:'85%',height:'70%'} };

const categoryData = computed(() => {
  const rows = [['카테고리', '금액']];
  Object.entries(store.expenseByCategory).forEach(([k, v]) => rows.push([k, v]));
  return rows;
});
const categoryOptions = { pieHole: 0.4, chartArea:{width:'90%',height:'85%'} };

const trendData = computed(() => {
  const rows = [['월', '잔액']];
  let bal = 0;
  store.monthlyStats.forEach(([m, v]) => { bal += v.income - v.expense; rows.push([m, bal]); });
  return rows;
});
const trendOptions = { legend:{position:'none'}, colors:['#3b82f6'], chartArea:{width:'85%',height:'70%'}, curveType:'function' };
</script>
