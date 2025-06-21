<template>
  <div class="flex items-center justify-center">
    <UModal title="RSVP for Our Anniversary">
      <UButton label="RSVP Today" icon="i-lucide-calendar-check" size="xl" />

      <template #body>
        <div class="p-6">
          <div class="flex items-center justify-between mb-6" />

          <UForm
            :state="formData"
            :schema="schema"
            class="space-y-4"
            @submit="submitRsvp"
          >
            <UFormField label="Full Name" name="fullName" required>
              <UInput
                v-model="formData.fullName"
                placeholder="Enter your full name"
                icon="i-lucide-user"
              />
            </UFormField>

            <UFormField label="Email Address" name="email" required>
              <UInput
                v-model="formData.email"
                type="email"
                placeholder="your@email.com"
                icon="i-lucide-mail"
              />
            </UFormField>

            <UFormField label="Number of Guests" name="headcount" required>
              <USelect
                v-model="formData.headcount"
                :items="headcountOptions"
                placeholder="Select number of guests"
              />
            </UFormField>

            <UFormField label="Dietary Restrictions" name="dietaryRestrictions">
              <UTextarea
                v-model="formData.dietaryRestrictions"
                placeholder="Any allergies or dietary requirements..."
                :rows="3"
              />
            </UFormField>

            <div class="flex gap-3 pt-4">
              <UButton
                type="submit"
                :loading="isSubmitting"
                :disabled="isSubmitting"
                class="flex-1"
              >
                {{ isSubmitting ? "Submitting..." : "Send RSVP" }}
              </UButton>
              <UButton
                variant="outline"
                :disabled="isSubmitting"
                @click="isOpen = false"
              >
                Cancel
              </UButton>
            </div>
          </UForm>

          <!-- Success Message -->
          <div
            v-if="showSuccess"
            class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <div class="flex items-center">
              <UIcon name="i-lucide-check-circle" class="text-green-600 mr-2" />
              <p class="text-green-800">
                Thank you! Your RSVP has been submitted successfully.
              </p>
            </div>
          </div>

          <!-- Error Message -->
          <div
            v-if="showError"
            class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <div class="flex items-center">
              <UIcon name="i-lucide-alert-circle" class="text-red-600 mr-2" />
              <p class="text-red-800">
                Sorry, there was an error submitting your RSVP. Please try
                again.
              </p>
            </div>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import { z } from "zod";

const isOpen = ref(false);
const isSubmitting = ref(false);
const showSuccess = ref(false);
const showError = ref(false);

const formData = reactive({
  fullName: "",
  email: "",
  headcount: "",
  dietaryRestrictions: "",
});

const headcountOptions = [
  { label: "1 Guest", value: "1" },
  { label: "2 Guests", value: "2" },
  { label: "3 Guests", value: "3" },
  { label: "4 Guests", value: "4" },
  { label: "5 Guests", value: "5" },
  { label: "6 Guests", value: "6" },
  { label: "7 Guests", value: "7" },
  { label: "8 Guests", value: "8" },
  { label: "9 Guests", value: "9" },
  { label: "10 Guests", value: "10" },
  { label: "More than 10", value: "10+" },
];

const schema = z.object({
  fullName: z.string().min(1, "Please enter your full name"),
  email: z.string().email("Invalid email address"),
  headcount: z.string().min(1, "Please select number of guests"),
});

const submitRsvp = async () => {
  isSubmitting.value = true;
  showSuccess.value = false;
  showError.value = false;

  try {
    // Use our Nuxt API route instead of direct Google Apps Script
    const response = await $fetch("/api/rsvp", {
      method: "POST",
      body: {
        fullName: formData.fullName,
        email: formData.email,
        headcount: formData.headcount,
        dietaryRestrictions: formData.dietaryRestrictions,
      },
    });

    if (response.success) {
      showSuccess.value = true;

      // Reset form after successful submission
      setTimeout(() => {
        Object.assign(formData, {
          fullName: "",
          email: "",
          headcount: "",
          dietaryRestrictions: "",
        });
        isOpen.value = false;
        showSuccess.value = false;
      }, 2000);
    } else {
      throw new Error("Submission failed");
    }
  } catch (error) {
    console.error("RSVP submission error:", error);
    showError.value = true;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style></style>
