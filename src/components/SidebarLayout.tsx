import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, ChevronLeft, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

/**
 * Интерфейс для элемента меню
 */
interface MenuItem {
  /** Иконка элемента меню */
  icon: React.ReactNode;
  /** Текстовая метка элемента меню */
  label: string;
  /** Обработчик клика по элементу меню */
  onClick: () => void;
}

/**
 * Интерфейс для свойств компонента макета с боковой панелью
 */
interface SidebarLayoutProps {
  /** Дочерние компоненты, которые будут отображены в основной области */
  children: React.ReactNode;
  /** Заголовок страницы (строка или React-компонент) */
  title?: string | React.ReactNode;
  /** Элементы меню для отображения в боковой панели или нижней навигации */
  menuItems: MenuItem[];
  /** Путь для кнопки "Назад" */
  backTo?: string;
  /** Обработчик для кнопки "Назад" */
  onBack?: () => void;
  /** Вариант отображения навигации: боковая панель или нижняя панель */
  variant?: 'sidebar' | 'bottom';
  /** Пользовательский заголовок для замены стандартного */
  customHeader?: React.ReactNode;
}

/**
 * Компонент макета с боковой или нижней навигационной панелью
 */
export function SidebarLayout({ 
  children, 
  menuItems, 
  backTo, 
  onBack,
  variant = 'sidebar',
  customHeader
}: SidebarLayoutProps) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  /**
   * Обработчик выхода из системы
   */
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast.error('Ошибка при выходе из системы');
    }
  };

  /**
   * Обработчик кнопки "Назад"
   */
  const handleBack = () => {
    if (onBack) {
      onBack();
      setIsSidebarOpen(false);
    } else if (backTo) {
      navigate(backTo);
      setIsSidebarOpen(false);
    }
  };

  // Стили для иконок
  const iconWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'scale(0.9)', // 10% меньше
  };

  const iconStyle = {
    strokeWidth: 1.5, // Более тонкие линии (по умолчанию 2)
  };

  /**
   * Рендер компонента с нижней навигацией
   */
  const renderBottomNavigation = () => (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* Заголовок */}
      {renderHeader()}
      
      {/* Основное содержимое */}
      <div className="p-4">
        {children}
      </div>
      
      {/* Нижняя навигация */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 px-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="flex flex-col items-center justify-center h-full w-full"
          >
            <div style={iconWrapperStyle}>
              {item.icon}
            </div>
            {item.label && (
              <span className="text-xs mt-1">{item.label}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  /**
   * Рендер компонента с боковой навигацией
   */
  const renderSidebarNavigation = () => (
    <div className="flex h-screen bg-gray-100">
      {/* Боковая панель */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      
      <div 
        className={`fixed top-0 left-0 h-full bg-white w-64 shadow-lg z-30 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">HARDCASE</h2>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="py-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                setIsSidebarOpen(false);
              }}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center space-x-3"
            >
              <div style={iconWrapperStyle}>
                {item.icon}
              </div>
              <span>{item.label}</span>
            </button>
          ))}
          
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center space-x-3 text-red-500 mt-4"
          >
            <LogOut className="w-5 h-5" style={iconStyle} />
            <span>Выйти</span>
          </button>
        </div>
      </div>
      
      {/* Основное содержимое */}
      <div className="flex-1 flex flex-col">
        {/* Заголовок */}
        {renderHeader()}
        
        {/* Основное содержимое */}
        <div className="flex-1 p-4 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );

  /**
   * Рендер заголовка страницы
   */
  const renderHeader = () => {
    if (customHeader) {
      return customHeader;
    }
    
    return (
      <div className="bg-white shadow-sm">
        <div className="px-4 py-3 flex justify-between items-center">
          {backTo && (
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          
          {variant === 'sidebar' && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
          
          <div className={`flex-1 text-center ${backTo && variant === 'sidebar' ? 'mx-4' : ''}`}>
            <h1 className="text-xl font-bold text-gray-800">HARDCASE</h1>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <User className="w-5 h-5 text-gray-600" />
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Выйти</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Рендер соответствующего варианта макета
  return variant === 'bottom' ? renderBottomNavigation() : renderSidebarNavigation();
}