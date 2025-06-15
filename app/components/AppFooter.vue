<script setup lang="ts">
const columns = [
  {
    label: "Resources",
    children: [
      {
        label: "Help center",
      },
      {
        label: "Docs",
      },
      {
        label: "Roadmap",
      },
      {
        label: "Changelog",
      },
    ],
  },
  {
    label: "Features",
    children: [
      {
        label: "Affiliates",
      },
      {
        label: "Portal",
      },
      {
        label: "Jobs",
      },
      {
        label: "Sponsors",
      },
    ],
  },
  {
    label: "Company",
    children: [
      {
        label: "About",
      },
      {
        label: "Pricing",
      },
      {
        label: "Careers",
      },
      {
        label: "Blog",
      },
    ],
  },
];

const toast = useToast();

const email = ref("");
const loading = ref(false);

function onSubmit() {
  loading.value = true;

  toast.add({
    title: "Subscribed!",
    description: "You've been subscribed to our newsletter.",
  });
}
</script>

<template>
  <USeparator class="h-px" />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #left>
      <p class="text-sm text-muted">
        Copyright © {{ new Date().getFullYear() }}. All rights reserved.
      </p>
    </template>
  </UFooter>
</template>
