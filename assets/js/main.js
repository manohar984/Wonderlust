// Wanderlust Chronicles - Interactive Premium Travel Portal Engine
document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Comprehensive Travel Database (20 Premium Destinations with INR Costs & Local Images)
     ========================================================================== */
  const travelDatabase = [
    // --- INDIA DESTINATIONS (10) ---
    {
      id: "taj_mahal",
      name: "Taj Mahal, Agra",
      category: "india",
      tags: ["heritage"],
      image: "assets/images/india_taj_mahal.png",
      tagline: "The Golden Symbol of Love",
      description: "Visit the beautiful white marble monument built on the banks of the Yamuna River. A timeless wonder of world history and majestic architecture.",
      minBudget: 22000,
      baseCosts: { standard: 3000, premium: 7500, luxury: 20000 },
      activityCosts: { standard: 1200, premium: 3000, luxury: 8000 },
      attractions: ["Taj Mahal Sunrise Tour", "Agra Fort Heritage Walk", "Fatehpur Sikri Excursion", "Mehtab Bagh Sunset Views"],
      dailyItinerary: {
        1: "Watch the gorgeous sunrise light up the Taj Mahal with golden mist.",
        2: "Explore the massive red sandstone courtyards of the historic Agra Fort.",
        3: "Take a day tour to the ancient royal ruins of Fatehpur Sikri.",
        4: "See the reflection of the Taj Mahal dome at sunset from Mehtab Bagh Gardens.",
        5: "Try local Mughlai sweets and watch traditional marble handicraft makers.",
        6: "Visit the Tomb of Itimad-ud-Daulah, also known as the beautiful Baby Taj.",
        7: "Shop in local color-filled bazaars for heritage items.",
        8: "Relax in a beautiful luxury garden hotel overlooking the river.",
        9: "Take a scenic morning horse carriage ride around the heritage zone.",
        10: "Enjoy a final photoshoot session with a professional photographer."
      }
    },
    {
      id: "kerala_backwaters",
      name: "Kerala Backwaters",
      category: "india",
      tags: ["nature"],
      image: "assets/images/india_kerala.png",
      tagline: "Peaceful Waterways & Coconut Palms",
      description: "Sail through quiet green rivers, lakes, and palm trees in a cozy traditional wooden houseboat. Experience local village life and tropical nature.",
      minBudget: 28000,
      baseCosts: { standard: 4000, premium: 10000, luxury: 25000 },
      activityCosts: { standard: 1500, premium: 3500, luxury: 9000 },
      attractions: ["Alleppey Houseboat Stay", "Sunset Cruise on Vembanad Lake", "Kumarakom Bird Trails", "Ayurvedic Massage & Spa"],
      dailyItinerary: {
        1: "Board your private houseboat and float down peaceful water canals.",
        2: "Enjoy a quiet sunrise breakfast on the water and visit a small canal village.",
        3: "Take a walking path through the green Kumarakom Bird Sanctuary.",
        4: "Relax with a traditional herbal Ayurvedic body massage at a lakeside spa.",
        5: "Watch village craftsmen create ropes and baskets from coconut fibers.",
        6: "Watch an evening Kathakali folk dance show at a local cultural theater.",
        7: "Eat a traditional Kerala feast served on fresh green banana leaves.",
        8: "Go kayaking across the wide waters of Vembanad Lake.",
        9: "Ride a bicycle through rural rice fields and calm lakeside roads.",
        10: "Relax by the pool at a luxury water resort before heading home."
      }
    },
    {
      id: "jaipur",
      name: "Jaipur, Rajasthan",
      category: "india",
      tags: ["heritage"],
      image: "assets/images/india_jaipur.png",
      tagline: "The Royal Pink City",
      description: "Step into a city of royal palaces, massive hilltop forts, and beautiful pink sandstone buildings. Taste authentic royal hospitality.",
      minBudget: 25000,
      baseCosts: { standard: 3500, premium: 8500, luxury: 22000 },
      activityCosts: { standard: 1200, premium: 3000, luxury: 8000 },
      attractions: ["Amber Fort Palace", "Hawa Mahal (Wind Palace)", "City Palace Museum", "Jantar Mantar Stone Clock"],
      dailyItinerary: {
        1: "Climb up to the Amber Fort and tour its beautiful mirror halls.",
        2: "Take photos of the famous pink windows at Hawa Mahal.",
        3: "Explore courtyards and clothing displays inside the historic City Palace.",
        4: "See the giant stone astronomical instruments at Jantar Mantar.",
        5: "Take an exciting morning hot air balloon ride over the palaces.",
        6: "Shop for colorful gemstone jewelry and blue pottery in old bazaars.",
        7: "Dine under the stars at a luxury royal palace garden.",
        8: "Take a day trip to the beautiful stone stepwells of Panna Meena.",
        9: "Watch the sunset over the city hills from Nahargarh Fort.",
        10: "Learn traditional fabric block printing from local master craftsmen."
      }
    },
    {
      id: "leh_ladakh",
      name: "Leh Ladakh",
      category: "india",
      tags: ["adventure"],
      image: "assets/images/india_ladakh.png",
      tagline: "Blue Lakes & Snowy Passes",
      description: "Explore a beautiful high-altitude mountain valley flanked by massive glaciers, ancient monasteries, and the deep blue Pangong Lake.",
      minBudget: 35000,
      baseCosts: { standard: 5000, premium: 12000, luxury: 30000 },
      activityCosts: { standard: 2000, premium: 5000, luxury: 11000 },
      attractions: ["Pangong Tso Blue Lake", "Nubra Valley Camel Dunes", "Khardung La Snowy Pass", "Thiksey Buddhist Monastery"],
      dailyItinerary: {
        1: "Arrive in Leh and rest completely to adjust to the mountain air.",
        2: "Visit the historic Leh Palace and capture sunset views from Shanti Stupa.",
        3: "Drive to Nubra Valley over Khardung La, one of the highest roads in the world.",
        4: "Ride double-humped camels on the white sand dunes of Nubra.",
        5: "Travel to Pangong Tso and watch the lake water change from green to blue.",
        6: "Watch the Milky Way stars in the dark night sky from your lake camp.",
        7: "Visit the large 12-story Thiksey Monastery and hear monks chant.",
        8: "See cars roll uphill by themselves at the Magnetic Hill zone.",
        9: "Go river rafting in the cold waters of the Indus-Zanskar confluence.",
        10: "Shop for warm pashmina woolens and copper prayer bowls in Leh market."
      }
    },
    {
      id: "himalayas",
      name: "Himalayan Peaks, Spiti",
      category: "india",
      tags: ["adventure", "nature"],
      image: "assets/images/india_himalayas.png",
      tagline: "Snowy Mountains & High Valleys",
      description: "Explore towering snowy mountain ridges, deep river gorges, and remote quiet monasteries built on high cliffs in Himachal.",
      minBudget: 32000,
      baseCosts: { standard: 4500, premium: 10000, luxury: 26000 },
      activityCosts: { standard: 1800, premium: 4500, luxury: 9500 },
      attractions: ["Key Cliffside Monastery", "Chandratal Moon Lake Trek", "Kaza Mountain Town", "Pin Valley Wilderness"],
      dailyItinerary: {
        1: "Drive past green forests into the quiet, rocky Spiti Valley.",
        2: "Visit the spectacular Key Monastery, built on a high desert hill.",
        3: "Trek to the beautiful crescent-shaped waters of Chandratal Lake.",
        4: "Explore Kibber, one of the highest villages in the world with roads.",
        5: "Take a wildlife walk to spot mountain sheep in Pin Valley Park.",
        6: "Mail a postcard from Hikkim, home to the world's highest post office.",
        7: "See the ancient mud wall paintings inside Tabo Monastery.",
        8: "Walk through fields of alpine wildflowers near Langza village.",
        9: "Gaze at the stellar stars in the clear night sky.",
        10: "Drive back to Manali past giant waterfalls and snowy slopes."
      }
    },
    {
      id: "varanasi",
      name: "Varanasi, Uttar Pradesh",
      category: "india",
      tags: ["heritage"],
      image: "assets/images/india_varanasi.png",
      tagline: "The Spiritual City of Ghats",
      description: "Experience one of the oldest cities in the world. Witness grand fire prayer rituals and boat rides along the sacred Ganges riverbanks.",
      minBudget: 18000,
      baseCosts: { standard: 2500, premium: 6000, luxury: 18000 },
      activityCosts: { standard: 1000, premium: 2500, luxury: 7000 },
      attractions: ["Evening Ganga Aarti Fire Prayer", "Sunrise Boat Ride on Ganges", "Sarnath Buddhist Stupa", "Kashi Vishwanath Temple"],
      dailyItinerary: {
        1: "Watch the spectacular fire prayer ceremony at the main river ghat.",
        2: "Take a quiet sunrise boat ride to see the bathing ghats.",
        3: "Walk through the historic narrow alleyways behind the river.",
        4: "Visit Sarnath park, where Lord Buddha gave his first teaching.",
        5: "See the golden domes of the Kashi Vishwanath temple.",
        6: "Eat famous local street foods like Kachori and sweet Malaiyo.",
        7: "Meet local weavers creating world-famous Banarasi silk sarees.",
        8: "Listen to peaceful classical sitar music at a cultural heritage home.",
        9: "Try meditation at an ancient ashram overlooking the water.",
        10: "Take a walking path along the colorful painted murals of Assi Ghat."
      }
    },
    {
      id: "goa",
      name: "Goa Beaches",
      category: "india",
      tags: ["nature"],
      image: "assets/images/world_bali.png",
      tagline: "Sunny Shorelines & Old Villas",
      description: "Relax on golden sands under tropical palm trees. Enjoy Portuguese-style home designs, sunset beach spots, and water sports.",
      minBudget: 22000,
      baseCosts: { standard: 3000, premium: 7800, luxury: 20000 },
      activityCosts: { standard: 1200, premium: 3000, luxury: 7500 },
      attractions: ["Palolem Beach Cove", "Basilica of Bom Jesus", "Fontainhas Latin Quarter", "Dudhsagar Waterfalls"],
      dailyItinerary: {
        1: "Arrive at your beachside resort and watch the sunset at Palolem.",
        2: "Tour old Portuguese churches, including the Basilica of Bom Jesus.",
        3: "Walk past bright yellow and blue heritage homes in Fontainhas.",
        4: "Take a jeep ride to the tall Dudhsagar Waterfalls in the jungle.",
        5: "Go on a morning boat ride to spot dolphins in the sea.",
        6: "Walk through a spice farm and enjoy a local Goan lunch buffet.",
        7: "Dine on fresh seafood at a premium restaurant on a cliff.",
        8: "Paddle a kayak through quiet green mangrove forests.",
        9: "Climb Chapora Fort for sweeping views of the Arabian Sea.",
        10: "Enjoy a relaxing massage at a wellness center by the beach."
      }
    },
    {
      id: "munnar",
      name: "Munnar Hills, Kerala",
      category: "india",
      tags: ["nature"],
      image: "assets/images/india_kerala.png",
      tagline: "Rolling Green Tea Gardens",
      description: "A cool, misty mountain town covered in neat green tea fields, waterfalls, and hills where rare mountain goats live.",
      minBudget: 20000,
      baseCosts: { standard: 2800, premium: 7000, luxury: 19000 },
      activityCosts: { standard: 1000, premium: 2500, luxury: 6500 },
      attractions: ["Eravikulam National Park", "Mattupetty Lake Boat Ride", "Tea Museum & Factory", "Top Station Viewpoint"],
      dailyItinerary: {
        1: "Walk through the green tea gardens wrapped in fresh morning mist.",
        2: "Spot rare mountain goats (Nilgiri Tahr) in Eravikulam Park.",
        3: "Enjoy a speed boat ride on the waters of Mattupetty Dam.",
        4: "See how tea leaves are processed at the local Tea Museum.",
        5: "Trek through pine trees to catch views of Anamudi Peak.",
        6: "Smell fresh cardamom and pepper at a local spice farm.",
        7: "Photograph the clouds floating below you at Top Station.",
        8: "Relax by the pools of the cold Lakkam Waterfalls.",
        9: "Learn how to taste and identify different organic tea leaves.",
        10: "Do morning yoga on a wooden deck looking at the green valley."
      }
    },
    {
      id: "jaisalmer",
      name: "Jaisalmer, Rajasthan",
      category: "india",
      tags: ["adventure", "heritage"],
      image: "assets/images/sahara.png",
      tagline: "The Golden Desert Fort",
      description: "A giant sandstone fort rising out of the sandy Thar Desert. Ride camels on open sand dunes and sleep under the stars.",
      minBudget: 24000,
      baseCosts: { standard: 3200, premium: 8000, luxury: 21000 },
      activityCosts: { standard: 1500, premium: 3500, luxury: 7500 },
      attractions: ["Jaisalmer Golden Fort", "Sam Sand Dunes Safari", "Patwon Ki Haveli Mansions", "Gadisar Lake Rowboats"],
      dailyItinerary: {
        1: "Walk through the stone gates of the living Jaisalmer Fort.",
        2: "See the fine stone window carvings at Patwon Ki Haveli.",
        3: "Ride camels across the sand dunes as the sun goes down.",
        4: "Stay in a cozy desert tent camp and watch folk dance shows.",
        5: "Sit by the campfire and watch the clear desert starry sky.",
        6: "Row a boat on the calm, shrine-ringed waters of Gadisar Lake.",
        7: "Visit Kuldhara, a mysterious empty stone village nearby.",
        8: "See the giant stone cenotaphs of royal families at Bada Bagh.",
        9: "Shop for yellow sandstone crafts and leather bags in the market.",
        10: "Dine on a rooftop overlooking the glowing golden fort at night."
      }
    },
    {
      id: "hampi",
      name: "Hampi Ruins, Karnataka",
      category: "india",
      tags: ["heritage"],
      image: "assets/images/india_jaipur.png",
      tagline: "The Valley of Boulders & Temples",
      description: "A unique valley of massive balancing rocks and stone temple ruins from the ancient Vijayanagara Empire. A historic wonderland.",
      minBudget: 23000,
      baseCosts: { standard: 3000, premium: 8200, luxury: 20000 },
      activityCosts: { standard: 1200, premium: 3000, luxury: 7000 },
      attractions: ["Virupaksha Temple", "Stone Chariot at Vittala Temple", "Hemakuta Hill Sunset", "Tungabhadra Coracle Ride"],
      dailyItinerary: {
        1: "Explore the tall entrance towers of the active Virupaksha Temple.",
        2: "Photograph the iconic Stone Chariot at the Vittala Temple.",
        3: "Climb Hemakuta Hill for views of boulder valleys at sunset.",
        4: "Ride a round bamboo boat (coracle) down the Tungabhadra River.",
        5: "See the royal Lotus Mahal palace and elephant stables.",
        6: "Cross the river to see the green paddy fields of Anegundi village.",
        7: "Rent a bicycle to ride along the ancient market pathways.",
        8: "See the giant stone Narasimha and Elephant Ganesha statues.",
        9: "Climb Matanga Hill to watch the sunrise over the stone landscape.",
        10: "Relax at a premium resort near the scenic Sanapur Lake."
      }
    },

    // --- WORLD DESTINATIONS (10) ---
    {
      id: "kyoto",
      name: "Kyoto, Japan",
      category: "world",
      tags: ["heritage"],
      image: "assets/images/world_kyoto.png",
      tagline: "Ancient Shrines & Cherry Blossoms",
      description: "Walk through quiet bamboo forests, zen gardens, and historic streets filled with wooden tea houses representing the heart of old Japan.",
      minBudget: 90000,
      baseCosts: { standard: 12000, premium: 25000, luxury: 60000 },
      activityCosts: { standard: 4000, premium: 9000, luxury: 20000 },
      attractions: ["Arashiyama Bamboo Grove", "Fushimi Inari Torii Gates", "Golden Pavilion Temple", "Gion Tea Ceremony"],
      dailyItinerary: {
        1: "Walk between the tall green stalks of the Arashiyama Bamboo Grove.",
        2: "Hike under thousands of red torii gates at Fushimi Inari Shrine.",
        3: "See the shimmering gold leaf layers of the Golden Pavilion.",
        4: "Try high-grade Matcha green tea in a traditional tea room in Gion.",
        5: "Walk through the busy food stalls of Nishiki Market.",
        6: "Take a day train to feed friendly deer in Nara Park.",
        7: "Sit in quiet meditation at the stone zen garden of Ryoan-ji.",
        8: "Eat a multi-course Kaiseki dinner looking at the river.",
        9: "Ride a scenic open-window train along the mountain gorge.",
        10: "Walk through the glowing lantern alleyways of Pontocho at night."
      }
    },
    {
      id: "paris",
      name: "Paris, France",
      category: "world",
      tags: ["heritage"],
      image: "assets/images/world_paris.png",
      tagline: "The City of Romance & Cafes",
      description: "Enjoy coffee at street corner tables, walk along the Seine River, and see the Eiffel Tower light up the night sky.",
      minBudget: 110000,
      baseCosts: { standard: 14000, premium: 30000, luxury: 75000 },
      activityCosts: { standard: 5000, premium: 10000, luxury: 25000 },
      attractions: ["Eiffel Tower Summit", "Louvre Museum Art Tour", "Seine River Dinner Cruise", "Montmartre Artist Hills"],
      dailyItinerary: {
        1: "Picnic in the park and go up the Eiffel Tower at sunset.",
        2: "Take a guided walk inside the Louvre to see famous paintings.",
        3: "Eat dinner on a glass boat cruising down the Seine River.",
        4: "Walk past street painters on the cobblestone hills of Montmartre.",
        5: "Tour the grand gold-plated Palace of Versailles and its gardens.",
        6: "Shop at the famous stores along the Avenue des Champs-Élysées.",
        7: "See large impressionist paintings at the Musée d'Orsay.",
        8: "Eat warm croissants and coffee in a historic corner cafe.",
        9: "See the colorful stained-glass windows of Sainte-Chapelle.",
        10: "Enjoy a final evening champagne toast overlooking the city roofs."
      }
    },
    {
      id: "santorini",
      name: "Santorini, Greece",
      category: "world",
      tags: ["nature"],
      image: "assets/images/world_santorini.png",
      tagline: "White Cliffs & Blue Sea Domes",
      description: "See bright white houses and blue dome churches built on high volcanic cliffs. Watch the world's most famous sunsets over the ocean.",
      minBudget: 130000,
      baseCosts: { standard: 16000, premium: 35000, luxury: 85000 },
      activityCosts: { standard: 6000, premium: 12000, luxury: 30000 },
      attractions: ["Oia Sunset Viewpoint", "Volcano Sailing Catamaran", "Red Volcanic Sand Beach", "Akrotiri Ancient Ruins"],
      dailyItinerary: {
        1: "Check in to a cliff house hotel with personal pool views.",
        2: "Walk the narrow paths of Oia to secure a spot for the sunset.",
        3: "Board a catamaran boat to swim near volcanic hot springs.",
        4: "Sunbathe on the unique red sand beach of Akrotiri.",
        5: "Try local dry wines at an open-air cliffside vineyard.",
        6: "Hike the scenic cliff path from Fira town to Oia village.",
        7: "See the excavated stone buildings of the ancient town of Akrotiri.",
        8: "Enjoy a private dinner featuring fresh Mediterranean fish.",
        9: "Walk through the quiet streets of the traditional Pyrgos village.",
        10: "Relax on the black volcanic sand beach at Kamari."
      }
    },
    {
      id: "bali",
      name: "Bali, Indonesia",
      category: "world",
      tags: ["nature", "adventure"],
      image: "assets/images/world_bali.png",
      tagline: "Tropical Beaches & Rice Steps",
      description: "Relax on green terraced hills, walk through forest monkey temples, watch cliffside fire dances, and try surf lessons on sandy beaches.",
      minBudget: 70000,
      baseCosts: { standard: 8000, premium: 18000, luxury: 45000 },
      activityCosts: { standard: 3000, premium: 6000, luxury: 15000 },
      attractions: ["Tegalalang Rice Terraces", "Uluwatu Temple Cliff Show", "Ubud Sacred Monkey Forest", "Nusa Penida Coastal Walk"],
      dailyItinerary: {
        1: "Walk through the lush green steps of the Ubud Rice Terraces.",
        2: "See friendly monkeys swing in the Ubud Sacred Monkey Forest.",
        3: "Watch the traditional fire dance at the Uluwatu Cliff Temple.",
        4: "Take a boat to photograph the famous Kelingking Beach cliff.",
        5: "Wake up early for a sunrise trek up the Mount Batur volcano.",
        6: "Unwind with a traditional Balinese massage and flower bath.",
        7: "Try surfing or relax on the white sands of Seminyak Beach.",
        8: "Photograph the iconic water temple of Pura Ulun Danu Bratan.",
        9: "Learn how to cook authentic spicy dishes in a local home class.",
        10: "Enjoy a peaceful sunset drink on a catamaran cruise."
      }
    },
    {
      id: "swiss_alps",
      name: "Swiss Alps, Switzerland",
      category: "world",
      tags: ["nature", "adventure"],
      image: "assets/images/world_swiss_alps.png",
      tagline: "Snowy Summits & Green Meadows",
      description: "Experience a mountain wonderland. Ride cogwheel trains past green pine forests, see tall snowy peaks, and stay in cozy wooden chalets.",
      minBudget: 150000,
      baseCosts: { standard: 18000, premium: 40000, luxury: 100000 },
      activityCosts: { standard: 7000, premium: 15000, luxury: 35000 },
      attractions: ["Jungfraujoch (Top of Europe)", "Zermatt Matterhorn Views", "Interlaken Lake Paragliding", "Glacier Express Train Ride"],
      dailyItinerary: {
        1: "Arrive in Zermatt and watch the sun hit the peak of the Matterhorn.",
        2: "Take a mountain train to Gornergrat for views of giant glaciers.",
        3: "Board the Glacier Express for a slow scenic train ride through valleys.",
        4: "Go up to Jungfraujoch, the highest railway station in Europe.",
        5: "Try tandem paragliding over the bright lakes of Interlaken.",
        6: "Walk past the 72 waterfalls inside Lauterbrunnen Valley.",
        7: "Eat warm cheese fondue in a cozy wooden mountain chalet.",
        8: "Take a quiet boat ride on the deep waters of Lake Lucerne.",
        9: "Walk across the high suspension bridge on Mount Titlis.",
        10: "Relax in a luxury hot spring pool looking at the mountain peaks."
      }
    },
    {
      id: "cairo_pyramids",
      name: "Cairo Pyramids, Egypt",
      category: "world",
      tags: ["heritage"],
      image: "assets/images/world_cairo.png",
      tagline: "Ancient Pyramids & Desert Sands",
      description: "Stand before the Great Pyramids of Giza and the Sphinx. Discover ancient pharaoh stories, golden treasures, and desert camel safaris.",
      minBudget: 85000,
      baseCosts: { standard: 10000, premium: 22000, luxury: 55000 },
      activityCosts: { standard: 3000, premium: 7000, luxury: 16000 },
      attractions: ["Great Pyramids of Giza", "The Great Sphinx Monument", "Egyptian Antiquities Museum", "Khan el-Khalili Bazaar"],
      dailyItinerary: {
        1: "See the Great Pyramid of Giza, the last remaining ancient wonder.",
        2: "Photograph the giant stone Sphinx monument in the desert sand.",
        3: "See the solid gold mask of King Tutankhamun at the Museum.",
        4: "Shop for spices and copper lamps inside the ancient Cairo bazaar.",
        5: "Sail on a traditional wooden Felucca boat down the Nile River.",
        6: "See the old step pyramids in the sandy desert of Saqqara.",
        7: "Tour the high stone Citadel walls and the Alabaster Mosque.",
        8: "Eat local Egyptian Koshari pasta and grilled meats at a park.",
        9: "Take a day trip to see the roman ruins in coastal Alexandria.",
        10: "Enjoy a sunset camel ride with views of the three Giza pyramids."
      }
    },
    {
      id: "new_york",
      name: "New York City, USA",
      category: "world",
      tags: ["heritage"],
      image: "assets/images/world_new_york.png",
      tagline: "The Skyscraper Metropolis",
      description: "Experience the glowing lights of Times Square, shows on Broadway, walks in Central Park, and the iconic Manhattan skyline views.",
      minBudget: 110000,
      baseCosts: { standard: 13000, premium: 28000, luxury: 70000 },
      activityCosts: { standard: 4000, premium: 8000, luxury: 22000 },
      attractions: ["Summit One Vanderbilt View", "Broadway Theater Show", "Central Park Carriage Ride", "Statue of Liberty Ferry"],
      dailyItinerary: {
        1: "Walk through Central Park and row a boat on the park lake.",
        2: "Watch a famous musical show in a Broadway theater at night.",
        3: "Take a ferry boat to see the Statue of Liberty up close.",
        4: "Stand in the mirror rooms of Summit One Vanderbilt overlooking Manhattan.",
        5: "Walk across the historic brick-and-steel Brooklyn Bridge.",
        6: "See famous modern art paintings inside the MoMA museum.",
        7: "Walk along the High Line, a park built on old elevated train tracks.",
        8: "Enjoy a multi-course dinner at a premium restaurant in Soho.",
        9: "Shop at the famous stores along Fifth Avenue.",
        10: "Have a drink on a rooftop lounge looking at the Empire State Building."
      }
    },
    {
      id: "reykjavik",
      name: "Reykjavik, Iceland",
      category: "world",
      tags: ["nature", "adventure"],
      image: "assets/images/patagonia.png",
      tagline: "Northern Lights & Blue Springs",
      description: "Soak in hot volcanic blue springs, see roaring geysers erupt, walk on black sand beaches, and watch the green Northern Lights dance in the sky.",
      minBudget: 135000,
      baseCosts: { standard: 16000, premium: 36000, luxury: 88000 },
      activityCosts: { standard: 6000, premium: 12000, luxury: 28000 },
      attractions: ["Blue Lagoon Hot Spring", "Golden Circle Waterfall Tour", "Northern Lights Hunt", "Black Sand Beach (Reynisfjara)"],
      dailyItinerary: {
        1: "Relax in the warm, milky-blue waters of the Blue Lagoon spa.",
        2: "See erupting hot springs and the giant Gullfoss waterfall.",
        3: "Drive into the dark countryside to search for the Northern Lights.",
        4: "See black volcanic sands and stone columns on Reynisfjara beach.",
        5: "Walk on a mountain glacier wearing boots and ice spikes.",
        6: "Walk on the path behind the tall Seljalandsfoss waterfall.",
        7: "Explore the colorful streets and shops of downtown Reykjavik.",
        8: "Tour a natural ice cave inside a volcanic mountain glacier.",
        9: "Go on a morning whale-watching boat cruise in the cold bay.",
        10: "Try local seafood dishes at a historic harbor restaurant."
      }
    },
    {
      id: "sydney",
      name: "Sydney, Australia",
      category: "world",
      tags: ["nature"],
      image: "assets/images/world_new_york.png",
      tagline: "Sunny Harbours & Beach Surf",
      description: "Walk along the iconic Sydney Opera House harbor, hike coastal cliffs, and try surfing lessons on the famous Bondi Beach.",
      minBudget: 100000,
      baseCosts: { standard: 12000, premium: 26000, luxury: 68000 },
      activityCosts: { standard: 3500, premium: 8000, luxury: 20000 },
      attractions: ["Sydney Opera House Tour", "Harbour Bridge Sunset Climb", "Bondi Coastal Cliff Path", "Taronga Wildlife Ferry Ride"],
      dailyItinerary: {
        1: "Take a walking tour inside the sails of the Sydney Opera House.",
        2: "Climb the high arches of the Harbour Bridge at sunset.",
        3: "Walk along the coastal cliffs from Bondi to Bronte beach.",
        4: "Take a ferry to Taronga Zoo to feed kangaroos and koalas.",
        5: "Try a beginner surfing lesson on the waves of Bondi Beach.",
        6: "Explore old sandstone pubs and streets in The Rocks district.",
        7: "Take a day tour to hike the green valleys of the Blue Mountains.",
        8: "Eat fresh oysters at a restaurant on Darling Harbour docks.",
        9: "Go snorkeling in the calm waters of Shelly Beach near Manly.",
        10: "Dine inside the Sydney Tower revolving restaurant for city views."
      }
    },
    {
      id: "rome",
      name: "Rome, Italy",
      category: "world",
      tags: ["heritage"],
      image: "assets/images/world_paris.png",
      tagline: "The Ancient Eternal City",
      description: "See the Colosseum arena, throw a coin inside the Trevi Fountain, explore the Vatican, and eat handmade pasta and gelato.",
      minBudget: 95000,
      baseCosts: { standard: 11000, premium: 24000, luxury: 62000 },
      activityCosts: { standard: 3500, premium: 7500, luxury: 18000 },
      attractions: ["Ancient Colosseum Arena", "Vatican & Sistine Chapel", "Trevi Fountain Coin Toss", "Trastevere Food Tasting Tour"],
      dailyItinerary: {
        1: "Walk the floor of the ancient gladiatorial Colosseum arena.",
        2: "Throw a coin into the Trevi Fountain to wish for a return trip.",
        3: "See the famous paintings on the Sistine Chapel ceiling.",
        4: "Taste authentic carbonara pasta in the old streets of Trastevere.",
        5: "See the giant stone dome and sky-window inside the Pantheon.",
        6: "Relax past street musicians in the wide Piazza Navona.",
        7: "Climb the Spanish Steps and explore nearby boutique shops.",
        8: "Learn how to make pasta from scratch in a cooking class.",
        9: "Explore ancient underground stone tombs along the Appian Way.",
        10: "Watch the sun go down over Rome's roofs from Pincio Terrace."
      }
    }
  ];

  /* ==========================================================================
     2. Global App State Variables
     ========================================================================== */
  let currentCategory = 'india';
  let budgetLimit = 150000; // Default budget limit in INR
  let activeDestination = null;

  // Itinerary state variables
  let currentItineraryDays = 5;
  let currentItineraryTravelers = 2;
  let currentItineraryTier = 'premium';

  // Quiz state variables
  let quizStep = 1;
  let quizAnswers = {
    style: 'heritage',
    companion: 'solo',
    season: 'spring'
  };

  /* ==========================================================================
     3. DOM Selection Elements
     ========================================================================== */
  const destinationContainer = document.getElementById('destinations-grid');
  const catBtnIndia = document.getElementById('btn-cat-india');
  const catBtnWorld = document.getElementById('btn-cat-world');
  const budgetSlider = document.getElementById('global-budget-slider');
  const budgetValueDisplay = document.getElementById('global-budget-value');
  const matchingCountText = document.getElementById('matching-count-text');

  // Hero selectors
  const gatekeeperIndia = document.getElementById('gatekeeper-india');
  const gatekeeperWorld = document.getElementById('gatekeeper-world');
  const particleContainer = document.getElementById('particle-container');

  // Theme select selector
  const themeSelect = document.getElementById('theme-select');

  // Soundscape audio selector
  const soundscapesToggle = document.getElementById('soundscapes-toggle');
  const ambientAudio = document.getElementById('ambient-audio');
  const equalizer = document.getElementById('equalizer-container');
  let isAudioPlaying = false;

  // Spotlight selectors
  const spotlightActionBtn = document.getElementById('spotlight-action-btn');

  // Quiz selectors
  const quizPrevBtn = document.getElementById('quiz-prev-btn');
  const quizNextBtn = document.getElementById('quiz-next-btn');
  const quizProgressText = document.getElementById('quiz-progress-text');
  const quizStep1 = document.getElementById('quiz-step-1');
  const quizStep2 = document.getElementById('quiz-step-2');
  const quizStep3 = document.getElementById('quiz-step-3');
  const quizResultContainer = document.getElementById('quiz-result-container');
  const quizMatchedCards = document.getElementById('quiz-matched-cards');
  const quizOptionCards = document.querySelectorAll('.quiz-option-card');

  // Hotspot selectors
  const mapHotspots = document.querySelectorAll('.map-hotspot');

  // Drawer selectors
  const plannerDrawer = document.getElementById('planner-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  const travelerMinus = document.getElementById('calc-traveler-minus');
  const travelerPlus = document.getElementById('calc-traveler-plus');
  const travelerVal = document.getElementById('calc-travelers-value');
  const daysSlider = document.getElementById('calc-days-slider');
  const daysVal = document.getElementById('calc-days-value');
  const tierSelect = document.getElementById('calc-tier-select');

  const calcTitle = document.getElementById('calc-dest-title');
  const calcTagline = document.getElementById('calc-dest-tagline');
  const calcImg = document.getElementById('calc-dest-image');
  const calcDescription = document.getElementById('calc-dest-description');
  const calcAttractionsList = document.getElementById('calc-attractions-list');
  
  const costStay = document.getElementById('calc-cost-stay');
  const costActivities = document.getElementById('calc-cost-activities');
  const costTotal = document.getElementById('calc-cost-total');
  const itineraryHighlightsBox = document.getElementById('calc-itinerary-highlights');

  // Digital Ticket Boarding Pass
  const ticketForm = document.getElementById('passport-form');
  const ticketResultBox = document.getElementById('passport-result-box');

  /* ==========================================================================
     4. App Initialization & Event Bindings
     ========================================================================== */
  function init() {
    // Restore theme from localStorage if saved
    const savedTheme = localStorage.getItem('wanderlust-theme') || 'emerald';
    setTheme(savedTheme);
    if (themeSelect) themeSelect.value = savedTheme;

    renderDestinations();
    startCountdownTimer();
    spawnGoldParticles();

    // Theme selector change
    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => {
        setTheme(e.target.value);
      });
    }

    // Category button toggles
    if (catBtnIndia) catBtnIndia.addEventListener('click', () => setCategory('india'));
    if (catBtnWorld) catBtnWorld.addEventListener('click', () => setCategory('world'));

    // Global budget slider (INR)
    if (budgetSlider) {
      budgetSlider.addEventListener('input', (e) => {
        budgetLimit = parseInt(e.target.value);
        if (budgetValueDisplay) {
          budgetValueDisplay.textContent = formatINR(budgetLimit);
        }
        renderDestinations();
      });
    }

    // Hero trigger choices
    if (gatekeeperIndia) {
      gatekeeperIndia.addEventListener('click', () => {
        setCategory('india');
        scrollToSelector('#destinations-section');
        showToast("Filtering locations in India...", "info");
      });
    }
    if (gatekeeperWorld) {
      gatekeeperWorld.addEventListener('click', () => {
        setCategory('world');
        scrollToSelector('#destinations-section');
        showToast("Filtering international locations...", "info");
      });
    }

    // Ambient soundscapes toggle
    if (soundscapesToggle && ambientAudio) {
      stopEqualizerAnimation();
      soundscapesToggle.addEventListener('click', toggleAmbientSound);
    }

    // Spotlight CTA trigger
    if (spotlightActionBtn) {
      spotlightActionBtn.addEventListener('click', () => {
        openDrawer('leh_ladakh');
      });
    }

    // Quiz Cards setup
    quizOptionCards.forEach(card => {
      card.addEventListener('click', () => {
        const type = card.dataset.type;
        const val = card.dataset.value;

        const siblings = card.parentNode.querySelectorAll('.quiz-option-card');
        siblings.forEach(s => s.classList.remove('selected'));
        card.classList.add('selected');

        quizAnswers[type] = val;
      });
    });

    if (quizNextBtn) quizNextBtn.addEventListener('click', handleQuizNext);
    if (quizPrevBtn) quizPrevBtn.addEventListener('click', handleQuizPrev);

    // Map hotspots
    mapHotspots.forEach(hotspot => {
      hotspot.addEventListener('click', () => {
        const targetDest = hotspot.dataset.dest;
        openDrawer(targetDest);
        showToast("Opening location from map coordinates...", "info");
      });
    });

    // Drawer bindings
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    if (travelerMinus) {
      travelerMinus.addEventListener('click', () => {
        if (currentItineraryTravelers > 1) {
          currentItineraryTravelers--;
          travelerVal.textContent = currentItineraryTravelers;
          updateCalculatorOutputs();
        }
      });
    }
    if (travelerPlus) {
      travelerPlus.addEventListener('click', () => {
        if (currentItineraryTravelers < 20) {
          currentItineraryTravelers++;
          travelerVal.textContent = currentItineraryTravelers;
          updateCalculatorOutputs();
        }
      });
    }

    if (daysSlider) {
      daysSlider.addEventListener('input', (e) => {
        currentItineraryDays = parseInt(e.target.value);
        if (daysVal) daysVal.textContent = `${currentItineraryDays} Days`;
        updateCalculatorOutputs();
      });
    }

    if (tierSelect) {
      tierSelect.addEventListener('change', (e) => {
        currentItineraryTier = e.target.value;
        updateCalculatorOutputs();
      });
    }

    // Ticket Generator submit
    if (ticketForm) {
      ticketForm.addEventListener('submit', handleTicketGeneration);
    }
  }

  /* ==========================================================================
     5. Theme Switching Engine
     ========================================================================== */
  function setTheme(theme) {
    document.body.classList.remove('theme-sapphire', 'theme-sunset');
    
    if (theme === 'sapphire') {
      document.body.classList.add('theme-sapphire');
    } else if (theme === 'sunset') {
      document.body.classList.add('theme-sunset');
    }

    localStorage.setItem('wanderlust-theme', theme);
  }

  /* ==========================================================================
     6. Ambient Audio Equalizer Toggle
     ========================================================================== */
  function toggleAmbientSound() {
    if (isAudioPlaying) {
      ambientAudio.pause();
      isAudioPlaying = false;
      stopEqualizerAnimation();
      showToast("Background soundscapes muted.", "info");
    } else {
      ambientAudio.play().then(() => {
        isAudioPlaying = true;
        startEqualizerAnimation();
        showToast("Playing calm background music.", "success");
      }).catch(err => {
        console.warn("Autoplay block: ", err);
        showToast("Audio play blocked by browser. Click again.", "error");
      });
    }
  }

  function startEqualizerAnimation() {
    if (!equalizer) return;
    const bars = equalizer.querySelectorAll('.equalizer-bar');
    bars.forEach(b => b.style.animationPlayState = 'running');
  }

  function stopEqualizerAnimation() {
    if (!equalizer) return;
    const bars = equalizer.querySelectorAll('.equalizer-bar');
    bars.forEach(b => b.style.animationPlayState = 'paused');
  }

  /* ==========================================================================
     7. Weekly Spotlight Countdown Timer
     ========================================================================== */
  function startCountdownTimer() {
    const daysEl = document.getElementById('spotlight-days');
    const hoursEl = document.getElementById('spotlight-hours');
    const minsEl = document.getElementById('spotlight-mins');
    const secsEl = document.getElementById('spotlight-secs');

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    let countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 3);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minsEl.textContent = String(minutes).padStart(2, '0');
      secsEl.textContent = String(seconds).padStart(2, '0');

      if (distance < 0) {
        clearInterval(timer);
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minsEl.textContent = "00";
        secsEl.textContent = "00";
      }
    }, 1000);
  }

  /* ==========================================================================
     8. Gold Particles Spawner
     ========================================================================== */
  function spawnGoldParticles() {
    if (!particleContainer) return;
    particleContainer.innerHTML = '';
    
    const count = 15;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'gold-particle';
      
      const size = Math.floor(Math.random() * 4) + 2; 
      const left = Math.floor(Math.random() * 100);
      const delay = Math.floor(Math.random() * 12);
      const duration = Math.floor(Math.random() * 10) + 12; 

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${left}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;

      particleContainer.appendChild(particle);
    }
  }

  /* ==========================================================================
     9. Travel Style Quiz Engine
     ========================================================================== */
  function handleQuizNext() {
    if (quizStep === 1) {
      quizStep = 2;
      quizStep1.classList.add('hidden');
      quizStep2.classList.remove('hidden');
      quizPrevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      quizPrevBtn.removeAttribute('disabled');
      quizProgressText.textContent = "Step 2 of 3";
      document.getElementById('quiz-step2-indicator').classList.add('bg-gold', 'text-[#020706]');
    } else if (quizStep === 2) {
      quizStep = 3;
      quizStep2.classList.add('hidden');
      quizStep3.classList.remove('hidden');
      quizNextBtn.textContent = "Find Trips";
      quizProgressText.textContent = "Step 3 of 3";
      document.getElementById('quiz-step3-indicator').classList.add('bg-gold', 'text-[#020706]');
    } else if (quizStep === 3) {
      quizNextBtn.classList.add('hidden');
      quizPrevBtn.classList.add('hidden');
      quizProgressText.classList.add('hidden');
      
      showToast("Finding matching destinations for you...", "info");
      setTimeout(renderQuizResults, 1200);
    }
  }

  function handleQuizPrev() {
    if (quizStep === 2) {
      quizStep = 1;
      quizStep2.classList.add('hidden');
      quizStep1.classList.remove('hidden');
      quizPrevBtn.classList.add('opacity-50', 'cursor-not-allowed');
      quizPrevBtn.setAttribute('disabled', 'true');
      quizProgressText.textContent = "Step 1 of 3";
      document.getElementById('quiz-step2-indicator').classList.remove('bg-gold', 'text-[#020706]');
    } else if (quizStep === 3) {
      quizStep = 2;
      quizStep3.classList.add('hidden');
      quizStep2.classList.remove('hidden');
      quizNextBtn.textContent = "Next Step";
      quizProgressText.textContent = "Step 2 of 3";
      document.getElementById('quiz-step3-indicator').classList.remove('bg-gold', 'text-[#020706]');
    }
  }

  function renderQuizResults() {
    if (!quizResultContainer || !quizMatchedCards) return;
    
    quizMatchedCards.innerHTML = '';
    const styleValue = quizAnswers.style;
    const matches = travelDatabase.filter(dest => dest.tags.includes(styleValue)).slice(0, 2);

    matches.forEach(dest => {
      const matchCard = document.createElement('div');
      matchCard.className = 'glass-panel p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:border-gold/30 transition-all';
      matchCard.innerHTML = `
        <img src="${dest.image}" alt="${dest.name}" class="w-16 h-16 rounded-lg object-cover border border-gold/10">
        <div class="text-left">
          <h5 class="text-xs font-bold text-white tracking-wider">${dest.name}</h5>
          <p class="text-[10px] text-gold uppercase tracking-wider mt-0.5">${dest.tagline}</p>
          <span class="text-[9px] text-gray-500 block mt-1">Click to Plan Trip</span>
        </div>
      `;

      matchCard.addEventListener('click', () => {
        openDrawer(dest.id);
      });

      quizMatchedCards.appendChild(matchCard);
    });

    quizResultContainer.classList.remove('hidden');
    showToast("Trips matched successfully! Review below.", "success");
  }

  /* ==========================================================================
     10. Main Grid Render System
     ========================================================================== */
  function renderDestinations() {
    if (!destinationContainer) return;
    destinationContainer.innerHTML = '';

    const filtered = travelDatabase.filter(dest => {
      const matchCategory = dest.category === currentCategory;
      const baselineCost = (dest.baseCosts.standard + dest.activityCosts.standard) * 5;
      const matchBudget = baselineCost <= budgetLimit;
      return matchCategory && matchBudget;
    });

    if (matchingCountText) {
      matchingCountText.textContent = `Showing ${filtered.length} locations matching your budget`;
    }

    if (filtered.length === 0) {
      destinationContainer.innerHTML = `
        <div class="col-span-full py-16 text-center text-gray-500 font-light space-y-4">
          <p class="text-lg">No matching trips found within your budget limit.</p>
          <p class="text-sm text-gold">Slide the budget higher to unlock other destinations.</p>
        </div>
      `;
      return;
    }

    filtered.forEach((dest, index) => {
      const previewCost = (dest.baseCosts.standard + dest.activityCosts.standard) * 5;
      
      let badgeMarkup = '';
      if (index === 0) {
        badgeMarkup = `<span class="absolute top-4 left-4 bg-gold text-[#020706] text-[8px] uppercase tracking-widest px-2.5 py-1 rounded font-bold">Best Seller</span>`;
      } else if (index === 2 || index === 4) {
        badgeMarkup = `<span class="absolute top-4 left-4 bg-emerald-light border border-gold/30 text-gold text-[8px] uppercase tracking-widest px-2.5 py-1 rounded font-bold">Popular</span>`;
      }

      const card = document.createElement('div');
      card.className = "glass-panel spotlight-card rounded-2xl overflow-hidden group cursor-pointer reveal active";
      card.dataset.id = dest.id;

      card.innerHTML = `
        <div class="h-60 overflow-hidden relative">
          <img src="${dest.image}" alt="${dest.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
          <div class="absolute inset-0 bg-gradient-to-t from-[#020706]/90 via-[#020706]/20 to-transparent"></div>
          ${badgeMarkup}
          <span class="absolute top-4 right-4 bg-[#020706]/85 backdrop-blur border border-gold/20 text-gold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
            Est: ${formatINR(previewCost)}
          </span>
        </div>
        <div class="p-6 space-y-3 relative">
          <div class="flex gap-1 text-[10px] star-gold">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            <span class="text-gray-500 font-sans ml-1 text-[9px] uppercase tracking-wide">4.9 (42 Reviews)</span>
          </div>

          <h3 class="font-serif text-2xl text-white group-hover:text-gold transition-colors duration-300">${dest.name}</h3>
          <p class="text-xs text-gold/80 font-medium tracking-wide uppercase italic">${dest.tagline}</p>
          // <p class="text-xs text-gray-400 font-light leading-relaxed line-clamp-2">${dest.description}</p>
          
          <div class="pt-3 flex items-center justify-between border-t border-gold/10">
            <span class="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Open Planner</span>
            <span class="text-gold text-sm group-hover:translate-x-1.5 transition-transform duration-300">✦ →</span>
          </div>
        </div>
      `;

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
      });

      card.addEventListener('click', () => openDrawer(dest.id));

      destinationContainer.appendChild(card);
    });
  }

  function setCategory(cat) {
    currentCategory = cat;
    if (cat === 'india') {
      catBtnIndia?.classList.add('bg-gold', 'text-[#020706]');
      catBtnIndia?.classList.remove('border-gold/30', 'text-gold');
      catBtnWorld?.classList.remove('bg-gold', 'text-[#020706]');
      catBtnWorld?.classList.add('border-gold/30', 'text-gold');
    } else {
      catBtnWorld?.classList.add('bg-gold', 'text-[#020706]');
      catBtnWorld?.classList.remove('border-gold/30', 'text-gold');
      catBtnIndia?.classList.remove('bg-gold', 'text-[#020706]');
      catBtnIndia?.classList.add('border-gold/30', 'text-gold');
    }
    renderDestinations();
  }

  /* ==========================================================================
     10. Drawer Toggles & Live Pricing Calculator (INR)
     ========================================================================== */
  function openDrawer(destId) {
    const dest = travelDatabase.find(d => d.id === destId);
    if (!dest) return;

    activeDestination = dest;

    // Reset parameters
    currentItineraryDays = 5;
    currentItineraryTravelers = 2;
    currentItineraryTier = 'premium';

    if (travelerVal) travelerVal.textContent = currentItineraryTravelers;
    if (daysSlider) {
      daysSlider.value = currentItineraryDays;
      daysVal.textContent = `${currentItineraryDays} Days`;
    }
    if (tierSelect) tierSelect.value = currentItineraryTier;

    if (calcTitle) calcTitle.textContent = dest.name;
    if (calcTagline) calcTagline.textContent = dest.tagline;
    if (calcDescription) calcDescription.textContent = dest.description;
    if (calcImg) {
      calcImg.setAttribute('src', dest.image);
      calcImg.setAttribute('alt', dest.name);
    }

    if (calcAttractionsList) {
      calcAttractionsList.innerHTML = '';
      dest.attractions.forEach(attraction => {
        const li = document.createElement('li');
        li.className = 'flex items-center gap-2 text-xs text-gray-300';
        li.innerHTML = `<span class="text-gold">✦</span> ${attraction}`;
        calcAttractionsList.appendChild(li);
      });
    }

    if (ticketResultBox) {
      ticketResultBox.classList.add('hidden');
      ticketResultBox.innerHTML = '';
    }
    if (ticketForm) {
      ticketForm.reset();
      ticketForm.classList.remove('hidden');
    }

    updateCalculatorOutputs();

    if (plannerDrawer) plannerDrawer.classList.add('open');
    if (drawerOverlay) drawerOverlay.classList.add('active');

    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (plannerDrawer) plannerDrawer.classList.remove('open');
    if (drawerOverlay) drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
    activeDestination = null;
  }

  function updateCalculatorOutputs() {
    if (!activeDestination) return;

    const dest = activeDestination;
    const travelers = currentItineraryTravelers;
    const days = currentItineraryDays;
    const tier = currentItineraryTier;

    const stayRate = dest.baseCosts[tier];
    const activityRate = dest.activityCosts[tier];

    const totalStay = stayRate * days * travelers;
    const totalActivities = activityRate * days * travelers;
    const grandTotal = totalStay + totalActivities;

    if (costStay) costStay.textContent = formatINR(totalStay);
    if (costActivities) costActivities.textContent = formatINR(totalActivities);
    if (costTotal) costTotal.textContent = formatINR(grandTotal);

    if (itineraryHighlightsBox) {
      itineraryHighlightsBox.innerHTML = '';
      for (let i = 1; i <= days; i++) {
        const dayDesc = dest.dailyItinerary[i] || dest.dailyItinerary[1];
        const dayDiv = document.createElement('div');
        dayDiv.className = 'border-l border-gold/20 pl-4 py-2 relative';
        dayDiv.innerHTML = `
          <div class="absolute w-2 h-2 rounded-full bg-gold -left-[4.5px] top-3.5"></div>
          <h5 class="text-xs font-semibold text-gold uppercase tracking-wider">Day ${i}</h5>
          <p class="text-xs text-gray-300 font-light mt-1">${dayDesc}</p>
        `;
        itineraryHighlightsBox.appendChild(dayDiv);
      }
    }
  }

  /* ==========================================================================
     11. Boarding Ticket Generator (INR)
     ========================================================================== */
  function handleTicketGeneration(e) {
    e.preventDefault();
    if (!activeDestination) return;

    const clientNameInput = document.getElementById('passport-name');
    const clientEmailInput = document.getElementById('passport-email');

    const name = clientNameInput.value.trim();
    const email = clientEmailInput.value.trim();

    if (!name || !email) {
      showToast("Please fill in your name and email address.", "error");
      return;
    }

    showToast("Generating your digital travel ticket...", "info");

    const dest = activeDestination;
    const travelers = currentItineraryTravelers;
    const days = currentItineraryDays;
    const tier = currentItineraryTier;

    const stayRate = dest.baseCosts[tier];
    const activityRate = dest.activityCosts[tier];
    const totalCost = (stayRate + activityRate) * days * travelers;

    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const ticketNumber = "WND-" + Math.floor(100000 + Math.random() * 900000);

    setTimeout(() => {
      ticketForm.classList.add('hidden');

      if (ticketResultBox) {
        ticketResultBox.classList.remove('hidden');
        ticketResultBox.innerHTML = `
          <div class="passport-card p-6 bg-[#061f1a]/80 space-y-6 relative border border-gold/30">
            <div class="flex justify-between items-start border-b border-gold/15 pb-4">
              <div>
                <span class="text-[10px] tracking-[0.2em] uppercase text-gold">OFFICIAL TRAVEL TICKET</span>
                <h4 class="font-serif text-xl text-white font-normal mt-1">Wanderlust Chronicles</h4>
              </div>
              <div class="text-right">
                <span class="text-[10px] uppercase text-gray-400">TICKET NO</span>
                <p class="text-xs font-bold text-gold font-mono tracking-widest mt-0.5">${ticketNumber}</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <span class="text-[9px] uppercase tracking-wider text-gray-500">TRAVELER NAME</span>
                <p class="text-xs font-semibold text-white truncate">${name}</p>
              </div>
              <div>
                <span class="text-[9px] uppercase tracking-wider text-gray-500">DESTINATION</span>
                <p class="text-xs font-semibold text-gold truncate">${dest.name}</p>
              </div>
              <div>
                <span class="text-[9px] uppercase tracking-wider text-gray-500">DURATION</span>
                <p class="text-xs font-semibold text-white">${days} Days</p>
              </div>
              <div>
                <span class="text-[9px] uppercase tracking-wider text-gray-500">TOTAL TRAVELERS</span>
                <p class="text-xs font-semibold text-white">${travelers} Guest(s)</p>
              </div>
              <div>
                <span class="text-[9px] uppercase tracking-wider text-gray-500">SERVICE LEVEL</span>
                <p class="text-xs font-semibold text-gold uppercase tracking-wider">${tier} Class</p>
              </div>
              <div>
                <span class="text-[9px] uppercase tracking-wider text-gray-500">DATE GENERATED</span>
                <p class="text-xs font-semibold text-white">${currentDate}</p>
              </div>
            </div>

            <div class="pt-4 border-t border-gold/15 flex justify-between items-center">
              <div class="space-y-1">
                <span class="text-[9px] uppercase tracking-wider text-gray-400">ESTIMATED BUDGET</span>
                <p class="text-lg font-serif font-bold text-gold">${formatINR(totalCost)}</p>
              </div>
              <div class="text-right">
                <div class="h-8 flex gap-[1px] items-center bg-white px-2 py-1 rounded">
                  <div class="w-[2px] h-full bg-black"></div>
                  <div class="w-[1px] h-full bg-black"></div>
                  <div class="w-[3px] h-full bg-black"></div>
                  <div class="w-[1px] h-full bg-black"></div>
                  <div class="w-[2px] h-full bg-black"></div>
                  <div class="w-[4px] h-full bg-black"></div>
                  <div class="w-[1px] h-full bg-black"></div>
                  <div class="w-[2px] h-full bg-black"></div>
                  <div class="w-[3px] h-full bg-black"></div>
                </div>
                <span class="text-[8px] font-mono text-gray-500 block mt-1">SECURE TRAVEL BARCODE</span>
              </div>
            </div>
            
            <button id="btn-print-passport" class="w-full mt-4 bg-transparent border border-gold text-gold hover:bg-gold/10 text-xs py-2 rounded uppercase tracking-wider font-semibold">
              Download PDF Ticket
            </button>
          </div>
        `;

        document.getElementById('btn-print-passport').addEventListener('click', () => {
          showToast("Downloading your travel ticket pass...", "info");
          setTimeout(() => {
            showToast("Downloaded! Safe travels across Wanderlust Chronicles.", "success");
          }, 1500);
        });
      }

      showToast("Ticket generated! Check details below.", "success");
    }, 1200);
  }

  /* ==========================================================================
     12. Global Utility Systems
     ========================================================================== */
  function formatINR(value) {
    return `₹${value.toLocaleString('en-IN')}`;
  }

  function scrollToSelector(selector) {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  function showToast(message, type = 'success') {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    let typeClass = 'border-gold text-white bg-[#061f1a]';
    let icon = '✦';
    
    if (type === 'error') {
      typeClass = 'border-red-500 text-red-100 bg-red-950/90';
      icon = '✕';
    } else if (type === 'info') {
      typeClass = 'border-gold/40 text-gray-200 bg-[#0d382f]/90';
      icon = 'ℹ';
    }

    toast.className = `p-4 rounded-lg border glass-panel flex items-start gap-3 shadow-2xl transition-all duration-500 ease-out transform translate-y-10 opacity-0 ${typeClass}`;
    toast.innerHTML = `
      <span class="text-gold text-sm font-bold mt-0.5">${icon}</span>
      <div class="flex-1">
        <p class="text-xs font-semibold tracking-wide">${message}</p>
      </div>
      <button class="toast-close text-gray-500 hover:text-white text-xs ml-2">&times;</button>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('translate-y-10', 'opacity-0');
    }, 50);

    const removeTimer = setTimeout(() => {
      dismissToast(toast);
    }, 4500);

    toast.querySelector('.toast-close').addEventListener('click', () => {
      clearTimeout(removeTimer);
      dismissToast(toast);
    });
  }

  function dismissToast(toast) {
    toast.classList.add('translate-y-10', 'opacity-0');
    setTimeout(() => {
      toast.remove();
    }, 500);
  }

  init();
});
