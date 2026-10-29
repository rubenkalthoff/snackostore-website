import {fetchCatalog} from "../lib/catalog-client.mjs";
export default async function handler(request){
 const noStore={"Cache-Control":"no-store","Netlify-CDN-Cache-Control":"no-store","X-Content-Type-Options":"nosniff"};
 if(request.method!=="GET")return Response.json({error:"Methode nicht erlaubt."},{status:405,headers:{...noStore,Allow:"GET"}});
 if(new URL(request.url).search)return Response.json({error:"Ungültige Anfrage."},{status:400,headers:noStore});
 try{
  const catalog=await fetchCatalog({BEANTO_CATALOG_URL:process.env.BEANTO_CATALOG_URL,BEANTO_CATALOG_KEY:process.env.BEANTO_CATALOG_KEY,BEANTO_LOCATION_CODE:process.env.BEANTO_LOCATION_CODE});
  return Response.json(catalog,{headers:{"Cache-Control":"public, max-age=43200, must-revalidate","Netlify-CDN-Cache-Control":"public, max-age=43200, stale-while-revalidate=60","X-Content-Type-Options":"nosniff"}});
 }catch{return Response.json({error:"Die aktuelle Produktauswahl ist vorübergehend nicht verfügbar. Bitte schaue direkt im Store nach."},{status:503,headers:noStore});}
}
export const config={path:"/api/products",method:"GET"};
