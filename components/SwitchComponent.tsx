import { Radio, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
 
export function RadioWithDescription({selOpt, options , onChange}) {

    const [selectedOption, setSelectedOption] = useState("")  

    function onValueChange(event){
        // Updating the state with the selected radio button's value
        setSelectedOption(event.target.value)
    }

    useEffect(() => {
        onChange({ selOpt: selectedOption, });
      }, [ selectedOption, onChange]);
  

  return (
    <div className="grid grid-flow-row grid-cols-2 col gap-8">
        {options?.map((option) => (
            <Radio
            color="purple"
            key={option}
            name="description"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={onValueChange}
            label={<div>
                <Typography
                color="white"
                className="font-medium"
                >
                {option.title}
                </Typography>
                <Typography
                variant="small"
                color="gray"
                className="font-normal"
                >
                {option.desc}
                </Typography>
            </div>}
            containerProps={{
                className: "-mt-5",
            }} 
            crossOrigin={undefined}
            />
          ))}
    </div>
  );
}