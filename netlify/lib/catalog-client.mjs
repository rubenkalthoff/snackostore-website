// Strict projection: never forward the raw upstream response or its error text.
export function projectCatalog(value,expectedLocation){
 if(!value||value.version!=="1"||!value.location||value.location.code!==expectedLocation||typeof value.location.name!=="string"||!Array.isArray(value.products)||value.products.length>10000||!Number.isFinite(Date.parse(value.generatedAt)))throw Error("Invalid catalog");
 const products=value.products.map(p=>{
  if(!p||typeof p.beaId!=="string"||p.beaId.length>100||typeof p.name!=="string"||p.name.length>500||typeof p.priceGross!=="number"||!Number.isFinite(p.priceGross)||p.priceGross<=0||p.currency!=="EUR"||!["available","sold_out","unknown"].includes(p.availability))throw Error("Invalid product");
  for(const label of [p.category,p.subcategory])if(label!==null&&(typeof label!=="string"||label.length>200))throw Error("Invalid category");
  return {beaId:p.beaId,name:p.name,category:p.category,subcategory:p.subcategory,priceGross:p.priceGross,currency:"EUR",availability:p.availability};
 });
 return {version:"1",generatedAt:value.generatedAt,location:{code:value.location.code,name:value.location.name},products};
}
export async function fetchCatalog(env,fetcher=fetch){
 const url=new URL(env.BEANTO_CATALOG_URL??"");
 const key=env.BEANTO_CATALOG_KEY,location=env.BEANTO_LOCATION_CODE;
 if(url.protocol!=="https:"||url.username||url.password||url.search||url.hash||!/^\/api\/v1\/website\/[0-9a-f-]{36}\/catalog$/.test(url.pathname)||!/^beanto_web_[A-Za-z0-9_-]{43}$/.test(key??"")||!location)throw Error("Catalog not configured");
 const response=await fetcher(url,{headers:{Authorization:"Bearer "+key,Accept:"application/json"},redirect:"error",signal:AbortSignal.timeout(15000),cache:"no-store"});
 if(!response.ok||!response.headers.get("content-type")?.includes("application/json"))throw Error("Catalog unavailable");
 return projectCatalog(await response.json(),location);
}
