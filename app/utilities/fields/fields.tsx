import {ReactElement} from "react";
import {Uuid} from "~/common--type-definitions/typeDefinitions";
import {
    CustomerSvg,
    CustomSvg,
    HashIcon,
    MultiLineTextIcon,
    OrderSvg,
    ProductSvgMetafield,
    RichTextIcon,
    TextIcon,
    VariantSvgMetafield
} from "~/utilities/svg";
import {Variant} from "~/routes/admin/products/$productId/variants/_index/loader.server";
import {ImageDetails} from "~/janus--react/utilities/typeDefinitions";

export type EnumDictionary<T extends string | symbol | number, U> = { [t in T]: U; }

export enum MetaFields {
    SingleLineText = "074a1c51-5829-4efc-a3d1-3242e3058dab",
    MultiLineText = "279896de-0ee1-4e5a-8eea-ce1f46556e2e",
    RichText = "e37e53c2-827f-428e-9039-8b7050996624",
    Integer = "f1b54455-8705-4ed6-a675-ad2c278ad836",
    Decimal = "852972f6-9153-4622-8cc4-dc9062955ec0",
    ImageWithText = "4fcd82fe-f358-43fa-9deb-66aac9faa12f",
    FAQ = "8aa11821-6f22-4bb4-b0fb-4fc691b31abc",
};

export const metaFieldDetails:EnumDictionary<MetaFields, {
    label: string;
    icon: ReactElement;
    groupName: string;
}> = {
    [MetaFields.SingleLineText]: {
        label: "Single Line Text",
        icon: <TextIcon />,
        groupName: "Text"
    },
    [MetaFields.MultiLineText]: {
        label: "Multi Line Text",
        icon: <MultiLineTextIcon />,
        groupName: "Text"
    },
    [MetaFields.RichText]: {
        label: "Rich Text",
        icon: <RichTextIcon />,
        groupName: "Text"
    },
    [MetaFields.Integer]: {
        label: "Integer",
        icon: <HashIcon />,
        groupName: "Number"
    },
    [MetaFields.Decimal]: {
        label: "Decimal",
        icon: <HashIcon />,
        groupName: "Number"
    },
    [MetaFields.ImageWithText]: {
        label: "Image with Text",
        icon: <TextIcon />,
        groupName: "Text"
    },
    [MetaFields.FAQ]: {
        label: "FAQ",
        icon: <TextIcon />,
        groupName: "Text"
    }
};

export enum ImagePreviewStyle {
    First = "bcf870e6-e4ea-4489-8f5f-1d417ccdd2ce",
    Second = "88c5a8e2-2547-4f15-9e49-316d0de3c27d",
    Third = "9ff30d58-a8c6-41ba-812e-12961d326b28",
    Default = "da7ac139-e822-4a3c-bb54-b81645178cb0"
};

export enum ResourcesType {
    Products = "84ae3674-3051-4e9c-b734-c35aa1f647cf",
    Variants = "83ce56d2-126a-48b0-abed-0135a166d70a",
    Orders = "846bcf4e-84ea-4c73-922a-4e63a054b792",
    Collections = "6194806f-3f4a-49a3-8985-e194e92b125e",
    Customers = "90d394fc-99a8-4e72-af17-fb2023a5e4be"
}

export const resourceTypeSlug:EnumDictionary<ResourcesType, string> = {
    [ResourcesType.Products]: "products",
    [ResourcesType.Variants]: "variants",
    [ResourcesType.Orders]: "orders",
    [ResourcesType.Collections]: "collections",
    [ResourcesType.Customers]: "customers"
}

export const resourceTypeMetadata:EnumDictionary<ResourcesType, {
    label: string,
    icon: ReactElement
}> = {
    [ResourcesType.Products]: {
        label: "Product",
        icon: <ProductSvgMetafield className="w-[18px] h-[18px]"/>
    },
    [ResourcesType.Variants]: {
        label: "Variant",
        icon: <VariantSvgMetafield className="w-[18px] h-[18px]"/>
    },
    [ResourcesType.Collections]: {
        label: "Collection",
        icon: <CustomSvg fill="#18191B" className="w-[18px] h-[18px]"/>
    },
    [ResourcesType.Customers]: {
        label: "Customer",
        icon: <CustomerSvg fill="#18191B" className="w-[18px] h-[18px]"/>
    },
    [ResourcesType.Orders]: {
        label: "Orders",
        icon: <OrderSvg fill="#18191B" className="w-[18px] h-[18px]"/>
    }
}

export const TaxRates = [0, 3, 5, 12, 18, 28];

export const defaultAccessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uSWQiOiJhY2NlMjQ3Zi01ZmNkLTRkMTYtYTMxMC03ZmYwZTllMjc4NWEifQ.UnUDvtLuXcA3oJd2_Y8FhGNeKrWlBs1eXA_SmiIZuAk";

