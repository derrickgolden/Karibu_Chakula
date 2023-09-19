
export function updateLocalStorage(state){
    const date = state?.dates?.mealsDate

    if( !state.dates.dateChange ){
        localStorage.removeItem(`recipeData-${date}`)
        try {
            localStorage.setItem(`recipeData-${date}`, JSON.stringify(state))
        } catch (error) {
            console.log("error occured while setting an item")
            localStorage.clear()
            updateLocalStorage(state);
        }
    }
    // console.log(JSON.parse(localStorage.getItem(`recipeData-${date}`)))
}

export function getLocalStorage(date){
    let getRecipeData = {}
    try{
        getRecipeData = JSON.parse(localStorage.getItem(`recipeData-${date}`))
    }catch(err){
        return null;
    }
    return getRecipeData;
}