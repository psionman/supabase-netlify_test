export async function handler(event, context) {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const payload = JSON.parse(event.body);
    console.log("Received webhook from Supabase:", payload);

    // Handle the webhook data here

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Received successfully" }),
    };
  }
