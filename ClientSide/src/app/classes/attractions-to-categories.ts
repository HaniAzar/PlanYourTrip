export class AttractionsToCategories {

    id: number;
    attractionId: number;
    categoryId: number;

    constructor(attractionId, categoryId) {
        this.attractionId = attractionId;
        this.categoryId = categoryId;

    }

}
