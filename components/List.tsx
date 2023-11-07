import React from "react";
import useSWR from "swr";
import { Card ,Button, CardHeader, CardFooter, CardBody, Typography, Tooltip } from "@material-tailwind/react";
import { BiUser } from "react-icons/bi";
import Link from "next/link";
import {HeartIcon} from "@heroicons/react/24/outline";
import AbbreviateNumber from '../utils/abbrevitateNumber'
import axios from "axios";

import throttle from 'lodash/throttle';
import Styler from 'stylefire';
import { animate } from 'popmotion';

// NOTE: prevent scrolling on main page
import usePreventBodyScroll from '../helpers/usePreventBodyScroll';

// NOTE drag with mouse
import useDrag from '../helpers/useDrag';

// swipe for mobile
import { useSwipe } from '../helpers/useSwipe';

import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { useRouter } from "next/router";

const isTest = process?.env?.NEXT_PUBLIC_IS_TEST;

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const elemPrefix = 'test';
const getId = (index: number) => `${elemPrefix}${index}`;

const getItems = () =>
  Array(10)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));

const onWheel = (
  apiObj: scrollVisibilityApiType,
  ev: React.WheelEvent
): void => {
  // NOTE: no good standart way to distinguish touchpad scrolling gestures
  // but can assume that gesture will affect X axis, mouse scroll only Y axis
  // of if deltaY too small probably is it touchpad
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollPrev();
  } else if (ev.deltaY > 0) {
    apiObj.scrollNext();
  }
};




export const FeaCard = ({ setSelected, item, itemId }) => {


  const router = useRouter()

  function redirectToDetails(url:string){
    return router.push(`/details/${url}`)
    
    
  }

  const likeMap = async () => await axios
  .put(
    "/api/MapInteractions?function=likeMap",
    { mapId:item.id as string },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )

    const unlikeMap = () => {axios.put
      (`api/MapInteractions?function=unlikeMap`,
        {mapId:item.id} )}


    

  return (

    <Card data-cy={itemId} onClick={() => redirectToDetails(`${itemId}`)} className="mt-0  w-[80vw] md:w-80 min-w-[18rem] min-h-[18rem] bg-[#222222] shadow-sm shadow-black hover:shadow-2xl hover:scale-[1.02] active:scale-95 transform-gpu duration-200 text-center ">
        <CardHeader style={{background:`#ffffff url(${item.img || '/img/mapcomp.webp'})`}} color="blue-gray" className={`w-full mx-0 h-56 shadow-none bg-white !bg-cover !bg-bottom`} >
          
        </CardHeader>
        <CardBody >
        <Tooltip content={
          <>
            <div className="max-w-sm">
              {item.title}
            </div>
          </>
        }>
          <Typography variant="paragraph" color="white" className="mb-0 font-bold text-xl whitespace-nowrap">
          {item.title.length > 15 ? `${item.title.substring(0,15)}...` : `${item.title}`}
          </Typography>
          </Tooltip>
          <Tooltip content={
          <>
            <div className="max-w-sm">
              {item.desc}
            </div>
          </>
        }>
          <Typography color="white">
            {item.desc.length === 0 ? ` `: `${item.desc.length > 15 ? `${item.desc.substring(0,15)}...` : `${item.desc}`}`}
          
          </Typography>
          </Tooltip>
          <Typography className="inline-flex space-x-2" color="white">
            <BiUser className="relative top-[3px] h-5 w-5"/>{item.owner.name || "unknown"}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 flex justify-between">
          <div className="flex flex-col items-center">
          {/* <HeartIcon onClick={isliked ? (likeMap):(unlikeMap)} className={`h-6 w-6 fill-[${isliked ? ('purple-500'): ('none')}]`}></HeartIcon>
          <p>{AbbreviateNumber(item.likes)}</p> */}
          </div>
        
        <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}game/${item.id}`}><Button color="purple" className="bg-gradient-to-br from-purple-500 to-purple-800 tracking-wider">Join</Button></Link>
        </CardFooter>
      </Card>
    // <div className="inline-block w-full mb-4">
    //   <motion.img
    //     whileHover={{
    //       scale: 1.025,
    //       transition: {
    //         duration: 0.2,
    //       },
    //     }}
    //     whileTap={{
    //       scale: 0.95,
    //     }}
    //     onClick={() => {
    //       setSelected(item);
    //     }}
    //     layoutId={`card-${item._id}`}
    //     src={item.img || '/img/map.png'}
    //     className="w-full bg-base-100 shadow-xl image-full cursor-pointer"
    //   />
    //   <div className="flex flex-wrap mt-2">
    //   </div>
    // </div>
  );
};

export default function List() {

  const [selected, setSelected] = React.useState<string[]>([]);
  const [position, setPosition] = React.useState(0);
  const [duration, setDuration] = React.useState(500);
  const [ease, setEase] = React.useState('noEasing');
  const [customAnimation, setCustomAnimation] = React.useState(false);

  const isItemSelected = (id: string): boolean =>
    !!selected.find((el) => el === id);

    // const { dragStart, dragStop, dragMove, dragging } = useDrag();
  

  const restorePosition = React.useCallback(
    ({
      scrollContainer,
      getItemById,
      scrollToItem,
    }: scrollVisibilityApiType) => {
      // NOTE: scroll to item, auto/smooth for animation
      // scrollToItem(getItemById('test7'), 'auto');
      // NOTE: or restore exact position by pixels
      // scrollContainer.current.scrollLeft = position;
    },
    [position]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const savePosition = React.useCallback(
    throttle(({ scrollContainer }: scrollVisibilityApiType) => {
      !!scrollContainer.current &&
        setPosition(scrollContainer.current.scrollLeft);
    }, 500),
    []
  );

  // const handleDrag =
  //   ({ scrollContainer }: scrollVisibilityApiType) =>
  //   (ev: React.MouseEvent) =>
  //     dragMove(ev, (posDiff) => {
  //       if (scrollContainer.current) {
  //         scrollContainer.current.scrollLeft += posDiff;
  //       }
  //     });

  // const handleItemClick =
  //   (itemId: string) =>
  //   ({ getItemById, scrollToItem }: scrollVisibilityApiType) => {
  //     if (dragging) {
  //       return false;
  //     }
  //     const itemSelected = isItemSelected(itemId);

  //     setSelected((currentSelected: string[]) =>
  //       itemSelected
  //         ? currentSelected.filter((el) => el !== itemId)
  //         : currentSelected.concat(itemId)
  //     );

  //     if (!itemSelected) {
  //       // NOTE: center item on select
  //       scrollToItem(getItemById(itemId), 'smooth', 'center', 'nearest');
  //     }
  //   };


    const fetcher = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('An error occurred while fetching the data.');
        }
        return response.json();
      };
      
      const useFetch = (path) => {
        const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_WEBSITE_URL}${path}`, fetcher);
      
        const isLoading = !data && !error;
      
        return { data, error, isLoading };
      };
      const {data: games} = useFetch('api/getMaps')

      const scrollBehavior = (instructions) => {
        const [{ el, left }] = instructions;
        const styler = Styler(el);
      
        animate({
          from: el.scrollLeft,
          to: left,
          type: 'spring',
          onUpdate: (left) => styler.set('scrollLeft', left),
        });
      };

      const { onTouchEnd, onTouchMove, onTouchStart } = useSwipe();
      const { disableScroll, enableScroll } = usePreventBodyScroll();

  return (

    <>
    <div onMouseEnter={disableScroll} onMouseLeave={enableScroll} className="my-5">
    <div 
    // onMouseLeave={dragStop}
    >
    <ScrollMenu
              scrollContainerClassName="space-x-5 !min-h-min scrollbar-none px-5 pt-8"
              // LeftArrow={LeftArrow}
              // RightArrow={RightArrow}
              onInit={restorePosition}
              onScroll={savePosition}
              onWheel={onWheel}
              // onMouseDown={() => dragStart}
              // onMouseUp={() => dragStop}
              // onMouseMove={handleDrag}
              transitionDuration={duration}
              transitionEase={easingFunctions[ease]}
              transitionBehavior={customAnimation ? scrollBehavior : undefined}
              onTouchEnd={onTouchEnd}
              onTouchMove={onTouchMove}
              onTouchStart={onTouchStart}
            >
    {games?.map((item) => (
          <FeaCard key={item.id}  itemId={item.id} setSelected={setSelected} item={item} />
        ))}
    </ScrollMenu>
    </div>
    </div>
    </>
    
    
  )
}

