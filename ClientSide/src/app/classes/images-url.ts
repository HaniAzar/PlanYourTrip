export class ImagesUrl {
    id: number;
    attractionId: number;
    imgUrl: string;
    constructor(attractionId: number, imgUrl: string) {
        this.attractionId = attractionId;
        this.imgUrl = imgUrl;
    }
}
