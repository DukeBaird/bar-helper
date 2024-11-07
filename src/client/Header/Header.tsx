import React from 'react';
import './Header.css';
import { FaCocktail } from 'react-icons/fa';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="app-header">
      <h1>
        <FaCocktail className="cocktail-icon" />
        Recipe App
      </h1>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setSearchTerm('')} className="btn btn-clear-search">Clear</button>
    </header>
  );
};

export default Header;