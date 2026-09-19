const KEY="cltx4_products", PASS="134270911";
const defaultProducts=[
{id:"nova",name:"Nova Portfolio",category:"Portfolio",price:399,github:"https://github.com/",description:"A sharp personal portfolio with animated sections and responsive layout.",available:true},
{id:"shopwave",name:"ShopWave Store",category:"E-commerce",price:799,github:"https://github.com/",description:"Modern storefront starter with product cards, cart-ready UI and mobile layout.",available:true},
{id:"dashx",name:"DashX Dashboard",category:"Dashboard",price:599,github:"https://github.com/",description:"Dark analytics dashboard UI for SaaS and admin projects.",available:true},
{id:"agency",name:"Pixel Agency",category:"Business",price:499,github:"https://github.com/",description:"High-conversion agency landing page with services and case-study sections.",available:true}
];
function get(){try{return JSON.parse(localStorage.getItem(KEY))||defaultProducts}catch{return defaultProducts}}
function set(x){localStorage.setItem(KEY,JSON.stringify(x))}
function money(n){return "₱"+Number(n).toLocaleString("en-PH")}
const login=document.querySelector("#login"),dash=document.querySelector("#dashboard");
if(sessionStorage.getItem("cltx4_admin")==="1"){login.classList.add("hidden");dash.classList.remove("hidden");render()}
document.querySelector("#loginForm").addEventListener("submit",e=>{e.preventDefault();if(document.querySelector("#password").value===PASS){sessionStorage.setItem("cltx4_admin","1");login.classList.add("hidden");dash.classList.remove("hidden");render()}else document.querySelector("#loginError").textContent="Incorrect password."});
document.querySelector("#logout").addEventListener("click",()=>{sessionStorage.removeItem("cltx4_admin");location.reload()});
const dlg=document.querySelector("#productDialog"),form=document.querySelector("#productForm");
function openForm(p=null){form.reset();document.querySelector("#productId").value=p?.id||"";document.querySelector("#dialogTitle").textContent=p?"Edit website":"Add website";if(p){for(const k of ["name","category","price","github","description","available"])document.querySelector("#"+k).value=p[k]}document.querySelector("#deleteProduct").style.display=p?"block":"none";dlg.showModal()}
document.querySelector("#newProduct").addEventListener("click",()=>openForm());
document.querySelector("#deleteProduct").addEventListener("click",()=>{const id=document.querySelector("#productId").value;if(id&&confirm("Delete this product?")){set(get().filter(p=>p.id!==id));dlg.close();render()}});
form.addEventListener("submit",e=>{e.preventDefault();const id=document.querySelector("#productId").value||crypto.randomUUID();const p={id,name:document.querySelector("#name").value.trim(),category:document.querySelector("#category").value.trim(),price:Number(document.querySelector("#price").value),github:document.querySelector("#github").value.trim(),description:document.querySelector("#description").value.trim(),available:document.querySelector("#available").value==="true"};const list=get(),i=list.findIndex(x=>x.id===id);if(i>=0)list[i]=p;else list.unshift(p);set(list);dlg.close();render()});
function render(){
 const all=get(),q=(document.querySelector("#adminSearch").value||"").toLowerCase(),list=all.filter(p=>(p.name+" "+p.category).toLowerCase().includes(q));
 document.querySelector("#statProducts").textContent=all.length;document.querySelector("#statValue").textContent=money(all.reduce((s,p)=>s+p.price,0));document.querySelector("#statAvailable").textContent=all.filter(p=>p.available).length;
 document.querySelector("#adminList").innerHTML=list.map(p=>`<div class="admin-row"><div><b>${p.name}</b><small>${p.category}</small></div><div class="price">${money(p.price)}</div><div class="availability">${p.available?"Available":"Sold out"}</div><div class="category">${p.github?`<a class="mini-btn" target="_blank" href="${p.github}">GitHub</a>`:"—"}</div><div class="admin-actions"><button class="mini-btn edit" data-id="${p.id}">Edit</button></div></div>`).join("")||"<p>No products found.</p>";
 document.querySelectorAll(".edit").forEach(b=>b.addEventListener("click",()=>openForm(get().find(p=>p.id===b.dataset.id))));
}
document.querySelector("#adminSearch").addEventListener("input",render);
