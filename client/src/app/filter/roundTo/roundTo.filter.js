
export class RoundToFilter {

    constructor(input) {
        this.input = input;  
    }

    round() {
        return Math.round(this.input)
    }

    static roundToFilterFactory(input){
        let filter = new RoundToFilter(input);
        return filter.round();
    }
}

RoundToFilter.roundToFilterFactory.$inject = ['input'];
