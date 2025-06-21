<script setup lang="ts">
const { data: page } = await useAsyncData("index", () =>
  queryCollection("content").first()
);
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

useSeoMeta({
  title: page.value.seo?.title || page.value.title,
  ogTitle: page.value.seo?.title || page.value.title,
  description: page.value.seo?.description || page.value.description,
  ogDescription: page.value.seo?.description || page.value.description,
});

const items = [
  "/images/slide-1.webp",
  "/images/slide-2.webp",
  "/images/slide-3.webp",
  "/images/slide-4.webp",
  "/images/slide-5.webp",
];
</script>

<template>
  <div v-if="page" class="relative">
    <UPageHero
      :description="page.description"
      :links="page.hero.links"
      :ui="{ container: 'md:pt-18 lg:pt-20' }"
    >
      <template #title>
        <MDC :value="page.title" class="*:leading-10 sm:*:leading-18" />
      </template>
      <UCarousel
        v-slot="{ item }"
        class="block md:hidden"
        :items="items"
        :ui="{ item: 'basis-1/1' }"
        :autoplay="{ delay: 2000 }"
        :loop="true"
      >
        <img :src="item" width="100%" height="100%" class="rounded-lg" />
      </UCarousel>
      <UCarousel
        v-slot="{ item }"
        class="hidden md:block xl:hidden"
        :items="items"
        :ui="{ item: 'basis-1/2' }"
        :autoplay="{ delay: 2000 }"
        :loop="true"
      >
        <img :src="item" width="100%" height="100%" class="rounded-lg" />
      </UCarousel>
      <UCarousel
        v-slot="{ item }"
        class="hidden xl:block"
        :items="items"
        :ui="{ item: 'basis-1/3' }"
        :autoplay="{ delay: 2000 }"
        :loop="true"
      >
        <img :src="item" width="100%" height="100%" class="rounded-lg" />
      </UCarousel>
    </UPageHero>

    <UPageSection
      id="details"
      :description="page.section.description"
      :features="page.section.features"
      orientation="horizontal"
      :ui="{
        container: 'lg:px-0 2xl:px-20 mx-0 max-w-none md:mr-10',
        features: 'gap-0',
      }"
      reverse
    >
      <template #title>
        <MDC :value="page.section.title" class="sm:*:leading-11" />
      </template>
      <img
        :src="page.section.images.one"
        :alt="page.section.title"
        class="hidden lg:block 2xl:hidden left-0 w-full max-w-2xl"
      />
      <img
        :src="page.section.images.one"
        :alt="page.section.title"
        class="block lg:hidden 2xl:block 2xl:w-full 2xl:max-w-2xl"
      />
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection
      id="travel"
      :description="page.features.description"
      :features="page.features.features"
      orientation="horizontal"
      :ui="{
        title: 'text-left @container relative flex',
        description: 'text-left',
      }"
      class="relative overflow-hidden"
    >
      <template #title>
        <MDC :value="page.features.title" class="*:leading-9" />
        <div class="hidden @min-[1020px]:block" />
      </template>
      <img
        :src="page.section.images.two"
        :alt="page.section.title"
        class="hidden lg:block 2xl:hidden left-0 w-full max-w-2xl"
      />
      <img
        :src="page.section.images.two"
        :alt="page.section.title"
        class="block lg:hidden 2xl:block 2xl:w-full 2xl:max-w-2xl"
      />
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection
      id="accommodations"
      :description="page.steps.description"
      class="relative overflow-hidden"
    >
      <template #headline />
      <template #title>
        <MDC :value="page.steps.title" />
      </template>

      <template #features>
        <UPageCard
          v-for="(step, index) in page.steps.items"
          :key="index"
          class="group"
          :ui="{ container: 'p-4 sm:p-4', title: 'flex items-center gap-1' }"
        >
          <img
            v-if="step.image"
            :src="step.image"
            class="size-full rounded-lg"
          />

          <div class="flex flex-col gap-2 bg-white dark:bg-zinc-900 pt-2">
            <span class="text-lg font-semibold">
              {{ step.title }}
            </span>
            <span class="text-sm text-muted">
              {{ step.description }}
            </span>
          </div>
        </UPageCard>
      </template>
    </UPageSection>

    <USeparator />

    <UPageCTA
      id="rsvp"
      v-bind="page.cta"
      variant="naked"
      class="overflow-hidden @container"
    >
      <template #title>
        <MDC :value="page.cta.title" />
      </template>
      <RsvpModal />
      <div
        class="absolute rounded-full dark:bg-primary blur-[250px] size-40 sm:size-50 transform -translate-x-1/2 left-1/2 -translate-y-80"
      />

      <LazyStarsBg />
    </UPageCTA>
  </div>
</template>
