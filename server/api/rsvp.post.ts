export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validate required fields
    if (!body.email || !body.headcount) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email and headcount are required",
      });
    }

    // You can either use Google Sheets API or Google Apps Script here
    // For now, let's use a simpler approach with Google Apps Script
    const response = await $fetch(
      "https://script.google.com/macros/s/AKfycbxCB4byQkn5YyG2jVpXkce0HZyKej1CGmKMwLR1KqHG8lEPZxvHmorRJIg2wtvben71/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: body.email,
          headcount: body.headcount,
          arrivalDate: body.arrivalDate || "",
          dietaryRestrictions: body.dietaryRestrictions || "",
          specialRequests: body.specialRequests || "",
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
