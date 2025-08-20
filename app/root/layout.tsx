import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Links, Meta, Scripts, ScrollRestoration } from "react-router";
import {
  AllCommunityModule,
  AllEnterpriseModule,
  ModuleRegistry,
} from "ag-grid-enterprise";
import "~/tailwind.css";

ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <meta
                    name="google-site-verification"
                    content="L7ZhMRbuO7YN5tTCwSHIrtOZHVgliNS9DBGM0d57YRU"
                /> */}
        <Meta />
        {/* <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PF84VVX84W"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-PF84VVX84W');`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                        (function(w,d,s,l,i){w[l]=w[l]||[];
                        w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                        var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                        j.async=true;
                        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                        f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-KP687VFC');
                    `,
          }}
        /> */}
        <Links />
      </head>

      <body
        style={{
          backgroundColor: "#FFF",
          // color: "#000",
          display: "none",
        }}
        className="!block"
      >
        <MantineProvider defaultColorScheme="light">
       
            {children}
           
         
          <Notifications position="top-right" autoClose={5000} zIndex={1000} />
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