export type Address = {
    id: Uuid;
    name: string;
    phoneNumber: string;
    houseNumber: string;
    area: string;
    city: string;
    state: string;
    pincode: string | null;
    landmark: string | null;
    isShippingAddress: boolean;
    isBillingAddress: boolean;
    isDefault: boolean;
};
export type Customer = {
    id: Uuid;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    dateOfBirth: string | null;
    isB2b: boolean;
    gstinNumber: string | null;
    phoneNumber: string;
    addresses: Address[];
    tags: {
        tagId: Uuid;
        _order: number;
        id: Uuid;
        _parentId: Uuid;
    }[];
    createdAt: string;
    updatedAt: string;
};

export type Review = {
    id: Uuid;
    variantId: Uuid;
    customerId: Uuid;
    title: string;
    description: string | null;
    images: {
        id: Uuid;
        imageId: Uuid;
        _order: number;
        _parentId: Uuid;
        imageDetails: ImageDetails;
    }[];
    rating: number;
    createdAt: string;
    updatedAt: string;
};

export type CustomerWithOrderDetails = Customer & {
    totalOrderCount: number;
    totalBilledAmount: number;
};

export type WishlistItem = {
    id: Uuid;
    customerId: Uuid;
    variantId: Uuid;
    createdAt: string;
    updatedAt: string;
};

export type CartItem = {
    id: Uuid;
    customerId: Uuid;
    variantId: Uuid;
    quantity: number;
    createdAt: string;
    updatedAt: string;
}

export type Order = {
    id: Uuid;
    slug: string;
    orderStatus: string;
    amount: number;
    deliveryCharge: number;
    customerId: Uuid;
    paymentMethod: string;
    paymentStatus: string;
    discountType: string | null;
    discountValue: number | null;
    razorpayOrderId: string | null;
    razorpayPaymentId: string | null;
    billingDetailsArea: string;
    billingDetailsCity: string;
    billingDetailsName: string;
    billingDetailsPhoneNumber: string;
    billingDetailsPincode: string;
    billingDetailsState: string;
    billingDetailsHouseNumber: string;
    billingDetailsLandmark: string | null;
    shippingDetailsArea: string;
    shippingDetailsCity: string;
    shippingDetailsName: string;
    shippingDetailsPhoneNumber: string;
    shippingDetailsPincode: string;
    shippingDetailsState: string;
    shippingDetailsHouseNumber: string;
    shippingDetailsLandmark: string | null;
    isBillingSameAsShipping: boolean;
    createdAt: string;
    updatedAt: string;
    manualTransactionId: string | null;
    tags: {
        tagId: Uuid;
        _order: number;
        id: Uuid;
        _parentId: Uuid;
    }[];
    orderType: string | null;
};

export type ReturnItem = {
    id: Uuid;
    returnId: Uuid;
    orderItemId: Uuid;
    status: string;
    reason: string;
    description: string | null;
    trackingId: string | null;
    trackingUrl: string | null;
    carrier: string | null;
    images: {
        imageId: Uuid;
        imageDetails: any;
        _order: number;
        id: Uuid;
        _parentId: Uuid;
    }[];
}

export type Return = {
    id: Uuid;
    slug: string;
    orderId: Uuid;
    customerId: Uuid;
    razorpayRefundId: string | null;
    returnStatus: string;
    refundAmount: number;
    restockingFee: number;
    returnShippingFee: number;
    refundMethod: string | null;
    refundStatus: string;
    upiId: string | null;
    bankAccountNumber: string | null;
    ifscCode: string | null;
    createdAt: string;
    updatedAt: string;
    exchangeId: Uuid | null;
    exchangeType: string | null;
    returnItems: ReturnItem[];
};

export type Cancellation = {
    id: Uuid;
    orderId: Uuid;
    reason: string;
    refundAmount: number;
    refundStatus: string;
    refundMethod: string | null;
    cancellationFee: number | null;
    razorpayRefundId: string | null;
    createdAt: string;
};

export type CancellationWithCustomerDetails = Cancellation & {
    customerDetails: Customer;
    razorpayOrderId: string | null;
    razorpayPaymentId: string | null;
}

export type ReturnWithOrderDetails = Return & {
    orderSlug: string;
    razorpayOrderId: string | null;
    razorpayPaymentId: string | null;
}

export type ReturnWithCustomerDetails = ReturnWithOrderDetails & {
    customerDetails: Customer;
}

export type DraftOrderItem = {
    variantId: Uuid;
    quantity: number;
    orderItemIds: Uuid[];
    trackingId: string | null;
    trackingUrl: string | null;
    carrier: string | null;
    status: string;
    displayName?: string;
    sellingPrice: number;
    marketPrice: number | null;
};

export type DraftOrder = Order & {
    orderItems: DraftOrderItem[];
    itemCount: number;
};

export type DraftOrderItemWithReturnDetails = DraftOrderItem & {
    returnItemIds: Uuid[];
    returnStatus: string | null;
    returnId: Uuid | null;
    returnSlug: string | null;
    newOrderId: Uuid | null;
    newOrderSlug: string | null;
    newOrderStatus: string | null;
    newOrderItemStatus: string | null;
    exchangeId: Uuid | null;
    exchangeType: string | null;
};

