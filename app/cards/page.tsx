"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Cards from "@/components/3dCards"

const teams = [
    {
        id: 1,
        name: "Chennai Super Kings",
        shortName: "CSK",
        color: "#F9CD1B",
        titles: 5,
        captain: "MS Dhoni",
        home: "Chennai",
        players: [
            { name: "MS Dhoni", role: "WK-Batsman" },
            { name: "Ruturaj Gaikwad", role: "Batsman" },
            { name: "Devon Conway", role: "Batsman" },
            { name: "Ajinkya Rahane", role: "Batsman" },
            { name: "Shivam Dube", role: "All-rounder" },
            { name: "Ravindra Jadeja", role: "All-rounder" },
            { name: "Moeen Ali", role: "All-rounder" },
            { name: "Deepak Chahar", role: "Bowler" },
            { name: "Tushar Deshpande", role: "Bowler" },
            { name: "Matheesha Pathirana", role: "Bowler" },
            { name: "Mustafizur Rahman", role: "Bowler" },
        ],
    },
    {
        id: 2,
        name: "Mumbai Indians",
        shortName: "MI",
        color: "#004BA0",
        titles: 5,
        captain: "Hardik Pandya",
        home: "Mumbai",
        players: [
            { name: "Hardik Pandya", role: "All-rounder" },
            { name: "Rohit Sharma", role: "Batsman" },
            { name: "Ishan Kishan", role: "WK-Batsman" },
            { name: "Suryakumar Yadav", role: "Batsman" },
            { name: "Tilak Varma", role: "Batsman" },
            { name: "Tim David", role: "All-rounder" },
            { name: "Romario Shepherd", role: "All-rounder" },
            { name: "Piyush Chawla", role: "Bowler" },
            { name: "Jasprit Bumrah", role: "Bowler" },
            { name: "Gerald Coetzee", role: "Bowler" },
            { name: "Nuwan Thushara", role: "Bowler" },
        ],
    },
    {
        id: 3,
        name: "Royal Challengers Bangalore",
        shortName: "RCB",
        color: "#EC1C24",
        titles: 0,
        captain: "Faf du Plessis",
        home: "Bangalore",
        players: [
            { name: "Faf du Plessis", role: "Batsman" },
            { name: "Virat Kohli", role: "Batsman" },
            { name: "Glenn Maxwell", role: "All-rounder" },
            { name: "Cameron Green", role: "All-rounder" },
            { name: "Dinesh Karthik", role: "WK-Batsman" },
            { name: "Mahipal Lomror", role: "All-rounder" },
            { name: "Wanindu Hasaranga", role: "All-rounder" },
            { name: "Mohammed Siraj", role: "Bowler" },
            { name: "Josh Hazlewood", role: "Bowler" },
            { name: "Reece Topley", role: "Bowler" },
            { name: "Karn Sharma", role: "Bowler" },
        ],
    },
    {
        id: 4,
        name: "Kolkata Knight Riders",
        shortName: "KKR",
        color: "#3A225D",
        titles: 3,
        captain: "Shreyas Iyer",
        home: "Kolkata",
        players: [
            { name: "Shreyas Iyer", role: "Batsman" },
            { name: "Phil Salt", role: "WK-Batsman" },
            { name: "Sunil Narine", role: "All-rounder" },
            { name: "Andre Russell", role: "All-rounder" },
            { name: "Rinku Singh", role: "Batsman" },
            { name: "Venkatesh Iyer", role: "All-rounder" },
            { name: "Nitish Rana", role: "All-rounder" },
            { name: "Mitchell Starc", role: "Bowler" },
            { name: "Varun Chakravarthy", role: "Bowler" },
            { name: "Harshit Rana", role: "Bowler" },
            { name: "Rahmanullah Gurbaz", role: "WK-Batsman" },
        ],
    },
    {
        id: 5,
        name: "Delhi Capitals",
        shortName: "DC",
        color: "#00008B",
        titles: 0,
        captain: "Rishabh Pant",
        home: "Delhi",
        players: [
            { name: "Rishabh Pant", role: "WK-Batsman" },
            { name: "David Warner", role: "Batsman" },
            { name: "Mitchell Marsh", role: "All-rounder" },
            { name: "Axar Patel", role: "All-rounder" },
            { name: "Prithvi Shaw", role: "Batsman" },
            { name: "Rovman Powell", role: "Batsman" },
            { name: "Tristan Stubbs", role: "Batsman" },
            { name: "Anrich Nortje", role: "Bowler" },
            { name: "Mukesh Kumar", role: "Bowler" },
            { name: "Kuldeep Yadav", role: "Bowler" },
            { name: "Ishant Sharma", role: "Bowler" },
        ],
    },
    {
        id: 6,
        name: "Sunrisers Hyderabad",
        shortName: "SRH",
        color: "#F7521E",
        titles: 1,
        captain: "Pat Cummins",
        home: "Hyderabad",
        players: [
            { name: "Pat Cummins", role: "All-rounder" },
            { name: "Travis Head", role: "Batsman" },
            { name: "Heinrich Klaasen", role: "WK-Batsman" },
            { name: "Abhishek Sharma", role: "All-rounder" },
            { name: "Aiden Markram", role: "All-rounder" },
            { name: "Rahul Tripathi", role: "Batsman" },
            { name: "Washington Sundar", role: "All-rounder" },
            { name: "Bhuvneshwar Kumar", role: "Bowler" },
            { name: "T Natarajan", role: "Bowler" },
            { name: "Mayank Markande", role: "Bowler" },
            { name: "Marco Jansen", role: "Bowler" },
        ],
    },
    {
        id: 7,
        name: "Rajasthan Royals",
        shortName: "RR",
        color: "#EA1A85",
        titles: 1,
        captain: "Sanju Samson",
        home: "Jaipur",
        players: [
            { name: "Sanju Samson", role: "WK-Batsman" },
            { name: "Jos Buttler", role: "WK-Batsman" },
            { name: "Yashasvi Jaiswal", role: "Batsman" },
            { name: "Shimron Hetmyer", role: "Batsman" },
            { name: "Ravichandran Ashwin", role: "All-rounder" },
            { name: "Riyan Parag", role: "All-rounder" },
            { name: "Dhruv Jurel", role: "WK-Batsman" },
            { name: "Trent Boult", role: "Bowler" },
            { name: "Yuzvendra Chahal", role: "Bowler" },
            { name: "Sandeep Sharma", role: "Bowler" },
            { name: "Kuldeep Sen", role: "Bowler" },
        ],
    },
    {
        id: 8,
        name: "Punjab Kings",
        shortName: "PBKS",
        color: "#ED1B24",
        titles: 0,
        captain: "Shikhar Dhawan",
        home: "Mohali",
        players: [
            { name: "Shikhar Dhawan", role: "Batsman" },
            { name: "Jonny Bairstow", role: "WK-Batsman" },
            { name: "Liam Livingstone", role: "All-rounder" },
            { name: "Sam Curran", role: "All-rounder" },
            { name: "Harpreet Brar", role: "All-rounder" },
            { name: "Prabhsimran Singh", role: "WK-Batsman" },
            { name: "Rilee Rossouw", role: "Batsman" },
            { name: "Arshdeep Singh", role: "Bowler" },
            { name: "Nathan Ellis", role: "Bowler" },
            { name: "Kagiso Rabada", role: "Bowler" },
            { name: "Rahul Chahar", role: "Bowler" },
        ],
    },
    {
        id: 9,
        name: "Gujarat Titans",
        shortName: "GT",
        color: "#1C6B99",
        titles: 1,
        captain: "Shubman Gill",
        home: "Ahmedabad",
        players: [
            { name: "Shubman Gill", role: "Batsman" },
            { name: "Wriddhiman Saha", role: "WK-Batsman" },
            { name: "David Miller", role: "Batsman" },
            { name: "Vijay Shankar", role: "All-rounder" },
            { name: "Rahul Tewatia", role: "All-rounder" },
            { name: "Rashid Khan", role: "All-rounder" },
            { name: "Mohammed Shami", role: "Bowler" },
            { name: "Alzarri Joseph", role: "Bowler" },
            { name: "Noor Ahmad", role: "Bowler" },
            { name: "Darshan Nalkande", role: "Bowler" },
            { name: "Kane Williamson", role: "Batsman" },
        ],
    },
    {
        id: 10,
        name: "Lucknow Super Giants",
        shortName: "LSG",
        color: "#A72056",
        titles: 0,
        captain: "KL Rahul",
        home: "Lucknow",
        players: [
            { name: "KL Rahul", role: "WK-Batsman" },
            { name: "Quinton de Kock", role: "WK-Batsman" },
            { name: "Kyle Mayers", role: "All-rounder" },
            { name: "Marcus Stoinis", role: "All-rounder" },
            { name: "Nicholas Pooran", role: "Batsman" },
            { name: "Deepak Hooda", role: "All-rounder" },
            { name: "Krunal Pandya", role: "All-rounder" },
            { name: "Ravi Bishnoi", role: "Bowler" },
            { name: "Avesh Khan", role: "Bowler" },
            { name: "Mark Wood", role: "Bowler" },
            { name: "Mohsin Khan", role: "Bowler" },
        ],
    },
]

