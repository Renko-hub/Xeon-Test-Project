export type Gen = 'V2' | 'V3' | 'V4';

export interface ICPUMonitor {
  name: string;
  max: number;
}

export const CPU_MODELS: Record<Gen, ICPUMonitor[]> = {
  V2: [
    { name: "Стандарт (1866)", max: 1866 },
    { name: "E5-2618L v2 — 1600", max: 1600 },
    { name: "E5-2620 v2 — 1600", max: 1600 },
    { name: "E5-2630 v2 — 1600", max: 1600 },
    { name: "E5-2630L v2 — 1600", max: 1600 },
    { name: "E5-2640 v2 — 1600", max: 1600 },
    { name: "E5-2650L v2 — 1600", max: 1600 },
    { name: "E5-2603 v2 — 1333", max: 1333 },
    { name: "E5-2609 v2 — 1333", max: 1333 },
  ],
  V3: [
    { name: "Стандарт (2133)", max: 2133 },
    { name: "E5-2620 v3 — 1866", max: 1866 },
    { name: "E5-2623 v3 — 1866", max: 1866 },
    { name: "E5-2628L v3 — 1866", max: 1866 },
    { name: "E5-2630 v3 — 1866", max: 1866 },
    { name: "E5-2630L v3 — 1866", max: 1866 },
    { name: "E5-2640 v3 — 1866", max: 1866 },
    { name: "E5-2648L v3 — 1866", max: 1866 },
    { name: "E5-2603 v3 — 1600", max: 1600 },
    { name: "E5-2609 v3 — 1600", max: 1600 },
    { name: "E5-2622 v3 — 1600", max: 1600 },
  ],
  V4: [
    { name: "Стандарт (2400)", max: 2400 },
    { name: "E5-2618L v4 — 2133", max: 2133 },
    { name: "E5-2620 v4 — 2133", max: 2133 },
    { name: "E5-2623 v4 — 2133", max: 2133 },
    { name: "E5-2630 v4 — 2133", max: 2133 },
    { name: "E5-2640 v4 — 2133", max: 2133 },
    { name: "E5-2650L v4 — 2133", max: 2133 },
    { name: "E5-2683 v4 — 2133", max: 2133 },
    { name: "E5-2603 v4 — 1866", max: 1866 },
    { name: "E5-2608L v4 — 1866", max: 1866 },
    { name: "E5-2609 v4 — 1866", max: 1866 },
    { name: "E5-2628L v4 — 1866", max: 1866 },
    { name: "E5-2630L v4 — 1866", max: 1866 },
    { name: "E5-2648L v4 — 1866", max: 1866 },
  ]
};

export default CPU_MODELS;
