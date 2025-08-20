import { LoaderFunction } from "react-router";

export type LoaderData = {
  canonicalUrl: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const cleanUrl = "https://" + url.pathname;

  // explore card data
  //   const exploreCardDataResult = await getExploreSectionData();
  //   if (exploreCardDataResult.success === false) {
  //     return exploreCardDataResult;
  //   }
  //   const exploreCardData = exploreCardDataResult.data;

  //   const processVariant = async (variant: {
  //     id: number;
  //     title: string;
  //     imageUrl: Uuid;
  //   }) => {
  //     const obj = {
  //       [variant.imageUrl]: variant.imageUrl,
  //     };

  //     await queryJanusImageData(obj);
  //     variant.imageUrl = obj[variant.imageUrl];
  //   };

  //   await Promise.all(exploreCardData.map(processVariant));

  //   // best fit data
  //   const bestFitDataResult = await getBestFitSectionData();
  //   if (bestFitDataResult.success === false) {
  //     return bestFitDataResult;
  //   }
  //   const bestFitData = bestFitDataResult.data;
  //   await Promise.all(bestFitData.map(processVariant));

  //   const blogsResult = await getBlogs();
  //   if (blogsResult.success === false) {
  //     return blogsResult;
  //   }
  //   const blogs = blogsResult.data;

  const loaderData = {
    canonicalUrl: cleanUrl,
  };

  return loaderData;
};
