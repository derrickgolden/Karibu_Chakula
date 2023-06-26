
const measureMiddleware = () => (next) => action =>{
    console.time(action.type)
    next(action)
    console.log(action.type)
    console.timeEnd(action.type)
}

export default measureMiddleware;