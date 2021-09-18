import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../Context.js';
import NutritionBackground from '../Res/nutrition-background.jpg';
import { Bar } from 'react-chartjs-2';
import { chartBackgroundColors, chartBorderColors } from '../AllChartColors.js';
import { nutritionTypes } from '../AllNutritionTypes.js';

const Nutrition = () => {
    const { nutritionData } = useContext(Context);
    const [nutritionValues, setNutritionValues] = useState([]);
    const [chartData, setChartData] = useState(undefined);
    const nutritionTypesLength = nutritionTypes.length;
    const options = {
        scales: {
            y: {
                ticks: {
                    color: 'rgb(255,255,255)',
                    font: {
                        family: 'Heebo',
                        weight: '300',
                        size: 16,
                    }
                }
            },
            x: {
                ticks: {
                    color: 'rgb(255,255,255)',
                    font: {
                        family: 'Heebo',
                        weight: '300',
                        size: 16,
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false 
            }
        },
        color: 'rgb(255,255,255)',
    }
    
    const updateNutritionValues = () => {
        const addedNutritionValues = [];
        
        nutritionTypes.forEach(nutritionType => 
            addedNutritionValues.push(nutritionData.reduce((acc, arrayData) => { 
                const nutritionObject = arrayData.find(objectData => objectData.name === nutritionType);
               
                if(nutritionObject){
                    return acc += nutritionObject.amount;
                } else {
                    return acc += 0;
                }
            }, 0))
        )
        
        setNutritionValues(addedNutritionValues);
    }

    useEffect(() => {
        if(nutritionData.length > 0) updateNutritionValues();
    }, [nutritionData])

    useEffect(() => {
        if(nutritionValues.length === nutritionTypesLength) {
            setChartData({
                labels: nutritionTypes,
                datasets: [{
                    data: nutritionValues,
                    backgroundColor: chartBackgroundColors,
                    borderColor: chartBorderColors,
                    borderWidth: 1
                }]
            });
        }
            
    }, [nutritionValues])

    return (
        <div className='Page col' style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${NutritionBackground})`}}>
            {
                nutritionValues.length === nutritionTypesLength ?
                <div className='nutrition col'>
                    <div className='nutrition__grid'>
                        {
                            nutritionTypes.map((curr, index) => 
                                <h1 key={index}>
                                    {curr} 
                                    <br></br> 
                                    {nutritionValues[index].toFixed(2)}<span style={{textTransform: 'lowercase'}}>{curr === 'Calories' ? 'kCal' : 'mg'}</span>
                                </h1>
                            )
                        }
                    </div>

                    <Bar
                        data={chartData}
                        options={options}
                        style={{margin: '100px 10px'}}
                    />
                </div> : 
                <h1 style={{margin: 'auto', color: 'white'}}>Nutrition Data Not Found...</h1>
            }
        </div>
    )
}

export default Nutrition;