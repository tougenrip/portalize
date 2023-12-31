import React, { useState } from "react";
import useSWR from "swr";
import { motion as m } from 'framer-motion'
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




export const GameCardNew = ({ setSelected, item, itemId, isDragging }) => {
  const [isOpen,setOpen] = useState(false)
  const router = useRouter();
  

  const handleDivClick = (url:string) => {
      // Redirect to Page A
      router.push(`/details/${url}`)
    };
  
    const handleButtonClick = (event) => {
      // Prevent the button click event from propagating to the div
      event.stopPropagation();
      // Redirect to Page B
      router.push(`${process.env.NEXT_PUBLIC_WEBSITE_URL}game/${item.id}`);
    };
  

return (
  <m.div layout style={{background:`#ffffff url(${item?.img || '/img/mapcomp.webp'})`, pointerEvents:`${isDragging ? 'none': 'auto'}`}} onMouseEnter={() => setOpen(curr => !curr)} onClick={() => handleDivClick(`${itemId}`)} onMouseLeave={() => setOpen(curr => !curr)} data-isopen={isOpen} className='relative top-0 aspect-card h-[400px] duration-200 data-[isopen=true]:h-[500px] w-auto bg-blue-gray-300 bg-[url("/img/biggamebgcomp.webp")] !bg-center !bg-cover !bg-no-repeat rounded-xl'>
      <main data-isopen={isOpen} className='w-full h-full !rounded-xl backdrop-brightness-75 data-[isopen=true]:backdrop-blur-sm data-[isopen=true]:backdrop-brightness-[.25] '>
      <m.div layout data-isopen={isOpen} className='absolute top-[75%] data-[isopen=true]:top-[10%] left-8 space-y-0'>
      {/* <m.p layout="position" data-isopen={isOpen} className='relative flex space-x-[0.5px]  h-min transition-all delay-500 rounded-xl bg-gray-900 p-2 w-min whitespace-nowrap'><BiUser className='h-4 w-4 mt-[4px] mr-1'/><span className=''>200</span></m.p> */}
      <m.p layout="position" data-isopen={isOpen} className='transition-all transform-none duration-200 font-extrabold data-[isopen=true]:text-3xl text-4xl max-w-[250px]'>{isOpen ? (`${item?.title}`) : (`${item?.title.length > 10 ? `${item?.title.substring(0,10)}...` : `${item?.title}`}`)} </m.p>
      <p data-isopen={isOpen} className='opacity-0 data-[isopen=true]:opacity-100 transition-opacity delay-200 '>{item?.owner.name || "unknown"}</p>
      </m.div>
      <div data-isopen={isOpen} className='absolute bottom-[5%] mx-[8%] font-300 space-y-5  opacity-0 data-[isopen=true]:opacity-100 transition-opacity duration-100 delay-200'>
          <m.p 
          layout
           data-isopen={isOpen}
            className='data-[isopen=false]:hidden mr-16 relative -left-[300px] data-[isopen=true]:left-0 transition-all transform-gpu duration-100 delay-150'
            >{item?.desc.length === 0 ? ` `: `${item?.desc.length > 50 ? `${item?.desc.substring(0,50)}...` : `${item?.desc}`}`}</m.p>
          <div data-isopen={isOpen} className='justify-between flex data-[isopen=false]:hidden '>
              <div>
                  test
              </div>
              <button
              onClick={handleButtonClick}
              className='aspect-[86/25] h-8 w-auto rounded-full bg-paff-gradient-card'
              >
                  Join
              </button>
          </div>
          
      </div>
      </main>
  </m.div>
)
}
export default function List({cat}) {

  const [selected, setSelected] = React.useState<string[]>([]);
  const [position, setPosition] = React.useState(0);
  const [duration, setDuration] = React.useState(500);
  const [ease, setEase] = React.useState('noEasing');
  const [customAnimation, setCustomAnimation] = React.useState(false);

  const isItemSelected = (id: string): boolean =>
    !!selected.find((el) => el === id);

    const { dragStart, dragStop, dragMove, dragging } = useDrag();
  

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

  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  const handleItemClick =
    (itemId: string) =>
    ({ getItemById, scrollToItem }: scrollVisibilityApiType) => {
      if (dragging) {
        return false;
      }
      const itemSelected = isItemSelected(itemId);

      setSelected((currentSelected: string[]) =>
        itemSelected
          ? currentSelected.filter((el) => el !== itemId)
          : currentSelected.concat(itemId)
      );

      if (!itemSelected) {
        // NOTE: center item on select
        scrollToItem(getItemById(itemId), 'smooth', 'center', 'nearest');
      }
    };


    const fetcher = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('An error occurred while fetching the data.');
        }
        return response.json();
      };
      
      const useFetch = (path) => {
        const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/${path}`, fetcher);
      
        const isLoading = !data && !error;
      
        return { data, error, isLoading };
      };
      const {data: games} = useFetch(`getMaps?cat=${cat}`)

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
    <div  className="my-5">
    <div 
    onMouseLeave={dragStop}
    >
    <ScrollMenu
              scrollContainerClassName="space-x-5 !min-h-min scrollbar-none px-5 pt-8"
              LeftArrow={LeftArrow}
              RightArrow={RightArrow}
              // onInit={restorePosition}
              // onScroll={savePosition}
              // onWheel={onWheel}
              onMouseDown={() => dragStart}
              onMouseUp={() => dragStop}
              onMouseMove={handleDrag}
              transitionDuration={duration}
              transitionEase={easingFunctions[ease]}
              transitionBehavior={customAnimation ? scrollBehavior : undefined}
              onTouchEnd={onTouchEnd}
              onTouchMove={onTouchMove}
              onTouchStart={onTouchStart}
            >
    {games?.map((item) => (
          <GameCardNew key={item.id} isDragging={dragging} itemId={item.id} setSelected={setSelected} item={item} />
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
      className="left px-6"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
</svg>


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
      className="right px-6"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>

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