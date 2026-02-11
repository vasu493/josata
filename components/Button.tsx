
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  href?: string;
  loadingText?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  href, 
  onClick, 
  loadingText = 'Loading...',
  className = '',
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // Simulate loading for better UX feel
    await new Promise(resolve => setTimeout(resolve, 800));

    if (onClick) {
      onClick(e);
    }

    if (href) {
      navigate(href);
    }
    
    setIsLoading(false);
  };

  const variants = {
    primary: "bg-gradient-to-r from-[#00A3FF] to-[#A855F7] text-white shadow-[0_0_20px_rgba(0,163,255,0.3)] hover:shadow-[0_0_30px_rgba(0,163,255,0.5)]",
    secondary: "bg-white text-black hover:bg-gray-100",
    outline: "border border-white/20 text-white hover:bg-white/5",
    ghost: "text-gray-400 hover:text-white"
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      disabled={isLoading || props.disabled}
      className={`relative flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-70 ${variants[variant]} ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
