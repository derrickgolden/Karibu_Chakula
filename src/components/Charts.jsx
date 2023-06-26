
import { Pie, Bar, Doughnut } from "react-chartjs-2";


import {
    Chart as ChartJS,
    BarElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
  } from 'chart.js';
  import Charts from "./Charts";
  
  ChartJS.register(
    BarElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
  )

const NutritionChart = (props) =>{
    const nutrientKeys = ["carbohydrates", "fat", "protein"]
    // console.log(props)
    return(
        <Pie data = {{
            labels: nutrientKeys.map((key, i) => props.data.nutrients[key].nutrient),
            datasets: [{
              label: 'Amount ',
              data: nutrientKeys.map((key, i) => props.data.nutrients[key].amount),
              borderWidth: 2,
              backgroundColor: nutrientKeys.map((key, i) => props.data.nutrients[key].color),
              borderColor: 'white',
              }],
            options: {
              plugins: {
                cutout: "25%",
              }
            }
            }} 
          />
    )
}

export default NutritionChart