const roleBadgeColor: Record<string, string> = {
    "Batsman": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "WK-Batsman": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "All-rounder": "bg-green-500/20 text-green-400 border-green-500/30",
    "Bowler": "bg-orange-500/20 text-orange-400 border-orange-500/30",
}

export default function TeamsPage() {
    const [selectedTeam, setSelectedTeam] = useState<typeof teams[0] | null>(null)

    return (
        <main className="min-h-screen bg-background">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Page Header */}
                <div className="text-center mb-14 animate-slide-in-up">
                    <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-3">IPL 2024</p>
                    <h1 className="text-5xl sm:text-6xl font-bold text-foreground glow-accent mb-4">All Teams</h1>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        Click any team card to explore their full squad
                    </p>
                </div>

                {/* Teams Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {teams.map((team, index) => (
                        <div
                            key={team.id}
                            onClick={() => setSelectedTeam(team)}
                            className="animate-slide-in-up cursor-pointer"
                            style={{ animationDelay: `${index * 0.07}s` }}
                        >
                            <div className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1">
                                <div className="h-1.5 w-full" style={{ backgroundColor: team.color }} />
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-5">
                                        <div
                                            className="w-14 h-14 rounded-xl flex items-center justify-center font-black text-lg"
                                            style={{
                                                backgroundColor: `${team.color}22`,
                                                color: team.color,
                                                border: `2px solid ${team.color}44`,
                                            }}
                                        >
                                            {team.shortName}
                                        </div>
                                        {team.titles > 0 ? (
                                            <div className="flex items-center gap-1.5 bg-accent/10 border border-accent/30 rounded-full px-3 py-1">
                                                <span className="text-xs">🏆</span>
                                                <span className="text-accent text-xs font-bold">{team.titles}x</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 bg-muted/50 border border-border rounded-full px-3 py-1">
                                                <span className="text-muted-foreground text-xs font-medium">No titles</span>
                                            </div>
                                        )}
                                    </div>
                                    <h2 className="text-lg font-bold text-foreground leading-tight mb-1 group-hover:text-accent transition-colors duration-300">
                                        {team.name}
                                    </h2>
                                    <p className="text-xs text-muted-foreground mb-4">{team.home}</p>
                                    <div className="border-t border-border pt-4 flex justify-between items-center">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Captain</p>
                                            <p className="text-sm font-semibold text-foreground mt-0.5">{team.captain}</p>
                                        </div>
                                        <div
                                            className="text-xs font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{ backgroundColor: `${team.color}22`, color: team.color }}
                                        >
                                            Squad →
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dark Backdrop */}
            <div
                onClick={() => setSelectedTeam(null)}
                className={cn(
                    "fixed inset-0 z-40 bg-black/85 backdrop-blur-sm transition-all duration-300",
                    selectedTeam ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            />

            {/* Squad Side Drawer */}
            <div
                className={cn(
                    "fixed right-0 top-0 h-full w-full sm:w-[440px] z-50 bg-card border-l border-border flex flex-col transition-transform duration-500 ease-in-out shadow-2xl",
                    selectedTeam ? "translate-x-0" : "translate-x-full"
                )}
            >
                {selectedTeam && (
                    <>
                        {/* Drawer Header */}
                        <div
                            className="relative px-6 pt-6 pb-5 flex-shrink-0"
                            style={{ background: `linear-gradient(135deg, ${selectedTeam.color}18, transparent)` }}
                        >
                            <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: selectedTeam.color }} />

                            {/* Close button */}
                            <button
                                onClick={() => setSelectedTeam(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            {/* Team identity */}
                            <div className="flex items-center gap-4 mt-2">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0"
                                    style={{
                                        backgroundColor: `${selectedTeam.color}22`,
                                        color: selectedTeam.color,
                                        border: `2px solid ${selectedTeam.color}55`,
                                    }}
                                >
                                    {selectedTeam.shortName}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-foreground leading-tight">{selectedTeam.name}</h2>
                                    <p className="text-sm text-muted-foreground mt-0.5">
                                        {selectedTeam.home} &nbsp;·&nbsp;
                                        {selectedTeam.titles > 0
                                            ? `🏆 ${selectedTeam.titles}x Champion`
                                            : "No titles yet"}
                                    </p>
                                </div>
                            </div>

                            {/* Meta row */}
                            <div className="flex gap-3 mt-5">
                                <div className="flex-1 bg-muted/40 border border-border rounded-xl px-3 py-2.5 text-center">
                                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Captain</p>
                                    <p className="text-sm font-bold text-foreground mt-0.5">{selectedTeam.captain}</p>
                                </div>
                                <div className="flex-1 bg-muted/40 border border-border rounded-xl px-3 py-2.5 text-center">
                                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Squad</p>
                                    <p className="text-sm font-bold text-foreground mt-0.5">{selectedTeam.players.length} Players</p>
                                </div>
                            </div>

                            {/* Role legend */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {Object.entries(roleBadgeColor).map(([role, cls]) => (
                                    <span key={role} className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", cls)}>
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Players list */}
                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                                Full Squad
                            </p>
                            <div className="space-y-2">
                                {selectedTeam.players.map((player, idx) => (
                                    <Link key={idx} href={`/cards/${encodeURIComponent(player.name)}`}>
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border hover:border-accent/40 hover:bg-accent/5 transition-all duration-200 group">
                                            <span className="text-xs text-muted-foreground w-5 text-right flex-shrink-0">{idx + 1}</span>
                                            <div
                                                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 transition-transform group-hover:scale-110 duration-200"
                                                style={{
                                                    backgroundColor: `${selectedTeam.color}22`,
                                                    color: selectedTeam.color,
                                                    border: `1.5px solid ${selectedTeam.color}44`,
                                                }}
                                            >
                                                {player.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-foreground truncate">{player.name}</p>
                                            </div>
                                            <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0",
                                                roleBadgeColor[player.role] ?? "bg-muted text-muted-foreground border-border"
                                            )}>
                                                {player.role}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
    )
}