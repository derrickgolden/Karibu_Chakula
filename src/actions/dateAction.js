
import { MEALS_DATE } from "./constTypes"

export const mealsDate = (date) => (dispath) =>{
    dispath({
        type: MEALS_DATE,
        payload: date,
    })
}