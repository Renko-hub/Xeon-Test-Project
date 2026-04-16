export const CPU_MODELS = {
  V2: [
    { name: "Стандарт (1866)", maxFrequency: 1866 },
    { name: "E5-2618L v2 — 1600", maxFrequency: 1600 },
    { name: "E5-2620 v2 — 1600", maxFrequency: 1600 },
    { name: "E5-2630 v2 — 1600", maxFrequency: 1600 },
    { name: "E5-2630L v2 — 1600", maxFrequency: 1600 },
    { name: "E5-2640 v2 — 1600", maxFrequency: 1600 },
    { name: "E5-2650L v2 — 1600", maxFrequency: 1600 },
    { name: "E5-2603 v2 — 1333", maxFrequency: 1333 },
    { name: "E5-2609 v2 — 1333", maxFrequency: 1333 },
  ],
  V3: [
    { name: "Стандарт (2133)", maxFrequency: 2133 },
    { name: "E5-2620 v3 — 1866", maxFrequency: 1866 },
    { name: "E5-2623 v3 — 1866", maxFrequency: 1866 },
    { name: "E5-2628L v3 — 1866", maxFrequency: 1866 },
    { name: "E5-2630 v3 — 1866", maxFrequency: 1866 },
    { name: "E5-2630L v3 — 1866", maxFrequency: 1866 },
    { name: "E5-2640 v3 — 1866", maxFrequency: 1866 },
    { name: "E5-2648L v3 — 1866", maxFrequency: 1866 },
    { name: "E5-2603 v3 — 1600", maxFrequency: 1600 },
    { name: "E5-2609 v3 — 1600", maxFrequency: 1600 },
    { name: "E5-2622 v3 — 1600", maxFrequency: 1600 },
  ],
  V4: [
    { name: "Стандарт (2400)", maxFrequency: 2400 },
    { name: "E5-2618L v4 — 2133", maxFrequency: 2133 },
    { name: "E5-2620 v4 — 2133", maxFrequency: 2133 },
    { name: "E5-2623 v4 — 2133", maxFrequency: 2133 },
    { name: "E5-2630 v4 — 2133", maxFrequency: 2133 },
    { name: "E5-2640 v4 — 2133", maxFrequency: 2133 },
    { name: "E5-2650L v4 — 2133", maxFrequency: 2133 },
    { name: "E5-2683 v4 — 2133", maxFrequency: 2133 },
    { name: "E5-2603 v4 — 1866", maxFrequency: 1866 },
    { name: "E5-2608L v4 — 1866", maxFrequency: 1866 },
    { name: "E5-2609 v4 — 1866", maxFrequency: 1866 },
    { name: "E5-2628L v4 — 1866", maxFrequency: 1866 },
    { name: "E5-2630L v4 — 1866", maxFrequency: 1866 },
    { name: "E5-2648L v4 — 1866", maxFrequency: 1866 },
  ]
};

export const RAM_SIZES = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64];
export const RAM_PRESETS = ['safe', 'balanced', 'aggressive', 'custom', 'ultra'];
export const SLOTS = [1, 2, 3, 4];
export const GENERATIONS = ['V2', 'V3', 'V4'];
