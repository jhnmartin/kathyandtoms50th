<script setup lang="ts">
const nuxtApp = useNuxtApp();
const { activeHeadings, updateHeadings } = useScrollspy();

const items = computed(() => [
  {
    label: "Information",
    to: "#features",
    active:
      activeHeadings.value.includes("features") &&
      !activeHeadings.value.includes("pricing"),
  },
  {
    label: "Travel",
    to: "#pricing",
    active: activeHeadings.value.includes("pricing"),
  },
  {
    label: "Accommodations",
    to: "#testimonials",
    active:
      activeHeadings.value.includes("testimonials") &&
      !activeHeadings.value.includes("pricing"),
  },
]);

nuxtApp.hooks.hookOnce("page:finish", () => {
  updateHeadings(
    [
      document.querySelector("#features"),
      document.querySelector("#pricing"),
      document.querySelector("#testimonials"),
    ].filter(Boolean) as Element[]
  );
});
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <LogoPro class="w-auto h-6 shrink-0" />
      </NuxtLink>
    </template>

    <template #right>
      <UNavigationMenu :items="items" variant="link" class="hidden lg:block" />

      <UButton label="RSVP" variant="subtle" class="hidden lg:block" />

      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
      <UButton class="mt-4" label="RSVP" variant="subtle" block />
    </template>
  </UHeader>
</template>
