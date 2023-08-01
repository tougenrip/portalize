import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { BiUser, BiFace} from "react-icons/bi";
   
  export function ServiceCard({title, content}) {
    return (
      <Card className="mt-6 w-96 shadow-none " color="transparent">
        <CardBody className="text-center space-y-4">
            {}
          <BiUser className="h-16 w-16 mx-auto text-white"/>
          <Typography variant="h5" color="white" className="mb-2 text-2xl font-bold">
            {title}
          </Typography>
          <Typography className=" text-xl font-light">
            {content}
          </Typography>
        </CardBody>
      </Card>
    );
  }