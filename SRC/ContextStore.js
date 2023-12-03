import {  createContext, useState } from 'react'


const AppContext = createContext()
const AppDispatchContext = createContext()

const AppProvider = ({ children }) => {
    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)
    const [unitType, setUnitType] = useState('imperial')
    const [feets, setFeets] = useState(0)
    const [inches, setInches] = useState(0)

    const convertToMetric = () => {
        if (unitType === 'imperial') {
            const totalInches = parseInt(feets) * 12 + parseInt(inches);
            setWeight(prev => prev * 0.453592); // 1 pound = 0.453592 kg
            setHeight(Math.round(totalInches * 0.0254)); // 1 foot = 0.3048 meters
            setUnitType('metric');
        }
    }
    const convertToImperial = () => {
        if (unitType === 'metric') {
            setHeight(Math.floor(height / 0.3048));
            setInches(Math.round((height % 0.3048) / 0.0254));
            setWeight(weight / 0.453592); // 1 kg = 0.453592 pounds
            setUnitType('imperial');
        }
    }
    return (
        <AppContext.Provider value={{
            weight,
            height,
            feets,
            inches,
            unitType
        }
        }>
            <AppDispatchContext.Provider value={{
                setFeets,
                setHeight,
                setUnitType,
                setInches,
                setWeight,
                convertToMetric,
                convertToImperial
            }}>
                {children}
            </AppDispatchContext.Provider>

        </AppContext.Provider>
    )

}

export { AppContext, AppProvider, AppDispatchContext }

