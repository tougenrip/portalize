if(!self.define){let e,i={};const c=(c,a)=>(c=new URL(c+".js",a).href,i[c]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=i,document.head.appendChild(e)}else e=c,importScripts(c),i()})).then((()=>{let e=i[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,o)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let d={};const r=e=>c(e,s),b={module:{uri:s},exports:d,require:r};i[s]=Promise.all(a.map((e=>b[e]||r(e)))).then((e=>(o(...e),d)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Model.jsx",revision:"7e3ef7b36c717c1e52722fb09867fc33"},{url:"/WebGL/4f0e682b0235347843ac876ad2dcb127_unitybuiltinshaders_34fb0e39d01ad3235cd1dc8daa7a4e68.bundle",revision:"6edbe5246fb3e15b163c5308051b5198"},{url:"/WebGL/catalog_2023.12.10.17.53.12.hash",revision:"7714a2982b7a6eded1f2bbbfb88bce96"},{url:"/WebGL/catalog_2023.12.10.17.53.12.json",revision:"4612b7a4042caeff82cb1ad6be54c429"},{url:"/WebGL/catalog_2023.12.10.17.54.58.hash",revision:"7714a2982b7a6eded1f2bbbfb88bce96"},{url:"/WebGL/catalog_2023.12.10.17.54.58.json",revision:"4612b7a4042caeff82cb1ad6be54c429"},{url:"/WebGL/catalog_2023.12.10.22.28.55.hash",revision:"6aced440a722a9738c4ce954be360ad9"},{url:"/WebGL/catalog_2023.12.10.22.28.55.json",revision:"4f98017d9385fe4cba57cc7634704f92"},{url:"/WebGL/defaultlocalgroup_assets_assets/furniture_1/materials/furniture_01.mat_8c2f2fcce37c609984bde8099eefa3d6.bundle",revision:"4168b2066efba2fab109bd8b35e8e9e4"},{url:"/WebGL/defaultlocalgroup_assets_exteriorwall_cf7b08e370d65dfcd9f47e355e7555ec.bundle",revision:"624cd15830a0f2dd875b013f78e2bdab"},{url:"/WebGL/defaultlocalgroup_assets_floor_281483e35d29e69c6112d104b5c85398.bundle",revision:"cb5cc7b72b3e702649077c0890a9ea96"},{url:"/WebGL/defaultlocalgroup_assets_interiormodules/animal_d22b2a0f2f29fc2948288801d72151da.bundle",revision:"a47c8bc443ba4d236a8392497d486797"},{url:"/WebGL/defaultlocalgroup_assets_interiormodules/animatedcharacters_f0c4d08e6d4c788ebb92e213fda87b05.bundle",revision:"7c43e02fa672aca611594a61d32dffe1"},{url:"/WebGL/defaultlocalgroup_assets_interiormodules/architecture_ea7e3ea2c7f6d71aad03c65c1178694d.bundle",revision:"9e008497101fcb6b2e803f2471d7acb2"},{url:"/WebGL/defaultlocalgroup_assets_interiormodules/art_bde950bc51970114835999e65f582a01.bundle",revision:"e3010c2b132b021dd6df86a15baa4dd6"},{url:"/WebGL/defaultlocalgroup_assets_interiormodules/entertainment_01f5f7760ffa19f3897a36d90463608c.bundle",revision:"45bb038c0f7e844890b26daf4e1f7b56"},{url:"/WebGL/defaultlocalgroup_assets_interiormodules/functional_d120376a48ca4c8f3f725542f93be47c.bundle",revision:"1c75640237a913793f87ad8691f7e828"},{url:"/WebGL/defaultlocalgroup_assets_interiormodules/furniture_dab1b151ec15dfba6a92f64cc1225563.bundle",revision:"286d63850e6e02ed89010c9ae20eccd1"},{url:"/WebGL/defaultlocalgroup_assets_interiormodules/lights_556137986904c8ad4b3f475c08339b7b.bundle",revision:"94ac240d59feff142fc2ece9ff33e431"},{url:"/WebGL/defaultlocalgroup_assets_interiormodules/nature_7595aafe86af9a4df9481e23b3627e66.bundle",revision:"588332b43241c1e1a941223d9ebe8356"},{url:"/WebGL/defaultlocalgroup_assets_interiormodules/office_23cfbd81e5e15456c42d33336dc402f8.bundle",revision:"1513f348f575e3d068f4235dc16b7553"},{url:"/WebGL/defaultlocalgroup_assets_interiormodules/prop_6be84bacd237eba361d0d978ba9ef8a1.bundle",revision:"5c6d60d21a4b201598b6e2f93e3ceaf4"},{url:"/WebGL/defaultlocalgroup_assets_interiorthumbnails_d3bb91e0219777755f6ce74eafa6b711.bundle",revision:"ae0875fa4fe6c01242afc501d134ba02"},{url:"/WebGL/defaultlocalgroup_assets_outside_153e4ac0e643efd7b4e31c17558bd0f0.bundle",revision:"3687dded7a5ee6be3329ed61709ae4f8"},{url:"/WebGL/defaultlocalgroup_assets_roof_dc1bd1c66bc1577a5aab4a09bb04bd9c.bundle",revision:"1b0e3ae55ed5bd1c4b35ddca38f68b22"},{url:"/WebGL/defaultlocalgroup_assets_skyboxmats_6ef3b5c0a3cdf7d8fb9c3554d309f469.bundle",revision:"14d3bd78ec3c8093d91b1061cb54f613"},{url:"/WebGL/defaultlocalgroup_assets_skyboxthumbnails_32d7298ef2dd4ca0f556562127004782.bundle",revision:"055df309d57a7b4d3d2c83e91592047e"},{url:"/WebGL/defaultlocalgroup_assets_tabs_25346f2b67bca63c83403f9b4af1d7d0.bundle",revision:"7349ab88181948ad516a6478429104ca"},{url:"/WebGL/defaultlocalgroup_assets_wall_704bfc12401ad1fd36dc985d5d3563f7.bundle",revision:"9a6098c85625e36069d3852d48b6cd55"},{url:"/_next/static/BVbXk2nb9XgpzSHTGvz8l/_buildManifest.js",revision:"428ef5e8ce66ec5b0f6a9ec479ac79bb"},{url:"/_next/static/BVbXk2nb9XgpzSHTGvz8l/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/124-6d86b3263e07f3a0.js",revision:"6d86b3263e07f3a0"},{url:"/_next/static/chunks/1a48c3c1-17fd1c1824022055.js",revision:"17fd1c1824022055"},{url:"/_next/static/chunks/1bfc9850-df91819e18fd4dc1.js",revision:"df91819e18fd4dc1"},{url:"/_next/static/chunks/23-ec4b0ba0d2f74bca.js",revision:"ec4b0ba0d2f74bca"},{url:"/_next/static/chunks/261-c4767131cdd8ceb9.js",revision:"c4767131cdd8ceb9"},{url:"/_next/static/chunks/31664189-b975507095a43472.js",revision:"b975507095a43472"},{url:"/_next/static/chunks/423-9dd66d913aec0b30.js",revision:"9dd66d913aec0b30"},{url:"/_next/static/chunks/424-cd20d23fac9e0e3a.js",revision:"cd20d23fac9e0e3a"},{url:"/_next/static/chunks/588-d513870b4a112092.js",revision:"d513870b4a112092"},{url:"/_next/static/chunks/61-67b7646ed1fb1f64.js",revision:"67b7646ed1fb1f64"},{url:"/_next/static/chunks/610-562fd3b094027813.js",revision:"562fd3b094027813"},{url:"/_next/static/chunks/67-57e1646563f51b10.js",revision:"57e1646563f51b10"},{url:"/_next/static/chunks/708-2d5a87c86ca6adea.js",revision:"2d5a87c86ca6adea"},{url:"/_next/static/chunks/734-fc09332f2e7a9fe7.js",revision:"fc09332f2e7a9fe7"},{url:"/_next/static/chunks/735-f6c7f437886fb016.js",revision:"f6c7f437886fb016"},{url:"/_next/static/chunks/91794568-fdeca69505ea8d8a.js",revision:"fdeca69505ea8d8a"},{url:"/_next/static/chunks/b0654ee3-cbfc9cc72b7e96cd.js",revision:"cbfc9cc72b7e96cd"},{url:"/_next/static/chunks/c3be44fe-fda0b5f3fa0f7682.js",revision:"fda0b5f3fa0f7682"},{url:"/_next/static/chunks/d0c16330-4bc393ecbd0ea443.js",revision:"4bc393ecbd0ea443"},{url:"/_next/static/chunks/fb7d5399-dfbf333815647093.js",revision:"dfbf333815647093"},{url:"/_next/static/chunks/framework-01c2b2c7edfb4272.js",revision:"01c2b2c7edfb4272"},{url:"/_next/static/chunks/main-2fda08cabd391935.js",revision:"2fda08cabd391935"},{url:"/_next/static/chunks/pages/_app-24b12973f3fc35c6.js",revision:"24b12973f3fc35c6"},{url:"/_next/static/chunks/pages/_error-a9572f84d60f21da.js",revision:"a9572f84d60f21da"},{url:"/_next/static/chunks/pages/about-905946a74c74f409.js",revision:"905946a74c74f409"},{url:"/_next/static/chunks/pages/afterAuth-5d296ffde092d15a.js",revision:"5d296ffde092d15a"},{url:"/_next/static/chunks/pages/auth-fdab9546bb97ef13.js",revision:"fdab9546bb97ef13"},{url:"/_next/static/chunks/pages/details/%5Bid%5D-bfc613ec1e8ddc8c.js",revision:"bfc613ec1e8ddc8c"},{url:"/_next/static/chunks/pages/editor-7088dd1baf28db2c.js",revision:"7088dd1baf28db2c"},{url:"/_next/static/chunks/pages/game/%5Bid%5D-5a1f6dcea818b9af.js",revision:"5a1f6dcea818b9af"},{url:"/_next/static/chunks/pages/index-bf82312d5a973352.js",revision:"bf82312d5a973352"},{url:"/_next/static/chunks/pages/maptest-8b8249b70b5bd2cf.js",revision:"8b8249b70b5bd2cf"},{url:"/_next/static/chunks/pages/profile/%5Bid%5D-4193b72d16b8667d.js",revision:"4193b72d16b8667d"},{url:"/_next/static/chunks/pages/socialInteractionstest-a601c27c2f95bb94.js",revision:"a601c27c2f95bb94"},{url:"/_next/static/chunks/pages/testpage-ea390886c55a05eb.js",revision:"ea390886c55a05eb"},{url:"/_next/static/chunks/pages/uploadFile-869c9d9a43bfd6ec.js",revision:"869c9d9a43bfd6ec"},{url:"/_next/static/chunks/pages/user/dashboard-d7bf76aeb0473bc4.js",revision:"d7bf76aeb0473bc4"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-6efcf3b4cfe438c7.js",revision:"6efcf3b4cfe438c7"},{url:"/_next/static/css/431944509084d071.css",revision:"431944509084d071"},{url:"/_next/static/css/63c0e16d48e05785.css",revision:"63c0e16d48e05785"},{url:"/_next/static/css/68a9cd658f138c03.css",revision:"68a9cd658f138c03"},{url:"/_next/static/css/9c98593a15371ec8.css",revision:"9c98593a15371ec8"},{url:"/_next/static/css/fe56b0b952f8f51e.css",revision:"fe56b0b952f8f51e"},{url:"/assets/auth-lottie.json",revision:"b9fd5639eb1e974fa5cdd38997c82a2a"},{url:"/assets/nextagram_logo.svg",revision:"6ca401c3b365be93c0dacc4e5baf6cb3"},{url:"/favicon.ico",revision:"9b677889fbeca54e7f7a4af0d011776b"},{url:"/game/streamingassets/aa/AddressablesLink/link.xml",revision:"c730c72d6e177220f2751202f787e5e2"},{url:"/game/streamingassets/aa/catalog.json",revision:"4f98017d9385fe4cba57cc7634704f92"},{url:"/game/streamingassets/aa/settings.json",revision:"9df4adb2e84af36d5286b66d3252082c"},{url:"/icon-192x192.png",revision:"a72d5c84742a2730b3ffc4727cf87833"},{url:"/icon-256x256.png",revision:"6024d0703789170bf7620a8b7d641b60"},{url:"/icon-384x384.png",revision:"6ae5038e623bf0ad13c4a0fd7ec458de"},{url:"/icon-512x512.png",revision:"5d652dbc97e60a5d31d90a4688c2756c"},{url:"/img/aseetpre10comp.webp",revision:"a7520bf5d125cfe1b204f59597dfc466"},{url:"/img/aseetpre11comp.webp",revision:"9024b71a927c67968559a29c877b0018"},{url:"/img/aseetpre12comp.webp",revision:"3f493c334eb58a7647e2126788ef633b"},{url:"/img/aseetpre1comp.webp",revision:"1fb21eaee6ead8ad4577bb6911853d14"},{url:"/img/aseetpre2comp.webp",revision:"79ce185733dd192faf261176d576317e"},{url:"/img/aseetpre3comp.webp",revision:"efc86bdb0f3a829299f3988a1cbc5bac"},{url:"/img/aseetpre4comp.webp",revision:"d115ef282a6401cd3c9741e2e150e0ad"},{url:"/img/aseetpre5comp.webp",revision:"14ce042b01c6bc1a1af19600a963511e"},{url:"/img/aseetpre6comp.webp",revision:"928d6b76df6d30356dbaa0a370eb4e96"},{url:"/img/aseetpre7comp.webp",revision:"d11bfa5e4916bbafc965b86f28cb5baa"},{url:"/img/aseetpre8comp.webp",revision:"c0bde71fbee84c8d0d1b3b8c6fd55a44"},{url:"/img/aseetpre9comp.webp",revision:"484c5f2d814d44a73d1533ef7d6ad76b"},{url:"/img/biggamebg1comp.webp",revision:"73fb50163abf730f1ab8140e9b4403d9"},{url:"/img/biggamebg2comp.webp",revision:"95173d14687d8af3f37ea9afb47d0648"},{url:"/img/biggamebgcomp.webp",revision:"c1a36210f8e8fc5bb24fcb42b478a80c"},{url:"/img/comingbgcomp.webp",revision:"5e9364d39448263d718ba7eceda0e5ed"},{url:"/img/herobgnewcomp.webp",revision:"133caa71adbed154a1b0f34417c36a03"},{url:"/img/labcomp.webp",revision:"cbf7f2ea0f253d14feacf54dadcf88c6"},{url:"/img/landing-page/aiaipoweredcomp.webp",revision:"c32c2865efd3004eb007fe58ca0dad02"},{url:"/img/landing-page/communityiconcomp.webp",revision:"d9d3429e95bb3e3581d3b297712e747d"},{url:"/img/landing-page/cta-bg.png",revision:"54ecc54c1239607b5b96921c6313248c"},{url:"/img/landing-page/cta-bg_comp.webp",revision:"52a03c9f2aca62fb8fd9a8ebf5bec2f9"},{url:"/img/landing-page/cta-bgcomp.webp",revision:"dee827786546b11c54dbcd335861c222"},{url:"/img/landing-page/herobg.png",revision:"a982f50add4b0194aea6df5faa601736"},{url:"/img/landing-page/herobg.webm",revision:"9a5b714c20d28b4d50dafd8a78a6261d"},{url:"/img/landing-page/herobg_comp.webp",revision:"eb4cc4ece78aa35e57b23c982a338045"},{url:"/img/landing-page/herobgcomp.webp",revision:"b021e65c7950292141b89eba823950cb"},{url:"/img/landing-page/outlinemarketplacecomp.webp",revision:"b642537599d24da65f736f068d8a710a"},{url:"/img/landing-page/room-bg1_comp.webp",revision:"88404e91ccacce4a40b78d7d3eb0d0bc"},{url:"/img/landing-page/room-bg1comp.webp",revision:"59833f099adac5f0745d6ff860bcc940"},{url:"/img/landing-page/room-bg2_comp.webp",revision:"e9b9194bc9c6dbf37f1a18aed2600bff"},{url:"/img/landing-page/room-bg2comp.webp",revision:"6113f59b1550777f216d9a144fcbb09b"},{url:"/img/landing-page/room-bg3_comp.webp",revision:"1847de469f76bc60475dc133cae00f77"},{url:"/img/landing-page/room-bg3comp.webp",revision:"4b2f135eb70e5dd6f4b67e6419bcad11"},{url:"/img/landing-page/side1comp.webp",revision:"3ed44daac96c39f1b6a3e738aedbb9cc"},{url:"/img/landing-page/side2comp.webp",revision:"3dbab8b2ad2454eba03e888558b3ce15"},{url:"/img/logo_comp.webp",revision:"b285ea4d24432ea1e726cc62472666e3"},{url:"/img/logocomp.webp",revision:"b285ea4d24432ea1e726cc62472666e3"},{url:"/img/mapcomp.webp",revision:"d5af7108d7af04e0292504be4d18c264"},{url:"/img/marketplacecomp.webp",revision:"a04a4487396f86e92f867df6156c8546"},{url:"/img/pp.webp",revision:"a5369809569edc4e18ad64c495326f6e"},{url:"/img/pp_comp.webp",revision:"ed96a7db62381fdee7b058d990017c92"},{url:"/img/rescomp.webp",revision:"e56a2ab83a7503ef657f9e24507f38e6"},{url:"/img/user_logo_comp.webp",revision:"94bea409d400d50e27347c276cef2310"},{url:"/img/user_logocomp.webp",revision:"cd492cf127c1fad55048dadd1bc9aa53"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/EN/En_Colored/pay_with_iyzico_colored.pdf",revision:"35be3d3b16b6ffa5a6c4fc2f1ea5431a"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/EN/En_Colored/pay_with_iyzico_colored.png",revision:"91902a009a970ff84e44b8845a8bec2b"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/EN/En_Colored/pay_with_iyzico_colored.svg",revision:"b2fea34313af33eaf9ead00b318b392b"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/EN/En_Colored_horizontal/pay_with_iyzico_horizontal_colored.pdf",revision:"9d326c9db5af7d51fd1b92c1a21b755d"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/EN/En_Colored_horizontal/pay_with_iyzico_horizontal_colored.png",revision:"bbd42885b9c18014d48c760c1fbaaca9"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/EN/En_Colored_horizontal/pay_with_iyzico_horizontal_colored.svg",revision:"6903890ca1604b76d776d8f46d6d41d0"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/EN/En_White/pay_with_iyzico_white.pdf",revision:"05cc64cc3ea5f2b6c538bcf02bf2806b"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/EN/En_White/pay_with_iyzico_white.png",revision:"70431ffe402d12d7dfafa9c84c96b40f"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/EN/En_White/pay_with_iyzico_white.svg",revision:"0939b4f84307fac3a01a97436a67df51"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/EN/En_White_Horizontal/pay_with_iyzico_horizontal_white.pdf",revision:"67955149c5df60a3f4f3c168b43e853f"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/EN/En_White_Horizontal/pay_with_iyzico_horizontal_white.png",revision:"f525ce051a837748bc966451aed41cdd"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/EN/En_White_Horizontal/pay_with_iyzico_horizontal_white.svg",revision:"b3bb2997d8284407db71efe5ccf79cf5"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/TR/Tr_Colored/iyzico_ile_ode_colored.pdf",revision:"1d32e3169abf8c36b47d67ed967fedb8"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/TR/Tr_Colored/iyzico_ile_ode_colored.png",revision:"6dc8df3b5214f4b1811b1e9aae953b3f"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/TR/Tr_Colored/iyzico_ile_ode_colored.svg",revision:"4d81141152a9416b881712a8f2f7d4ec"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/TR/Tr_Colored_Horizontal/iyzico_ile_ode_colored_horizontal.pdf",revision:"fe1df86a10e737b760ddc249be18b7f8"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/TR/Tr_Colored_Horizontal/iyzico_ile_ode_colored_horizontal.png",revision:"a014a18edf6f2a214e4ba7bee8d99e6d"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/TR/Tr_Colored_Horizontal/iyzico_ile_ode_colored_horizontal.svg",revision:"0bd61476bda9998c75448f7d838b4ab5"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/TR/Tr_White/iyzico_ile_ode_white.pdf",revision:"b063dcf49c547f3203141ff390cf9867"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/TR/Tr_White/iyzico_ile_ode_white.png",revision:"57a41c2072742f416d5b022465ccdcf0"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/TR/Tr_White/iyzico_ile_ode_white.svg",revision:"9d576f06f75ad41414871a1217693339"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/TR/Tr_White_Horizontal/iyzico_ile_ode_horizontal_white.pdf",revision:"194401f5db510d3bac7ba061331ccdb0"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/TR/Tr_White_Horizontal/iyzico_ile_ode_horizontal_white.png",revision:"dcf6517799ff7314604748e3675bf88d"},{url:"/iyzico-logo-pack/checkout_iyzico_ile_ode/TR/Tr_White_Horizontal/iyzico_ile_ode_horizontal_white.svg",revision:"a9bed86d7fa63b95ca8cb3db8b4766b5"},{url:"/iyzico-logo-pack/footer_iyzico_ile_ode/Colored/logo_band_colored.svg",revision:"c48184be6063680477eb37ae4bf17757"},{url:"/iyzico-logo-pack/footer_iyzico_ile_ode/Colored/logo_band_colored@1X.png",revision:"bd652944bc6ccda4690900baa6226ca9"},{url:"/iyzico-logo-pack/footer_iyzico_ile_ode/Colored/logo_band_colored@2x.png",revision:"c657efcaec9d3d653b0866d8f917f7eb"},{url:"/iyzico-logo-pack/footer_iyzico_ile_ode/Colored/logo_band_colored@3x.png",revision:"de88fd996154e279ba9474282c0c5c67"},{url:"/iyzico-logo-pack/footer_iyzico_ile_ode/White/logo_band_white.svg",revision:"50a7675fdb21d4ff0730e421b477e6b3"},{url:"/iyzico-logo-pack/footer_iyzico_ile_ode/White/logo_band_white@1X.png",revision:"f40da10883dfca303baa28ddd552c28a"},{url:"/iyzico-logo-pack/footer_iyzico_ile_ode/White/logo_band_white@2x.png",revision:"acd17c5a86cc7fb47a610b751849c284"},{url:"/iyzico-logo-pack/footer_iyzico_ile_ode/White/logo_band_white@3x.png",revision:"adcb51ba36e7c3171e0ba6a012a4f95b"},{url:"/male.glb",revision:"2983502a3b222ec73ff1b30ef46e5fee"},{url:"/manifest.json",revision:"4ea795bc88b917221dde17c55b08561a"},{url:"/model.glb",revision:"930dd991c4b2ae2189e8b0bc6864e234"},{url:"/model.glb.bak",revision:"d55f0934472da89133f0e6c066fc1ebd"},{url:"/models/Model.jsx",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/models/model-transformed.glb",revision:"f539976ea8492782d9bb356264065e5c"},{url:"/models/modelexp.glb",revision:"ccdcc62983edfef7b0a10ee7eb67f03d"},{url:"/models/room/scene.bin",revision:"08fb9df174417cab2cc34d8a05dea43b"},{url:"/models/room/scene.gltf",revision:"ced96a262d16c822420613d0997071e8"},{url:"/models/teacup_house.glb",revision:"61b3aee45cea0bc6a697d168cea41c25"},{url:"/oneko.gif",revision:"034bc135ffb787bc7e2168b10371dc90"},{url:"/oneko/oneko.js",revision:"6a192ef2ccb7eb3d2e137cdea821b9a5"},{url:"/portalfav.png",revision:"371e949a81954a9262b46178ba2b127d"},{url:"/robots.txt",revision:"4321de57d93aa4fd935c108f7348e7a8"},{url:"/streamingassets/aa/AddressablesLink/link.xml",revision:"c730c72d6e177220f2751202f787e5e2"},{url:"/streamingassets/aa/catalog.json",revision:"4612b7a4042caeff82cb1ad6be54c429"},{url:"/streamingassets/aa/settings.json",revision:"68b48b960693338ec1d327df4285188a"},{url:"/videos/herobg.mp4",revision:"514f990e8f9949378e36c3cf0b91508c"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:c,state:a})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const i=e.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));