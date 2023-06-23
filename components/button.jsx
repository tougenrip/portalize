import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const LaunchButton = (props) => {

  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
  
  return (
    <>
    <button className='px-10 py-6 mt-8 rounded-xl bg-gradient-to-r from-[#3B29FF] to-[#9C4FFF] filter shadow-md shadow-purple-600 text-white text-lg md:text-3xl font-extralight' onClick={handleOpen} >{props.children}</button>
    <Dialog open={open} handler={handleOpen} className="bg-gray-900">
        <div className="flex items-center justify-between">
          <DialogHeader className='text-white'>Join Waitlist</DialogHeader>
          <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpen} />
        </div>
        <DialogBody divider>
          <div className="grid gap-6">
            <Input label="Email Address" color='purple' />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            join waitlist
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default LaunchButton