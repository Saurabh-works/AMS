import React from "react";
import { useEffect, useState } from "react";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, elements, plugins} from "chart.js";
import {Bar} from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const options = {
    indexAxis:'x',
    elements: {
        bar:{
            borderWidth:2,
        },
    },
    responsive:true,
    plugins:{
        legend:{
            position:'right',
        },
        title:{
            display:true,
            text:'Batch Wise Student Attendence Report',
        },
    },
}

const BatchReport = () => {
    const [data, setData] = useState({
        labels:[],
        datasets:[
            {
                label:'Dataset 1',
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor:'rgba(25,90,13,0.5)',
            },
        ],

    });
    useEffect(()=> {
        const fetchData= async()=>{
            //   const url = 'http://localhost:5000/students'
              const url = `${window.location.origin}/students`
              const labelSet = [];
              const dataSet = [];
              await fetch(url).then((data)=> {
                console.log("Api data", data)
                const res = data.json();
                return res
              }).then((res) => {
                console.log("ressss", res)
                for (const val of res) {
                    dataSet.push(val.id);
                    labelSet.push(val.name)
                }

                setData({
                    labels: labelSet,
                    datasets: [
                        {
                            label:'Student ID',
                            data: dataSet,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(99, 132, 0.5)',
                        },
                    ],
                })
                console.log(labelSet,dataSet)
              }).catch(e => {
                console.log("error", e)
              })
        }
        fetchData();
      
    },[])
    return(
        <div style={{width:'80%',height:'50%'}}>
            {
                console.log("dataaaaaa", data)
            }
            <Bar data={data} options={options}/>
        </div>
    )
}
export default BatchReport;

