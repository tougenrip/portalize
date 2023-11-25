import { useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";

export default function SelectComp({val, onChange, options}) {
    const [value, setValue] = useState("");
  
    function logValue() {
      console.log(value);
    }
    useEffect(() => {
        onChange({ val: value, });
      }, [ value, onChange]);
  
    return (
        <Select
        color="purple"
        variant="standard"
        value={value}
        onChange={(e) => setValue(e)}
        >
        {options?.map((option) => (
            <Option key={option} value={option}>{option}</Option>
          ))}
        </Select>
    );
  }