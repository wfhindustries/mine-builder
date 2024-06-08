import { Rcon } from 'rcon-client';

export async function POST({ request }) {
  console.log("Received POST request to /api/message");

  try {
    // Parse the incoming request as form data
    const formData = await request.formData();
    const command = formData.get('command'); // Get the command from form data
    console.log("Received command:", command);
    const botMessageCommand = `tellraw @a {"text":"${command}", "color":"gold"}`;

    // Setup RCON client
    const rcon = new Rcon({
      host: "mc", // or your Minecraft server's IP
      port: 25575, // RCON port of your Minecraft server
      password: "change_me", // RCON password
    });

    await rcon.connect();
    console.log("Connected to RCON, sending command:", command);
    const response = await rcon.send(botMessageCommand);
    await rcon.end();
    console.log("Received response from RCON server:", response);

    // Send back the response from the Minecraft server
    return new Response("Message sent!", {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error sending RCON command:', error);
    return new Response(JSON.stringify({ error: "Failed to send RCON command." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
