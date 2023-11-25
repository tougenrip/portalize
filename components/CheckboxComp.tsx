import { Checkbox, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
 
export function CheckboxWithDescription({checklist, chckitms, onChange}) {

    // State with list of all checked item
  const [checked, setChecked] = useState([]);

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

    useEffect(() => {
        onChange({ chckitms: checked });
      }, [checked, onChange]);

  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  return (
    <>
    {checklist?.map((item, index) => (
        <Checkbox
        color="purple"
        key={index}
        value={item.value}
        onChange={handleCheck}
        label={<div>
            <Typography color="white" className="font-medium">
                {item.title}
            </Typography>
            <Typography variant="small" color="gray" className="font-normal text-xs">
                {item.desc}
            </Typography>
        </div>}
        containerProps={{
            className: "-mt-5",
        }}
        crossOrigin={undefined}
         />
      ))}
   </>
  );
}