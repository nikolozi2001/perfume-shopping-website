import { useState } from 'react'

function Header() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <header className="flex justify-between items-center bg-gray-100 p-4 shadow-md">
      <div className="text-xl font-bold text-gray-800">
        <h1>Perfume Paradise</h1>
      </div>
      <nav>
        <ul className="flex space-x-6">
          <li><a href="#home" className="text-gray-700 hover:text-blue-600 font-semibold">Home</a></li>
          <li><a href="#shop" className="text-gray-700 hover:text-blue-600 font-semibold">Shop</a></li>
          <li><a href="#about" className="text-gray-700 hover:text-blue-600 font-semibold">About</a></li>
          <li><a href="#contact" className="text-gray-700 hover:text-blue-600 font-semibold">Contact</a></li>
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search perfumes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 font-semibold">
          🛒 Cart (0)
        </button>
      </div>
    </header>
  )
}

export default Header