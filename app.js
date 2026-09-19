const defaultProducts=[
{id:"nova",name:"Nova Portfolio",category:"Portfolio",price:399,github:"https://github.com/",description:"A sharp personal portfolio with animated sections and responsive layout.",available:true},
{id:"shopwave",name:"ShopWave Store",category:"E-commerce",price:799,github:"https://github.com/",description:"Modern storefront starter with product cards, cart-ready UI and mobile layout.",available:true},
{id:"dashx",name:"DashX Dashboard",category:"Dashboard",price:599,github:"https://github.com/",description:"Dark analytics dashboard UI for SaaS and admin projects.",available:true},
{id:"agency",name:"Pixel Agency",category:"Business",price:499,github:"https://github.com/",description:"High-conversion agency landing page with services and case-study sections.",available:true}
];
const KEY="cltx4_products";
function products(){const x=localStorage.getItem(KEY);if(!x){localStorage.setItem(KEY,JSON.stringify(defaultProducts));return defaultProducts}try{return JSON.parse(x)}catch{return defaultProducts}}
function money(n){return "₱"+Number(n).toLocaleString("en-PH")}
function initials(n){return n.split(/\s+/).map(x=>x[0]).slice(0,2).join("").toUpperCase()}
function render(){
 let list=products(), q=(document.querySelector("#search")?.value||"").toLowerCase(), sort=document.querySelector("#sort")?.value;
 list=list.filter(p=>(p.name+" "+p.category+" "+p.description).toLowerCase().includes(q));
 if(sort==="low")list.sort((a,b)=>a.price-b.price); if(sort==="high")list.sort((a,b)=>b.price-a.price);
 const grid=document.querySelector("#productsGrid"); if(!grid)return;
 grid.innerHTML=list.map(p=>`<article class="product ${p.available?"":"sold"}"><div class="product-cover"><b>${initials(p.name)}</b></div><div class="product-body"><div class="tag">${p.category}</div><h3>${p.name}</h3><p>${p.description}</p><div class="product-foot"><span class="price">${money(p.price)}</span>${p.available?`<a class="mini-btn" href="${p.github||"#"}" target="_blank" rel="noopener">View project</a>`:`<span class="mini-btn">Sold out</span>`}</div></div></article>`).join("")||`<p style="color:#8ba8b6">No products found.</p>`;
 document.querySelector("#heroCount").textContent=products().length;
}
document.querySelector("#search")?.addEventListener("input",render);document.querySelector("#sort")?.addEventListener("change",render);render();
