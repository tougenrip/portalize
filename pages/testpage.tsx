import { CheckboxWithDescription } from '@/components/CheckboxComp'
import FriendsPortal from '@/components/FriendsPortal'
import GameCardNew from '@/components/GameCardNew'
import MultiRangeSlider from '@/components/MultiRangeSlider'
import SelectComp from '@/components/SelectComponent'
import { RadioWithDescription } from '@/components/SwitchComponent'
import React, { useState } from 'react'

const Testpage = () => {

  const [selVal, setSelVal] = useState("");
  const [radioVal, setRadioVal] = useState("");
  const [checked, setChecked] = useState([]);

  return (
    <main className='flex flex-col justify-normal space-y-5'>
        <FriendsPortal visibility={undefined}/>

        {/* <GameCardNew setSelected={undefined} item={undefined} itemId={undefined} /> */}
       
        {/* <MultiRangeSlider
            min={0}
            max={32}
            onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
          /> */}

          
          {/* <SelectComp 
          options={[
            "test",
            "2",
            "3"
          ]}
          val={selVal}
          onChange={({val}) => {setSelVal(val); console.log(selVal)}}
          /> */}

          {/* <RadioWithDescription
          selOpt={radioVal}
          onChange={({selOpt}) => {setRadioVal(selOpt); console.log(radioVal)}}
          options={[
            {
              title:"🪐test",
              desc:"test desc",
              value:"test"
            },
            {
              title:"test2",
              desc:"test desc2",
              value:"2"
            },
            {
              title:"test3",
              desc:"test desc3",
              value:"3"
              }
              ]}/>
              
          <CheckboxWithDescription
          chckitms={checked}
          checklist={[
            {
              title:"🪐test",
              desc:"test desc",
              value:"test"
            },
            {
              title:"test2",
              desc:"test desc2",
              value:"2"
            },
            {
              title:"test3",
              desc:"test desc3",
              value:"3"
              }
          ]}
          onChange={({chckitms}) => {setChecked(chckitms); console.log(checked)}}  /> */}

          
    </main>
  )
}

export default Testpage