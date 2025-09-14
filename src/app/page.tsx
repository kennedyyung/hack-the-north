"use client";
import Image from "next/image"; 
import NavBar from "./components/navbar";
import Overview from "./components/overview";
import MenuBar from "./components/menuBar";
import { useState } from "react";
import Inbox from "./pages/inbox";
import Calendar from "./pages/calendar";
import Financial from "./pages/financial";
import Shopping from "./pages/shopping";
import Developer from "./pages/developer";
import Personal from "./pages/personal";
import BottomBanner from "./components/bottomBanner";

export default function Home() {
  const [activePage, setActivePage] = useState<string>("Inbox");
  return (
    <div className="min-h-screen bg-gray-50">
    <NavBar/>
    <div className="px-8 py-1 max-w-14xl mx-auto">
    <Overview/>
    <MenuBar onSelectPage={setActivePage} />

{/* Conditional rendering based on activePage */}
{activePage === "Inbox" && <Inbox />}
{activePage === "Calendar" && <Calendar />}
{activePage === "Financial" && <Financial />}
{activePage === "Personal" && <Personal />}
{activePage === "Shopping" && <Shopping />}
{activePage === "Developer" && <Developer />}
<BottomBanner/>
  </div>

</div>
  );
}
