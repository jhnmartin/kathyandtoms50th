export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validate required fields
    if (!body.fullName || !body.email || !body.headcount) {
      throw createError({
        statusCode: 400,
        statusMessage: "Full name, email and headcount are required",
      });
    }

    // You can either use Google Sheets API or Google Apps Script here
    // For now, let's use a simpler approach with Google Apps Script
    const response = await $fetch(
      "https://script.google.com/macros/s/AKfycbywxlnV95bYKCofVtiZ4E23hKbBK_qtVdU1PB-aIYMfPTV6LDJhUXWQn-uxWuRO2KzH/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: body.fullName,
          email: body.email,
          headcount: body.headcount,
          dietaryRestrictions: body.dietaryRestrictions || "",
          timestamp: new Date().toISOString(),
        }),
      }
    );

    return { success: true, message: "RSVP submitted successfully" };
  } catch (error) {
    console.error("RSVP API Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to submit RSVP",
    });
  }
});
