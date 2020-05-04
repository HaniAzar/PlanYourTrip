export class Search {
    areas: string[];
    categories: string[];
    seasons: string[];
    properties: string[];

    constructor(areas?, categories?, seasons?, properties?) {
        this.areas = areas;
        this.categories = categories;
        this.seasons = seasons;
        this.properties = properties;
    }
}