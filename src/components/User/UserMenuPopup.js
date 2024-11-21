import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const getRandomColor = () => {
  const colors = [
    'bg-blue-600',
    'bg-purple-600',
    'bg-green-600',
    'bg-red-600',
    'bg-indigo-600',
    'bg-pink-600',
    'bg-teal-600'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const UserMenuPopup = ({ userName, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarColor] = useState(getRandomColor());
  const popupRef = useRef(null);

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : 'U';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={popupRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-10 rounded-full ${avatarColor} text-white flex items-center justify-center font-semibold focus:outline-none`}
      >
        {firstLetter}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-gray-700 text-white">
          <div className="py-2">
            <Link to="/perfil" className="block px-4 py-2 hover:bg-gray-600">
              Dados do usuario
            </Link>
            <Link to="/pontuacao" className="block px-4 py-2 hover:bg-gray-600">
              Pontuação
            </Link>
            <button
              onClick={onLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenuPopup;