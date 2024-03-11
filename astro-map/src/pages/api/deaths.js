// src/pages/api/logs.js
import { Rcon } from 'rcon-client';

export async function GET() {
  console.log("Received GET request to /api/death")
  const rcon = new Rcon({
    host: "localhost", // Your server's IP
    port: 25575,      // RCON port
    password: "change_me" // RCON password
  });

  try {
    await rcon.connect();

    // Example command to fetch recent activities; actual command will vary
    // This is a placeholder as vanilla Minecraft servers do not support fetching logs via RCON commands directly
    const response = await rcon.send("list"); // 'list' command is just an example, showing online players

    await rcon.end();

    // Response handling
    return new Response(JSON.stringify({ message: response }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to fetch logs via RCON:', error);
    return new Response(JSON.stringify({ error: "Failed to fetch logs." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
