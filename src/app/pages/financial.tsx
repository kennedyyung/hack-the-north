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
      const teamName = "Klarity_Team_0000000000000000000000001";
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

      {/* Round-Up Investment Analysis Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Left Column - Round-Up Analysis */}
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-6 h-6 text-[#0051A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <h2 className="text-xl font-semibold">Suggested Round-Up Investment</h2>
        </div>

        {/* Recent Email Invoices */}
        <div className="space-y-3">
          {[
            { name: 'Spotify Premium', email: 'spotify@email.spotify.com', amount: 16.99, roundUp: 3.01 },
            { name: 'Netflix Subscription', email: 'info@netflix.com', amount: 22.99, roundUp: 7.01 },
            { name: 'Campus Meal Plan', email: 'dining@university.edu', amount: 487.50, roundUp: 2.50 }
          ].map((invoice, i) => (
            <div key={i} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">{invoice.name}</p>
                <p className="text-sm text-gray-500">{invoice.email}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                <p className="text-sm text-[#0051A5]">+${invoice.roundUp.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Investment Opportunity */}
      <div className="bg-[#0051A5] text-white rounded-lg p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-4">
            💡 Round-Up Investment Opportunity
          </h3>
          <p className="text-4xl font-bold mb-2">$24.55</p>
          <p className="text-sm opacity-90">Available to invest from round-ups</p>
        </div>
        <div className="text-center mb-6">
          <p className="font-semibold">RBC InvestEase Projection:</p>
          <p className="text-3xl font-bold">+$1.72</p>
          <p className="text-sm opacity-90">Expected returns after 1 year (7% APR)</p>
        </div>
        <button className="w-full bg-white text-[#0051A5] py-3 rounded-lg font-semibold hover:bg-blue-50 transition" >
          Invest $24.55 Now
        </button>
      </div>
      </div>

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

      <div className="mt-8 border rounded-lg p-6 bg-white shadow-sm">

      {/* Monthly Surplus Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Monthly Surplus</h3>
          <p className="text-3xl font-bold text-blue-600 mb-2">$200.50</p>
          <p className="text-sm text-gray-600">Income: $1840.50 - Expenses: $1640.00</p>
        </div>

        <div className="border rounded-lg p-6 shadow-sm flex flex-col items-center justify-center text-center" style={{ backgroundColor: "#005DAA" }}>
            <h3 className="text-lg font-semibold mb-2 text-white">Investment Potential</h3>
            <p className="text-3xl font-bold text-white mb-2">$140.35</p>
            <p className="text-sm text-white">70% of surplus</p>
        </div>
      </div>

      {/* Smart Investment Suggestion */}
      <div className="mt-6 border rounded-lg p-6 bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h2 className="text-xl font-semibold">Smart Investment Suggestion</h2>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="mb-4">
            <span className="text-yellow-500 mr-2">💡</span>
            You will have <span className="font-semibold">$200.5 surplus this month</span>
          </p>
          <p className="text-gray-600 mb-4">
            Based on your email analysis, we have detected upcoming income from internships and scholarships. Want to invest $140.35 in RBC InvestEase toward your Study Abroad Trip goal?
          </p>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" style={{ backgroundColor: "#005DAA" }}>
              Invest $140.35 Now
            </button>
            <a href = "https://www.rbcinvestease.com/" >
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                Learn More About InvestEase
              </button> 
            </a>
          </div>
        </div>
      </div>

    {/* Investment Projections - Full Width Blue Card */}
    <div className="bg-[#0051A5] text-white rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-6 text-center">
        📊 Your $24.55 Round-Up Investment Profit Projection
      </h2>
      <div className="grid grid-cols-3 gap-8 mb-6">
        <div className="text-center">
          <p className="mb-2">Conservative</p>
          <p className="text-3xl font-bold">+$1.10</p>
          <p className="text-sm opacity-90">1 Year Profit</p>
        </div>
        <div className="text-center">
          <p className="mb-2">Balanced</p>
          <p className="text-3xl font-bold">+$1.77</p>
          <p className="text-sm opacity-90">1 Year Profit</p>
        </div>
        <div className="text-center">
          <p className="mb-2">Aggressive</p>
          <p className="text-3xl font-bold">+$2.65</p>
          <p className="text-sm opacity-90">1 Year Profit</p>
        </div>
      </div>
      <button className="w-full bg-white text-[#0051A5] py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
        Choose Portfolio & Invest
      </button>
    </div>

      {/* Financial Deadlines and Savings Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Upcoming Financial Deadlines */}
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h2 className="text-xl font-semibold">Upcoming Financial Deadlines</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { name: 'Tuition Payment', amount: -2850.00, due: '9/14/2024', type: 'Expense' },
              { name: 'Scholarship Disbursement', amount: 1500.00, due: '9/19/2024', type: 'Income' },
              { name: 'Internship Final Pay', amount: 1240.50, due: '9/11/2024', type: 'Income' },
              { name: 'Textbook Reimbursement', amount: 340.00, due: '9/17/2024', type: 'Income' }
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Due: {item.due}</p>
                </div>
                <div className={`text-right ${item.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                  <p className="font-bold">{item.amount > 0 ? '+' : ''}{item.amount.toFixed(2)}</p>
                  <p className="text-sm">{item.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Goals */}
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h2 className="text-xl font-semibold">Savings Goals</h2>
          </div>

          <div className="space-y-6">
            {[
              { name: 'Study Abroad Trip', current: 1450, target: 3500, complete: 41, due: '2/28/2025' },
              { name: 'Emergency Fund', current: 750, target: 2000, complete: 38, due: '12/30/2024' },
              { name: 'New Laptop', current: 980, target: 1200, complete: 82, due: '11/14/2024' }
            ].map((goal, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{goal.name}</span>
                  <span className="text-gray-600">${goal.current} / ${goal.target}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${goal.complete}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{goal.complete}% complete • Due: {goal.due}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}