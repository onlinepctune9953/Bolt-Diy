// These are mock business name suggestions since we don't have an actual AI model
// In a real application, this would connect to an API or AI service

interface NameGeneratorParams {
  businessType: string;
  industry?: string;
  location?: string;
  nameStyle?: string;
  keywords?: string;
}

// Base name components for different industries
const industryNameParts: Record<string, string[]> = {
  restaurant: ['Taste', 'Flavor', 'Dish', 'Plate', 'Bite', 'Spice', 'Table', 'Fork', 'Feast', 'Savor'],
  technology: ['Tech', 'Byte', 'Logic', 'Digital', 'Pixel', 'Data', 'Code', 'Wave', 'Cloud', 'Core'],
  retail: ['Shop', 'Store', 'Market', 'Mart', 'Goods', 'Boutique', 'Emporium', 'Outlet', 'Collection', 'Trade'],
  health: ['Vital', 'Care', 'Wellness', 'Health', 'Balance', 'Life', 'Thrive', 'Nurture', 'Heal', 'Remedy'],
  beauty: ['Glow', 'Shine', 'Beauty', 'Style', 'Grace', 'Charm', 'Luxe', 'Glam', 'Radiance', 'Allure'],
  fitness: ['Flex', 'Fit', 'Active', 'Power', 'Motion', 'Vigor', 'Strength', 'Energy', 'Pulse', 'Core'],
  education: ['Learn', 'Mind', 'Wisdom', 'Bright', 'Scholar', 'Edu', 'Knowledge', 'Intellect', 'Brain', 'Academy'],
  construction: ['Build', 'Craft', 'Structure', 'Frame', 'Solid', 'Construct', 'Steel', 'Forge', 'Foundation', 'Works'],
  finance: ['Wealth', 'Capital', 'Asset', 'Trust', 'Fortune', 'Equity', 'Value', 'Prosper', 'Secure', 'Fund'],
  legal: ['Just', 'Law', 'Legal', 'Justice', 'Advocate', 'Counsel', 'Defend', 'Right', 'Order', 'Case'],
  art: ['Create', 'Canvas', 'Design', 'Studio', 'Craft', 'Gallery', 'Vision', 'Imagine', 'Color', 'Artisan'],
  pets: ['Paw', 'Pet', 'Furry', 'Buddy', 'Companion', 'Tail', 'Critter', 'Friend', 'Loyal', 'Animal'],
  other: ['Prime', 'Elite', 'Peak', 'Best', 'First', 'Top', 'Apex', 'Ideal', 'Master', 'Expert']
};

// Style modifiers for different name styles
const styleModifiers: Record<string, string[]> = {
  modern: ['Nova', 'Flux', 'Mod', 'Edge', 'Neo', 'Prism', 'Orbit', 'Pulse', 'Echo', 'Vivid'],
  classic: ['Heritage', 'Legacy', 'Traditional', 'Vintage', 'Timeless', 'Original', 'Classic', 'Historic', 'Enduring', 'Olde'],
  creative: ['Whimsy', 'Spark', 'Imagine', 'Dream', 'Wonder', 'Quirk', 'Muse', 'Fable', 'Myth', 'Fantasy'],
  luxury: ['Elite', 'Luxe', 'Opulent', 'Prestige', 'Upscale', 'Premium', 'Royal', 'Majestic', 'Crown', 'Elegant'],
  friendly: ['Buddy', 'Smile', 'Cheery', 'Sunny', 'Friend', 'Kind', 'Warm', 'Welcome', 'Joy', 'Happy'],
  techy: ['Byte', 'Logic', 'Algo', 'Nano', 'Cyber', 'Digital', 'Smart', 'Tech', 'Future', 'Quantum'],
  professional: ['Pro', 'Expert', 'Trust', 'Precise', 'Standard', 'Certified', 'Reliable', 'Integrity', 'Excel', 'Quality']
};

// Location-based modifiers and suffixes
const getLocationElements = (location: string): string[] => {
  if (!location) return [];
  
  // Extract city/state/country
  const locationParts = location.split(',').map(part => part.trim());
  const mainLocation = locationParts[0];
  
  // Generate location-based elements
  return [
    mainLocation,
    `${mainLocation} ${getRandomElement(['Central', 'Metro', 'City', 'Urban', 'Downtown'])}`,
    getRandomElement(['Bay', 'Valley', 'Heights', 'Hills', 'Coast', 'Harbor', 'Springs', 'Ridge', 'Grove', 'Park']) + ' ' + mainLocation,
    mainLocation + ' ' + getRandomElement(['Co.', 'Company', 'Group', 'Collective', 'Team', 'Partners', 'Associates'])
  ];
};

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Create word combinations
const combineWords = (words: string[]): string[] => {
  const results: string[] = [];
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (i !== j) {
        results.push(`${words[i]}${words[j]}`);
      }
    }
  }
  return results;
};

// Generate suffixes for business names
const getBusinessSuffixes = (businessType: string): string[] => {
  const commonSuffixes = ['Co', 'Lab', 'Hub', 'Works', 'Studio', 'Group', 'Partners', 'Solutions', 'Pros', 'Express'];
  const businessWords = businessType.split(' ').filter(word => word.length > 3);
  
  if (businessWords.length > 0) {
    commonSuffixes.push(...businessWords);
  }
  
  return commonSuffixes;
};

export const generateBusinessNames = async ({
  businessType,
  industry = '',
  location = '',
  nameStyle = '',
  keywords = ''
}: NameGeneratorParams): Promise<string[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const businessWords = businessType.split(' ').filter(word => word.length > 3);
  const keywordList = keywords.split(',').map(k => k.trim()).filter(k => k.length > 0);
  
  // Get industry-specific name parts
  const industryParts = industryNameParts[industry] || industryNameParts.other;
  
  // Get style-specific modifiers
  const styleParts = nameStyle ? styleModifiers[nameStyle] : [];
  
  // Get location-based elements
  const locationElements = getLocationElements(location);
  
  // Get business suffixes
  const suffixes = getBusinessSuffixes(businessType);
  
  // Create base name components
  const nameComponents = [
    ...businessWords,
    ...keywordList,
    ...industryParts,
    ...styleParts
  ];
  
  // Generate names
  let generatedNames: string[] = [];
  
  // Industry + Keyword combinations
  nameComponents.forEach(comp1 => {
    nameComponents.forEach(comp2 => {
      if (comp1 !== comp2) {
        generatedNames.push(`${comp1} ${comp2}`);
      }
    });
  });
  
  // Add location-based names
  if (locationElements.length > 0) {
    locationElements.forEach(loc => {
      nameComponents.forEach(comp => {
        generatedNames.push(`${comp} ${loc}`);
        generatedNames.push(`${loc} ${comp}`);
      });
    });
  }
  
  // Add suffix-based names
  suffixes.forEach(suffix => {
    nameComponents.forEach(comp => {
      generatedNames.push(`${comp} ${suffix}`);
    });
  });
  
  // Add word combinations (camelCase or combined words)
  generatedNames = [
    ...generatedNames,
    ...combineWords(nameComponents)
  ];
  
  // Filter duplicates and normalize
  generatedNames = [...new Set(generatedNames)]
    .map(name => name.trim())
    .filter(name => name.length > 0 && name.length < 30);
  
  // Shuffle and limit results
  return shuffleArray(generatedNames).slice(0, 9);
};
