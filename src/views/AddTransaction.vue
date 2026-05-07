<template>
  <div>
    <h2 class="mb-4">
      <i class="fa-solid fa-plus me-2 text-primary"></i>거래 추가
    </h2>

    <div class="chart-card p-4">
      <form @submit.prevent="onSubmit" class="row g-3">
        <div class="col-md-4">
          <label class="form-label">날짜</label>
          <input type="date" class="form-control" v-model="form.date" required />
        </div>

        <div class="col-md-4">
          <label class="form-label">항목</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="form.category"
            placeholder="예: 식비, 월급"
            required
          />
        </div>

        <div class="col-md-4">
          <label class="form-label">금액</label>
          <input
            type="number"
            min="1"
            step="1"
            class="form-control"
            v-model.number="form.amount"
            placeholder="0"
            required
          />
        </div>

        <div class="col-12">
          <label class="form-label me-3">구분</label>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="income" value="income" v-model="form.type" />
            <label class="form-check-label" for="income">수입</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="expense" value="expense" v-model="form.type" />
            <label class="form-check-label" for="expense">지출</label>
          </div>
        </div>

        <div class="col-12">
          <label class="form-label">메모</label>
          <textarea
            class="form-control"
            rows="3"
            v-model.trim="form.memo"
            placeholder="선택 입력"
          ></textarea>
        </div>

        <div class="col-12 d-flex gap-2">
          <button class="btn btn-primary" type="submit" :disabled="submitting">
            {{ submitting ? "저장 중..." : "저장" }}
          </button>
          <router-link to="/transactions" class="btn btn-outline-secondary">취소</router-link>
        </div>

        <p v-if="errorMsg" class="text-danger mb-0">{{ errorMsg }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTransactionStore } from "../stores/transaction";

const store = useTransactionStore();
const router = useRouter();

const today = new Date().toISOString().slice(0, 10);

const form = ref({
  date: today,
  category: "",
  amount: null,
  type: "expense",
  memo: "",
});

const submitting = ref(false);
const errorMsg = ref("");

const onSubmit = async () => {
  errorMsg.value = "";

  if (!form.value.date || !form.value.category || !form.value.amount || form.value.amount <= 0) {
    errorMsg.value = "날짜, 항목, 금액(1원 이상)을 입력해 주세요.";
    return;
  }

  try {
    submitting.value = true;
    await store.addTransaction({
      date: form.value.date,
      category: form.value.category,
      amount: Number(form.value.amount),
      type: form.value.type,
      memo: form.value.memo || "",
    });
    router.push("/transactions");
  } catch (e) {
    errorMsg.value = "저장에 실패했습니다. 잠시 후 다시 시도해 주세요.";
  } finally {
    submitting.value = false;
  }
};
</script>