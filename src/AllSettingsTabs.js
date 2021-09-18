import genderIcon from './Res/Icons/venus-mars.svg';
import ageIcon from './Res/Icons/birthday-cake.svg';
import weightIcon from './Res/Icons/sort-amount-desc.svg';
import heightIcon from './Res/Icons/sort-numeric-desc.svg';
import activityIcon from './Res/Icons/child.svg';
import climateIcon from './Res/Icons/tree.svg';

export const settingsTabs = [
    {
        label: 'Gender',
        icon: genderIcon,
        values: ['Male', 'Female'],
        unit: null,
        waterFactor : [750, 250]
    },
    {
        label: 'Age',
        icon: ageIcon,
        values: [...Array(200).keys()],
        unit: 'years',
        waterFactor: [...Array(200).keys()]
    },
    {
        label: 'Weight',
        icon: weightIcon,
        values: [...Array(500).keys()],
        unit: 'kg',
        waterFactor: [...Array(500).keys()]
    },
    {
        label: 'Height',
        icon: heightIcon,
        values: [...Array(300).keys()],
        unit: 'cm',
        waterFactor: [...Array(300).keys()]
    },
    {
        label: 'Activity',
        icon: activityIcon,
        values: ['Sedentary', 'Low Activity', 'Active', 'Very Active'],
        unit: null,
        waterFactor: [100, 250, 500, 1000]
    },
    {
        label: 'Climate',
        icon: climateIcon,
        values: ['Tropical', 'Temperate', 'Cold'],
        unit: null,
        waterFactor: [1000, 500, 250]
    },
]