export type DraftOrderWithCancellationAndReturnDetails = Omit<DraftOrder, "orderItems"> & {
    reason: string | null;
    refundAmount: number | null;
    refundStatus: string | null;
    refundMethod: string | null;
    refundRequestedAt: string | null;
    exchangeId: Uuid | null;
    exchangeType: string | null;
    originalOrderId: Uuid | null;
    originalOrderSlug: string | null;
    razorpayRefundId: string | null;
    cancellationFee: number | null;
    cancellationId: Uuid | null;
    upiId: string | null;
    bankAccountNumber: string | null;
    ifscCode: string | null;
    orderItems: DraftOrderItemWithReturnDetails[];
    customerDetails: Customer;
};

export type DraftOrderWithCustomerDetails = DraftOrder & {
    customerDetails: Customer;
};

export type DraftOrderWithCustomerDetailsAndRefundDetails = DraftOrderWithCustomerDetails & {
    reason: string | null;
    refundAmount: number | null;
    refundStatus: string | null;
    refundMethod: string | null;
    refundRequestedAt: string | null;
};

export type VariantWithQuantity = Variant & {
    quantity: number;
    soldPrice: number;
};

export type MetaField = {
    id: Uuid;
    displayName: string;
    type: string;
    isPinned: boolean;
    storefrontAccess: boolean;
    slug: string;
    description: string;
    enableFilter: boolean;
    validation: Object;
};

export const OrderStatusStyling : EnumDictionary<string, {style: string, text: string}> = {
    delivered: {
        style: "bg-green-100 text-green-700",
        text: "Delivered"
    },
    draft: {
        style: "bg-gray-100 text-gray-700",
        text: "Draft"
    },
    pending:{
        style: "bg-yellow-100 text-yellow-700",
        text: "Pending"
    },
    placed: {
        style: "bg-yellow-100 text-yellow-700",
        text: "Unshipped"
    },
    "partially-shipped":{
        style: "bg-orange-100 text-orange-700",
        text: "Partially Shipped"
    },
    shipped: {
        style: "bg-blue-100 text-blue-700",
        text: "Shipped"
    },
    unshipped:{
        style: "bg-yellow-100 text-yellow-700",
        text: "Unshipped"
    },
    cancelled: {
        style: "bg-red-100 text-red-700",
        text: "Cancelled"
    },
    created: {
        style: "bg-gray-100 text-gray-700",
        text: "Not Confirmed"
    }
}

export const OrderItemStatusStyling : EnumDictionary<string, {style: string, text: string}> = {
    delivered: {
        style: "bg-green-100 text-green-700",
        text: "Delivered"
    },
    draft: {
        style: "bg-gray-100 text-gray-700",
        text: "Draft"
    },
    shipped: {
        style: "bg-blue-100 text-blue-700",
        text: "Shipped"
    },
    unshipped:{
        style: "bg-yellow-100 text-yellow-700",
        text: "Unshipped"
    },
    unfullfilled: {
        style: "bg-yellow-100 text-yellow-700",
        text: "Unfullfilled"
    },
    fullfilled: {
        style: "bg-blue-100 text-blue-700",
        text: "Fullfilled"
    },
    created: {
        style: "bg-yellow-100 text-yellow-700",
        text: "Unfullfilled"
    },
    cancelled: {
        style: "bg-red-100 text-red-700",
        text: "Cancelled"
    }
};

export const ReturnStatusStyling : EnumDictionary<string, {style: string, text: string}> = {
    requested: {
        style: "bg-yellow-100 text-yellow-700",
        text: "Requested"
    },
    "request-approved": {
        style: "bg-blue-100 text-blue-700",
        text: "Request Approved"
    },
    "request-rejected": {
        style: "bg-red-100 text-red-700",
        text: "Request Rejected"
    },
    "return-partially-in-transit": {
        style: "bg-orange-100 text-orange-700",
        text: "Return Partially In Transit"
    },
    "return-in-transit": {
        style: "bg-orange-100 text-orange-700",
        text: "Return In Transit"
    },
    returned: {
        style: "bg-green-100 text-green-700",
        text: "Returned"
    }
}

export const ReturnItemStatusStyling : EnumDictionary<string, {style: string, text: string}> = {
    requested: {
        style: "bg-yellow-100 text-yellow-700",
        text: "Requested"
    },
    returned: {
        style: "bg-green-100 text-green-700",
        text: "Returned"
    },
    "request-approved": {
        style: "bg-blue-100 text-blue-700",
        text: "Request Approved"
    },
    "request-rejected": {
        style: "bg-red-100 text-red-700",
        text: "Request Rejected"
    },
    "return-in-transit": {
        style: "bg-orange-100 text-orange-700",
        text: "Return In Transit"
    }
}

export const RefundStatusStyling: EnumDictionary<string, {style: string, text: string}> = {
    pending: {
        text: "Pending",
        style: "text-yellow-600"
    },
    processed: {
        text: "Processed",
        style: "text-green-600"
    },
    failed: {
        text: "Failed",
        style: "text-red-600"
    },
    "not-required": {
        text: "Not Required",
        style: "text-gray-600"
    }
}