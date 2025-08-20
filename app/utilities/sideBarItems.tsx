// import {ReactNode} from "react";
// import {BoxArrowLeft, Gear} from "react-bootstrap-icons";



// export interface SidebarItem {
//   id: string;
//   name: string;
//   icon: ReactNode | null;
//   link?: string;
//   urlPattern?: RegExp;
//   children?: Array<SidebarItem>;
//   position?: 'top' | 'bottom';
//   disable?: boolean;
// }

// export function getSidebarItems(): Array<SidebarItem> {
//     return [
//         {
//             id: "fc12d34b-09ad-4e6c-bfb6-17daec8a5678" as Uuid,
//             name: "Home",
//             link: "/admin",
//             urlPattern: /^\/admin(\?.*)?$/,
//             icon: <HomeSvg2 className="w-5 h-5 p-[1px]"/>,
//         },
//         {
//             id: "c415918a-86e4-47a3-95e2-b762d16448be" as Uuid,
//             name: "Products",
//             link: "/admin/products",
//             urlPattern: /^\/admin\/products(\/.*)?(\?.*)?$/,
//             icon: <OrderSvg className="w-5 h-5 p-[1px]"/>,
//             children: [
//                 {
//                     id: "97d29c28-a3e9-46d4-986d-cc90441181c3" as Uuid,
//                     name: "Collections",
//                     link: "/admin/collections",
//                     urlPattern: /\/admin\/collections(\?.*)?$/,
//                     icon: null
//                 }
//             ],
//         },
//         {
//             id: "942988d4-fa5c-41bd-ba3b-0eaa1e6abf41" as Uuid,
//             name: "Inventory",
//             link: "/admin/inventory",
//             urlPattern: /\/admin\/inventory(\?.*)?$/,
//             icon: <CustomSvg className="w-5 h-5 p-[1px]" />,
//         },
//         {
//             id: "f796f097-f1a7-4491-9830-a7e90c1d1ddf" as Uuid,
//             name: "Order",
//             icon: <OrderSvg className="w-5 h-5 p-[1px]"/>,
//             link: "/admin/orders",
//             urlPattern: /^\/admin\/orders(?!\/draft)(\/.*)?(\?.*)?$/,
//             children: [
//                 {
//                     id: "97226f10-174c-4802-a3cd-20be7276cdaa" as Uuid,
//                     name: "Draft",
//                     link: "/admin/orders/draft",
//                     urlPattern: /\/admin\/orders\/draft(\?.*)?$/,
//                     icon: null,
//                 },
//                 {
//                     id: "cebecc8d-b46b-412c-b922-280feb0fbbce" as Uuid,
//                     name: "Returns",
//                     link: "/admin/orders/returns",
//                     urlPattern: /\/admin\/orders\/returns(\?.*)?$/,
//                     icon: null,
//                     disable: false
//                 },
//             ],
//         },
//         {
//             id: "4dfc48df-24f2-4fc6-aead-94ea54706a71" as Uuid,
//             name: "Marketing",
//             icon: <MarketingSvg className="w-5 h-5 p-[1px]"/>,
//             position: "top",
//             disable: true
//         },
//         {
//             id: "937e6830-5bb2-496d-9e41-5ed6018d744a" as Uuid,
//             name: "Content",
//             icon: <ContentSvg className="w-5 h-5 p-[1px]"/>,
//             position: "top",
//             disable: true
//         },
//         {
//             id: "bb76a3f4-81cc-4b56-901d-cda41a78d234" as Uuid,
//             name: "Customers",
//             icon: <CustomerSvg className="w-5 h-5 p-[1px]"/>,
//             link: "/admin/customers",
//             urlPattern: /^\/admin\/customers(?!\/draft)(\/.*)?(\?.*)?$/,
//             position: "top",
//             disable: false
//         },
//         {
//             id: "5a7581c2-2db9-40c5-8d80-41f92c42c29b" as Uuid,
//             name: "Custom",
//             icon: <CustomSvg className="w-5 h-5 p-[1px]" />,
//             children: [
//                 {
//                     id: "d75ef1a9-34bb-4703-8e45-4b13e8f12011" as Uuid,
//                     name: "Metafields",
//                     link: "/admin/metafields",
//                     urlPattern: /\/admin\/metafields(\?.*)?$/,
//                     icon: null,
//                 }
//             ],
//         },
//         {
//             id: "c56ebc0a-baad-4d98-a6f4-120001eb2114" as Uuid,
//             name: "Settings",
//             link: "/admin/settings",
//             urlPattern: /\/admin\/settings(\?.*)?$/,
//             icon: <Gear className="w-5 h-5 p-[1px]"/>,
//             position: "bottom",
//             disable: true
//         },
//         {
//             id: "d7e3fb26-7ae7-4ebb-9017-3d7b84899783" as Uuid,
//             name: "Logout",
//             link: "/admin/sign-out",
//             urlPattern: /\/admin\/sign-out(\?.*)?$/,
//             icon: <BoxArrowLeft className="w-5 h-5 p-[1px]"/>,
//             position: "bottom",
//         }
//     ];
// }