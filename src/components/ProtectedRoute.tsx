import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

/**
 * Интерфейс для свойств компонента защищенного маршрута
 */
interface ProtectedRouteProps {
  /** Дочерние компоненты, которые будут отображены при успешной авторизации */
  children?: React.ReactNode;
  /** Роль пользователя, которой разрешен доступ к маршруту */
  allowedRole: 'client' | 'trainer';
}

/**
 * Компонент для защиты маршрутов, требующих авторизации и определенной роли пользователя
 */
export function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  // Состояния для хранения данных пользователя и статуса загрузки
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Получение данных пользователя при монтировании компонента
  useEffect(() => {
    /**
     * Асинхронная функция для получения данных текущего пользователя
     */
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setUserRole(user.user_metadata.role);
      }
      setLoading(false);
    }
    
    getUser();
  }, []);

  // Отображение индикатора загрузки, пока проверяется авторизация
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 to-gray-500 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  // Перенаправление на страницу входа, если пользователь не авторизован
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Перенаправление на соответствующую страницу, если роль пользователя не соответствует требуемой
  if (userRole !== allowedRole) {
    return <Navigate to={`/${userRole}`} replace />;
  }

  // Отображение защищенного содержимого, если все проверки пройдены
  return <>{children}</>;
}