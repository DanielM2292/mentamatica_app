(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/AvatarCustomizer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/coins.js [app-client] (ecmascript) <export default as Coins>");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const AvatarCustomizer = ({ onBack, onSave, userCoins = 50 })=>{
    _s();
    const [currentCategory, setCurrentCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('gender');
    const [avatar, setAvatar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        gender: 'boy',
        skinColor: '#FDBCB4',
        eyes: 'normal',
        eyeColor: '#4A5568',
        eyebrows: 'normal',
        nose: 'normal',
        mouth: 'smile',
        ears: 'normal',
        hairType: 'short',
        hairColor: '#8B4513',
        clothing: 'casual',
        accessories: 'none',
        background: 'gradient1',
        facialHair: 'none'
    });
    const [animatingOption, setAnimatingOption] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showSaveAnimation, setShowSaveAnimation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [unlockedCategories, setUnlockedCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        'gender',
        'skinColor'
    ]);
    const avatarRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const particlesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Simulamos GSAP con animaciones CSS personalizadas
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AvatarCustomizer.useEffect": ()=>{
            if (avatarRef.current) {
                avatarRef.current.style.animation = 'avatarFloat 3s ease-in-out infinite';
            }
        }
    }["AvatarCustomizer.useEffect"], [
        avatar
    ]);
    const categories = [
        {
            id: 'gender',
            name: 'Género',
            icon: '👤',
            color: 'from-pink-200 to-blue-200',
            isLocked: false,
            cost: 0
        },
        {
            id: 'skinColor',
            name: 'Color de Piel',
            icon: '🎨',
            color: 'from-orange-200 to-yellow-200',
            isLocked: false,
            cost: 0
        },
        {
            id: 'eyes',
            name: 'Forma de Ojos',
            icon: '👀',
            color: 'from-blue-200 to-cyan-200',
            isLocked: !unlockedCategories.includes('eyes'),
            cost: 10
        },
        {
            id: 'eyeColor',
            name: 'Color de Ojos',
            icon: '🌈',
            color: 'from-green-200 to-teal-200',
            isLocked: !unlockedCategories.includes('eyeColor'),
            cost: 15
        },
        {
            id: 'eyebrows',
            name: 'Cejas',
            icon: '✨',
            color: 'from-yellow-200 to-orange-200',
            isLocked: !unlockedCategories.includes('eyebrows'),
            cost: 12
        },
        {
            id: 'nose',
            name: 'Nariz',
            icon: '👃',
            color: 'from-green-200 to-emerald-200',
            isLocked: !unlockedCategories.includes('nose'),
            cost: 15
        },
        {
            id: 'mouth',
            name: 'Boca',
            icon: '👄',
            color: 'from-red-200 to-pink-200',
            isLocked: !unlockedCategories.includes('mouth'),
            cost: 10
        },
        {
            id: 'ears',
            name: 'Orejas',
            icon: '👂',
            color: 'from-purple-200 to-indigo-200',
            isLocked: !unlockedCategories.includes('ears'),
            cost: 20
        },
        {
            id: 'facialHair',
            name: 'Vello Facial',
            icon: '🧔',
            color: 'from-gray-200 to-slate-200',
            isLocked: !unlockedCategories.includes('facialHair'),
            cost: 18
        },
        {
            id: 'hairType',
            name: 'Tipo de Pelo',
            icon: '💇',
            color: 'from-yellow-200 to-orange-200',
            isLocked: !unlockedCategories.includes('hairType'),
            cost: 25
        },
        {
            id: 'hairColor',
            name: 'Color de Pelo',
            icon: '🌈',
            color: 'from-indigo-200 to-purple-200',
            isLocked: !unlockedCategories.includes('hairColor'),
            cost: 15
        },
        {
            id: 'clothing',
            name: 'Ropa',
            icon: '👕',
            color: 'from-teal-200 to-green-200',
            isLocked: !unlockedCategories.includes('clothing'),
            cost: 30
        },
        {
            id: 'accessories',
            name: 'Accesorios',
            icon: '🎀',
            color: 'from-pink-200 to-rose-200',
            isLocked: !unlockedCategories.includes('accessories'),
            cost: 50
        },
        {
            id: 'background',
            name: 'Fondo',
            icon: '🌟',
            color: 'from-cyan-200 to-blue-200',
            isLocked: !unlockedCategories.includes('background'),
            cost: 40
        }
    ];
    const options = {
        gender: [
            {
                id: 'boy',
                name: 'Niño',
                preview: '👦'
            },
            {
                id: 'girl',
                name: 'Niña',
                preview: '👧'
            }
        ],
        skinColor: [
            {
                id: '#FDBCB4',
                name: 'Claro',
                preview: '🟤',
                color: '#FDBCB4'
            },
            {
                id: '#F1C27D',
                name: 'Medio',
                preview: '🟤',
                color: '#F1C27D'
            },
            {
                id: '#E0AC69',
                name: 'Dorado',
                preview: '🟤',
                color: '#E0AC69'
            },
            {
                id: '#C68642',
                name: 'Moreno',
                preview: '🟤',
                color: '#C68642'
            },
            {
                id: '#8D5524',
                name: 'Oscuro',
                preview: '🟤',
                color: '#8D5524'
            },
            {
                id: '#D4A574',
                name: 'Canela',
                preview: '🟤',
                color: '#D4A574'
            }
        ],
        eyes: [
            {
                id: 'normal',
                name: 'Normales',
                preview: '👁️'
            },
            {
                id: 'big',
                name: 'Grandes',
                preview: '😍'
            },
            {
                id: 'small',
                name: 'Pequeños',
                preview: '😊'
            },
            {
                id: 'almond',
                name: 'Almendrados',
                preview: '😌'
            },
            {
                id: 'round',
                name: 'Redondos',
                preview: '😮'
            },
            {
                id: 'sleepy',
                name: 'Somnolientos',
                preview: '😴'
            },
            {
                id: 'wink',
                name: 'Guiño',
                preview: '😉'
            }
        ],
        eyeColor: [
            {
                id: '#4A5568',
                name: 'Gris',
                preview: '⚫',
                color: '#4A5568'
            },
            {
                id: '#8B4513',
                name: 'Café',
                preview: '🟤',
                color: '#8B4513'
            },
            {
                id: '#2D5A87',
                name: 'Azul',
                preview: '🔵',
                color: '#2D5A87'
            },
            {
                id: '#2F855A',
                name: 'Verde',
                preview: '🟢',
                color: '#2F855A'
            },
            {
                id: '#553C9A',
                name: 'Violeta',
                preview: '🟣',
                color: '#553C9A'
            },
            {
                id: '#C05621',
                name: 'Ámbar',
                preview: '🟠',
                color: '#C05621'
            }
        ],
        eyebrows: [
            {
                id: 'normal',
                name: 'Normales',
                preview: '━'
            },
            {
                id: 'thick',
                name: 'Gruesas',
                preview: '═'
            },
            {
                id: 'thin',
                name: 'Delgadas',
                preview: '─'
            },
            {
                id: 'arched',
                name: 'Arqueadas',
                preview: '︶'
            },
            {
                id: 'straight',
                name: 'Rectas',
                preview: '▬'
            },
            {
                id: 'bushy',
                name: 'Pobladas',
                preview: '≡'
            }
        ],
        nose: [
            {
                id: 'normal',
                name: 'Normal',
                preview: '👃🏼'
            },
            {
                id: 'small',
                name: 'Pequeña',
                preview: '👃🏻'
            },
            {
                id: 'big',
                name: 'Grande',
                preview: '👃🏽'
            },
            {
                id: 'button',
                name: 'Respingona',
                preview: '👃🏾'
            },
            {
                id: 'pointed',
                name: 'Puntiaguda',
                preview: '🔺'
            },
            {
                id: 'wide',
                name: 'Ancha',
                preview: '▽'
            }
        ],
        mouth: [
            {
                id: 'smile',
                name: 'Sonrisa',
                preview: '😊'
            },
            {
                id: 'big_smile',
                name: 'Sonrisa Grande',
                preview: '😄'
            },
            {
                id: 'neutral',
                name: 'Neutral',
                preview: '😐'
            },
            {
                id: 'small',
                name: 'Pequeña',
                preview: '🙂'
            },
            {
                id: 'lips',
                name: 'Labios Gruesos',
                preview: '💋'
            },
            {
                id: 'whistle',
                name: 'Silbido',
                preview: '😗'
            },
            {
                id: 'tongue',
                name: 'Lengua',
                preview: '😛'
            }
        ],
        ears: [
            {
                id: 'normal',
                name: 'Normales',
                preview: '👂'
            },
            {
                id: 'small',
                name: 'Pequeñas',
                preview: '👂🏻'
            },
            {
                id: 'big',
                name: 'Grandes',
                preview: '👂🏼'
            },
            {
                id: 'pointed',
                name: 'Puntiagudas',
                preview: '🧝'
            },
            {
                id: 'round',
                name: 'Redondas',
                preview: '⭕'
            }
        ],
        facialHair: [
            {
                id: 'none',
                name: 'Sin Vello',
                preview: '🚫'
            },
            {
                id: 'mustache',
                name: 'Bigote',
                preview: '👨'
            },
            {
                id: 'beard',
                name: 'Barba',
                preview: '🧔'
            },
            {
                id: 'goatee',
                name: 'Perilla',
                preview: '🐐'
            },
            {
                id: 'stubble',
                name: 'Barba de 3 días',
                preview: '👤'
            }
        ],
        hairType: [
            {
                id: 'short',
                name: 'Corto',
                preview: '👦'
            },
            {
                id: 'medium',
                name: 'Mediano',
                preview: '👨'
            },
            {
                id: 'long',
                name: 'Largo',
                preview: '👧'
            },
            {
                id: 'curly',
                name: 'Rizado',
                preview: '👨‍🦱'
            },
            {
                id: 'wavy',
                name: 'Ondulado',
                preview: '👩‍🦰'
            },
            {
                id: 'braids',
                name: 'Trenzas',
                preview: '👧🏽'
            },
            {
                id: 'ponytail',
                name: 'Cola',
                preview: '👱‍♀️'
            },
            {
                id: 'bald',
                name: 'Calvo',
                preview: '👨‍🦲'
            },
            {
                id: 'mohawk',
                name: 'Mohicano',
                preview: '🤘'
            }
        ],
        hairColor: [
            {
                id: '#000000',
                name: 'Negro',
                preview: '⚫',
                color: '#000000'
            },
            {
                id: '#8B4513',
                name: 'Castaño',
                preview: '🟤',
                color: '#8B4513'
            },
            {
                id: '#CD853F',
                name: 'Rubio Oscuro',
                preview: '🟫',
                color: '#CD853F'
            },
            {
                id: '#FFD700',
                name: 'Rubio',
                preview: '🟡',
                color: '#FFD700'
            },
            {
                id: '#FF4500',
                name: 'Pelirrojo',
                preview: '🔴',
                color: '#FF4500'
            },
            {
                id: '#9370DB',
                name: 'Morado',
                preview: '🟣',
                color: '#9370DB'
            },
            {
                id: '#00CED1',
                name: 'Azul',
                preview: '🔵',
                color: '#00CED1'
            },
            {
                id: '#FF69B4',
                name: 'Rosa',
                preview: '🩷',
                color: '#FF69B4'
            },
            {
                id: '#32CD32',
                name: 'Verde',
                preview: '🟢',
                color: '#32CD32'
            },
            {
                id: '#C0C0C0',
                name: 'Gris',
                preview: '⚪',
                color: '#C0C0C0'
            }
        ],
        clothing: [
            {
                id: 'casual',
                name: 'Casual',
                preview: '👕'
            },
            {
                id: 'formal',
                name: 'Elegante',
                preview: '👔'
            },
            {
                id: 'sports',
                name: 'Deportiva',
                preview: '🏃'
            },
            {
                id: 'hoodie',
                name: 'Sudadera',
                preview: '🧥'
            },
            {
                id: 'dress',
                name: 'Vestido',
                preview: '👗'
            },
            {
                id: 'superhero',
                name: 'Superhéroe',
                preview: '🦸'
            },
            {
                id: 'princess',
                name: 'Princesa',
                preview: '👸'
            },
            {
                id: 'pirate',
                name: 'Pirata',
                preview: '🏴‍☠️'
            },
            {
                id: 'uniform',
                name: 'Uniforme',
                preview: '👮'
            }
        ],
        accessories: [
            {
                id: 'none',
                name: 'Ninguno',
                preview: '❌'
            },
            {
                id: 'glasses',
                name: 'Lentes',
                preview: '🤓'
            },
            {
                id: 'sunglasses',
                name: 'Lentes de Sol',
                preview: '😎'
            },
            {
                id: 'hat',
                name: 'Sombrero',
                preview: '🎩'
            },
            {
                id: 'cap',
                name: 'Gorra',
                preview: '🧢'
            },
            {
                id: 'bow',
                name: 'Moño',
                preview: '🎀'
            },
            {
                id: 'crown',
                name: 'Corona',
                preview: '👑'
            },
            {
                id: 'headband',
                name: 'Diadema',
                preview: '👸'
            },
            {
                id: 'earrings',
                name: 'Aretes',
                preview: '💎'
            },
            {
                id: 'necklace',
                name: 'Collar',
                preview: '📿'
            }
        ],
        background: [
            {
                id: 'gradient1',
                name: 'Arcoíris',
                preview: '🌈'
            },
            {
                id: 'gradient2',
                name: 'Atardecer',
                preview: '🌅'
            },
            {
                id: 'space',
                name: 'Espacio',
                preview: '🌌'
            },
            {
                id: 'forest',
                name: 'Bosque',
                preview: '🌲'
            },
            {
                id: 'ocean',
                name: 'Océano',
                preview: '🌊'
            },
            {
                id: 'castle',
                name: 'Castillo',
                preview: '🏰'
            },
            {
                id: 'city',
                name: 'Ciudad',
                preview: '🏙️'
            },
            {
                id: 'clouds',
                name: 'Nubes',
                preview: '☁️'
            },
            {
                id: 'stars',
                name: 'Estrellas',
                preview: '⭐'
            }
        ]
    };
    const unlockCategory = (categoryId, cost)=>{
        if (userCoins >= cost && !unlockedCategories.includes(categoryId)) {
            setUnlockedCategories([
                ...unlockedCategories,
                categoryId
            ]);
            // Aquí podrías actualizar las monedas del usuario
            return true;
        }
        return false;
    };
    const handleOptionSelect = (optionId)=>{
        const currentCategoryData = categories.find((c)=>c.id === currentCategory);
        if (currentCategoryData?.isLocked) {
            setAnimatingOption(optionId);
            setTimeout(()=>setAnimatingOption(null), 600);
            return;
        }
        setAnimatingOption(optionId);
        setTimeout(()=>{
            setAvatar((prev)=>({
                    ...prev,
                    [currentCategory]: optionId
                }));
            setAnimatingOption(null);
        }, 200);
    };
    const handleSave = ()=>{
        setShowSaveAnimation(true);
        setTimeout(()=>{
            onSave(avatar);
            setShowSaveAnimation(false);
        }, 2000);
    };
    const FloatingParticle = ({ delay, emoji, className = "" })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `absolute text-2xl opacity-60 pointer-events-none ${className}`,
            style: {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floatParticle ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${delay}s`
            },
            children: emoji
        }, void 0, false, {
            fileName: "[project]/components/AvatarCustomizer.tsx",
            lineNumber: 250,
            columnNumber: 5
        }, this);
    const renderBackground = ()=>{
        const backgrounds = {
            gradient1: 'bg-gradient-to-br from-red-200 via-yellow-200 via-green-200 via-blue-200 to-purple-200',
            gradient2: 'bg-gradient-to-br from-orange-300 via-pink-300 to-purple-400',
            space: 'bg-gradient-to-br from-indigo-900 to-purple-900',
            forest: 'bg-gradient-to-br from-green-400 to-green-600',
            ocean: 'bg-gradient-to-br from-blue-400 to-blue-600',
            castle: 'bg-gradient-to-br from-gray-400 to-gray-600',
            city: 'bg-gradient-to-br from-gray-600 to-slate-800',
            clouds: 'bg-gradient-to-br from-sky-200 to-sky-400',
            stars: 'bg-gradient-to-br from-indigo-800 to-purple-800'
        };
        return backgrounds[avatar.background] || backgrounds.gradient1;
    };
    // Componente 2D del Avatar
    const Avatar2D = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: avatarRef,
            className: "relative w-48 h-60 mx-auto",
            style: {
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-28 rounded-full border-2 border-white/20",
                    style: {
                        backgroundColor: avatar.skinColor,
                        clipPath: 'ellipse(50% 55% at 50% 45%)'
                    },
                    children: [
                        avatar.hairType !== 'bald' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute -top-4 -left-4 -right-4 h-16 rounded-t-full",
                            style: {
                                backgroundColor: avatar.hairColor,
                                clipPath: avatar.hairType === 'curly' ? 'polygon(20% 80%, 80% 80%, 90% 40%, 70% 10%, 30% 10%, 10% 40%)' : avatar.hairType === 'long' ? 'polygon(0% 70%, 100% 70%, 90% 0%, 10% 0%)' : avatar.hairType === 'mohawk' ? 'polygon(40% 100%, 60% 100%, 55% 0%, 45% 0%)' : 'ellipse(80% 60% at 50% 40%)'
                            },
                            children: [
                                avatar.hairType === 'braids' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute -bottom-8 left-1 w-2 h-12 rounded-full",
                                            style: {
                                                backgroundColor: avatar.hairColor
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                            lineNumber: 309,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute -bottom-8 right-1 w-2 h-12 rounded-full",
                                            style: {
                                                backgroundColor: avatar.hairColor
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                            lineNumber: 310,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true),
                                avatar.hairType === 'ponytail' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -bottom-6 right-0 w-3 h-10 rounded-full",
                                    style: {
                                        backgroundColor: avatar.hairColor
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                    lineNumber: 314,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 296,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-4 left-3 w-4 h-1 rounded-full",
                            style: {
                                backgroundColor: avatar.hairColor,
                                opacity: 0.8
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 320,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-4 right-3 w-4 h-1 rounded-full",
                            style: {
                                backgroundColor: avatar.hairColor,
                                opacity: 0.8
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 321,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-6 left-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-3 h-2 rounded-full bg-white border border-gray-300",
                                style: {
                                    transform: avatar.eyes === 'big' ? 'scale(1.3)' : avatar.eyes === 'small' ? 'scale(0.8)' : avatar.eyes === 'almond' ? 'scaleY(0.7)' : 'scale(1)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-1.5 h-1.5 rounded-full absolute top-0.5 left-0.5",
                                    style: {
                                        backgroundColor: avatar.eyeColor
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                    lineNumber: 333,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                lineNumber: 325,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 324,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-6 right-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-3 h-2 rounded-full bg-white border border-gray-300",
                                style: {
                                    transform: avatar.eyes === 'big' ? 'scale(1.3)' : avatar.eyes === 'small' ? 'scale(0.8)' : avatar.eyes === 'almond' ? 'scaleY(0.7)' : 'scale(1)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-1.5 h-1.5 rounded-full absolute top-0.5 right-0.5",
                                    style: {
                                        backgroundColor: avatar.eyeColor
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                    lineNumber: 348,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                lineNumber: 340,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 339,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-10 left-1/2 transform -translate-x-1/2 w-1 h-2 rounded-full",
                            style: {
                                backgroundColor: avatar.skinColor,
                                filter: 'brightness(0.9)',
                                transform: `translateX(-50%) ${avatar.nose === 'big' ? 'scale(1.3)' : avatar.nose === 'small' ? 'scale(0.8)' : 'scale(1)'}`
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 356,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-14 left-1/2 transform -translate-x-1/2",
                            style: {
                                width: avatar.mouth === 'big_smile' ? '12px' : avatar.mouth === 'small' ? '6px' : '8px',
                                height: '4px',
                                backgroundColor: '#ff6b9d',
                                borderRadius: avatar.mouth === 'smile' || avatar.mouth === 'big_smile' ? '0 0 20px 20px' : '4px',
                                border: avatar.mouth === 'lips' ? '1px solid #ff1744' : 'none'
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 367,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-8 -left-2 w-3 h-4 rounded-full border border-white/20",
                            style: {
                                backgroundColor: avatar.skinColor
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 380,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-8 -right-2 w-3 h-4 rounded-full border border-white/20",
                            style: {
                                backgroundColor: avatar.skinColor
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 384,
                            columnNumber: 9
                        }, this),
                        avatar.facialHair !== 'none' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-16 left-1/2 transform -translate-x-1/2",
                            style: {
                                width: avatar.facialHair === 'mustache' ? '8px' : '12px',
                                height: avatar.facialHair === 'mustache' ? '2px' : '6px',
                                backgroundColor: avatar.hairColor,
                                borderRadius: '4px',
                                opacity: 0.8
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 391,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AvatarCustomizer.tsx",
                    lineNumber: 287,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-32 left-1/2 transform -translate-x-1/2 w-20 h-24",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full h-16 rounded-t-lg",
                            style: {
                                backgroundColor: avatar.clothing === 'formal' ? '#1a365d' : avatar.clothing === 'sports' ? '#e53e3e' : avatar.clothing === 'hoodie' ? '#4a5568' : avatar.clothing === 'dress' ? '#d53f8c' : '#4299e1'
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 407,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-2 -left-3 w-4 h-12 rounded-full",
                            style: {
                                backgroundColor: avatar.skinColor
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 419,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-2 -right-3 w-4 h-12 rounded-full",
                            style: {
                                backgroundColor: avatar.skinColor
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 423,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AvatarCustomizer.tsx",
                    lineNumber: 405,
                    columnNumber: 7
                }, this),
                avatar.accessories !== 'none' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-4 left-1/2 transform -translate-x-1/2",
                    children: [
                        avatar.accessories === 'glasses' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-4 border-2 border-gray-800 rounded bg-transparent"
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 433,
                            columnNumber: 13
                        }, this),
                        avatar.accessories === 'hat' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-16 h-8 bg-gray-800 rounded-t-full -mt-6"
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 436,
                            columnNumber: 13
                        }, this),
                        avatar.accessories === 'crown' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-14 h-6 bg-yellow-400 rounded -mt-4 relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -top-2 left-2 w-2 h-2 bg-yellow-400 transform rotate-45"
                                }, void 0, false, {
                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                    lineNumber: 440,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -top-2 left-1/2 w-2 h-2 bg-yellow-400 transform -translate-x-1/2 rotate-45"
                                }, void 0, false, {
                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                    lineNumber: 441,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -top-2 right-2 w-2 h-2 bg-yellow-400 transform rotate-45"
                                }, void 0, false, {
                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                    lineNumber: 442,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 439,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AvatarCustomizer.tsx",
                    lineNumber: 431,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/AvatarCustomizer.tsx",
            lineNumber: 281,
            columnNumber: 5
        }, this);
    const AvatarPreview = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `relative ${renderBackground()} rounded-3xl p-8 shadow-2xl border-4 border-white/50 backdrop-blur-sm overflow-hidden`,
            children: [
                avatar.background === 'space' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0",
                    children: [
                        ...Array(30)
                    ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute w-1 h-1 bg-white rounded-full",
                            style: {
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 2}s`
                            }
                        }, i, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 456,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/AvatarCustomizer.tsx",
                    lineNumber: 454,
                    columnNumber: 9
                }, this),
                avatar.background === 'stars' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0",
                    children: [
                        ...Array(20)
                    ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute text-yellow-300 opacity-70",
                            style: {
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 2}s`
                            },
                            children: "⭐"
                        }, i, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 473,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/AvatarCustomizer.tsx",
                    lineNumber: 471,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10 flex flex-col items-center justify-center h-64",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Avatar2D, {}, void 0, false, {
                        fileName: "[project]/components/AvatarCustomizer.tsx",
                        lineNumber: 491,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/AvatarCustomizer.tsx",
                    lineNumber: 490,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse rounded-3xl"
                }, void 0, false, {
                    fileName: "[project]/components/AvatarCustomizer.tsx",
                    lineNumber: 495,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: particlesRef,
                    className: "absolute inset-0 pointer-events-none",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatingParticle, {
                            delay: 0,
                            emoji: "✨"
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 499,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatingParticle, {
                            delay: 1,
                            emoji: "🌟"
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 500,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatingParticle, {
                            delay: 2,
                            emoji: "💫"
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 501,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatingParticle, {
                            delay: 3,
                            emoji: "🎭"
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 502,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AvatarCustomizer.tsx",
                    lineNumber: 498,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/AvatarCustomizer.tsx",
            lineNumber: 451,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-8a2f22e64d07be26" + " " + "min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-8a2f22e64d07be26" + " " + "absolute inset-0 overflow-hidden pointer-events-none",
                children: [
                    ...Array(50)
                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `floatBackground ${10 + Math.random() * 10}s linear infinite`,
                            animationDelay: `${Math.random() * 10}s`
                        },
                        className: "jsx-8a2f22e64d07be26" + " " + "absolute w-2 h-2 bg-white/20 rounded-full"
                    }, i, false, {
                        fileName: "[project]/components/AvatarCustomizer.tsx",
                        lineNumber: 511,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/AvatarCustomizer.tsx",
                lineNumber: 509,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-8a2f22e64d07be26" + " " + "relative z-10 max-w-7xl mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-8a2f22e64d07be26" + " " + "flex items-center justify-between mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onBack,
                                className: "jsx-8a2f22e64d07be26" + " " + "flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-105",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                        lineNumber: 531,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-8a2f22e64d07be26",
                                        children: "Volver"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                        lineNumber: 532,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                lineNumber: 527,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-8a2f22e64d07be26" + " " + "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-8a2f22e64d07be26" + " " + "flex items-center gap-2 px-4 py-2 bg-yellow-500/20 backdrop-blur-sm rounded-full text-yellow-300 border border-yellow-500/30",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__["Coins"], {
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                                lineNumber: 537,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-8a2f22e64d07be26" + " " + "font-bold",
                                                children: userCoins
                                            }, void 0, false, {
                                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                                lineNumber: 538,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                        lineNumber: 536,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSave,
                                        disabled: showSaveAnimation,
                                        className: "jsx-8a2f22e64d07be26" + " " + "flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg",
                                        children: showSaveAnimation ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-8a2f22e64d07be26" + " " + "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                    lineNumber: 548,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-8a2f22e64d07be26",
                                                    children: "Guardando..."
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                    lineNumber: 549,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                    size: 20
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                    lineNumber: 553,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-8a2f22e64d07be26",
                                                    children: "Guardar Avatar"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                    lineNumber: 554,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                        lineNumber: 541,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                lineNumber: 535,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AvatarCustomizer.tsx",
                        lineNumber: 526,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-8a2f22e64d07be26" + " " + "grid grid-cols-1 lg:grid-cols-3 gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-8a2f22e64d07be26" + " " + "lg:col-span-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-8a2f22e64d07be26" + " " + "bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-8a2f22e64d07be26" + " " + "text-2xl font-bold text-white mb-6 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                    className: "inline-block mr-2",
                                                    size: 24
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                    lineNumber: 566,
                                                    columnNumber: 17
                                                }, this),
                                                "Personalización"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                            lineNumber: 565,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-8a2f22e64d07be26" + " " + "space-y-3 max-h-96 overflow-y-auto custom-scrollbar",
                                            children: categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        if (category.isLocked) {
                                                            if (unlockCategory(category.id, category.cost)) {
                                                                setCurrentCategory(category.id);
                                                            }
                                                        } else {
                                                            setCurrentCategory(category.id);
                                                        }
                                                    },
                                                    className: "jsx-8a2f22e64d07be26" + " " + `w-full p-4 rounded-xl transition-all duration-300 border-2 relative overflow-hidden group ${currentCategory === category.id ? 'bg-gradient-to-r from-pink-500 to-purple-500 border-white text-white scale-105 shadow-lg' : category.isLocked ? 'bg-gray-500/20 border-gray-500/30 text-gray-400 hover:bg-gray-500/30' : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-8a2f22e64d07be26" + " " + "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-8a2f22e64d07be26" + " " + "flex items-center gap-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "jsx-8a2f22e64d07be26" + " " + "text-2xl",
                                                                            children: category.icon
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                            lineNumber: 593,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "jsx-8a2f22e64d07be26" + " " + "font-medium",
                                                                            children: category.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                            lineNumber: 594,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                    lineNumber: 592,
                                                                    columnNumber: 23
                                                                }, this),
                                                                category.isLocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-8a2f22e64d07be26" + " " + "flex items-center gap-2 text-sm",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                                            size: 16
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                            lineNumber: 599,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "jsx-8a2f22e64d07be26",
                                                                            children: category.cost
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                            lineNumber: 600,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__["Coins"], {
                                                                            size: 16
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                            lineNumber: 601,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                    lineNumber: 598,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                                            lineNumber: 591,
                                                            columnNumber: 21
                                                        }, this),
                                                        !category.isLocked && currentCategory === category.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-8a2f22e64d07be26" + " " + "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                                            lineNumber: 607,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, category.id, true, {
                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                    lineNumber: 572,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                            lineNumber: 570,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                    lineNumber: 564,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                lineNumber: 563,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-8a2f22e64d07be26" + " " + "lg:col-span-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-8a2f22e64d07be26" + " " + "sticky top-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AvatarPreview, {
                                            className: "jsx-8a2f22e64d07be26"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                            lineNumber: 618,
                                            columnNumber: 15
                                        }, this),
                                        showSaveAnimation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-8a2f22e64d07be26" + " " + "absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-3xl animate-pulse",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-8a2f22e64d07be26" + " " + "absolute inset-0 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-8a2f22e64d07be26" + " " + "bg-white/90 rounded-full p-4 animate-bounce",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                        className: "text-red-500",
                                                        size: 32
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                                        lineNumber: 625,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                    lineNumber: 624,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                                lineNumber: 623,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                            lineNumber: 622,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                    lineNumber: 617,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                lineNumber: 616,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-8a2f22e64d07be26" + " " + "lg:col-span-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-8a2f22e64d07be26" + " " + "bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "jsx-8a2f22e64d07be26" + " " + "text-xl font-bold text-white mb-6 capitalize",
                                            children: categories.find((c)=>c.id === currentCategory)?.name || 'Opciones'
                                        }, void 0, false, {
                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                            lineNumber: 636,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-8a2f22e64d07be26" + " " + "grid grid-cols-2 gap-3 max-h-96 overflow-y-auto custom-scrollbar",
                                            children: options[currentCategory]?.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleOptionSelect(option.id),
                                                    className: "jsx-8a2f22e64d07be26" + " " + `p-4 rounded-xl transition-all duration-300 border-2 relative group ${avatar[currentCategory] === option.id ? 'bg-gradient-to-r from-blue-500 to-cyan-500 border-white text-white scale-105 shadow-lg' : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105'} ${animatingOption === option.id ? 'animate-pulse' : ''}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-8a2f22e64d07be26" + " " + "flex flex-col items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "jsx-8a2f22e64d07be26" + " " + "text-2xl",
                                                                    children: option.color ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            backgroundColor: option.color
                                                                        },
                                                                        className: "jsx-8a2f22e64d07be26" + " " + "w-8 h-8 rounded-full border-2 border-white/50 shadow-lg"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                        lineNumber: 656,
                                                                        columnNumber: 27
                                                                    }, this) : option.preview
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                    lineNumber: 654,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "jsx-8a2f22e64d07be26" + " " + "text-sm font-medium text-center",
                                                                    children: option.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                    lineNumber: 664,
                                                                    columnNumber: 23
                                                                }, this),
                                                                option.cost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-8a2f22e64d07be26" + " " + "flex items-center gap-1 text-xs text-yellow-300",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__["Coins"], {
                                                                            size: 12
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                            lineNumber: 667,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "jsx-8a2f22e64d07be26",
                                                                            children: option.cost
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                            lineNumber: 668,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                    lineNumber: 666,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                                            lineNumber: 653,
                                                            columnNumber: 21
                                                        }, this),
                                                        avatar[currentCategory] === option.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-8a2f22e64d07be26" + " " + "absolute top-2 right-2",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                className: "text-yellow-300 fill-current",
                                                                size: 16
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                lineNumber: 675,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                                            lineNumber: 674,
                                                            columnNumber: 23
                                                        }, this),
                                                        animatingOption === option.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-8a2f22e64d07be26" + " " + "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-xl"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                                            lineNumber: 680,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, option.id, true, {
                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                    lineNumber: 642,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                            lineNumber: 640,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                    lineNumber: 635,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                lineNumber: 634,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AvatarCustomizer.tsx",
                        lineNumber: 561,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AvatarCustomizer.tsx",
                lineNumber: 524,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "8a2f22e64d07be26",
                children: "@keyframes avatarFloat{0%,to{transform:translateY(0)rotate(0)}50%{transform:translateY(-10px)rotate(1deg)}}@keyframes floatParticle{0%,to{opacity:.6;transform:translateY(0)rotate(0)}50%{opacity:1;transform:translateY(-20px)rotate(180deg)}}@keyframes floatBackground{0%{opacity:0;transform:translateY(100vh)rotate(0)}10%{opacity:1}90%{opacity:1}to{opacity:0;transform:translateY(-100px)rotate(360deg)}}@keyframes shimmer{0%{transform:translate(-100%)}to{transform:translate(100%)}}@keyframes twinkle{0%,to{opacity:.3;transform:scale(1)}50%{opacity:1;transform:scale(1.2)}}.animate-shimmer.jsx-8a2f22e64d07be26{animation:2s ease-in-out infinite shimmer}.custom-scrollbar.jsx-8a2f22e64d07be26{scrollbar-width:thin;scrollbar-color:#ffffff4d transparent}.custom-scrollbar.jsx-8a2f22e64d07be26::-webkit-scrollbar{width:6px}.custom-scrollbar.jsx-8a2f22e64d07be26::-webkit-scrollbar-track{background:#ffffff1a;border-radius:3px}.custom-scrollbar.jsx-8a2f22e64d07be26::-webkit-scrollbar-thumb{background:#ffffff4d;border-radius:3px}.custom-scrollbar.jsx-8a2f22e64d07be26.jsx-8a2f22e64d07be26::-webkit-scrollbar-thumb:hover{background:#ffffff80}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AvatarCustomizer.tsx",
        lineNumber: 507,
        columnNumber: 5
    }, this);
};
_s(AvatarCustomizer, "KSe7KD9yv4VdOJfQOCyPtUgpm84=");
_c = AvatarCustomizer;
const __TURBOPACK__default__export__ = AvatarCustomizer;
var _c;
__turbopack_context__.k.register(_c, "AvatarCustomizer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/pages/SettingsPage.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/palette.js [app-client] (ecmascript) <export default as Palette>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-client] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AvatarCustomizer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AvatarCustomizer.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const Settings = ()=>{
    _s();
    const [currentView, setCurrentView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('main');
    const [userAvatar, setUserAvatar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        gender: 'boy',
        skinColor: '#FDBCB4',
        eyes: 'happy',
        nose: 'small',
        mouth: 'smile',
        ears: 'normal',
        hairType: 'short',
        hairColor: '#8B4513',
        clothing: 'casual',
        accessories: 'none',
        background: 'rainbow'
    });
    // Simular monedas del usuario (esto vendría de tu estado global o API)
    const [userCoins] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(25);
    const handleBack = ()=>{
        if (currentView === 'avatar') {
            setCurrentView('main');
        } else {
            // Volver al dashboard
            window.history.back();
        }
    };
    const handleAvatarSave = (avatar)=>{
        setUserAvatar(avatar);
        setCurrentView('main');
        // Aquí podrías guardar en localStorage o enviar a una API
        localStorage.setItem('userAvatar', JSON.stringify(avatar));
    };
    const FloatingParticle = ({ delay, emoji })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute text-2xl opacity-60 animate-bounce pointer-events-none",
            style: {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${2 + Math.random() * 2}s`
            },
            children: emoji
        }, void 0, false, {
            fileName: "[project]/components/pages/SettingsPage.tsx",
            lineNumber: 55,
            columnNumber: 5
        }, this);
    if (currentView === 'avatar') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AvatarCustomizer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            onBack: handleBack,
            onSave: handleAvatarSave,
            userCoins: userCoins
        }, void 0, false, {
            fileName: "[project]/components/pages/SettingsPage.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-2ad3e86ea0d7ba68" + " " + "min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-2ad3e86ea0d7ba68" + " " + "fixed inset-0 pointer-events-none",
                children: [
                    ...Array(25)
                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatingParticle, {
                        delay: i * 0.3,
                        emoji: [
                            '⚙️',
                            '🎨',
                            '🔧',
                            '✨',
                            '🌟',
                            '💫'
                        ][i % 6]
                    }, i, false, {
                        fileName: "[project]/components/pages/SettingsPage.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/pages/SettingsPage.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "jsx-2ad3e86ea0d7ba68" + " " + "relative z-10 flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleBack,
                        className: "jsx-2ad3e86ea0d7ba68" + " " + "flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-2ad3e86ea0d7ba68" + " " + "font-bold",
                                children: "Volver"
                            }, void 0, false, {
                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/pages/SettingsPage.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "jsx-2ad3e86ea0d7ba68" + " " + "text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                className: "w-8 h-8 text-blue-600 animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            "Configuración"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/pages/SettingsPage.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-2ad3e86ea0d7ba68" + " " + "w-24"
                    }, void 0, false, {
                        fileName: "[project]/components/pages/SettingsPage.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    " "
                ]
            }, void 0, true, {
                fileName: "[project]/components/pages/SettingsPage.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "jsx-2ad3e86ea0d7ba68" + " " + "relative z-10 container mx-auto px-6 py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-2ad3e86ea0d7ba68" + " " + "text-center mb-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "jsx-2ad3e86ea0d7ba68" + " " + "text-4xl font-bold mb-4 text-gray-800 animate-fade-in",
                                children: "¡Personaliza tu experiencia!"
                            }, void 0, false, {
                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-2ad3e86ea0d7ba68" + " " + "text-xl text-gray-600 animate-fade-in-delay",
                                children: "Haz que MentaMática sea perfecta para ti"
                            }, void 0, false, {
                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/pages/SettingsPage.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-2ad3e86ea0d7ba68" + " " + "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setCurrentView('avatar'),
                                className: "jsx-2ad3e86ea0d7ba68" + " " + "group cursor-pointer bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 relative overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-2ad3e86ea0d7ba68" + " " + "absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-2ad3e86ea0d7ba68" + " " + "relative z-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-2ad3e86ea0d7ba68" + " " + "w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"], {
                                                    className: "w-8 h-8 text-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 128,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "jsx-2ad3e86ea0d7ba68" + " " + "text-2xl font-bold text-gray-800 mb-4",
                                                children: "Mi Avatar"
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 132,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-2ad3e86ea0d7ba68" + " " + "text-gray-600 mb-6",
                                                children: "Crea y personaliza tu avatar único. ¡Hazlo tan especial como tú!"
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 133,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-2ad3e86ea0d7ba68" + " " + "bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-2ad3e86ea0d7ba68" + " " + "text-5xl animate-bounce-gentle",
                                                    children: userAvatar.gender === 'boy' ? '👦' : '👧'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 138,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-2ad3e86ea0d7ba68" + " " + "mt-4 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-2ad3e86ea0d7ba68" + " " + "bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold",
                                                    children: "¡Personalízame!"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 144,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-2ad3e86ea0d7ba68" + " " + "absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-2ad3e86ea0d7ba68" + " " + "group cursor-pointer bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 relative overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-2ad3e86ea0d7ba68" + " " + "absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-2ad3e86ea0d7ba68" + " " + "relative z-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-2ad3e86ea0d7ba68" + " " + "w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                                    className: "w-8 h-8 text-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 161,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 160,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "jsx-2ad3e86ea0d7ba68" + " " + "text-2xl font-bold text-gray-800 mb-4",
                                                children: "Sonidos"
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 164,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-2ad3e86ea0d7ba68" + " " + "text-gray-600 mb-6",
                                                children: "Ajusta los efectos de sonido y la música de fondo para una mejor experiencia."
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 165,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-2ad3e86ea0d7ba68" + " " + "space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-2ad3e86ea0d7ba68" + " " + "flex items-center justify-between bg-blue-50 rounded-xl p-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-2ad3e86ea0d7ba68" + " " + "text-sm font-semibold text-blue-800",
                                                                children: "Efectos de Sonido"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                lineNumber: 171,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-2ad3e86ea0d7ba68" + " " + "w-14 h-7 bg-blue-400 rounded-full relative cursor-pointer",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-2ad3e86ea0d7ba68" + " " + "w-6 h-6 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm transition-transform duration-200"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                    lineNumber: 173,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                lineNumber: 172,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                                        lineNumber: 170,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-2ad3e86ea0d7ba68" + " " + "flex items-center justify-between bg-blue-50 rounded-xl p-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-2ad3e86ea0d7ba68" + " " + "text-sm font-semibold text-blue-800",
                                                                children: "Música de Fondo"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                lineNumber: 177,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-2ad3e86ea0d7ba68" + " " + "w-14 h-7 bg-gray-300 rounded-full relative cursor-pointer",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-2ad3e86ea0d7ba68" + " " + "w-6 h-6 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm transition-transform duration-200"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                    lineNumber: 179,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                lineNumber: 178,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                                        lineNumber: 176,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-2ad3e86ea0d7ba68" + " " + "flex items-center justify-between bg-blue-50 rounded-xl p-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-2ad3e86ea0d7ba68" + " " + "text-sm font-semibold text-blue-800",
                                                                children: "Volumen"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                lineNumber: 183,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-2ad3e86ea0d7ba68" + " " + "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-2ad3e86ea0d7ba68" + " " + "w-20 h-2 bg-blue-200 rounded-full",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "jsx-2ad3e86ea0d7ba68" + " " + "w-3/4 h-2 bg-blue-500 rounded-full"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                            lineNumber: 186,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                        lineNumber: 185,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-2ad3e86ea0d7ba68" + " " + "text-xs text-blue-600 font-medium",
                                                                        children: "75%"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                        lineNumber: 188,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                lineNumber: 184,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                                        lineNumber: 182,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 169,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-2ad3e86ea0d7ba68" + " " + "absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                        lineNumber: 194,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-2ad3e86ea0d7ba68" + " " + "group cursor-pointer bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 relative overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-2ad3e86ea0d7ba68" + " " + "absolute inset-0 bg-gradient-to-br from-orange-100 to-yellow-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-2ad3e86ea0d7ba68" + " " + "relative z-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-2ad3e86ea0d7ba68" + " " + "w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                    className: "w-8 h-8 text-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 203,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 202,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "jsx-2ad3e86ea0d7ba68" + " " + "text-2xl font-bold text-gray-800 mb-4",
                                                children: "Ayuda"
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 206,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-2ad3e86ea0d7ba68" + " " + "text-gray-600 mb-6",
                                                children: "Encuentra respuestas a tus preguntas y aprende cómo usar MentaMática."
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 207,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-2ad3e86ea0d7ba68" + " " + "space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-2ad3e86ea0d7ba68" + " " + "bg-orange-50 rounded-xl p-3 text-center hover:bg-orange-100 transition-colors cursor-pointer",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-2ad3e86ea0d7ba68" + " " + "text-sm font-semibold text-orange-800",
                                                            children: "📚 Cómo Jugar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pages/SettingsPage.tsx",
                                                            lineNumber: 213,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                                        lineNumber: 212,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-2ad3e86ea0d7ba68" + " " + "bg-yellow-50 rounded-xl p-3 text-center hover:bg-yellow-100 transition-colors cursor-pointer",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-2ad3e86ea0d7ba68" + " " + "text-sm font-semibold text-yellow-800",
                                                            children: "❓ Preguntas Frecuentes"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pages/SettingsPage.tsx",
                                                            lineNumber: 216,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                                        lineNumber: 215,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-2ad3e86ea0d7ba68" + " " + "bg-orange-50 rounded-xl p-3 text-center hover:bg-orange-100 transition-colors cursor-pointer",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-2ad3e86ea0d7ba68" + " " + "text-sm font-semibold text-orange-800",
                                                            children: "🎯 Consejos y Trucos"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pages/SettingsPage.tsx",
                                                            lineNumber: 219,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                                        lineNumber: 218,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-2ad3e86ea0d7ba68" + " " + "bg-yellow-50 rounded-xl p-3 text-center hover:bg-yellow-100 transition-colors cursor-pointer",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-2ad3e86ea0d7ba68" + " " + "text-sm font-semibold text-yellow-800",
                                                            children: "📞 Contactar Ayuda"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pages/SettingsPage.tsx",
                                                            lineNumber: 222,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                                        lineNumber: 221,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 211,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-2ad3e86ea0d7ba68" + " " + "absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                        lineNumber: 227,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/pages/SettingsPage.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-2ad3e86ea0d7ba68" + " " + "text-center mt-16",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-2ad3e86ea0d7ba68" + " " + "bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "jsx-2ad3e86ea0d7ba68" + " " + "text-2xl font-bold text-blue-800 mb-4 flex items-center justify-center gap-2",
                                    children: "🧠 Personalización y Aprendizaje"
                                }, void 0, false, {
                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                    lineNumber: 234,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-2ad3e86ea0d7ba68" + " " + "text-blue-700 mb-6",
                                    children: "La personalización no es solo diversión: ¡es ciencia! Cuando personalizas tu experiencia de aprendizaje, tu cerebro crea conexiones más fuertes y duraderas."
                                }, void 0, false, {
                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                    lineNumber: 237,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-2ad3e86ea0d7ba68" + " " + "grid grid-cols-1 md:grid-cols-3 gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-2ad3e86ea0d7ba68" + " " + "bg-white/60 rounded-xl p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-2ad3e86ea0d7ba68" + " " + "text-3xl mb-3",
                                                    children: "🎨"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "jsx-2ad3e86ea0d7ba68" + " " + "font-bold text-blue-800 mb-2",
                                                    children: "Creatividad"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-2ad3e86ea0d7ba68" + " " + "text-sm text-blue-700",
                                                    children: "Personalizar tu avatar estimula la corteza prefrontal, mejorando tu creatividad y resolución de problemas."
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/pages/SettingsPage.tsx",
                                            lineNumber: 242,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-2ad3e86ea0d7ba68" + " " + "bg-white/60 rounded-xl p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-2ad3e86ea0d7ba68" + " " + "text-3xl mb-3",
                                                    children: "💖"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "jsx-2ad3e86ea0d7ba68" + " " + "font-bold text-blue-800 mb-2",
                                                    children: "Motivación"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-2ad3e86ea0d7ba68" + " " + "text-sm text-blue-700",
                                                    children: "Tener un avatar único activa tu sistema de recompensa, haciendo que quieras aprender más."
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/pages/SettingsPage.tsx",
                                            lineNumber: 247,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-2ad3e86ea0d7ba68" + " " + "bg-white/60 rounded-xl p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-2ad3e86ea0d7ba68" + " " + "text-3xl mb-3",
                                                    children: "🧩"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "jsx-2ad3e86ea0d7ba68" + " " + "font-bold text-blue-800 mb-2",
                                                    children: "Memoria"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 254,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-2ad3e86ea0d7ba68" + " " + "text-sm text-blue-700",
                                                    children: "Las experiencias personalizadas fortalecen tu hipocampo, mejorando tu capacidad de recordar."
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 255,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/pages/SettingsPage.tsx",
                                            lineNumber: 252,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                    lineNumber: 241,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/pages/SettingsPage.tsx",
                            lineNumber: 233,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/pages/SettingsPage.tsx",
                        lineNumber: 232,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/pages/SettingsPage.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "2ad3e86ea0d7ba68",
                children: "@keyframes fade-in{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes fade-in-delay{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes bounce-gentle{0%,to{transform:translateY(0)}50%{transform:translateY(-5px)}}.animate-fade-in.jsx-2ad3e86ea0d7ba68{animation:1s ease-out fade-in}.animate-fade-in-delay.jsx-2ad3e86ea0d7ba68{animation:1s ease-out .3s both fade-in-delay}.animate-bounce-gentle.jsx-2ad3e86ea0d7ba68{animation:2s ease-in-out infinite bounce-gentle}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/pages/SettingsPage.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
};
_s(Settings, "Vmvh5KcSyO87/PsRX10pJuguXQg=");
_c = Settings;
const __TURBOPACK__default__export__ = Settings;
var _c;
__turbopack_context__.k.register(_c, "Settings");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/settings/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Settings)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$pages$2f$SettingsPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/pages/SettingsPage.tsx [app-client] (ecmascript)");
"use client";
;
;
function Settings() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$pages$2f$SettingsPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/app/settings/page.tsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
_c = Settings;
var _c;
__turbopack_context__.k.register(_c, "Settings");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_2336ad25._.js.map