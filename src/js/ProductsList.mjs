export default class ProductsList {

    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const data = await this.dataSource.getData();
        this.render(data);
    }
};