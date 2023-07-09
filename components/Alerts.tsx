import React from 'react'
import { Alert,Button } from '@material-tailwind/react'
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const Alerts = ({message}, {typeofalert}) => {
    const [open, setOpen] = React.useState(true);


  return (
    <Alert
        variant="gradient"
        color="red"
        open={open}
        icon={<ExclamationTriangleIcon className="h-6 w-6" />}
        action={
          <Button
            variant="text"
            color="white"
            size="sm"
            className="!absolute top-3 right-3"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        }
      >
        Sorry, something went wrong please try again.
      </Alert>
  )
}

export default Alerts