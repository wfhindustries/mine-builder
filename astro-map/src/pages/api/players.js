
export async function GET() {
  const apiUrl = 'http://mc:4567/v1/players';
  let players = []; // Initialize players as an empty array to ensure it's always defined
  console.log("players api fired");
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      players = await response.json();
      console.log(players);
    } else {
      throw new Error('Network response was not ok.');
    }
  } catch (error) {
    console.error('Fetch error:', error);
    // In case of error, you might want to return a default response or handle it accordingly
    return new Response("<p>Error fetching players.</p>", {
      status: 500,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }

  // Generate HTML to return to the client
  let playerHtml = players.map(player => `
    <div>
      <strong>${player.displayName}</strong><br>
      Address: ${player.address}
    </div>
  `).join('');

  if (players.length === 0) {
    playerHtml = "<p>No current players. Come join the server!</p>";
  }

  return new Response(playerHtml, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

