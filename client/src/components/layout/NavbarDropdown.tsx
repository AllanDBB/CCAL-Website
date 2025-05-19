"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface NavbarDropdownProps {
  title: string;
  items: {
    title: string;
    link: string;
  }[];
}

const activeDropdown = { current: null as HTMLDivElement | null };

const NavbarDropdown: React.FC<NavbarDropdownProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (activeDropdown.current && activeDropdown.current !== dropdownRef.current) {
      const event = new CustomEvent('closedropdown');
      activeDropdown.current.dispatchEvent(event);
    }

    if (dropdownRef.current) {
      activeDropdown.current = dropdownRef.current;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);

      if (activeDropdown.current === dropdownRef.current) {
        activeDropdown.current = null;
      }
    }, 150); 
  };

  useEffect(() => {
    const forceClose = () => {
      setIsOpen(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const currentRef = dropdownRef.current;
    if (currentRef) {
      currentRef.addEventListener('closedropdown', forceClose);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('closedropdown', forceClose);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      className="relative"
      ref={dropdownRef}
    >
      <button 
        className="flex items-center font-semibold text-[#0A2463] hover:text-[#FAA916] transition-colors py-2 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-expanded={isOpen}
      >
        {title}
        <svg 
          className={`ml-1.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          width="10" 
          height="6" 
          viewBox="0 0 10 6" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg overflow-hidden z-50 animate-fadeIn"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ul className="py-1">
            {items.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.link} 
                  className="block px-4 py-2.5 text-[#0A2463] hover:bg-gray-50 hover:text-[#FAA916] transition-colors text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavbarDropdown;