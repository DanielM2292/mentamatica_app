(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/AvatarCustomizer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/palette.js [app-client] (ecmascript) <export default as Palette>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/smile.js [app-client] (ecmascript) <export default as Smile>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$glasses$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Glasses$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/glasses.js [app-client] (ecmascript) <export default as Glasses>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crown.js [app-client] (ecmascript) <export default as Crown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wand-2.js [app-client] (ecmascript) <export default as Wand2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rainbow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rainbow$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rainbow.js [app-client] (ecmascript) <export default as Rainbow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const ADVENTURER_OPTIONS = {
    backgroundColor: [
        'b6e3f4',
        'c0aede',
        'd1d4f9',
        'ffd5dc',
        'ffdfbf',
        'ff6b6b',
        '4ecdc4',
        '45b7d1',
        '96ceb4',
        'ffeaa7',
        'dda0dd',
        'f1f5f9',
        'e2e8f0',
        'cbd5e1',
        '94a3b8',
        '64748b',
        '475569',
        '334155',
        '1e293b',
        '0f172a',
        'transparent'
    ],
    earrings: [
        'none',
        'variant01',
        'variant02',
        'variant03',
        'variant04',
        'variant05',
        'variant06'
    ],
    earringsColor: [
        'ffe0bd',
        'ffdbac',
        'd08b5b',
        'ae5d29',
        '92594a',
        '6a4c93'
    ],
    eyebrows: [
        'variant01',
        'variant02',
        'variant03',
        'variant04',
        'variant05',
        'variant06',
        'variant07',
        'variant08',
        'variant09',
        'variant10',
        'variant11',
        'variant12',
        'variant13',
        'variant14',
        'variant15'
    ],
    eyes: [
        'variant01',
        'variant02',
        'variant03',
        'variant04',
        'variant05',
        'variant06',
        'variant07',
        'variant08',
        'variant09',
        'variant10',
        'variant11',
        'variant12',
        'variant13',
        'variant14',
        'variant15',
        'variant16',
        'variant17',
        'variant18',
        'variant19',
        'variant20',
        'variant21',
        'variant22',
        'variant23',
        'variant24',
        'variant25',
        'variant26'
    ],
    features: [
        'none',
        'birthmark',
        'blush',
        'freckles'
    ],
    featuresColor: [
        'ffe0bd',
        'ffdbac',
        'd08b5b',
        'ae5d29',
        '92594a',
        '6a4c93'
    ],
    glasses: [
        'none',
        'variant01',
        'variant02',
        'variant03',
        'variant04',
        'variant05'
    ],
    glassesColor: [
        '262e33',
        '0f3460',
        '5d4037',
        '6a4c93',
        'a4161a',
        'ba181b'
    ],
    hair: [
        'none',
        'long01',
        'long02',
        'long03',
        'long04',
        'long05',
        'long06',
        'long07',
        'long08',
        'long09',
        'long10',
        'long11',
        'long12',
        'long13',
        'long14',
        'long15',
        'long16',
        'long17',
        'long18',
        'long19',
        'long20',
        'long21',
        'long22',
        'long23',
        'long24',
        'long25',
        'short01',
        'short02',
        'short03',
        'short04',
        'short05',
        'short06',
        'short07',
        'short08',
        'short09',
        'short10',
        'short11',
        'short12',
        'short13',
        'short14',
        'short15',
        'short16',
        'short17',
        'short18',
        'short19'
    ],
    hairColor: [
        '0e0e0e',
        '3eac2c',
        '6a4e35',
        '0a0310',
        '2c1b18',
        '5c2317',
        '6a4c93',
        '9a031e',
        'a4161a',
        'ba181b',
        'e5383b',
        'f48c06',
        'f77f00',
        'fcbf49',
        'f8d25c',
        'ffdd44',
        'a0522d',
        '654321',
        'daa520',
        'ff4500',
        '2f4f4f',
        '800080'
    ],
    mouth: [
        'variant01',
        'variant02',
        'variant03',
        'variant04',
        'variant05',
        'variant06',
        'variant07',
        'variant08',
        'variant09',
        'variant10',
        'variant11',
        'variant12',
        'variant13',
        'variant14',
        'variant15',
        'variant16',
        'variant17',
        'variant18',
        'variant19',
        'variant20',
        'variant21',
        'variant22',
        'variant23',
        'variant24',
        'variant25',
        'variant26',
        'variant27',
        'variant28',
        'variant29',
        'variant30'
    ],
    skinColor: [
        '9e5622',
        '763900',
        'ecad80',
        'fdbcb4',
        'edb98a',
        'd08b5b',
        'ae5d29',
        '614335',
        'f8d25c',
        'ffcc88',
        'f4a460',
        'daa520',
        'cd853f',
        'f5deb3',
        'deb887',
        'a0522d',
        '8b4513',
        '654321'
    ]
};
const FRIENDLY_NAMES = {
    backgroundColor: {
        'transparent': '🚫',
        'b6e3f4': '💙',
        'c0aede': '💜',
        'd1d4f9': '🌸',
        'ffd5dc': '🌺',
        'ffdfbf': '🍑',
        'ff6b6b': '❤️',
        '4ecdc4': '🌊',
        '45b7d1': '🌀',
        '96ceb4': '🌿',
        'ffeaa7': '☀️'
    },
    earrings: {
        'none': '🚫'
    },
    features: {
        'none': '🚫',
        'birthmark': '🔸',
        'blush': '😊',
        'freckles': '⭐'
    },
    glasses: {
        'none': '🚫'
    },
    hair: {
        'none': '🚫'
    }
};
const CATEGORIES = [
    {
        id: 'skinColor',
        name: 'Piel',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
            className: "w-4 h-4 sm:w-5 sm:h-5"
        }, void 0, false, {
            fileName: "[project]/components/AvatarCustomizer.tsx",
            lineNumber: 105,
            columnNumber: 11
        }, this),
        color: 'from-orange-400 via-amber-400 to-yellow-400',
        emoji: '👤',
        bgColor: 'bg-gradient-to-br from-orange-100 to-amber-100'
    },
    {
        id: 'hair',
        name: 'Cabello',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
            className: "w-4 h-4 sm:w-5 sm:h-5"
        }, void 0, false, {
            fileName: "[project]/components/AvatarCustomizer.tsx",
            lineNumber: 113,
            columnNumber: 11
        }, this),
        color: 'from-amber-400 via-yellow-400 to-lime-400',
        emoji: '👑',
        bgColor: 'bg-gradient-to-br from-amber-100 to-yellow-100'
    },
    {
        id: 'hairColor',
        name: 'Color',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"], {
            className: "w-4 h-4 sm:w-5 sm:h-5"
        }, void 0, false, {
            fileName: "[project]/components/AvatarCustomizer.tsx",
            lineNumber: 121,
            columnNumber: 11
        }, this),
        color: 'from-rose-400 via-pink-400 to-purple-400',
        emoji: '🎨',
        bgColor: 'bg-gradient-to-br from-rose-100 to-pink-100'
    },
    {
        id: 'eyes',
        name: 'Ojos',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
            className: "w-4 h-4 sm:w-5 sm:h-5"
        }, void 0, false, {
            fileName: "[project]/components/AvatarCustomizer.tsx",
            lineNumber: 129,
            columnNumber: 11
        }, this),
        color: 'from-blue-400 via-cyan-400 to-teal-400',
        emoji: '👁️',
        bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100'
    },
    {
        id: 'eyebrows',
        name: 'Cejas',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
            className: "w-4 h-4 sm:w-5 sm:h-5"
        }, void 0, false, {
            fileName: "[project]/components/AvatarCustomizer.tsx",
            lineNumber: 137,
            columnNumber: 11
        }, this),
        color: 'from-green-400 via-emerald-400 to-teal-400',
        emoji: '🤨',
        bgColor: 'bg-gradient-to-br from-green-100 to-emerald-100'
    },
    {
        id: 'mouth',
        name: 'Boca',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__["Smile"], {
            className: "w-4 h-4 sm:w-5 sm:h-5"
        }, void 0, false, {
            fileName: "[project]/components/AvatarCustomizer.tsx",
            lineNumber: 145,
            columnNumber: 11
        }, this),
        color: 'from-pink-400 via-rose-400 to-red-400',
        emoji: '😊',
        bgColor: 'bg-gradient-to-br from-pink-100 to-rose-100'
    },
    {
        id: 'glasses',
        name: 'Gafas',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$glasses$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Glasses$3e$__["Glasses"], {
            className: "w-4 h-4 sm:w-5 sm:h-5"
        }, void 0, false, {
            fileName: "[project]/components/AvatarCustomizer.tsx",
            lineNumber: 153,
            columnNumber: 11
        }, this),
        color: 'from-indigo-400 via-purple-400 to-pink-400',
        emoji: '🤓',
        bgColor: 'bg-gradient-to-br from-indigo-100 to-purple-100'
    },
    {
        id: 'earrings',
        name: 'Pendientes',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
            className: "w-4 h-4 sm:w-5 sm:h-5"
        }, void 0, false, {
            fileName: "[project]/components/AvatarCustomizer.tsx",
            lineNumber: 161,
            columnNumber: 11
        }, this),
        color: 'from-yellow-400 via-orange-400 to-red-400',
        emoji: '✨',
        bgColor: 'bg-gradient-to-br from-yellow-100 to-orange-100'
    },
    {
        id: 'features',
        name: 'Extras',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
            className: "w-4 h-4 sm:w-5 sm:h-5"
        }, void 0, false, {
            fileName: "[project]/components/AvatarCustomizer.tsx",
            lineNumber: 169,
            columnNumber: 11
        }, this),
        color: 'from-red-400 via-pink-400 to-purple-400',
        emoji: '⚡',
        bgColor: 'bg-gradient-to-br from-red-100 to-pink-100'
    },
    {
        id: 'backgroundColor',
        name: 'Fondo',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rainbow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rainbow$3e$__["Rainbow"], {
            className: "w-4 h-4 sm:w-5 sm:h-5"
        }, void 0, false, {
            fileName: "[project]/components/AvatarCustomizer.tsx",
            lineNumber: 177,
            columnNumber: 11
        }, this),
        color: 'from-purple-400 via-pink-400 to-red-400',
        emoji: '🌈',
        bgColor: 'bg-gradient-to-br from-purple-100 to-pink-100'
    }
];
const AvatarCustomizer = ({ onBack = ()=>console.log('Back'), onSave = (avatar)=>console.log('Save', avatar) })=>{
    _s();
    const [avatarOptions, setAvatarOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('skinColor');
    const [showSaveAnimation, setShowSaveAnimation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [seed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('mi-avatar-magico');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showConfetti, setShowConfetti] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSparkles, setShowSparkles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AvatarCustomizer.useEffect": ()=>{
            const defaultOptions = {
                backgroundColor: 'b6e3f4',
                skinColor: '9e5622',
                hair: 'short01',
                hairColor: '0e0e0e',
                eyes: 'variant01',
                eyebrows: 'variant01',
                mouth: 'variant02',
                glasses: 'none',
                earrings: 'none',
                features: 'none'
            };
            setAvatarOptions(defaultOptions);
        }
    }["AvatarCustomizer.useEffect"], []);
    const avatarUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AvatarCustomizer.useMemo[avatarUrl]": ()=>{
            const params = new URLSearchParams();
            params.append('seed', seed);
            params.append('size', '600');
            Object.entries(avatarOptions).forEach({
                "AvatarCustomizer.useMemo[avatarUrl]": ([key, value])=>{
                    if ([
                        'features',
                        'glasses',
                        'earrings',
                        'hair'
                    ].includes(key)) {
                        if (value === 'none') {
                            params.append(`${key}Probability`, '0');
                        } else {
                            params.append(key, value);
                            params.append(`${key}Probability`, '100');
                        }
                    } else if (value && value !== 'none') {
                        params.append(key, value);
                    }
                }
            }["AvatarCustomizer.useMemo[avatarUrl]"]);
            return `https://api.dicebear.com/9.x/adventurer/svg?${params.toString()}`;
        }
    }["AvatarCustomizer.useMemo[avatarUrl]"], [
        avatarOptions,
        seed
    ]);
    const handleOptionChange = (category, value)=>{
        setIsLoading(true);
        setAvatarOptions((prev)=>({
                ...prev,
                [category]: value
            }));
        // Efectos visuales divertidos
        setShowConfetti(true);
        setShowSparkles(true);
        setTimeout(()=>setShowConfetti(false), 800);
        setTimeout(()=>setShowSparkles(false), 1000);
        setTimeout(()=>setIsLoading(false), 300);
    };
    const handleSave = ()=>{
        setShowSaveAnimation(true);
        setTimeout(()=>{
            const avatarData = {
                style: 'adventurer',
                options: avatarOptions,
                seed: seed,
                url: avatarUrl
            };
            onSave(avatarData);
            setShowSaveAnimation(false);
        }, 2000);
    };
    const downloadAvatar = async ()=>{
        try {
            const response = await fetch(avatarUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `mi-avatar-${seed}.svg`;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading avatar:', error);
        }
    };
    const currentCategory = CATEGORIES.find((cat)=>cat.id === activeCategory);
    const currentOptions = ADVENTURER_OPTIONS[activeCategory] || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 via-blue-200 to-cyan-200 relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 overflow-hidden pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-4 left-4 sm:top-10 sm:left-10 w-8 h-8 sm:w-16 sm:h-16 bg-yellow-300 rounded-full opacity-30 animate-bounce",
                        style: {
                            animationDuration: '3s'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/AvatarCustomizer.tsx",
                        lineNumber: 290,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-16 right-8 sm:top-32 sm:right-16 w-6 h-6 sm:w-12 sm:h-12 bg-pink-300 rounded-full opacity-40 animate-pulse",
                        style: {
                            animationDelay: '1s',
                            animationDuration: '2s'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/AvatarCustomizer.tsx",
                        lineNumber: 291,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-10 left-16 sm:bottom-20 sm:left-32 w-10 h-10 sm:w-20 sm:h-20 bg-blue-300 rounded-full opacity-25 animate-bounce",
                        style: {
                            animationDelay: '2s',
                            animationDuration: '4s'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/AvatarCustomizer.tsx",
                        lineNumber: 292,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-20 right-4 sm:bottom-40 sm:right-8 w-4 h-4 sm:w-8 sm:h-8 bg-green-300 rounded-full opacity-35 animate-pulse",
                        style: {
                            animationDelay: '0.5s',
                            animationDuration: '3s'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/AvatarCustomizer.tsx",
                        lineNumber: 293,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AvatarCustomizer.tsx",
                lineNumber: 289,
                columnNumber: 7
            }, this),
            showConfetti && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 pointer-events-none z-50",
                children: [
                    ...Array(15)
                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute animate-bounce",
                        style: {
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 0.5}s`,
                            animationDuration: '1s'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-3 h-3 sm:w-4 sm:h-4 rounded-full ${[
                                'bg-yellow-400',
                                'bg-pink-400',
                                'bg-blue-400',
                                'bg-green-400',
                                'bg-purple-400',
                                'bg-red-400',
                                'bg-orange-400'
                            ][Math.floor(Math.random() * 7)]} opacity-80 shadow-lg`
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 310,
                            columnNumber: 15
                        }, this)
                    }, i, false, {
                        fileName: "[project]/components/AvatarCustomizer.tsx",
                        lineNumber: 300,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/AvatarCustomizer.tsx",
                lineNumber: 298,
                columnNumber: 9
            }, this),
            showSparkles && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 pointer-events-none z-40",
                children: [
                    ...Array(10)
                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute animate-ping",
                        style: {
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 0.3}s`,
                            animationDuration: '0.8s'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                            className: `w-4 h-4 sm:w-6 sm:h-6 ${[
                                'text-yellow-400',
                                'text-pink-400',
                                'text-blue-400',
                                'text-green-400',
                                'text-purple-400'
                            ][Math.floor(Math.random() * 5)]} opacity-70`
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 332,
                            columnNumber: 15
                        }, this)
                    }, i, false, {
                        fileName: "[project]/components/AvatarCustomizer.tsx",
                        lineNumber: 322,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/AvatarCustomizer.tsx",
                lineNumber: 320,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-40 bg-gradient-to-r from-pink-400 via-purple-400 via-blue-400 to-cyan-400 shadow-2xl border-b-2 sm:border-b-4 border-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-3 sm:px-6 py-3 sm:py-5",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-2 sm:gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                lineNumber: 345,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 sm:gap-4 flex-1 justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 rounded-full flex items-center justify-center animate-spin shadow-xl",
                                        style: {
                                            animation: 'spin 8s linear infinite'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__["Wand2"], {
                                            className: "w-4 h-4 sm:w-8 sm:h-8 text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                            lineNumber: 353,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                        lineNumber: 352,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-lg sm:text-3xl font-black text-white drop-shadow-lg animate-pulse leading-tight",
                                                style: {
                                                    animationDuration: '2s'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "hidden sm:inline",
                                                        children: "✨🎨 AVATAR MÁGICO 🎨✨"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                                        lineNumber: 357,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "sm:hidden",
                                                        children: "✨ AVATAR ✨"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                                        lineNumber: 358,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                                lineNumber: 356,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/90 font-bold text-xs sm:text-lg animate-bounce hidden sm:block",
                                                style: {
                                                    animationDuration: '3s'
                                                },
                                                children: "¡Crea tu personaje favorito!"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                                lineNumber: 360,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                        lineNumber: 355,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                lineNumber: 351,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSave,
                                disabled: showSaveAnimation,
                                className: "flex items-center gap-1 sm:gap-3 bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-sm sm:text-lg font-bold disabled:opacity-50 animate-pulse",
                                style: {
                                    animationDuration: '2.5s'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                        className: "w-4 h-4 sm:w-6 sm:h-6"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                        lineNumber: 373,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden xs:inline",
                                        children: "💾 Guardar"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                        lineNumber: 374,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "xs:hidden",
                                        children: "💾"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                        lineNumber: 375,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                lineNumber: 367,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AvatarCustomizer.tsx",
                        lineNumber: 343,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/AvatarCustomizer.tsx",
                    lineNumber: 342,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/AvatarCustomizer.tsx",
                lineNumber: 341,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "container mx-auto px-3 sm:px-6 py-4 sm:py-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col lg:grid lg:grid-cols-5 gap-4 sm:gap-10 max-w-7xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-2 order-1 lg:order-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gradient-to-br from-white via-yellow-50 to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-2xl lg:sticky lg:top-28 border-2 sm:border-4 border-gradient-to-r from-pink-400 to-purple-400 relative overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-3 right-3 sm:top-6 sm:right-6 animate-spin",
                                        style: {
                                            animation: 'spin 10s linear infinite'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                            className: "w-4 h-4 sm:w-8 sm:h-8 text-yellow-400 opacity-80 drop-shadow-lg"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                            lineNumber: 390,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                        lineNumber: 389,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-3 left-3 sm:bottom-6 sm:left-6 animate-bounce",
                                        style: {
                                            animationDuration: '2s'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                            className: "w-3 h-3 sm:w-6 sm:h-6 text-pink-400 opacity-80 drop-shadow-lg"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                            lineNumber: 393,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                        lineNumber: 392,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center mb-4 sm:mb-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-xl sm:text-3xl font-black text-purple-800 mb-2 sm:mb-3 flex items-center justify-center gap-2 sm:gap-4 animate-bounce",
                                                style: {
                                                    animationDuration: '2.5s'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                        className: "w-5 h-5 sm:w-8 sm:h-8 text-pink-600 animate-pulse",
                                                        style: {
                                                            animationDuration: '1.5s'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                                        lineNumber: 398,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "🎭 TU AVATAR 🎭"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                                        lineNumber: 399,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                                lineNumber: 397,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-purple-600 font-bold text-sm sm:text-xl animate-pulse",
                                                style: {
                                                    animationDuration: '3s'
                                                },
                                                children: "¡Mira qué genial se ve! 🌟"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                                lineNumber: 401,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                        lineNumber: 396,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-center mb-4 sm:mb-8",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute -inset-3 sm:-inset-6 bg-gradient-to-r from-pink-400 via-purple-400 via-blue-400 to-cyan-400 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500 blur-2xl sm:blur-3xl animate-pulse",
                                                    style: {
                                                        animationDuration: '3s'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                    lineNumber: 408,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative w-48 h-48 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 rounded-full flex items-center justify-center shadow-2xl overflow-hidden border-4 sm:border-8 border-white group-hover:scale-105 transition-transform duration-300",
                                                    children: [
                                                        isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-0 bg-white/90 flex items-center justify-center z-10",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col items-center gap-2 sm:gap-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-8 h-8 sm:w-16 sm:h-16 border-4 sm:border-8 border-purple-400 border-t-transparent rounded-full animate-spin"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                        lineNumber: 413,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-purple-600 font-black text-sm sm:text-xl animate-bounce",
                                                                        children: "🎨 Creando magia..."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                        lineNumber: 414,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                lineNumber: 412,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                                            lineNumber: 411,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: avatarUrl,
                                                            alt: "Tu avatar súper genial",
                                                            className: "w-full h-full object-cover transition-all duration-500 group-hover:scale-110",
                                                            onError: (e)=>{
                                                                e.currentTarget.src = `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}&backgroundColor=b6e3f4`;
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                                            lineNumber: 419,
                                                            columnNumber: 21
                                                        }, this),
                                                        showSaveAnimation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-0 flex items-center justify-center bg-gradient-to-r from-green-500/90 to-blue-500/90 rounded-full",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-white text-green-600 px-4 py-3 sm:px-8 sm:py-6 rounded-xl sm:rounded-2xl animate-bounce text-lg sm:text-2xl font-black shadow-2xl",
                                                                children: "🎉✨ ¡GUARDADO! ✨🎉"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                lineNumber: 430,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                                            lineNumber: 429,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                    lineNumber: 409,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                            lineNumber: 407,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                        lineNumber: 406,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 sm:space-y-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: downloadAvatar,
                                            className: "w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-sm sm:text-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 sm:gap-3 animate-pulse",
                                            style: {
                                                animationDuration: '2s'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                    className: "w-4 h-4 sm:w-6 sm:h-6"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                    lineNumber: 445,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "📥 ¡Descargar mi Avatar!"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                    lineNumber: 446,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                            lineNumber: 440,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                        lineNumber: 439,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                lineNumber: 387,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 386,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-3 order-2 lg:order-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-2xl border-2 sm:border-4 border-gradient-to-r from-blue-400 to-purple-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4 sm:mb-8",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl sm:text-3xl font-black text-blue-800 mb-3 sm:mb-6 flex items-center gap-2 sm:gap-4 animate-bounce",
                                            style: {
                                                animationDuration: '2s'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                                    className: "w-5 h-5 sm:w-8 sm:h-8 text-purple-600 animate-spin",
                                                    style: {
                                                        animation: 'spin 6s linear infinite'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                    lineNumber: 457,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "🎨 PERSONALIZACIÓN 🎨"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                    lineNumber: 458,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                            lineNumber: 456,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                        lineNumber: 455,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 mb-6 sm:mb-10",
                                        children: CATEGORIES.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setActiveCategory(category.id),
                                                className: `group relative overflow-hidden flex flex-col items-center gap-1 sm:gap-3 p-3 sm:p-6 rounded-xl sm:rounded-2xl font-black transition-all duration-300 text-xs sm:text-base border-2 sm:border-4 hover:scale-105 sm:hover:scale-110 ${activeCategory === category.id ? `bg-gradient-to-r ${category.color} text-white shadow-2xl scale-105 sm:scale-110 border-white animate-pulse` : `${category.bgColor} text-slate-700 hover:shadow-xl border-slate-300 hover:border-purple-400`}`,
                                                style: {
                                                    animationDuration: activeCategory === category.id ? '2s' : undefined
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `text-2xl sm:text-4xl mb-1 sm:mb-2 transition-transform duration-300 ${activeCategory === category.id ? 'animate-bounce' : 'group-hover:scale-125 group-hover:animate-pulse'}`,
                                                        style: {
                                                            animationDuration: '1.5s'
                                                        },
                                                        children: category.emoji
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                                        lineNumber: 475,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-center leading-tight",
                                                        children: category.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                                        lineNumber: 478,
                                                        columnNumber: 21
                                                    }, this),
                                                    activeCategory === category.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute top-1 right-1 sm:top-2 sm:right-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-4 h-4 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center animate-ping",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                lineNumber: 483,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                                            lineNumber: 482,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                                        lineNumber: 481,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, category.id, true, {
                                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                                lineNumber: 465,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                        lineNumber: 463,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: currentOptions.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                (activeCategory.includes('Color') || activeCategory === 'backgroundColor') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 sm:gap-4",
                                                    children: currentOptions.map((option)=>{
                                                        const isSelected = avatarOptions[activeCategory] === option;
                                                        const bgColor = option === 'transparent' ? 'transparent' : `#${option}`;
                                                        const friendlyName = FRIENDLY_NAMES[activeCategory]?.[option] || `Color ${option}`;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleOptionChange(activeCategory, option),
                                                            className: `group relative w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl border-2 sm:border-4 transition-all duration-300 hover:scale-110 sm:hover:scale-125 hover:rotate-6 sm:hover:rotate-12 ${isSelected ? 'border-white scale-110 sm:scale-125 shadow-2xl ring-4 sm:ring-8 ring-yellow-300 animate-pulse' : 'border-slate-400 hover:border-white shadow-lg hover:shadow-2xl'} ${option === 'transparent' ? 'bg-white bg-opacity-70 border-dashed' : ''}`,
                                                            style: {
                                                                backgroundColor: bgColor,
                                                                animationDuration: isSelected ? '1.5s' : undefined
                                                            },
                                                            title: friendlyName,
                                                            children: [
                                                                isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute inset-0 flex items-center justify-center",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-4 h-4 sm:w-6 sm:h-6 bg-white rounded-full shadow-xl flex items-center justify-center animate-bounce",
                                                                        style: {
                                                                            animationDuration: '1s'
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                            lineNumber: 521,
                                                                            columnNumber: 37
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                        lineNumber: 520,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                    lineNumber: 519,
                                                                    columnNumber: 33
                                                                }, this),
                                                                option === 'transparent' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute inset-1 sm:inset-2 bg-gradient-to-br from-red-400 to-pink-500 opacity-80 rounded-lg sm:rounded-xl flex items-center justify-center",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-white font-black text-sm sm:text-lg",
                                                                        children: "🚫"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                        lineNumber: 528,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                    lineNumber: 527,
                                                                    columnNumber: 33
                                                                }, this)
                                                            ]
                                                        }, option, true, {
                                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                                            lineNumber: 504,
                                                            columnNumber: 29
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                    lineNumber: 497,
                                                    columnNumber: 23
                                                }, this),
                                                !activeCategory.includes('Color') && activeCategory !== 'backgroundColor' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6",
                                                    children: currentOptions.map((option, index)=>{
                                                        const isSelected = avatarOptions[activeCategory] === option;
                                                        const friendlyName = FRIENDLY_NAMES[activeCategory]?.[option] || `Opción ${index + 1}`;
                                                        const previewOptions = {
                                                            ...avatarOptions,
                                                            [activeCategory]: option
                                                        };
                                                        const previewParams = new URLSearchParams();
                                                        previewParams.append('seed', seed);
                                                        previewParams.append('size', '120');
                                                        Object.entries(previewOptions).forEach(([key, value])=>{
                                                            if ([
                                                                'features',
                                                                'glasses',
                                                                'earrings',
                                                                'hair'
                                                            ].includes(key)) {
                                                                if (value === 'none') {
                                                                    previewParams.append(`${key}Probability`, '0');
                                                                } else {
                                                                    previewParams.append(key, value);
                                                                    previewParams.append(`${key}Probability`, '100');
                                                                }
                                                            } else if (value && value !== 'none') {
                                                                previewParams.append(key, value);
                                                            }
                                                        });
                                                        const previewUrl = `https://api.dicebear.com/9.x/adventurer/svg?${previewParams.toString()}`;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleOptionChange(activeCategory, option),
                                                            className: `group relative p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 sm:border-4 transition-all duration-300 text-left hover:scale-105 sm:hover:scale-110 hover:rotate-1 sm:hover:rotate-2 ${isSelected ? 'border-purple-500 bg-gradient-to-br from-purple-100 to-pink-100 text-purple-800 shadow-2xl scale-105 sm:scale-110 ring-2 sm:ring-4 ring-yellow-300 animate-pulse' : 'border-slate-300 bg-gradient-to-br from-white to-blue-50 text-slate-700 hover:border-purple-400 hover:shadow-xl'}`,
                                                            style: {
                                                                animationDuration: isSelected ? '2s' : undefined
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex justify-center mb-2 sm:mb-4",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-slate-300 group-hover:border-purple-400 transition-all duration-300 group-hover:scale-105 sm:group-hover:scale-110 shadow-lg group-hover:shadow-xl",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                            src: previewUrl,
                                                                            alt: `Preview ${friendlyName}`,
                                                                            className: "w-full h-full object-cover",
                                                                            onError: (e)=>{
                                                                                e.currentTarget.src = `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}&backgroundColor=b6e3f4`;
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                            lineNumber: 577,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                        lineNumber: 576,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                    lineNumber: 575,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-center",
                                                                    children: option === 'none' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs sm:text-sm font-black text-red-600 bg-red-100 rounded-lg sm:rounded-xl py-2 sm:py-3 px-2 sm:px-4 border-2 border-red-300",
                                                                        children: [
                                                                            "🚫 ",
                                                                            friendlyName
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                        lineNumber: 590,
                                                                        columnNumber: 35
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs sm:text-sm font-black text-purple-600 bg-purple-100 rounded-lg sm:rounded-xl py-2 sm:py-3 px-2 sm:px-4 border-2 border-purple-300",
                                                                        children: [
                                                                            "✨ Opción ",
                                                                            index + 1
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                        lineNumber: 594,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                    lineNumber: 588,
                                                                    columnNumber: 31
                                                                }, this),
                                                                isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute top-2 right-2 sm:top-3 sm:right-3",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-bounce shadow-xl",
                                                                        style: {
                                                                            animationDuration: '1s'
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-white font-black text-xs sm:text-sm",
                                                                            children: "✓"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                            lineNumber: 603,
                                                                            columnNumber: 37
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                        lineNumber: 602,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                                    lineNumber: 601,
                                                                    columnNumber: 33
                                                                }, this)
                                                            ]
                                                        }, option, true, {
                                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                                            lineNumber: 565,
                                                            columnNumber: 29
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                    lineNumber: 539,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center py-8 sm:py-16",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-4xl sm:text-8xl mb-3 sm:mb-6 animate-bounce",
                                                    style: {
                                                        animationDuration: '2s'
                                                    },
                                                    children: "🎭"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                    lineNumber: 615,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-slate-600 font-black text-lg sm:text-2xl mb-2 sm:mb-3",
                                                    children: "¡Ups! No hay opciones aquí"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                    lineNumber: 616,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-slate-500 font-bold text-sm sm:text-lg animate-pulse",
                                                    style: {
                                                        animationDuration: '3s'
                                                    },
                                                    children: "🔄 Prueba con otra categoría"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AvatarCustomizer.tsx",
                                                    lineNumber: 619,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AvatarCustomizer.tsx",
                                            lineNumber: 614,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/AvatarCustomizer.tsx",
                                        lineNumber: 492,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AvatarCustomizer.tsx",
                                lineNumber: 454,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/AvatarCustomizer.tsx",
                            lineNumber: 453,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AvatarCustomizer.tsx",
                    lineNumber: 383,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/AvatarCustomizer.tsx",
                lineNumber: 382,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AvatarCustomizer.tsx",
        lineNumber: 287,
        columnNumber: 5
    }, this);
};
_s(AvatarCustomizer, "Nktt4r6CghtudTX2j2ZP5hN8Ymk=");
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
            className: "absolute text-lg sm:text-2xl opacity-60 animate-bounce pointer-events-none",
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
            onSave: handleAvatarSave
        }, void 0, false, {
            fileName: "[project]/components/pages/SettingsPage.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-82947743903c2914" + " " + "min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-82947743903c2914" + " " + "fixed inset-0 pointer-events-none",
                children: [
                    ...Array(window.innerWidth < 768 ? 15 : 25)
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
                        lineNumber: 82,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/pages/SettingsPage.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "jsx-82947743903c2914" + " " + "relative z-10 flex justify-between items-center p-3 sm:p-6 bg-white/80 backdrop-blur-sm shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleBack,
                        className: "jsx-82947743903c2914" + " " + "flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                className: "w-4 h-4 sm:w-5 sm:h-5"
                            }, void 0, false, {
                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-82947743903c2914" + " " + "font-bold hidden xs:inline",
                                children: "Volver"
                            }, void 0, false, {
                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-82947743903c2914" + " " + "font-bold xs:hidden",
                                children: "🏠"
                            }, void 0, false, {
                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/pages/SettingsPage.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "jsx-82947743903c2914" + " " + "text-lg sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-1 sm:gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                className: "w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-600 animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-82947743903c2914" + " " + "hidden sm:inline",
                                children: "Configuración"
                            }, void 0, false, {
                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-82947743903c2914" + " " + "sm:hidden",
                                children: "Configuración"
                            }, void 0, false, {
                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/pages/SettingsPage.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-82947743903c2914" + " " + "w-12 sm:w-24"
                    }, void 0, false, {
                        fileName: "[project]/components/pages/SettingsPage.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    " "
                ]
            }, void 0, true, {
                fileName: "[project]/components/pages/SettingsPage.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "jsx-82947743903c2914" + " " + "relative z-10 container mx-auto px-3 sm:px-6 py-4 sm:py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-82947743903c2914" + " " + "text-center mb-8 sm:mb-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "jsx-82947743903c2914" + " " + "text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 text-gray-800 animate-fade-in",
                                children: "¡Personaliza tu experiencia!"
                            }, void 0, false, {
                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-82947743903c2914" + " " + "text-base sm:text-lg lg:text-xl text-gray-600 animate-fade-in-delay px-4",
                                children: "Haz que MentaMática sea perfecta para ti"
                            }, void 0, false, {
                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/pages/SettingsPage.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-82947743903c2914" + " " + "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setCurrentView('avatar'),
                                className: "jsx-82947743903c2914" + " " + "group cursor-pointer bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105 relative overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-82947743903c2914" + " " + "absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-82947743903c2914" + " " + "relative z-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-82947743903c2914" + " " + "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:animate-bounce",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"], {
                                                    className: "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 129,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "jsx-82947743903c2914" + " " + "text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-4",
                                                children: "Mi Avatar"
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 133,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-82947743903c2914" + " " + "text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed",
                                                children: "Crea y personaliza tu avatar único. ¡Hazlo tan especial como tú!"
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 134,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-82947743903c2914" + " " + "bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-82947743903c2914" + " " + "text-3xl sm:text-4xl lg:text-5xl animate-bounce-gentle",
                                                    children: userAvatar.gender === 'boy' ? '👦' : '👧'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 139,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-82947743903c2914" + " " + "mt-3 sm:mt-4 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-82947743903c2914" + " " + "bg-purple-100 text-purple-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold",
                                                    children: "¡Personalízame!"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 146,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 145,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                        lineNumber: 128,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-82947743903c2914" + " " + "absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl sm:rounded-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                        lineNumber: 153,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-82947743903c2914" + " " + "group cursor-pointer bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105 relative overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-82947743903c2914" + " " + "absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                        lineNumber: 158,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-82947743903c2914" + " " + "relative z-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-82947743903c2914" + " " + "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:animate-bounce",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                                    className: "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 161,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "jsx-82947743903c2914" + " " + "text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-4",
                                                children: "Sonidos"
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 165,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-82947743903c2914" + " " + "text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed",
                                                children: "Ajusta los efectos de sonido y la música de fondo para una mejor experiencia."
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 166,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-82947743903c2914" + " " + "space-y-3 sm:space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-82947743903c2914" + " " + "flex items-center justify-between bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-82947743903c2914" + " " + "text-xs sm:text-sm font-semibold text-blue-800",
                                                                children: "Efectos de Sonido"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                lineNumber: 172,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-82947743903c2914" + " " + "w-12 h-6 sm:w-14 sm:h-7 bg-blue-400 rounded-full relative cursor-pointer",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-82947743903c2914" + " " + "w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm transition-transform duration-200"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                    lineNumber: 174,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                lineNumber: 173,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                                        lineNumber: 171,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-82947743903c2914" + " " + "flex items-center justify-between bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-82947743903c2914" + " " + "text-xs sm:text-sm font-semibold text-blue-800",
                                                                children: "Música de Fondo"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                lineNumber: 178,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-82947743903c2914" + " " + "w-12 h-6 sm:w-14 sm:h-7 bg-gray-300 rounded-full relative cursor-pointer",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-82947743903c2914" + " " + "w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm transition-transform duration-200"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                    lineNumber: 180,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                lineNumber: 179,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                                        lineNumber: 177,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-82947743903c2914" + " " + "flex items-center justify-between bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-82947743903c2914" + " " + "text-xs sm:text-sm font-semibold text-blue-800",
                                                                children: "Volumen"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                lineNumber: 184,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-82947743903c2914" + " " + "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-82947743903c2914" + " " + "w-16 h-2 sm:w-20 sm:h-2 bg-blue-200 rounded-full",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "jsx-82947743903c2914" + " " + "w-3/4 h-2 bg-blue-500 rounded-full"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                            lineNumber: 187,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                        lineNumber: 186,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-82947743903c2914" + " " + "text-xs text-blue-600 font-medium",
                                                                        children: "75%"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                        lineNumber: 189,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                                lineNumber: 185,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                                        lineNumber: 183,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 170,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-82947743903c2914" + " " + "absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl sm:rounded-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                        lineNumber: 195,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-82947743903c2914" + " " + "group cursor-pointer bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105 relative overflow-hidden sm:col-span-2 lg:col-span-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-82947743903c2914" + " " + "absolute inset-0 bg-gradient-to-br from-orange-100 to-yellow-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                        lineNumber: 200,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-82947743903c2914" + " " + "relative z-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-82947743903c2914" + " " + "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:animate-bounce",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                    className: "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 203,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "jsx-82947743903c2914" + " " + "text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-4",
                                                children: "Ayuda"
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 207,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-82947743903c2914" + " " + "text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed",
                                                children: "Encuentra respuestas a tus preguntas y aprende cómo usar MentaMática."
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 208,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-82947743903c2914" + " " + "grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-1 gap-2 sm:gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-82947743903c2914" + " " + "bg-orange-50 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center hover:bg-orange-100 transition-colors cursor-pointer",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-82947743903c2914" + " " + "text-xs sm:text-sm font-semibold text-orange-800",
                                                            children: "📚 Cómo Jugar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pages/SettingsPage.tsx",
                                                            lineNumber: 214,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                                        lineNumber: 213,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-82947743903c2914" + " " + "bg-yellow-50 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center hover:bg-yellow-100 transition-colors cursor-pointer",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-82947743903c2914" + " " + "text-xs sm:text-sm font-semibold text-yellow-800",
                                                            children: "❓ Preguntas"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pages/SettingsPage.tsx",
                                                            lineNumber: 217,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                                        lineNumber: 216,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-82947743903c2914" + " " + "bg-orange-50 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center hover:bg-orange-100 transition-colors cursor-pointer",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-82947743903c2914" + " " + "text-xs sm:text-sm font-semibold text-orange-800",
                                                            children: "🎯 Consejos"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pages/SettingsPage.tsx",
                                                            lineNumber: 220,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                                        lineNumber: 219,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-82947743903c2914" + " " + "bg-yellow-50 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center hover:bg-yellow-100 transition-colors cursor-pointer",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-82947743903c2914" + " " + "text-xs sm:text-sm font-semibold text-yellow-800",
                                                            children: "📞 Contacto"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pages/SettingsPage.tsx",
                                                            lineNumber: 223,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                                        lineNumber: 222,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                                lineNumber: 212,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-82947743903c2914" + " " + "absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl sm:rounded-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/SettingsPage.tsx",
                                        lineNumber: 228,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pages/SettingsPage.tsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/pages/SettingsPage.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-82947743903c2914" + " " + "text-center mt-8 sm:mt-12 lg:mt-16",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-82947743903c2914" + " " + "bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg max-w-6xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "jsx-82947743903c2914" + " " + "text-lg sm:text-xl lg:text-2xl font-bold text-blue-800 mb-3 sm:mb-4 flex items-center justify-center gap-2 flex-wrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-82947743903c2914" + " " + "text-2xl sm:text-3xl",
                                            children: "🧠"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/SettingsPage.tsx",
                                            lineNumber: 236,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-82947743903c2914",
                                            children: "Personalización y Aprendizaje"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/SettingsPage.tsx",
                                            lineNumber: 237,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-82947743903c2914" + " " + "text-sm sm:text-base lg:text-lg text-blue-700 mb-4 sm:mb-6 leading-relaxed px-2",
                                    children: "La personalización no es solo diversión: ¡es ciencia! Cuando personalizas tu experiencia de aprendizaje, tu cerebro crea conexiones más fuertes y duraderas."
                                }, void 0, false, {
                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                    lineNumber: 239,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-82947743903c2914" + " " + "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-82947743903c2914" + " " + "bg-white/60 rounded-lg sm:rounded-xl p-4 sm:p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-82947743903c2914" + " " + "text-2xl sm:text-3xl mb-2 sm:mb-3",
                                                    children: "🎨"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "jsx-82947743903c2914" + " " + "font-bold text-blue-800 mb-1 sm:mb-2 text-sm sm:text-base",
                                                    children: "Creatividad"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 246,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-82947743903c2914" + " " + "text-xs sm:text-sm text-blue-700 leading-relaxed",
                                                    children: "Personalizar tu avatar estimula la corteza prefrontal, mejorando tu creatividad y resolución de problemas."
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 247,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/pages/SettingsPage.tsx",
                                            lineNumber: 244,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-82947743903c2914" + " " + "bg-white/60 rounded-lg sm:rounded-xl p-4 sm:p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-82947743903c2914" + " " + "text-2xl sm:text-3xl mb-2 sm:mb-3",
                                                    children: "💖"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "jsx-82947743903c2914" + " " + "font-bold text-blue-800 mb-1 sm:mb-2 text-sm sm:text-base",
                                                    children: "Motivación"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-82947743903c2914" + " " + "text-xs sm:text-sm text-blue-700 leading-relaxed",
                                                    children: "Tener un avatar único activa tu sistema de recompensa, haciendo que quieras aprender más."
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/pages/SettingsPage.tsx",
                                            lineNumber: 249,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-82947743903c2914" + " " + "bg-white/60 rounded-lg sm:rounded-xl p-4 sm:p-6 sm:col-span-2 lg:col-span-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-82947743903c2914" + " " + "text-2xl sm:text-3xl mb-2 sm:mb-3",
                                                    children: "🧩"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 255,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "jsx-82947743903c2914" + " " + "font-bold text-blue-800 mb-1 sm:mb-2 text-sm sm:text-base",
                                                    children: "Memoria"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-82947743903c2914" + " " + "text-xs sm:text-sm text-blue-700 leading-relaxed",
                                                    children: "Las experiencias personalizadas fortalecen tu hipocampo, mejorando tu capacidad de recordar."
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                                    lineNumber: 257,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/pages/SettingsPage.tsx",
                                            lineNumber: 254,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/SettingsPage.tsx",
                                    lineNumber: 243,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/pages/SettingsPage.tsx",
                            lineNumber: 234,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/pages/SettingsPage.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/pages/SettingsPage.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "82947743903c2914",
                children: "@keyframes fade-in{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes fade-in-delay{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes bounce-gentle{0%,to{transform:translateY(0)}50%{transform:translateY(-5px)}}.animate-fade-in.jsx-82947743903c2914{animation:1s ease-out fade-in}.animate-fade-in-delay.jsx-82947743903c2914{animation:1s ease-out .3s both fade-in-delay}.animate-bounce-gentle.jsx-82947743903c2914{animation:2s ease-in-out infinite bounce-gentle}@media (width>=475px){.xs\\:inline.jsx-82947743903c2914{display:inline}.xs\\:hidden.jsx-82947743903c2914{display:none}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/pages/SettingsPage.tsx",
        lineNumber: 78,
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