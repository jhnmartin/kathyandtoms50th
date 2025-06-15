<script setup lang="ts">
const nuxtApp = useNuxtApp();
const { activeHeadings, updateHeadings } = useScrollspy();

const items = computed(() => [
  {
    label: "Details",
    to: "#details",
    active:
      activeHeadings.value.includes("features") &&
      !activeHeadings.value.includes("pricing"),
  },
  {
    label: "Travel",
    to: "#travel",
    active: activeHeadings.value.includes("pricing"),
  },
  {
    label: "Accommodations",
    to: "#accommodations",
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
      <NuxtLink to="#rsvp">
        <UButton label="RSVP" variant="subtle" class="hidden lg:block" />
      </NuxtLink>

      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
      <NuxtLink to="#rsvp"
        ><UButton class="mt-4" label="RSVP" variant="subtle" block
      /></NuxtLink>
    </template>
  </UHeader>
</template>
