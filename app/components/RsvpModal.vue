<template>
  <div class="flex items-center justify-center">
    <UModal v-model="isOpen">
      <UButton
        label="RSVP Today"
        icon="i-lucide-calendar-check"
        size="xl"
        @click="isOpen = true"
      />

      <template #content>
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-semibold">RSVP for Our Anniversary</h3>
            <UButton
              icon="i-lucide-x"
              variant="ghost"
              @click="isOpen = false"
            />
          </div>

          <UForm
            :state="formData"
            :schema="schema"
            class="space-y-4"
            @submit="submitRsvp"
          >
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

            <UFormField label="Expected Arrival Date">
              <UInput
                v-model="formData.arrivalDate"
                type="date"
                icon="i-lucide-calendar"
              />
            </UFormField>

            <UFormField label="Dietary Restrictions" name="dietaryRestrictions">
              <UTextarea
                v-model="formData.dietaryRestrictions"
                placeholder="Any allergies or dietary requirements..."
                :rows="3"
              />
            </UFormField>

            <UFormField label="Special Requests" name="specialRequests">
              <UTextarea
                v-model="formData.specialRequests"
                placeholder="Song requests, accessibility needs, etc..."
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
  email: "",
  headcount: "",
  arrivalDate: "",
  dietaryRestrictions: "",
  specialRequests: "",
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
  email: z.string().email("Invalid email address"),
  headcount: z.string().min(1, "Please select number of guests"),
  // Removed arrivalDate from required validation
});

const submitRsvp = async () => {
  isSubmitting.value = true;
  showSuccess.value = false;
  showError.value = false;

  try {
    // Replace with your Google Apps Script Web App URL
    const response = await $fetch(
      "https://script.google.com/macros/s/AKfycbx8iwQbWH-9xUKcpqsG2FDM_9EwvWdd2GtpVz5mkz3uQZGAlZhlZXgD7W2sE5GdP58q/exec",
      {
        method: "POST",
        body: {
          email: formData.email,
          headcount: formData.headcount,
          arrivalDate: formData.arrivalDate,
          dietaryRestrictions: formData.dietaryRestrictions,
          specialRequests: formData.specialRequests,
          timestamp: new Date().toISOString(),
        },
      }
    );

    showSuccess.value = true;

    // Reset form after successful submission
    setTimeout(() => {
      Object.assign(formData, {
        email: "",
        headcount: "",
        arrivalDate: "",
        dietaryRestrictions: "",
        specialRequests: "",
      });
      isOpen.value = false;
      showSuccess.value = false;
    }, 2000);
  } catch (error) {
    console.error("RSVP submission error:", error);
    showError.value = true;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style></style>
