"use client";

import { useState } from "react";
import {
  registerTeam,
  createClient,
  depositToClient,
  createPortfolio,
  simulateClient,
  deleteAllClients,
} from "../../lib/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Financial() {
  const [status, setStatus] = useState<string>("");
  const [clientId, setClientId] = useState<string | null>(null);
  const [simulationData, setSimulationData] = useState<any[]>([]);

  // ✅ Register team with name + email
  async function handleRegisterTeam() {
    try {
      const teamName = "Klarity_Team";
      const contactEmail = "contact@klarity.work";
      const token = await registerTeam(teamName, contactEmail);
      localStorage.setItem("rbc_token", token);
      setStatus(`✅ Registered! Token saved`);
    } catch (err: any) {
      setStatus(`❌ ${err.message}`);
    }
  }

  // ✅ Create new client
  async function handleCreateClient() {
    try {
      const token = localStorage.getItem("rbc_token");
      if (!token) throw new Error("No token found. Register your team first.");

      const client = await createClient(token, {
        name: "Raymond S",
        email: "raymond@klarity.work",
        cash: 10000,
      });
      setClientId(client.clientId || client.id);
      localStorage.setItem("rbc_clientId", client.clientId || client.id);
      setStatus(`✅ Created client: ${client.name}`);
    } catch (err: any) {
      setStatus(`❌ ${err.message}`);
    }
  }

  // ✅ Deposit cash to client
  async function handleDeposit() {
    try {
      const token = localStorage.getItem("rbc_token");
      if (!token) throw new Error("No token found.");
      if (!clientId) throw new Error("No client created.");

      await depositToClient(token, clientId, 10000);
      setStatus("✅ Deposited $10,000 to client cash balance");
    } catch (err: any) {
      setStatus(`❌ ${err.message}`);
    }
  }

  // ✅ Create portfolio
  async function handleCreatePortfolio(type: "balanced" | "aggressive_growth", amount: number) {
    try {
      const token = localStorage.getItem("rbc_token");
      const cid = clientId || localStorage.getItem("rbc_clientId");
      if (!token || !cid) throw new Error("Missing token or clientId");

      // Make sure API gets the correct ID
      const data = await createPortfolio(token, cid, type, amount);
      setStatus(`✅ Portfolio created: ${JSON.stringify(data)}`);
    } catch (err: any) {
      console.error("Portfolio error:", err);
      setStatus(`❌ ${err.message}`);
    }
  }


  // ✅ Simulate all client portfolios
  type Strategy = "balanced" | "aggressive_growth";

  async function handleSimulateClient() {
    try {
      const token = localStorage.getItem("rbc_token");
      const clientId = localStorage.getItem("rbc_clientId");
      if (!token || !clientId)
        throw new Error("Missing token or clientId. Create a client and portfolios first.");

      const result = await simulateClient(token, clientId, 6); // simulate 6 months

      // Combine both portfolios into single array
      const combined: { [date: string]: { balanced?: number; aggressive_growth?: number } } = {};

      result.results.forEach((p: { strategy: Strategy; growth_trend: any[] }) => {
        p.growth_trend.forEach((point: any) => {
          if (!combined[point.date]) combined[point.date] = {};

          // Now TypeScript knows strategy is safe
          combined[point.date][p.strategy] = point.value;

        });
      });

      const chartData = Object.entries(combined).map(([date, values]) => ({
        date,
        balanced: values.balanced,
        aggressive_growth: values.aggressive_growth,
      }));

      setSimulationData(chartData);
      setStatus("✅ Simulation completed for all portfolios!");
    } catch (err: any) {
      setStatus(`❌ ${err.message}`);
    }
  }


  // ✅ Delete all clients
  async function handleDeleteAllClients() {
    try {
      const token = localStorage.getItem("rbc_token");
      if (!token) throw new Error("No token found. Register your team first.");

      const results = await deleteAllClients(token);
      
      localStorage.removeItem("rbc_clientId");
      setSimulationData([]); // ⬅️ clears chart
      setStatus(`✅ Deleted all clients: ${JSON.stringify(results)}`);
    } catch (err: any) {
      setStatus(`❌ ${err.message}`);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">Financial Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Track your income, expenses, and get smart investment suggestions based on your email insights. Turn email chaos into financial opportunity with RBC InvestEase.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleRegisterTeam}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Register Team
        </button>

        <button
          onClick={handleCreateClient}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Client
        </button>

        <button
          onClick={handleDeposit}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Deposit $10,000
        </button>

        <button
          onClick={() => handleCreatePortfolio("balanced", 5000)}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Create Balanced Portfolio
        </button>

        <button
          onClick={() => handleCreatePortfolio("aggressive_growth", 5000)}
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        >
          Create Aggressive Growth Portfolio
        </button>

        <button
          onClick={handleSimulateClient}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Simulate Client
        </button>

        <button
          onClick={handleDeleteAllClients}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete All Clients
        </button>
      </div>

      {/* Status messages */}
      {status && <p className="mb-4">{status}</p>}

        {/* Combined Simulation Chart */}
        {simulationData.length > 0 && (
          <div className="mt-6 w-full h-96">
            <h3 className="text-lg font-semibold mb-2">Portfolio Growth Over Time</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={simulationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="balanced"
                  name="Balanced"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="aggressive_growth"
                  name="Aggressive Growth"
                  stroke="#ff7300"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
    </>
  );
} 