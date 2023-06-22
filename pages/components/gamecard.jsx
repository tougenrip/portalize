import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button
  } from "@material-tailwind/react";
  import items from './data';
   
  export default function GameCard( {title, desc,bg} ) {
    return (
      <Card className="mt-6 w-[80vw] md:!w-full min-w-[80vw] md:min-w-[100%] bg-black shadow-xl">
        <CardHeader color="blue-gray" className={`relative h-56  bg-cover bg-bottom`} style={{backgroundImage: `url(${bg})`}}>
          
        </CardHeader>
        <CardBody >
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {title}
          </Typography>
          <Typography>
            {desc}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button className="hidden">Read More</Button>
        </CardFooter>
      </Card>
    );
  }