// src/lib/api.ts

const BASE_URL = "https://2dcq63co40.execute-api.us-east-1.amazonaws.com/dev"; // Replace with your actual base URL

// ----------------------
// TEAM
// ----------------------
export async function registerTeam(teamName: string, contactEmail: string) {
  const res = await fetch(`${BASE_URL}/teams/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      team_name: teamName,
      contact_email: contactEmail,
    }),
  });

  if (!res.ok) throw new Error(`Failed to register team: ${res.status}`);
  const data = await res.json();

  if (!data.jwtToken) throw new Error("No token returned from API");
  return data.jwtToken as string;
}

// ----------------------
// CLIENTS
// ----------------------
export async function createClient(
  token: string,
  client: { name: string; email: string; cash: number }
) {
  const res = await fetch(`${BASE_URL}/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(client),
  });

  if (!res.ok) throw new Error(`Failed to create client: ${res.status}`);
  return res.json();
}

export async function getClients(token: string) {
  const res = await fetch(`${BASE_URL}/clients`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Failed to fetch clients: ${res.status}`);
  return res.json();
}

export async function deleteClient(token: string, clientId: string) {
  const res = await fetch(`${BASE_URL}/clients/${clientId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Failed to delete client ${clientId}: ${res.status}`);
  return res.json();
}

export async function deleteAllClients(token: string) {
  const clients = await getClients(token);
  const results = [];
  for (const client of clients) {
    const deleted = await deleteClient(token, client.clientId || client.id);
    results.push(deleted);
  }
  return results;
}

export async function depositToClient(token: string, clientId: string, amount: number) {
  const res = await fetch(`${BASE_URL}/clients/${clientId}/deposit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount }),
  });
  if (!res.ok) throw new Error(`Failed to deposit: ${res.status}`);
  return res.json();
}

// ----------------------
// PORTFOLIOS
// ----------------------
export async function createPortfolio(
  token: string,
  clientId: string,
  type: "aggressive_growth" | "balanced",
  initialAmount: number
) {
  const res = await fetch(`${BASE_URL}/clients/${clientId}/portfolios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      type,
      initialAmount,
    }),
  });

  if (!res.ok) throw new Error(`Failed to create portfolio: ${res.status}`);
  return res.json();
}

// ----------------------
// SIMULATION
// ----------------------
export async function simulateClient(token: string, clientId: string, months: number) {
  const res = await fetch(`${BASE_URL}/client/${clientId}/simulate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ months }),
  });
  if (!res.ok) throw new Error(`Failed to simulate: ${res.status}`);
  return res.json();
}
