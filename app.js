const money = n => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:2}).format(n);

function val(id){return Number(document.getElementById(id).value)||0}
function setResult(id,html){document.getElementById(id).innerHTML=html}

function gstCalc(){
  const amount=val("gstAmount"), rate=val("gstRate"), mode=document.querySelector('input[name="gstMode"]:checked').value;
  if(amount<0||rate<0){return setResult("gstResult","Please enter valid positive values.")}
  if(mode==="add"){
    const tax=amount*rate/100, total=amount+tax;
    setResult("gstResult",`GST: ${money(tax)}<br>Total: ${money(total)}`);
  }else{
    const base=amount/(1+rate/100), tax=amount-base;
    setResult("gstResult",`Original price before GST: ${money(base)}<br>GST included: ${money(tax)}`);
  }
}

function emiCalc(){
  const P=val("emiPrincipal"), annual=val("emiRate"), years=val("emiYears");
  if(P<=0||years<=0||annual<0)return setResult("emiResult","Please enter valid loan values.");
  const r=annual/12/100,n=years*12;
  const emi=r===0?P/n:P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
  const total=emi*n;
  setResult("emiResult",`Monthly EMI: ${money(emi)}<br>Total payment: ${money(total)}<br>Total interest: ${money(total-P)}`);
}

function percentageCalc(){
  const a=val("pctA"),b=val("pctB");
  setResult("pctResult",b===0?"The second value cannot be zero.":`${a}% of ${b} = <strong>${(a*b/100).toFixed(2)}</strong>`);
}

function ageCalc(){ 
  const raw=document.getElementById("dob").value;
  if(!raw)return setResult("ageResult","Select your date of birth.");
  const dob=new Date(raw+"T00:00:00"), now=new Date();
  if(dob>now)return setResult("ageResult","Date of birth cannot be in the future.");
  let y=now.getFullYear()-dob.getFullYear(), m=now.getMonth()-dob.getMonth(), d=now.getDate()-dob.getDate();
  if(d<0){m--;d+=new Date(now.getFullYear(),now.getMonth(),0).getDate()}
  if(m<0){y--;m+=12}
  setResult("ageResult",`Age: <strong>${y} years, ${m} months, ${d} days</strong>`);
}

function loanCalc(){
  const P=val("loanP"), r=val("loanR"), y=val("loanY");
  if(P<=0||y<=0||r<0)return setResult("loanResult","Please enter valid values.");
  const interest=P*(r/100)*y, total=P+interest;
  setResult("loanResult",`Simple-interest estimate: ${money(interest)} interest<br>Total repayment: ${money(total)}`);
}

function sipCalc(){
  const p=val("sipP"), annual=val("sipR"), years=val("sipY");
  if(p<=0||years<=0||annual<0)return setResult("sipResult","Please enter valid values.");
  const months=years*12, r=annual/12/100;
  const fv=r===0?p*months:p*((Math.pow(1+r,months)-1)/r)*(1+r);
  const invested=p*months;
  setResult("sipResult",`Invested: ${money(invested)}<br>Estimated value: ${money(fv)}<br>Estimated gain: ${money(fv-invested)}`);
}

function discountCalc(){
  const p=val("discP"), r=val("discR");
  if(p<0||r<0||r>100)return setResult("discResult","Enter a discount between 0% and 100%.");
  const discount=p*r/100, final=p-discount;
  setResult("discResult",`Discount: ${money(discount)}<br>Final price: ${money(final)}`);
}

function fuelCalc(){
  const distance=val("fuelD"), mileage=val("fuelM"), price=val("fuelP");
  if(distance<0||mileage<=0||price<0)return setResult("fuelResult","Please enter valid values.");
  const litres=distance/mileage, cost=litres*price;
  setResult("fuelResult",`Fuel needed: <strong>${litres.toFixed(2)} L</strong><br>Estimated cost: ${money(cost)}`);
}

document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("dob").valueAsDate=new Date(new Date().getFullYear()-20,0,1);

document.getElementById("search").addEventListener("input",e=>{
  const q=e.target.value.toLowerCase().trim();
  document.querySelectorAll(".calc-card").forEach(card=>{
    card.style.display=card.dataset.name.includes(q)?"":"none";
  });
});
document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("navLinks").classList.toggle("open"));
