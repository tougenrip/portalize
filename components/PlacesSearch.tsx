// import { useIntersection } from '@mantine/hooks';
// import { useInfiniteQuery } from 'react-query';
// import axios from 'axios';
// import { useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/router';
// import React, { useEffect, useRef, useState } from 'react'
// import type { Map } from '@prisma/client'
// import { Typography } from '@material-tailwind/react';
// import { CheckboxWithDescription } from '@/components/CheckboxComp'
// import MultiRangeSlider from '@/components/MultiRangeSlider'
// import { useInView } from 'react-intersection-observer'
// import { GameCardNew } from './List';
// import { Loader2 } from 'lucide-react';


// const PlacesSearch = () => {
// const router = useRouter();
//     const search = useSearchParams();
//     const [searchquery, setSearchQuery] = useState<string | null>(
//       search ? search.get("q") : ""
//     );
//     const [feaquery, setFeaQuery] = useState<string | null>(search ? search.get("fea") : null)
//     const [maxUser, setMaxUser] = useState<string | null>(search ? search.get("maxu") : null);
//     const [minUser, setMinUser] = useState<string | null>(search ? search.get("minu") : null);
//     const [selVal, setSelVal] = useState("");
//     const [radioVal, setRadioVal] = useState("");
//     const [checked, setChecked] = useState([]);
//     const searchQ = search ? search?.get('q') : null;
//     const encodedSearchQuery = encodeURI(searchquery || "");
//     // const {data, isLoading} = useSWR(`/api/search?q=${encodedSearchQuery || ""}&l=10&p=1`, fetchWorlds);
//     const lastPostRef = useRef<HTMLElement>(null)
    
//     const { ref, inView } = useInView()

//       const { isLoading, isError, data, error, isFetchingNextPage, fetchNextPage, hasNextPage } =
//         useInfiniteQuery(
//           'posts',
//           async ({ pageParam = '' }) => {
//             await new Promise((res) => setTimeout(res, 1000))
//             const res = await axios.get('/api/post?cursor=' + pageParam)
//             return res.data
//           },
//           {
//             getNextPageParam: (lastPage) => lastPage.nextId ?? false,
//           }
//         )

//       useEffect(() => {
//         if (inView && hasNextPage) {
//           fetchNextPage()
//         }
//       }, [inView])

//       if (isLoading) return <div className="loading">Loading...</div>
//       if (isError) return <div>Error! {JSON.stringify(error)}</div>

  
//     const onSearch = (event) => {
//       event.PreventDefault();
//       router.push(`/search?q=${encodedSearchQuery}&l=10&p=1`)
//       console.log("current query", searchquery);
//     }

