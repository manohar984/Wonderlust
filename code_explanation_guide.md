# Wanderlust Chronicles - Advanced Developer Presentation & Live-Coding Cheat Sheet

ఈ గైడ్ మీ సార్ (Sir) కి కోడ్ చూపించి లైన్-బై-లైన్ ఎక్స్ప్లెయిన్ చేయడానికి మరియు ఒకవేళ మీ సార్ **"ఇది లైవ్ లో మార్చి చూపించు"** అని అడిగితే ఎలా మార్చాలో కోడ్ లెవల్ లో వివరించడానికి డిజైన్ చేయబడింది.

---

## 🛠️ ప్రెజెంటేషన్ కోసం ఫైల్స్:
1.  **HTML:** [`index.html`](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/index.html)
2.  **CSS:** [`styles.css`](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/css/styles.css)
3.  **JS:** [`main.js`](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js)

---

## 💡 PART 1: 9 ప్రధాన ఫీచర్లు - కోడ్ మెకానిజమ్స్ (Line-by-Line Mechanics)

### 1. థీమ్స్ మార్చినప్పుడు కలర్ ఎలా మారుతుంది? (Theme Changing Logic)
*   **HTML Structure ([Lines 86-93](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/index.html#L86-L93)):**
    ఇదొక నార్మల్ HTML `<select>` డ్రాప్‌డౌన్ ఎలిమెంట్ (ఇది బటన్ కాదు, సెలెక్ట్ ట్యాగ్).
    ```html
    <select id="theme-select" class="...">
      <option value="emerald">Royal Emerald</option>
      <option value="sapphire">Sapphire Ocean</option>
      <option value="sunset">Velvet Sunset</option>
    </select>
    ```
*   **JS Selection & Event Listener:**
    `main.js` లో [Line 549](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L549) వద్ద `themeSelect` ఎలిమెంట్‌ని సెలెక్ట్ చేశాం.
    [Lines 615-620](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L615-L620) లో `change` ఈవెంట్ పెట్టాం. యూజర్ ఆప్షన్ మార్చగానే ఇది ట్రిగ్గర్ అవుతుంది.
    ```javascript
    themeSelect.addEventListener('change', (e) => {
      setTheme(e.target.value); // e.target.value లో 'sapphire' లేదా 'sunset' ఉంటుంది
    });
    ```
*   **JS Function (`setTheme` - [Lines 738-748](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L738-L748)):**
    ```javascript
    function setTheme(theme) {
      document.body.classList.remove('theme-sapphire', 'theme-sunset'); // పాత క్లాసులు తీసేస్తాం
      if (theme === 'sapphire') {
        document.body.classList.add('theme-sapphire'); // కొత్త క్లాస్ కలుపుతాం
      } else if (theme === 'sunset') {
        document.body.classList.add('theme-sunset');
      }
      localStorage.setItem('wanderlust-theme', theme); // బ్రౌజర్ మెమరీ లో దాస్తాం
    }
    ```
*   **CSS Variables Override (`styles.css`):**
    బాడీకి క్లాస్ యాడ్ అవ్వగానే CSS Variables ఓవర్‌రైడ్ అవుతాయి ([Lines 21-38](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/css/styles.css#L21-L38)).
    Tailwind Config ([Lines 15-38](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/index.html#L15-L38)) లో కలర్స్ ని ఈ variables కి మ్యాప్ చేశాం కాబట్టి పేజీ రీలోడ్ అవ్వకుండా కలర్స్ మారిపోతాయి.

---

### 2. డ్రాయర్ / పాపప్ ఎలా ఓపెన్ అవుతుంది? (Drawer Slide-In)
*   **HTML Structure ([Lines 866-991](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/index.html#L866-L991)):**
    ఇదొక పెద్ద కంటైనర్ `div` దీనికి `id="planner-drawer"` మరియు `class="drawer ..."` ఉంది.
*   **CSS Positioning ([Lines 226-245](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/css/styles.css#L226-L245)):**
    ```css
    .drawer {
      position: fixed;
      right: -100%; /* డీఫాల్ట్ గా స్క్రీన్‌కి కుడిపక్క దాగి ఉంటుంది */
      transition: right 0.5s cubic-bezier(0.16, 1, 0.3, 1); /* స్మూత్ గా జరగడానికి */
    }
    .drawer.open {
      right: 0; /* open క్లాస్ ఉన్నప్పుడు స్క్రీన్ కుడి అంచుకి సరిపోతుంది */
    }
    ```
*   **JS Class Toggle ([Lines 1074-1075](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L1074-L1075)):**
    ట్రిప్ కార్డు పై క్లిక్ చేసినప్పుడు `openDrawer()` రన్ అయి క్లాస్ యాడ్ చేస్తుంది:
    ```javascript
    plannerDrawer.classList.add('open');
    drawerOverlay.classList.add('active'); // బ్యాక్‌గ్రౌండ్ బ్లర్ ఎఫెక్ట్ కోసం
    ```

---

### 3. 'Explore India / World' క్లిక్ చేసినప్పుడు ఎలా ఫిల్టర్ అవుతాయి? (Category Logic)
*   **HTML:** హీరో సెక్షన్ లో రెండు కార్డులు ఉన్నాయి.
    *   ఇండియా కార్డ్: `id="gatekeeper-india"` ([Line 141](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/index.html#L141))
    *   వరల్డ్ కార్డ్: `id="gatekeeper-world"` ([Line 160](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/index.html#L160))
*   **JS Click Handler ([Lines 637-650](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L637-L650)):**
    ```javascript
    gatekeeperIndia.addEventListener('click', () => {
      setCategory('india'); // క్యాటగిరీ ని అప్‌డేట్ చేస్తుంది
      scrollToSelector('#destinations-section'); // బడ్జెట్ ఫిల్టర్ సెక్షన్ కి స్క్రోల్ చేస్తుంది
    });
    ```
*   **JS `setCategory()` & `renderDestinations()` ([Lines 1008-1022](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L1008-L1022)):**
    `currentCategory` వేరియబుల్ వాల్యూ 'india' లేదా 'world' గా మారుతుంది.
    ఆ తర్వాత `renderDestinations()` కాల్ అవుతుంది. ఇందులో `travelDatabase` అరే ని ఫిల్టర్ చేస్తాం ([Lines 933-938](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L933-L938)):
    ```javascript
    const filtered = travelDatabase.filter(dest => dest.category === currentCategory && ...);
    ```

---

### 4. క్విజ్ ఎలా వర్క్ అవుతుంది? (Quiz Mechanics)
*   **HTML Structure ([Lines 256-403](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/index.html#L256-L403)):**
    క్విజ్ లో 3 స్టెప్స్ ఉన్నాయి: `quiz-step-1`, `quiz-step-2`, `quiz-step-3`.
    ప్రతి దాంట్లో ఆప్షన్స్ కి `quiz-option-card` క్లాస్ ఉంది. వాటికి `data-type` మరియు `data-value` ఉన్నాయి.
*   **JS Selection & Answer Storage ([Lines 665-677](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L665-L677)):**
    యూజర్ ఏదైనా ఆప్షన్ క్లిక్ చేయగానే ఆ వాల్యూని `quizAnswers` ఆబ్జెక్ట్ లో స్టోర్ చేసుకుంటాం:
    ```javascript
    quizAnswers[type] = val; // ఉదాహరణకు: quizAnswers['style'] = 'nature'
    ```
*   **JS Steps Transition ([Lines 851-894](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L851-L894)):**
    యూజర్ 'Next' బటన్ కొట్టినప్పుడు `handleQuizNext()` లో:
    ```javascript
    quizStep1.classList.add('hidden'); // కరెంట్ స్టెప్ ని హైడ్ చేస్తాం
    quizStep2.classList.remove('hidden'); // నెక్స్ట్ స్టెప్ ని చూపిస్తాం
    ```
*   **JS Quiz Recommendation Output ([Lines 896-924](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L896-L924)):**
    స్టెప్ 3 తర్వాత `renderQuizResults()` రన్ అవుతుంది:
    ```javascript
    const styleValue = quizAnswers.style; // ఉదా: 'nature'
    // అరే లో ఈ ట్యాగ్ ఉన్న 2 వస్తువులని వడపోస్తాం
    const matches = travelDatabase.filter(dest => dest.tags.includes(styleValue)).slice(0, 2);
    // వాటిని డైనమిక్ గా HTML క్రియేట్ చేసి డిస్‌ప్లే చేస్తాం
    ```

---

### 5. మ్యాప్ లో ఖచ్చితంగా ఆ పాయింట్ క్లిక్ చేసినప్పుడు అదే లొకేషన్ ఎలా చూపిస్తుంది? (Map Coordinates)
*   **HTML Setup ([Lines 432-574](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/index.html#L432-L574)):**
    మ్యాప్ పాయింట్స్ ని absolute పొజిషనింగ్ (`left` మరియు `top` పర్సంటేజ్) ద్వారా మ్యాప్ ఇమేజ్ పైన అమర్చాము. ప్రతి పాయింట్ కి ఒక `data-dest` ఐడీ ఉంది.
    ```html
    <div class="map-hotspot" style="left: 61.8%; top: 49.8%;" data-dest="taj_mahal">...</div>
    ```
*   **JS Interaction ([Lines 683-689](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L683-L689)):**
    ```javascript
    mapHotspots.forEach(hotspot => {
      hotspot.addEventListener('click', () => {
        const targetDest = hotspot.dataset.dest; // dataset.dest ద్వారా "taj_mahal" విలువ తీసుకుంటుంది
        openDrawer(targetDest); // ఆ డెస్టినేషన్ ఐడీ ని పంపించి డ్రాయర్ ఓపెన్ చేస్తాం
      });
    });
    ```
*   `openDrawer(destId)` ఫంక్షన్ ([Lines 1027-1078](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L1027-L1078)) `travelDatabase` లో ఈ `destId` ని వెతికి, దాని డేటాను డ్రాయర్ టైటిల్, ఇమేజ్, చూడాల్సిన ప్రదేశాలలోకి ఇన్సర్ట్ చేస్తుంది.

---

### 6. బడ్జెట్ లెక్క ఎలా వేస్తుంది? (Calculator Formula)
*   **JS Input Variables:**
    *   `travelers` (ప్రయాణికులు - కనీసం 1, గరిష్టం 20)
    *   `days` (రోజులు - 1 నుండి 14)
    *   `tier` (రూమ్ క్లాస్ - standard, premium, luxury)
*   **JS Formula in `updateCalculatorOutputs()` ([Lines 1087-1120](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L1087-L1120)):**
    ```javascript
    const stayRate = dest.baseCosts[tier]; // ఉదా: 15,000
    const activityRate = dest.activityCosts[tier]; // ఉదా: 5,000

    const totalStay = stayRate * days * travelers;
    const totalActivities = activityRate * days * travelers;
    const grandTotal = totalStay + totalActivities; // మొత్తం బడ్జెట్
    ```

---

### 7. బడ్జెట్ కి తగిన రికమండేషన్స్ ఎలా చూపిస్తుంది? (Real-time Budget Filtering)
*   **HTML Input:** `id="global-budget-slider"` రేంజ్ ఇన్పుట్ స్లైడర్ ([Line 603](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/index.html#L603)).
*   **JS State Update ([Lines 626-634](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L626-L634)):**
    స్లైడర్ జరిపినప్పుడు `budgetLimit` వాల్యూ మారుతుంది, ఆ వెంటనే `renderDestinations()` ని కాల్ చేస్తాం.
*   **JS Filtering Logic inside `renderDestinations()` ([Lines 935-937](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L935-L937)):**
    ```javascript
    // కనీసం 5 రోజుల బేసిక్ (Standard) ట్రిప్ బడ్జెట్ లెక్కిస్తాం
    const baselineCost = (dest.baseCosts.standard + dest.activityCosts.standard) * 5;
    
    // ఒకవేళ ఆ ట్రిప్ కనీస ఖర్చు యూజర్ స్లైడర్ లో పెట్టిన పరిమితి కన్నా తక్కువ ఉంటేనే చూపిస్తాం
    const matchBudget = baselineCost <= budgetLimit;
    ```

---

### 8. డేటా అంతా ఎక్కడ స్టోర్ అయి ఉంది? (Storage Architecture)
*   **JS Array Storage ([Lines 7-511](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L7-L511)):**
    మొత్తం 20 లొకేషన్ల డేటా అంతా `travelDatabase` అనే గ్లోబల్ ఆబ్జెక్ట్ అరే లో ఉంది. 
*   **JS Dynamic State Variables ([Lines 516-531](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L516-L531)):**
    యూజర్ యాప్ రన్ చేస్తున్నప్పుడు కరెంట్ సెలెక్షన్స్ (బడ్జెట్ లిమిట్, క్విజ్ సమాధానాలు) అన్నీ ర్యామ్ (RAM) లో ఉంటాయి.
*   **Browser `localStorage` ([Line 747](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L747)):**
    యూజర్ సెలెక్ట్ చేసిన థీమ్ బ్రౌజర్ క్లోజ్ చేసినా గుర్తుండటానికి బ్రౌజర్ లోకల్ స్టోరేజ్ లో దాస్తాము.

---

### 9. పాస్‌పోర్ట్ / బోర్డింగ్ పాస్ ఎలా జెనరేట్ అవుతుంది? (Boarding Pass Generator)
*   **HTML Input:** `id="passport-form"` ఫారమ్ ([Lines 972-980](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/index.html#L972-L980)).
*   **JS Form Handler (`handleTicketGeneration` - [Lines 1125-1241](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L1125-L1241)):**
    ```javascript
    e.preventDefault(); // సబ్మిట్ చేసాక పేజీ రీలోడ్ అవ్వకుండా ఆపుతుంది
    
    // 6 అంకెల రాండమ్ టికెట్ నంబర్ సృష్టిస్తాం
    const ticketNumber = "WND-" + Math.floor(100000 + Math.random() * 900000);
    
    // Template Literal ద్వారా టికెట్ కి సంబంధించిన HTML డిజైన్‌ను క్రియేట్ చేస్తాం
    ticketResultBox.innerHTML = `
      <div class="passport-card p-6 ...">
        ...
        <p class="text-xs font-bold text-gold">${ticketNumber}</p>
        <p class="text-xs font-semibold text-white">${name}</p>
        ...
      </div>
    `;
    ticketResultBox.classList.remove('hidden'); // టికెట్ కంటైనర్ చూపిస్తాం
    ticketForm.classList.add('hidden'); // ఫారమ్ ని హైడ్ చేస్తాం
    ```

---

## ⚡ PART 2: లైవ్ లో మార్చమని సార్ అడిగితే ఎలా చేయాలి? (Live Customization Cheatsheet)

ఒకవేళ మీ సార్ **"లైవ్ లో ఈ వాల్యూస్ లేదా కలర్స్ మార్చు"** అని అడిగితే టెన్షన్ లేకుండా ఈ క్రింది స్టెప్స్ ఫాలో అవ్వండి:

### A. కొత్త థీమ్ యాడ్ చేయమంటే (ఉదాహరణకు "Ruby Sunset" - రెడ్ కలర్ థీమ్)
1.  **HTML ఫైల్ లో డ్రాప్‌డౌన్ ఆప్షన్ పెంచండి:**
    `index.html` లో [Line 91](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/index.html#L91) కింద ఈ లైన్ ని చేర్చండి:
    ```html
    <option value="ruby">Ruby Sunset</option>
    ```
2.  **CSS ఫైల్ లో కలర్స్ డిఫైన్ చేయండి:**
    `styles.css` లో [Line 38](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/css/styles.css#L38) కింద ఈ రెడ్ కలర్స్ వేరియబుల్స్ యాడ్ చేయండి:
    ```css
    body.theme-ruby {
      --bg-primary: #150205; /* డార్క్ రెడ్ బ్యాక్‌గ్రౌండ్ */
      --color-gold: #ffb3b3; /* లైట్ పింక్ / రెడ్ గోల్డ్ */
      --color-gold-hover: #ff9999;
      --color-emerald-light: #4a0f18; /* మిడిల్ రెడ్ */
      --color-emerald: #35080f; /* డార్క్ ఎరుపు */
      --border-glass: rgba(255, 179, 179, 0.12);
    }
    ```
3.  **JS ఫైల్ లో థీమ్ కండిషన్ యాడ్ చేయండి:**
    `main.js` లో [Lines 738-748](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L738-L748) వద్ద ఉన్న `setTheme()` ఫంక్షన్ ని ఇలా మార్చండి:
    ```javascript
    function setTheme(theme) {
      document.body.classList.remove('theme-sapphire', 'theme-sunset', 'theme-ruby'); // theme-ruby ని కూడా రిమూవ్ లిస్ట్ లో పెట్టండి
      
      if (theme === 'sapphire') {
        document.body.classList.add('theme-sapphire');
      } else if (theme === 'sunset') {
        document.body.classList.add('theme-sunset');
      } else if (theme === 'ruby') {
        document.body.classList.add('theme-ruby'); // theme-ruby ని యాడ్ చేయండి
      }
      localStorage.setItem('wanderlust-theme', theme);
    }
    ```

---

### B. క్యాలిక్యులేషన్ లో మార్పులు చేయమంటే (ఉదాహరణకు "18% GST / Tax" యాడ్ చేయమంటే)
1.  **JS ఫైల్ లోకి వెళ్ళండి:**
    `main.js` లో [Lines 1098-1100](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L1098-L1100) వద్ద క్యాలిక్యులేషన్ లాజిక్ ఉంటుంది.
2.  **అక్కడ 18% ట్యాక్స్ ఫార్ములా కలపండి:**
    ```javascript
    const totalStay = stayRate * days * travelers;
    const totalActivities = activityRate * days * travelers;
    const subTotal = totalStay + totalActivities;
    const grandTotal = subTotal * 1.18; // 18% GST యాడ్ చేశాము
    ```

---

### C. ట్రిప్ రోజులను గరిష్టంగా 30 రోజులకు పెంచమంటే
1.  **HTML లో స్లైడర్ పరిమితి మార్చండి:**
    `index.html` లో [Line 922](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/index.html#L922) కి వెళ్ళండి:
    ```html
    <!-- పాతది: max="14" -->
    <input type="range" id="calc-days-slider" min="1" max="30" value="5" class="premium-slider">
    ```
2.  **JS లో రోజువారీ ప్లాన్స్ ని 30 రోజులకు మ్యాచ్ చేయడం:**
    మన అరే లో 10 రోజుల ప్లాన్స్ మాత్రమే ఉన్నాయి కాబట్టి, 30 రోజులకు పెంచినా ఎర్రర్ రాకుండా JS కోడ్ లోని [Line 1109](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L1109) వద్ద `dest.dailyItinerary[i] || dest.dailyItinerary[1]` అని డీఫాల్ట్ కండిషన్ పెట్టాము. దీనివల్ల ఎలాంటి ఎర్రర్ రాకుండా ఐటినరరీ లూప్ అవుతుంది.

---

### D. కొత్త టూరిస్ట్ ప్లేస్ యాడ్ చేయమంటే (ఉదాహరణకు: "Hyderabad Charminar")
1.  **JS ఫైల్ లో అరే లోకి వెళ్ళండి:**
    `main.js` లో [Lines 7-258](file:///c:/Users/user/.gemini/antigravity-ide/scratch/Trailsofantigravity/assets/js/main.js#L7-L258) అనేది ఇండియా డెస్టినేషన్ల అరే.
2.  **చివరన ఒక కొత్త ఆబ్జెక్ట్ ని పుష్ చేయండి:**
    ```javascript
    {
      id: "hyderabad",
      name: "Charminar, Hyderabad",
      category: "india",
      tags: ["heritage"],
      image: "assets/images/india_jaipur.png", // ఏదైనా పాత ఇమేజ్ లింక్ ఇవ్వండి
      tagline: "The City of Pearls & Biryani",
      description: "Visit the historic monument with four minarets built in the heart of Hyderabad.",
      minBudget: 15000,
      baseCosts: { standard: 2000, premium: 5000, luxury: 15000 },
      activityCosts: { standard: 800, premium: 2000, luxury: 5000 },
      attractions: ["Charminar Walk", "Golconda Fort Sound Show", "Birla Mandir View", "Lad Bazaar Shopping"],
      dailyItinerary: {
        1: "Explore the beautiful arches of Charminar in the morning.",
        2: "Visit the grand Golconda Fort and watch the evening laser show.",
        3: "Shop for traditional pearls and bangles in Lad Bazaar."
        // ఇలా ఎన్ని రోజులైనా రాయొచ్చు
      }
    }
    ```
