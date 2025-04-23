
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

// Типы для компонентов
type Item = {
  id: number;
  name: string;
  image: string;
  special: boolean;
};

type Recipe = {
  id: number;
  items: number[];
  result: string;
  resultImage: string;
  description: string;
};

const PixelCauldron = () => {
  // Имитация базы данных с предметами
  const items: Item[] = [
    { id: 1, name: 'Вода', image: '💧', special: false },
    { id: 2, name: 'Огонь', image: '🔥', special: false },
    { id: 3, name: 'Земля', image: '🌱', special: false },
    { id: 4, name: 'Воздух', image: '💨', special: false },
    { id: 5, name: 'Металл', image: '⚙️', special: false },
    { id: 6, name: 'Кристалл', image: '💎', special: false },
    { id: 7, name: 'Гриб', image: '🍄', special: false },
    { id: 8, name: 'Цветок', image: '🌸', special: false },
    { id: 9, name: 'Кость', image: '🦴', special: false },
    { id: 10, name: 'Звезда', image: '⭐', special: false },
    { id: 11, name: 'Луна', image: '🌙', special: false },
    { id: 12, name: 'Солнце', image: '☀️', special: false },
    { id: 13, name: 'Глаз', image: '👁️', special: false },
    { id: 14, name: 'Зуб', image: '🦷', special: false },
    { id: 15, name: 'Перо', image: '🪶', special: false },
    { id: 16, name: 'Ключ', image: '🔑', special: false },
    { id: 17, name: 'Песок', image: '🏝️', special: false },
    { id: 18, name: 'Лёд', image: '🧊', special: false },
    { id: 19, name: 'Молния', image: '⚡', special: false },
    { id: 20, name: 'Тень', image: '👤', special: false },
    { id: 21, name: 'Древесина', image: '🪵', special: false },
    { id: 22, name: 'Волшебная пыль', image: '✨', special: true },
    { id: 23, name: 'Драконий глаз', image: '🐉', special: true },
    { id: 24, name: 'Сердце феникса', image: '❤️‍🔥', special: true },
    { id: 25, name: 'Слеза русалки', image: '💦', special: true },
    { id: 26, name: 'Звёздная эссенция', image: '🌠', special: true },
  ];

  // Некоторые рецепты
  const recipes: Recipe[] = [
    { 
      id: 1, 
      items: [1, 2], 
      result: 'Паровое облако', 
      resultImage: '☁️', 
      description: 'Вода + Огонь = Паровое облако' 
    },
    { 
      id: 2, 
      items: [1, 3], 
      result: 'Грязь', 
      resultImage: '🟤', 
      description: 'Вода + Земля = Грязь' 
    },
    { 
      id: 3, 
      items: [2, 3], 
      result: 'Лава', 
      resultImage: '🌋', 
      description: 'Огонь + Земля = Лава' 
    },
    { 
      id: 4, 
      items: [1, 22], 
      result: 'Радужная вода', 
      resultImage: '🌈', 
      description: 'Вода + Волшебная пыль = Радужная вода' 
    },
    { 
      id: 5, 
      items: [22, 23, 24], 
      result: 'Эликсир бессмертия', 
      resultImage: '⏳', 
      description: 'Волшебная пыль + Драконий глаз + Сердце феникса = Эликсир бессмертия' 
    },
    // И так далее... остальные рецепты не привожу для краткости
  ];

  // Состояния
  const [cauldronItems, setCauldronItems] = useState<Item[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [coins, setCoins] = useState(0);
  const [draggedItem, setDraggedItem] = useState<Item | null>(null);
  const [showRecipes, setShowRecipes] = useState(false);

  // Refs
  const cauldronRef = useRef<HTMLDivElement>(null);

  // Обработка перетаскивания
  const handleDragStart = (item: Item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem && cauldronItems.length < 3) {
      setCauldronItems([...cauldronItems, draggedItem]);
      setDraggedItem(null);
    }
  };

  // Проверка рецепта
  const checkRecipe = (items: Item[]): Recipe | null => {
    const itemIds = items.map(item => item.id).sort((a, b) => a - b);
    return recipes.find(recipe => {
      const recipeIds = [...recipe.items].sort((a, b) => a - b);
      if (recipeIds.length !== itemIds.length) return false;
      return recipeIds.every((id, index) => id === itemIds[index]);
    }) || null;
  };

  // Функция варки
  const brew = () => {
    if (cauldronItems.length === 0) return;
    
    // Проверяем, есть ли специальные предметы
    const hasSpecialItem = cauldronItems.some(item => item.special);
    
    // Добавляем монеты
    if (hasSpecialItem) {
      setCoins(coins + 5);
    } else {
      setCoins(coins + 1);
    }
    
    // Проверяем рецепт
    const recipe = checkRecipe(cauldronItems);
    
    if (recipe) {
      setResult(recipe.result);
      setResultImage(recipe.resultImage);
    } else {
      // Случайный результат, если рецепт не найден
      const randomResults = [
        { name: 'Странная жижа', image: '🟢' },
        { name: 'Пузырящаяся масса', image: '🫧' },
        { name: 'Дымящаяся субстанция', image: '💭' },
        { name: 'Светящаяся жидкость', image: '🔆' },
        { name: 'Радужная вода', image: '🌈' },
        { name: 'Кристальный осадок', image: '🔹' },
        { name: 'Искрящийся туман', image: '✨' }
      ];
      
      const randomResult = randomResults[Math.floor(Math.random() * randomResults.length)];
      setResult(randomResult.name);
      setResultImage(randomResult.image);
    }
    
    // Очищаем котел
    setTimeout(() => {
      setCauldronItems([]);
    }, 1500);
  };

  // Сброс котла
  const resetCauldron = () => {
    setCauldronItems([]);
    setResult(null);
    setResultImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-start pt-8 pb-16 px-4">
      <h1 className="text-4xl font-pixel mb-6 text-white">Пиксельный Котёл</h1>
      
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Левая колонка - Рецепты */}
        <div className="md:col-span-1">
          <Card className="bg-gray-700 border-gray-600 shadow-lg p-4 h-full">
            <h2 className="text-2xl font-pixel mb-4 text-white">Рецепты <span className="text-sm">({recipes.length})</span></h2>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-3">
                {recipes.slice(0, 10).map((recipe) => (
                  <div key={recipe.id} className="px-3 py-2 bg-gray-800 rounded-md">
                    <div className="flex items-center gap-2">
                      {recipe.items.map(itemId => {
                        const item = items.find(i => i.id === itemId);
                        return item ? (
                          <span key={item.id} className="text-2xl">{item.image}</span>
                        ) : null;
                      })}
                      <span className="text-white">→</span>
                      <span className="text-2xl">{recipe.resultImage}</span>
                    </div>
                    <p className="text-xs text-gray-300 mt-1">{recipe.description}</p>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="w-full mt-2 border-dashed border-gray-600"
                  onClick={() => setShowRecipes(!showRecipes)}
                >
                  {showRecipes ? "Скрыть рецепты" : "Показать больше рецептов"}
                </Button>
                
                {showRecipes && (
                  <div className="mt-4 space-y-3">
                    {recipes.slice(10, 35).map((recipe) => (
                      <div key={recipe.id} className="px-3 py-2 bg-gray-800 rounded-md">
                        <div className="flex items-center gap-2">
                          {recipe.items.map(itemId => {
                            const item = items.find(i => i.id === itemId);
                            return item ? (
                              <span key={item.id} className="text-2xl">{item.image}</span>
                            ) : null;
                          })}
                          <span className="text-white">→</span>
                          <span className="text-2xl">{recipe.resultImage}</span>
                        </div>
                        <p className="text-xs text-gray-300 mt-1">{recipe.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>
        </div>
        
        {/* Центральная колонка - Котёл */}
        <div className="md:col-span-1">
          <div className="flex flex-col items-center h-full">
            <Badge variant="outline" className="mb-4 bg-amber-800 text-amber-200 border-amber-600 px-4 py-2 text-lg font-pixel">
              <span className="text-lg mr-1">🪙</span> {coins}
            </Badge>
            
            <div 
              ref={cauldronRef}
              className="relative w-64 h-64 bg-gray-900 rounded-full border-4 border-gray-600 overflow-hidden mb-6 flex items-center justify-center"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {/* Содержимое котла */}
              <div className={cn(
                "absolute bottom-0 w-full transition-all duration-500",
                cauldronItems.length === 0 ? "h-1/4 bg-gray-700" : 
                cauldronItems.length === 1 ? "h-2/4 bg-gray-600" : 
                cauldronItems.length === 2 ? "h-3/4 bg-gray-500" : 
                "h-5/6 bg-gray-400"
              )}>
                {/* Бурление */}
                <div className="absolute top-0 left-0 w-full">
                  {Array(8).fill(0).map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute rounded-full bg-gray-800 opacity-20 animate-pulse"
                      style={{
                        width: `${10 + Math.random() * 20}px`,
                        height: `${10 + Math.random() * 20}px`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${1 + Math.random() * 3}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Предметы в котле */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-wrap gap-2 z-10">
                {cauldronItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="text-4xl animate-bounce"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {item.image}
                  </div>
                ))}
              </div>
              
              {/* Результат варки */}
              {result && resultImage && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                  <div className="text-5xl animate-pulse mb-2">{resultImage}</div>
                  <p className="text-white bg-gray-800 bg-opacity-75 px-2 py-1 rounded text-sm">{result}</p>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={brew} 
                disabled={cauldronItems.length === 0}
                className="px-6 bg-amber-600 hover:bg-amber-700 text-white font-pixel"
              >
                Сварить
              </Button>
              <Button 
                onClick={resetCauldron} 
                variant="outline"
                className="border-gray-500 text-gray-300 font-pixel"
                disabled={cauldronItems.length === 0}
              >
                Очистить
              </Button>
            </div>
            
            <div className="mt-4 flex gap-2 flex-wrap justify-center">
              {cauldronItems.map((item, idx) => (
                <Badge key={idx} variant={item.special ? "default" : "secondary"} className="text-sm">
                  {item.name} {item.image}
                </Badge>
              ))}
              {cauldronItems.length === 0 && (
                <p className="text-gray-400 text-sm italic">Перетащите ингредиенты в котёл</p>
              )}
              {cauldronItems.length >= 3 && (
                <p className="text-yellow-400 text-sm">Котёл полон! (максимум 3)</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Правая колонка - Таблица ингредиентов */}
        <div className="md:col-span-1">
          <Card className="bg-gray-700 border-gray-600 shadow-lg p-4 h-full">
            <h2 className="text-2xl font-pixel mb-4 text-white">Ингредиенты <span className="text-sm">({items.length})</span></h2>
            <div className="grid grid-cols-4 gap-3">
              {items.map((item) => (
                <div 
                  key={item.id}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-md cursor-grab",
                    "border border-gray-600 hover:border-gray-400 transition-colors",
                    item.special ? "bg-purple-900 bg-opacity-50" : "bg-gray-800"
                  )}
                  draggable
                  onDragStart={() => handleDragStart(item)}
                >
                  <div className="text-3xl mb-1">{item.image}</div>
                  <p className="text-xs text-center text-gray-300 truncate w-full">{item.name}</p>
                  {item.special && (
                    <Badge variant="secondary" className="mt-1 text-[10px] px-1 bg-purple-800">
                      особый
                    </Badge>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">Перетащите ингредиенты в котёл (до 3 шт)</p>
            <p className="text-xs text-amber-400 mt-1">
              <span className="text-amber-300">💡</span> Особые ингредиенты (фиолетовые) дают 5 монет при варке
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PixelCauldron;
