export interface cities {
    cnt: number,
    list: list[],
    city?: any
}

export interface list {
    clouds: Object,
    coord: Object,
    dt: number,
    id: number,
    main: Object,
    name: string,
    sys: Object,
    visibility: number,
    weather: Object,
    wind: Object
}