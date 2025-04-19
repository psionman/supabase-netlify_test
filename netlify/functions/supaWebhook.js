export async function handler(event, context) {
  if (event.httpMethod === "POST") {
    console.log("✅ Webhook POST received:", event.body);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "POST received" }),
    };
  }

  if (event.httpMethod === "GET") {
    console.log('a', event.body);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "GET working!" }),
    };
  }

  return {
    statusCode: 405,
    body: "Method Not Allowed",
  };
  }
