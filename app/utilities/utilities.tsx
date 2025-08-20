import type {MetaFunction} from "react-router";


export function getRequiredEnvironmentVariable(variable: string): string {
    const value = process.env[variable];

    if (value == null) {
        throw new Error(`Required environment variable ${variable} not found!`);
    }

    return value;
}

export function getFormattedIndianRuppes(rupees: number) {
    const formatter = Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    });

    return formatter.format(rupees);
}


export function formatRating(value: number): string {
    if (value < 1000) return value.toString();
    return (value / 1000).toFixed(1).replace(/\.0$/, "") + "k";
}

export function getRatingPercentage(
    reviews: {rating: number}[],
    targetRating: number,
): number {
    if (reviews.length === 0) return 0;

    const matchingCount = reviews.filter(
        (review) => review.rating === targetRating,
    ).length;

    const percentage = (matchingCount / reviews.length) * 100;
    return Math.round(percentage); // or use .toFixed(1) if you want decimal
}

export function getFormattedReviewCount(
    reviews: {rating: number}[],
    desiredRating: number,
): string {
    const count = reviews.filter(
        (review) => review.rating === desiredRating,
    ).length;

    if (count < 1000) return count.toString();

    return (count / 1000).toFixed(1).replace(/\.0$/, "") + "k";
}




export const shareContent = ({title, text}: {title: string; text: string}) => {
    const url = window.location.href;
    const fullText = `${title}\n\n${url}`;
    const encodedText = encodeURIComponent(fullText);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
};


export function createMetaTags(
    url: string | null,
    title: string | null,
    description: string | null,
    image: ImageDetails | null,
    structuredData: Array<any> | null,
): ReturnType<MetaFunction> {
    const metaTags = [];

    // metaTags.push([
    //     {
    //         name: "robots",
    //         content:
    //             "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    //     },
    // ]);
    metaTags.push([
        {
            name: "google-site-verification",
            content: "IGgnRBkgNyJNoii8pylG6v7QvG2JTNvHTgfOJQHWjrM",
        },
    ]);

    if (url != null) {
        metaTags.push([
            {
                tagName: "link",
                rel: "canonical",
                href: url,
            },
            {
                property: "og:url",
                content: url,
            },
        ]);
    }

    if (title != null) {
        metaTags.push([
            {
                title: title,
            },
            {
                property: "og:title",
                content: title,
            },

            // {
            //     property: "twitter:title",
            //     content: title,
            // },
        ]);
    }

    if (description != null) {
        metaTags.push([
            {
                name: "description",
                content: description,
            },
            {
                property: "og:description",
                content: description,
            },

            // {
            //     property: "twitter:description",
            //     content: description,
            // },
        ]);
    }

    if (image != null) {
        metaTags.push([
            {
                property: "og:image",
                content: image == null ? "" : image.variants[0].url,
            },
            {
                property: "twitter:image",
                content: image == null ? "" : image.variants[0].url,
            },
        ]);
    }

    if (structuredData != null && structuredData.length > 0) {
        structuredData.forEach((item) => {
            metaTags.push([
                {
                    "script:ld+json": item,
                },
            ]);
        });
    }

    return metaTags;
}