import React from 'react'

export default function Sidebar() {
  return (
    <div className="p-6 h-screen flex flex-col">
      <h1 className="text-2xl font-serif font-bold text-secondary mb-8">DungeonAI</h1>

      <nav className="space-y-2 flex-1">
        <a href="#" className="block px-4 py-2 rounded hover:bg-[#244159]">
          Dashboard
        </a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-[#244159]">
          Mi Personaje
        </a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-[#244159]">
          Sesión Actual
        </a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-[#244159]">
          NPCs
        </a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-[#244159]">
          Facciones
        </a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-[#244159]">
          Asistente
        </a>
      </nav>

      <button className="w-full bg-secondary text-primary font-bold py-2 px-4 rounded hover:bg-yellow-600 transition">
        Logout
      </button>
    </div>
  )
}
