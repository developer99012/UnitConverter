import { action, makeAutoObservable, observable } from "mobx"

class store {
    height = 0
    weight = 0
    inches = 0
    feets = 0
    unitType = 'imperial'

    constructor() {
        makeAutoObservable(this, {
            height: observable,
            weight: observable,
            feets: observable,
            inches: observable,
            unitType: observable,
            setHeight: action,
            setWeight: action,
            setFeets: action,
            setInches: action,
            setUnitType: action,
            convertToImperial: action,
            convertToMetric: action,
        }, { autoBind: true })

    }
    setHeight(height) {
        this.height = height;
    }
    setWeight(weight) {
        this.weight = weight;
    }
    setFeets(feets) {
        this.feets = feets;
    }
    setInches(inches) {
        this.inches = inches
    }
    setUnitType(type) {
        this.unitType = type;
    }
    convertToMetric() {
        if (this.unitType === 'imperial') {
            const totalInches = parseInt(this.feets) * 12 + parseInt(this.inches);
            this.weight = this.weight * 0.453592; // 1 pound = 0.453592 kg
            this.height = Math.floor(totalInches * 0.0254); // 1 foot = 0.3048 meters

            this.setUnitType('metric');
        }
    }
    convertToImperial() {
        if (this.unitType === 'metric') {
            this.feets = Math.floor(this.height / 0.3048);
            this.inches = Math.round((this.height % 0.3048) / 0.0254);
            this.weight = this.weight / 0.453592; // 1 kg = 0.453592 pounds
            this.setUnitType('imperial');
        }
    }

}

const appStore = new store()

export default appStore