
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
    { id: 1, name: 'Вода', image: '/items/water.png', special: false },
    { id: 2, name: 'Огонь', image: '/items/fire.png', special: false },
    { id: 3, name: 'Земля', image: '/items/earth.png', special: false },
    { id: 4, name: 'Воздух', image: '/items/air.png', special: false },
    { id: 5, name: 'Металл', image: '/items/metal.png', special: false },
    { id: 6, name: 'Кристалл', image: '/items/crystal.png', special: false },
    { id: 7, name: 'Гриб', image: '/items/mushroom.png', special: false },
    { id: 8, name: 'Цветок', image: '/items/flower.png', special: false },
    { id: 9, name: 'Кость', image: '/items/bone.png', special: false },
    { id: 10, name: 'Звезда', image: '/items/star.png', special: false },
    { id: 11, name: 'Луна', image: '/items/moon.png', special: false },
    { id: 12, name: 'Солнце', image: '/items/sun.png', special: false },
    { id: 13, name: 'Глаз', image: '/items/eye.png', special: false },
    { id: 14, name: 'Зуб', image: '/items/tooth.png', special: false },
    { id: 15, name: 'Перо', image: '/items/feather.png', special: false },
    { id: 16, name: 'Ключ', image: '/items/key.png', special: false },
    { id: 17, name: 'Песок', image: '/items/sand.png', special: false },
    { id: 18, name: 'Лёд', image: '/items/ice.png', special: false },
    { id: 19, name: 'Молния', image: '/items/lightning.png', special: false },
    { id: 20, name: 'Тень', image: '/items/shadow.png', special: false },
    { id: 21, name: 'Древесина', image: '/items/wood.png', special: false },
    { id: 22, name: 'Волшебная пыль', image: '/items/magic_dust.png', special: true },
    { id: 23, name: 'Драконий глаз', image: '/items/dragon_eye.png', special: true },
    { id: 24, name: 'Сердце феникса', image: '/items/phoenix_heart.png', special: true },
    { id: 25, name: 'Слеза русалки', image: '/items/mermaid_tear.png', special: true },
    { id: 26, name: 'Звёздная эссенция', image: '/items/star_essence.png', special: true },
  ];

  // Некоторые рецепты
  const recipes: Recipe[] = [
    { 
      id: 1, 
      items: [1, 2], 
      result: 'Паровое облако', 
      resultImage: '/results/steam_cloud.png', 
      description: 'Вода + Огонь = Паровое облако' 
    },
    { 
      id: 2, 
      items: [1, 3], 
      result: 'Грязь', 
      resultImage: '/results/mud.png', 
      description: 'Вода + Земля = Грязь' 
    },
    { 
      id: 3, 
      items: [2, 3], 
      result: 'Лава', 
      resultImage: '/results/lava.png', 
      description: 'Огонь + Земля = Лава' 
    },
    { 
      id: 4, 
      items: [1, 22], 
      result: 'Радужная вода', 
      resultImage: '/results/rainbow_water.png', 
      description: 'Вода + Волшебная пыль = Радужная вода' 
    },
    { 
      id: 5, 
      items: [22, 23, 24], 
      result: 'Эликсир бессмертия', 
      resultImage: '/results/immortality_elixir.png', 
      description: 'Волшебная пыль + Драконий глаз + Сердце феникса = Эликсир бессмертия' 
    },
    // Добавляем больше рецептов
    { 
      id: 6, 
      items: [2, 4], 
      result: 'Огненный вихрь', 
      resultImage: '/results/fire_vortex.png', 
      description: 'Огонь + Воздух = Огненный вихрь' 
    },
    { 
      id: 7, 
      items: [3, 4], 
      result: 'Песчаная буря', 
      resultImage: '/results/sand_storm.png', 
      description: 'Земля + Воздух = Песчаная буря' 
    },
    { 
      id: 8, 
      items: [1, 4], 
      result: 'Туман', 
      resultImage: '/results/fog.png', 
      description: 'Вода + Воздух = Туман' 
    },
    { 
      id: 9, 
      items: [5, 2], 
      result: 'Расплавленный металл', 
      resultImage: '/results/molten_metal.png', 
      description: 'Металл + Огонь = Расплавленный металл' 
    },
    { 
      id: 10, 
      items: [6, 1], 
      result: 'Кристальная вода', 
      resultImage: '/results/crystal_water.png', 
      description: 'Кристалл + Вода = Кристальная вода' 
    },
    // И ещё больше рецептов...
    { 
      id: 11, 
      items: [7, 11], 
      result: 'Светящийся гриб', 
      resultImage: '/results/glowing_mushroom.png', 
      description: 'Гриб + Луна = Светящийся гриб' 
    },
    { 
      id: 12, 
      items: [8, 12], 
      result: 'Солнечный цветок', 
      resultImage: '/results/sun_flower.png', 
      description: 'Цветок + Солнце = Солнечный цветок' 
    },
    { 
      id: 13, 
      items: [9, 13], 
      result: 'Костяной страж', 
      resultImage: '/results/bone_guardian.png', 
      description: 'Кость + Глаз = Костяной страж' 
    },
    { 
      id: 14, 
      items: [14, 15], 
      result: 'Зубастое перо', 
      resultImage: '/results/toothed_feather.png', 
      description: 'Зуб + Перо = Зубастое перо' 
    },
    { 
      id: 15, 
      items: [16, 17], 
      result: 'Песочные часы', 
      resultImage: '/results/hourglass.png', 
      description: 'Ключ + Песок = Песочные часы' 
    },
    { 
      id: 16, 
      items: [18, 19], 
      result: 'Ледяная молния', 
      resultImage: '/results/ice_lightning.png', 
      description: 'Лёд + Молния = Ледяная молния' 
    },
    { 
      id: 17, 
      items: [20, 21], 
      result: 'Живая тень', 
      resultImage: '/results/living_shadow.png', 
      description: 'Тень + Древесина = Живая тень' 
    },
    { 
      id: 18, 
      items: [25, 26], 
      result: 'Космический океан', 
      resultImage: '/results/cosmic_ocean.png', 
      description: 'Слеза русалки + Звёздная эссенция = Космический океан' 
    },
    { 
      id: 19, 
      items: [10, 11, 12], 
      result: 'Небесная гармония', 
      resultImage: '/results/celestial_harmony.png', 
      description: 'Звезда + Луна + Солнце = Небесная гармония' 
    },
    { 
      id: 20, 
      items: [1, 2, 3], 
      result: 'Первичный суп', 
      resultImage: '/results/primordial_soup.png', 
      description: 'Вода + Огонь + Земля = Первичный суп' 
    },
  ];

  // Состояния
  const [cauldronItems, setCauldronItems] = useState<Item[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [coins, setCoins] = useState(0);
  const [draggedItem, setDraggedItem] = useState<Item | null>(null);
  const [showRecipes, setShowRecipes] = useState(false);
  const [showItemsTable, setShowItemsTable] = useState(false);

  // Refs
  const cauldronRef = useRef<HTMLDivElement>(null);

  // Обработка перетаскивания
  const handleDragStart = (e: React.DragEvent, item: Item) => {
    e.dataTransfer.setData('text/plain', item.id.toString());
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

  // Обработка клика по предмету
  const handleItemClick = (item: Item) => {
    if (cauldronItems.length < 3) {
      setCauldronItems([...cauldronItems, item]);
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
        { name: 'Странная жижа', image: '/results/strange_goo.png' },
        { name: 'Пузырящаяся масса', image: '/results/bubbling_mass.png' },
        { name: 'Дымящаяся субстанция', image: '/results/smoking_substance.png' },
        { name: 'Светящаяся жидкость', image: '/results/glowing_liquid.png' },
        { name: 'Радужная вода', image: '/results/rainbow_water.png' },
        { name: 'Кристальный осадок', image: '/results/crystal_residue.png' },
        { name: 'Искрящийся туман', image: '/results/sparkling_mist.png' }
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
    <div className="min-h-screen flex flex-col items-center justify-start pt-8 pb-16 px-4 pixel-bg">
      <h1 className="text-4xl font-pixel mb-6 text-white">Пиксельный Котёл</h1>
      
      <div className="relative w-full max-w-6xl">
        {/* Основная игровая область с котлом */}
        <div className="cauldron-scene relative mb-8">
          {/* Пол */}
          <div className="floor"></div>
          
          {/* Котёл */}
          <div 
            ref={cauldronRef}
            className="cauldron"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {/* Содержимое котла */}
            <div className={cn(
              "cauldron-liquid",
              cauldronItems.length === 0 ? "level-empty" : 
              cauldronItems.length === 1 ? "level-low" : 
              cauldronItems.length === 2 ? "level-medium" : 
              "level-high"
            )}>
              {/* Бурление */}
              <div className="bubbles">
                {Array(8).fill(0).map((_, i) => (
                  <div 
                    key={i} 
                    className="bubble"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${1 + Math.random() * 3}s`,
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Предметы в котле */}
            <div className="cauldron-items">
              {cauldronItems.map((item, index) => (
                <div 
                  key={index} 
                  className="cauldron-item"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <img src={item.image || '/placeholder.svg'} alt={item.name} className="w-10 h-10 object-contain" />
                </div>
              ))}
            </div>
            
            {/* Результат варки */}
            {result && resultImage && (
              <div className="result-container">
                <img src={resultImage || '/placeholder.svg'} alt={result} className="result-image" />
                <p className="result-name">{result}</p>
              </div>
            )}
          </div>
          
          {/* Интерфейс */}
          <div className="controls-container">
            <Badge variant="outline" className="coin-counter">
              <img src="/items/coin.png" alt="Монета" className="w-5 h-5 mr-2" /> {coins}
            </Badge>
            
            <div className="flex gap-3 mt-4">
              <Button 
                onClick={brew} 
                disabled={cauldronItems.length === 0}
                className="brew-button"
              >
                Сварить
              </Button>
              <Button 
                onClick={resetCauldron} 
                variant="outline"
                className="clear-button"
                disabled={cauldronItems.length === 0}
              >
                Очистить
              </Button>
            </div>
            
            <div className="items-in-cauldron">
              {cauldronItems.map((item, idx) => (
                <Badge key={idx} variant={item.special ? "default" : "secondary"} className="item-badge">
                  <img src={item.image || '/placeholder.svg'} alt={item.name} className="w-4 h-4 mr-1" /> {item.name}
                </Badge>
              ))}
              {cauldronItems.length === 0 && (
                <p className="hint-text">Нажмите на ингредиенты в таблице</p>
              )}
              {cauldronItems.length >= 3 && (
                <p className="warning-text">Котёл полон! (максимум 3)</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Боковые панели */}
        <div className="side-panels">
          {/* Кнопки для открытия таблиц */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="table-toggle-btn"
              onClick={() => setShowItemsTable(!showItemsTable)}
            >
              {showItemsTable ? "Скрыть предметы" : "Показать предметы"}
            </Button>
            
            <Button 
              variant="outline" 
              className="recipe-toggle-btn"
              onClick={() => setShowRecipes(!showRecipes)}
            >
              {showRecipes ? "Скрыть рецепты" : "Показать рецепты"}
            </Button>
          </div>
        </div>
        
        {/* Таблица предметов */}
        <div className={cn("items-table-container", showItemsTable ? "open" : "closed")}>
          <Card className="items-table">
            <h2 className="text-2xl font-pixel mb-4 text-white">Ингредиенты <span className="text-sm">({items.length})</span></h2>
            <div className="items-grid">
              {items.map((item) => (
                <div 
                  key={item.id}
                  className={cn(
                    "item-cell",
                    item.special ? "special-item" : "regular-item"
                  )}
                  onClick={() => handleItemClick(item)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                >
                  <img src={item.image || '/placeholder.svg'} alt={item.name} className="item-image" />
                  <p className="item-name">{item.name}</p>
                  {item.special && (
                    <Badge variant="secondary" className="special-badge">
                      особый
                    </Badge>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3 font-pixel">Нажмите на ингредиенты чтобы добавить их в котёл (до 3 шт)</p>
            <p className="text-xs text-amber-400 mt-1 font-pixel">
              <img src="/items/info.png" alt="Подсказка" className="inline w-4 h-4 mr-1" /> 
              Особые ингредиенты (фиолетовые) дают 5 монет при варке
            </p>
          </Card>
        </div>
        
        {/* Таблица рецептов */}
        <div className={cn("recipes-table-container", showRecipes ? "open" : "closed")}>
          <Card className="recipes-table">
            <h2 className="text-2xl font-pixel mb-4 text-white">Рецепты <span className="text-sm">({recipes.length})</span></h2>
            <ScrollArea className="recipes-scroll-area">
              <div className="recipes-list">
                {recipes.map((recipe) => (
                  <div key={recipe.id} className="recipe-card">
                    <div className="recipe-ingredients">
                      {recipe.items.map(itemId => {
                        const item = items.find(i => i.id === itemId);
                        return item ? (
                          <img key={item.id} src={item.image || '/placeholder.svg'} alt={item.name} className="recipe-ingredient-img" />
                        ) : null;
                      })}
                      <span className="recipe-arrow">→</span>
                      <img src={recipe.resultImage || '/placeholder.svg'} alt={recipe.result} className="recipe-result-img" />
                    </div>
                    <p className="recipe-description font-pixel">{recipe.description}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PixelCauldron;
