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
  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <img src="/images/footer-img.webp" alt="logo" class="w-full h-auto" />
    </template>
  </UFooter>
</template>
