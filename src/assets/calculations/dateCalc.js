
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export function getDateDetails (date = new Date()) {
  const todayDate = date.getDate();
  const today = days[date.getDay()]
  const month = months[date.getMonth()]
  const monthNo = date.getMonth() + 1
  const year = date.getFullYear()
  
  return {
    day: today,
    todayDate,
    monthYear: `${month}, ${year}`,
    dayMeal: `${year}-${monthNo}-${todayDate}`,
    prevDay: getPreviousDay,
    nextDay: getNextDay,
    }
}

function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    const mealDate = getDateDetails(previous).dayMeal;

    return mealDate;
  }
function getNextDay(date = new Date()) {
    const next = new Date(date.getTime());
    next.setDate(date.getDate() + 1);
    const mealDate = getDateDetails(next).dayMeal
  
    return mealDate;
  }

// export const DATE = 