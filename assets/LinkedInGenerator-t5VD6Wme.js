import{c as A,r,j as e,B as i,h as p,a as L,p as M}from"./index-AkSKL2py.js";import{C as G,b as R,c as H,a as W}from"./card-CY-zzQq-.js";import{B as O}from"./badge-lVB91rgN.js";import{I as U}from"./input-CTMVgzIS.js";import{L as y}from"./label-Dl4kSm4a.js";import{T as F,a as Y,b as B,c as z}from"./tabs-eUNTzc95.js";import{b as w,a as D}from"./index-B8w0GRkn.js";import{m as o}from"./ScrollReveal-DVV3rLyB.js";import{S as V}from"./sparkles-DGQ9GOJH.js";import{F as $}from"./file-text-VGffDUVx.js";import{C as q}from"./fullstack_master_logo_1764259679495-Dh4WcW41.js";import{C as J}from"./copy-BGi8Xjuo.js";import"./Footer-V3yeB3Jk.js";import"./Combination-CJ03dG58.js";import"./users-DpmXXlNX.js";import"./separator-CDsboe1a.js";import"./calendar-CKGzi9Xk.js";import"./map-pin-DVkB6B73.js";import"./clock-Do-7692y.js";import"./mail-B7R16LIs.js";import"./shield-CiQo4OuT.js";import"./circle-check-big-BnZdafXN.js";import"./star-D9ZepwNQ.js";/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=A("WandSparkles",[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]]),Q="LinkedIn Viral Post Generator",X="Turn your career story into a viral LinkedIn post in 30 seconds",Z="AI-Powered",ee=[{id:"career-milestone",name:"Career Milestone",description:"Share a promotion, new job, or achievement",template:`I just [MILESTONE] and here's what I learned:

[LESSON_1]
[LESSON_2]
[LESSON_3]

The biggest surprise? [SURPRISE]

If you're working toward [GOAL], remember:

→ [TIP_1]
→ [TIP_2]
→ [TIP_3]

What's the best career advice you've ever received?

#CareerGrowth #TechLeadership #FAANG`,fields:[{id:"MILESTONE",label:"What did you achieve?",placeholder:"got promoted to Staff Engineer at Google"},{id:"LESSON_1",label:"Lesson 1",placeholder:"Technical skills got me in the door"},{id:"LESSON_2",label:"Lesson 2",placeholder:"Communication got me to the next level"},{id:"LESSON_3",label:"Lesson 3",placeholder:"Mentorship accelerated everything"},{id:"SURPRISE",label:"Biggest surprise",placeholder:"The interview was more about leadership than coding"},{id:"GOAL",label:"What goal are readers working toward?",placeholder:"a senior tech role"},{id:"TIP_1",label:"Tip 1",placeholder:"Document your impact with metrics"},{id:"TIP_2",label:"Tip 2",placeholder:"Practice storytelling, not just answers"},{id:"TIP_3",label:"Tip 3",placeholder:"Find a mentor who's been there"}]},{id:"rejection-success",name:"Rejection to Success",description:"Share how you bounced back from failure",template:`I was rejected from [COMPANY] in [YEAR].

Today, I [CURRENT_SUCCESS].

Here's what changed:

1. [CHANGE_1]
2. [CHANGE_2]
3. [CHANGE_3]

The rejection felt like the end. It was actually the beginning.

If you're facing rejection right now:

→ It's not about you, it's about fit
→ Every 'no' teaches you something
→ Your next opportunity might be better

What rejection turned into your biggest success?

#Rejection #GrowthMindset #TechCareers`,fields:[{id:"COMPANY",label:"Company that rejected you",placeholder:"Amazon"},{id:"YEAR",label:"Year of rejection",placeholder:"2019"},{id:"CURRENT_SUCCESS",label:"Where are you now?",placeholder:"I'm a Senior Manager at AWS"},{id:"CHANGE_1",label:"What changed? #1",placeholder:"I got a coach who helped me see my blind spots"},{id:"CHANGE_2",label:"What changed? #2",placeholder:"I practiced 50+ mock interviews"},{id:"CHANGE_3",label:"What changed? #3",placeholder:"I learned to tell my story with impact"}]},{id:"interview-tips",name:"Interview Tips",description:"Share valuable interview advice",template:`I've done [NUMBER] interviews at FAANG companies.

Here are [TIP_COUNT] things I wish I knew earlier:

1. [TIP_1]

2. [TIP_2]

3. [TIP_3]

4. [TIP_4]

5. [TIP_5]

The biggest myth? [MYTH]

The truth: [TRUTH]

Save this for your next interview prep.

#InterviewTips #FAANG #TechCareers #CareerAdvice`,fields:[{id:"NUMBER",label:"How many interviews?",placeholder:"30+"},{id:"TIP_COUNT",label:"Number of tips",placeholder:"5"},{id:"TIP_1",label:"Tip 1",placeholder:"Your resume is just a conversation starter"},{id:"TIP_2",label:"Tip 2",placeholder:"STAR format is mandatory, not optional"},{id:"TIP_3",label:"Tip 3",placeholder:"Ask questions that show you've done research"},{id:"TIP_4",label:"Tip 4",placeholder:"Silence is okay - take time to think"},{id:"TIP_5",label:"Tip 5",placeholder:"Always negotiate the first offer"},{id:"MYTH",label:"Common myth",placeholder:"You need to code perfectly in interviews"},{id:"TRUTH",label:"The truth",placeholder:"They care more about your thought process"}]}],te={title:"Want More Career Content?",description:"Get weekly interview tips and career advice delivered to your WhatsApp",buttonText:"Join My WhatsApp Insider List",whatsappMessage:"Hi Rupesh! I used your LinkedIn Post Generator and loved it. I'd like to join your WhatsApp insider list for career tips!"},ae="I just created a viral LinkedIn post with FullStack Master's free generator! Try it yourself:",T={title:Q,subtitle:X,badge:Z,templates:ee,cta:te,sharePrompt:ae};function Ie(){const[h,f]=r.useState(T.templates[0].id),[l,m]=r.useState({}),[d,u]=r.useState(""),[v,b]=r.useState(!1),[N,g]=r.useState(!1),{templates:s,cta:x,title:j,subtitle:k,badge:I}=T,{contact:C}=M,n=s.find(t=>t.id===h)||s[0],S=(t,a)=>{m({...l,[t]:a})},_=()=>{let t=n.template;n.fields.forEach(a=>{const c=l[a.id]||a.placeholder;t=t.replace(new RegExp(`\\[${a.id}\\]`,"g"),c)}),u(t),g(!0),p("linkedin_post_generated","engagement",n.id)},P=async()=>{await navigator.clipboard.writeText(d),b(!0),p("linkedin_post_copied","engagement",n.id),setTimeout(()=>b(!1),2e3)},E=()=>{m({}),u(""),g(!1)};return e.jsx("section",{id:"linkedin-generator",className:"py-12 md:py-16 bg-gradient-to-b from-background via-blue-50/30 dark:via-blue-950/10 to-background","data-testid":"section-linkedin-generator",children:e.jsxs("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",children:[e.jsxs(o.div,{className:"text-center mb-8",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5},children:[e.jsxs(O,{className:"mb-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white",children:[e.jsx(K,{className:"w-3 h-3 mr-1"}),I]}),e.jsx("h2",{className:"text-3xl md:text-4xl font-bold mb-2","data-testid":"text-linkedin-title",children:j}),e.jsx("p",{className:"text-lg text-muted-foreground max-w-2xl mx-auto",children:k})]}),e.jsx(o.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5,delay:.1},children:e.jsxs(G,{className:"border-2 border-blue-200 dark:border-blue-800 shadow-lg",children:[e.jsx(R,{className:"pb-4",children:e.jsxs(H,{className:"flex items-center gap-2",children:[e.jsx(w,{className:"w-5 h-5 text-blue-600"}),"Choose Your Template"]})}),e.jsxs(W,{className:"space-y-6",children:[e.jsxs(F,{value:h,onValueChange:t=>{f(t),E()},children:[e.jsx(Y,{className:"grid w-full grid-cols-3",children:s.map(t=>e.jsx(B,{value:t.id,className:"text-xs sm:text-sm",children:t.name},t.id))}),s.map(t=>e.jsxs(z,{value:t.id,className:"space-y-4 mt-4",children:[e.jsx("p",{className:"text-sm text-muted-foreground",children:t.description}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:t.fields.map(a=>e.jsxs("div",{className:"space-y-1",children:[e.jsx(y,{htmlFor:a.id,className:"text-xs font-medium",children:a.label}),e.jsx(U,{id:a.id,placeholder:a.placeholder,value:l[a.id]||"",onChange:c=>S(a.id,c.target.value),className:"text-sm","data-testid":`input-linkedin-${a.id}`})]},a.id))}),e.jsxs(i,{onClick:_,className:"w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600",size:"lg","data-testid":"button-linkedin-generate",children:[e.jsx(V,{className:"w-4 h-4 mr-2"}),"Generate My Post"]})]},t.id))]}),N&&d&&e.jsxs(o.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:"space-y-4",children:[e.jsxs("div",{className:"border-t pt-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsxs(y,{className:"font-semibold flex items-center gap-2",children:[e.jsx($,{className:"w-4 h-4"}),"Your Generated Post"]}),e.jsx(i,{variant:"outline",size:"sm",onClick:P,"data-testid":"button-linkedin-copy",children:v?e.jsxs(e.Fragment,{children:[e.jsx(q,{className:"w-3 h-3 mr-1"}),"Copied!"]}):e.jsxs(e.Fragment,{children:[e.jsx(J,{className:"w-3 h-3 mr-1"}),"Copy"]})})]}),e.jsx("div",{className:"bg-muted/50 rounded-lg p-4 whitespace-pre-wrap text-sm font-mono max-h-64 overflow-y-auto",children:d})]}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-3",children:[e.jsx(i,{variant:"outline",className:"flex-1",asChild:!0,children:e.jsxs("a",{href:"https://www.linkedin.com/sharing/share-offsite/?url=https://fullstackmaster.net",target:"_blank",rel:"noopener noreferrer",onClick:()=>p("linkedin_opened","social","generator"),"data-testid":"button-linkedin-open",children:[e.jsx(w,{className:"w-4 h-4 mr-2 text-blue-600"}),"Open LinkedIn to Post"]})}),e.jsx(i,{className:"flex-1 bg-green-600 hover:bg-green-700",asChild:!0,children:e.jsxs("a",{href:`${C.whatsappLink}?text=${encodeURIComponent(x.whatsappMessage)}`,target:"_blank",rel:"noopener noreferrer",onClick:()=>L("linkedin-generator"),"data-testid":"button-linkedin-whatsapp",children:[e.jsx(D,{className:"w-4 h-4 mr-2"}),x.buttonText]})})]})]})]})]})}),e.jsx(o.p,{className:"text-center text-xs text-muted-foreground mt-4",initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.5,delay:.3},children:"Tip: Personalize the placeholders with your real experiences for maximum engagement"})]})})}export{Ie as default};