//   return (
//     <main className='absolute left-1/2 flex flex-col -translate-x-1/2 md:w-[80%] w-screen justify-center'>
//         <div className='md:h-60 h-40 flex justify-center'>
//            <h1 className='self-center text-4xl font-bold'>All places</h1>
//         </div>
//         <div className='w-full mb-10'>
//           <input type='text' className='w-full rounded-3xl h-12 p-5' placeholder='Search all worlds' onChange={(e) => {setSearchQuery(e.target.value); console.log("Search Query:" + e.target.value)}}></input>
//         </div>
//         <div className='w-screen md:w-[1500px] self-center md:flex md:flex-row space-x-20'>
//           <div className='w-[30%] hidden md:flex flex-col gap-10 '>
//             <h2 className='mx-auto text-'>Sidebar</h2>
//             <Typography
//             variant='h5'
//             color='white'
//             >
//               Interests
//             </Typography>
//             <div className='grid grid-flow-row gap-2 grid-cols-2'>

              
//           <CheckboxWithDescription
//           chckitms={checked}
//           checklist={[
//             {
//               title:"🌍 World Affairs",
//               desc:"Politics, Social Issues, Markets, Economics",
//               value:"worldaffairs"
//             },
//             {
//               title:"🌻 Life",
//               desc:"Dating, Travelling, Pregnancy, Parenting, Relationships",
//               value:"life"
//             },
//             {
//               title:"💭 Arts",
//               desc:"Advertising, Art, Fashion, Beauty, Theater, Design",
//               value:"arts"
//             },
//             {
//               title:"💡 Knowledge",
//               desc:"Science, Space, History, Philosophy, Education, Physics",
//               value:"knowledge"
//             },
//             {
//               title:"🧭 Tech",
//               desc:"Venture Capital, SaaS, DTC, Product, Crypto",
//               value:"tech"
//             },
//             {
//               title:"🌆 Places",
//               desc:"Africa, Los Angeles, Atlanta, San Francisco, India, London",
//               value:"places"
//             },
//             {
//               title:"🕊️ Faith",
//               desc:"Agnosticism, Sikhism, Hinduizm, Christanity, Taoism",
//               value:"faith"
//             },
//             {
//               title:"🥳 Hanging Out",
//               desc:"Bring a Drink, Chill Vibes, Coworking, Meet People",
//               value:"hangingout"
//             },
//             {
//               title:"🏆 Sports",
//               desc:"Formula 1, Golf, Basketball, Tennis, Baseball, Football",
//               value:"sports"
//             },
//             {
//               title:"🗣️ Identity",
//               desc:"LGBTQ, Gen Z, East Asian, Latino, Disabled, South Asian",
//               value:"identity"
//             },
//             {
//               title:"🔥 Hustle",
//               desc:"Real Estate, Entrepreneurship, TikTok, Small Business",
//               value:"hustle"
//             },
//             {
//               title:"💬 Languages",
//               desc:"Japanese, Indonesian, Portuguese, French, Russian",
//               value:"languages"
//             },
//             {
//               title:"🌿 Wellness",
//               desc:"Medicine, Veganism, Fitness, Mindfullness, Nutrition",
//               value:"wellness"
//             },
//             {
//               title:"🎸 Entertainment",
//               desc:"Movies, Performances, Trivia, Gaming, Advice, Variety",
//               value:"entertainment"
//             },
//           ]}
//           onChange={({chckitms}) => {setChecked(chckitms); console.log(checked)}}  />
//           </div>
          
//           <Typography
//             variant='h5'
//             color='white'
//             >
//               User Limit
//             </Typography>

//             <MultiRangeSlider
//             min={0}
//             max={32}
//             onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
//           />

//             <Typography
//             variant='h5'
//             color='white'
//             >
//               Age Limit
//             </Typography>

//             <MultiRangeSlider
//             min={0}
//             max={100}
//             onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
//           />
          
//           <Typography
//             variant='h5'
//             color='white'
//             >
//               Additional Filters
//             </Typography>

//           <CheckboxWithDescription
//           chckitms={checked}
//           checklist={[
//             {
//               title:"✍️ Editor's Choice",
//               desc:"Marks world's that have been caught attention of the editors of Portalize.",
//               value:"editorchoice"
//             },
//             {
//               title:"✅ Approved By Portalize",
//               desc:"Worlds that been approved by the moderators!",
//               value:"approved"
//             },
//           ]}
//           onChange={({chckitms}) => {setChecked(chckitms); console.log(checked)}}  />
//           </div>
//           <div className="w-max gap-9 -translate-x-6 mx-auto flex flex-col md:grid md:grid-cols-3 space-y-10">
//           {data &&
//               data.pages.map((page) => {
//                 return (
//                   <React.Fragment key={page.nextId ?? 'lastPage'}>
//                     {page.posts.map((post) => (
//                       <GameCardNew isDragging={undefined} key={post.id} itemId={post.id} setSelected={undefined} item={post} />
//                     ))}
//                   </React.Fragment>
//                 )
//               })}

//             {isFetchingNextPage ? <div className="loading">Loading...</div> : null}

//             <span style={{ visibility: 'hidden' }} ref={ref}>
//               intersection observer marker
//             </span>
//           </div>
//         </div>
//     </main> 
  
//   )
// }

// export default PlacesSearch