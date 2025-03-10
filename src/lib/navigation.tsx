import { Dumbbell, Activity, Plus, X, Camera, Apple, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

/**
 * Интерфейс для элемента навигации
 */
interface NavigationItem {
  icon: JSX.Element | React.ReactNode;
  label: string;
  onClick: () => void;
}

/**
 * Интерфейс для параметров навигации клиента
 */
interface ClientNavigationParams {
  /** Состояние отображения меню быстрого доступа */
  showFabMenu: boolean;
  /** Функция для изменения состояния отображения меню быстрого доступа */
  setShowFabMenu: (show: boolean) => void;
  /** Обработчик клика по пункту меню */
  handleMenuItemClick: (action: string) => void;
  /** Опциональный обработчик для замеров */
  handleMeasurements?: () => void;
}

// Интерфейс для события React
interface ReactMouseEvent {
  preventDefault: () => void;
  stopPropagation: () => void;
}

/**
 * Хук для создания навигационных элементов клиентского интерфейса
 * @param params Параметры для настройки навигации
 * @returns Массив навигационных элементов
 */
export const useClientNavigation = ({
  showFabMenu, 
  setShowFabMenu, 
  handleMenuItemClick,
  handleMeasurements
}: ClientNavigationParams): NavigationItem[] => {
  const navigate = useNavigate();

  /**
   * Создает элемент меню быстрого доступа
   */
  const createFabMenu = (): NavigationItem => ({
    icon: (
      <div className="relative -mt-8">
        <div 
          onClick={(e: ReactMouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setShowFabMenu(!showFabMenu);
          }}
          className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-orange-600 transition-colors cursor-pointer"
        >
          {showFabMenu ? (
            <X className="w-8 h-8" />
          ) : (
            <Plus className="w-8 h-8" />
          )}
        </div>
        {showFabMenu && (
          <div 
            className="fixed inset-0 z-40"
            onClick={(e: ReactMouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              setShowFabMenu(false);
            }}
          >
            <div 
              className="absolute bottom-28 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg overflow-hidden w-48 z-50"
              onClick={e => e.stopPropagation()}
            >
              <div className="py-2">
                <div
                  onClick={(e: ReactMouseEvent) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowFabMenu(false);
                    navigate('/client/activity/new');
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 cursor-pointer"
                >
                  <Activity className="w-6 h-6 text-green-500" />
                  <span>Активность</span>
                </div>
                <div
                  onClick={(e: ReactMouseEvent) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowFabMenu(false);
                    navigate('/client/progress-photo/new');
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 cursor-pointer"
                >
                  <Camera className="w-6 h-6 text-purple-500" />
                  <span>Фото прогресса</span>
                </div>
                <div
                  onClick={(e: ReactMouseEvent) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowFabMenu(false);
                    // Используем новый обработчик для замеров, если он предоставлен
                    if (handleMeasurements) {
                      handleMeasurements();
                    } else {
                      // Старое поведение - навигация
                      handleMenuItemClick('measurements');
                    }
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 cursor-pointer"
                >
                  <Scale className="w-6 h-6 text-blue-500" />
                  <span>Замеры</span>
                </div>
                <div
                  onClick={(e: ReactMouseEvent) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowFabMenu(false);
                    navigate('/client/nutrition');
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 cursor-pointer"
                >
                  <Apple className="w-6 h-6 text-red-500" />
                  <span>Питание</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    ),
    label: '',
    onClick: () => {}
  });

  // Формируем массив навигационных элементов
  return [
    {
      icon: <Dumbbell className="w-8 h-8 text-gray-600 hover:text-orange-500 transition-colors" />,
      label: '',
      onClick: () => navigate('/client/workouts')
    },
    {
      icon: <Activity className="w-8 h-8 text-gray-600 hover:text-orange-500 transition-colors" />,
      label: '',
      onClick: () => navigate('/client/activity')
    },
    createFabMenu(),
    {
      icon: <Camera className="w-8 h-8 text-gray-600 hover:text-orange-500 transition-colors" />,
      label: '',
      onClick: () => navigate('/client/progress')
    },
    {
      icon: <Apple className="w-8 h-8 text-gray-600 hover:text-orange-500 transition-colors" />,
      label: '',
      onClick: () => navigate('/client/nutrition')
    }
  ];
};