<template>
  <div>
    <h2 class="mb-4"><i class="fa-solid fa-list me-2 text-primary"></i>거래 내역</h2>
    <div class="chart-card">
      <div class="d-flex gap-2 mb-3">
        <select class="form-select w-auto" v-model="filterType">
          <option value="">전체</option><option value="income">수입</option><option value="expense">지출</option>
        </select>
        <input class="form-control" placeholder="메모/카테고리 검색..." v-model="search" />
      </div>
      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr><th>날짜</th><th>구분</th><th>카테고리</th><th>메모</th><th class="text-end">금액</th></tr>
          </thead>
          <tbody>
            <tr v-for="t in filtered" :key="t.id">
              <td>{{ t.date }}</td>
              <td><span class="badge" :class="t.type==='income'?'badge-income':'badge-expense'">
                {{ t.type==='income'?'수입':'지출' }}</span></td>
              <td>{{ t.category }}</td>
              <td class="text-muted">{{ t.memo }}</td>
              <td class="text-end fw-bold" :class="t.type==='income'?'text-success':'text-danger'">
                {{ t.type==='income'?'+':'-' }}{{ t.amount.toLocaleString() }}원
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTransactionStore } from '../stores/transaction';
const store = useTransactionStore();
const filterType = ref('');
const search = ref('');
onMounted(() => store.fetchAll());
const filtered = computed(() => store.transactions.filter(t =>
  (!filterType.value || t.type === filterType.value) &&
  (!search.value || t.memo.includes(search.value) || t.category.includes(search.value))
).slice().reverse());
</script>
