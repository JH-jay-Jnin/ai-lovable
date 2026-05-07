// Pinia store - axios로 json-server 연결
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
});

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // ===== json-server 연결 (axios) =====
  const fetchAll = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await API.get('/transactions');
      transactions.value = res.data;
    } catch (e) {
      error.value = e.message;
      console.error('fetchAll error:', e);
    } finally {
      loading.value = false;
    }
  };

  const addTransaction = async (payload) => {
    const res = await API.post('/transactions', payload);
    transactions.value.push(res.data);
  };

  const updateTransaction = async (id, payload) => {
    const res = await API.put(`/transactions/${id}`, payload);
    const idx = transactions.value.findIndex(t => t.id === id);
    if (idx !== -1) transactions.value[idx] = res.data;
  };

  const deleteTransaction = async (id) => {
    await API.delete(`/transactions/${id}`);
    transactions.value = transactions.value.filter(t => t.id !== id);
  };

  // ===== 계산 속성 =====
  const totalIncome = computed(() =>
    transactions.value.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  );
  const totalExpense = computed(() =>
    transactions.value.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  );
  const balance = computed(() => totalIncome.value - totalExpense.value);
  const count = computed(() => transactions.value.length);

  const expenseByCategory = computed(() => {
    const map = {};
    transactions.value.filter(t => t.type === 'expense').forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return map;
  });

  const monthlyStats = computed(() => {
    const map = {};
    transactions.value.forEach(t => {
      const m = t.date.slice(0, 7);
      if (!map[m]) map[m] = { income: 0, expense: 0 };
      map[m][t.type] += t.amount;
    });
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  });

  return {
    transactions, loading, error,
    fetchAll, addTransaction, updateTransaction, deleteTransaction,
    totalIncome, totalExpense, balance, count,
    expenseByCategory, monthlyStats,
  };
});
