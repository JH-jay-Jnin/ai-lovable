<template>
  <div class="container-fluid">
    <div class="row">
      <aside class="col-md-2 sidebar p-3">
        <h4 class="mb-4"><i class="fa-solid fa-wallet me-2"></i>가계부</h4>
        <nav>
          <router-link to="/"><i class="fa-solid fa-chart-line me-2"></i>대시보드</router-link>
          <router-link to="/transactions"><i class="fa-solid fa-list me-2"></i>거래 내역</router-link>
        <router-link to="/transactions/new"><i class="fa-solid fa-plus me-2"></i>거래 추가</router-link>
        </nav>
      </aside>
      <main class="col-md-10 p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>
<script setup></script>