function LeftArrow() {
  const { initComplete, isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);
  // NOTE initComplete is a hack for  prevent blinking on init
  // Can get visibility of item only after it's rendered

  return (
    <Arrow
      disabled={!initComplete || (initComplete && isFirstItemVisible)}
      onClick={() => scrollPrev(isTest ? 'auto' : undefined)}
      className="left"
    >
      Left
    </Arrow>
  );
}

function RightArrow() {
  const { initComplete, isLastItemVisible, scrollNext } =
    React.useContext(VisibilityContext);

  return (
    <Arrow
      disabled={initComplete && isLastItemVisible}
      onClick={() => scrollNext(isTest ? 'auto' : undefined)}
      className="right"
    >
      Right
    </Arrow>
  );
}

function Arrow({
  children,
  disabled,
  onClick,
  className,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
  className?: String;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={'arrow' + `-${className}`}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        right: '1%',
        opacity: disabled ? '0' : '1',
        userSelect: 'none',
      }}
    >
      {children}
    </button>
  );
}
const easingFunctions = {
  noEasing: undefined,
  // no easing, no acceleration
  linear: (t) => t,
  // accelerating from zero velocity
  easeInQuad: (t) => t * t,
  // decelerating to zero velocity
  easeOutQuad: (t) => t * (2 - t),
  // acceleration until halfway, then deceleration
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  // accelerating from zero velocity
  easeInCubic: (t) => t * t * t,
  // decelerating to zero velocity
  easeOutCubic: (t) => --t * t * t + 1,
  // acceleration until halfway, then deceleration
  easeInOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  // accelerating from zero velocity
  easeInQuart: (t) => t * t * t * t,
  // decelerating to zero velocity
  easeOutQuart: (t) => 1 - --t * t * t * t,
  // acceleration until halfway, then deceleration
  easeInOutQuart: (t) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  // accelerating from zero velocity
  easeInQuint: (t) => t * t * t * t * t,
  // decelerating to zero velocity
  easeOutQuint: (t) => 1 + --t * t * t * t * t,
  // acceleration until halfway, then deceleration
  easeInOutQuint: (t) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
  // Source https://gist.github.com/gre/1650294#file-easing-js
};