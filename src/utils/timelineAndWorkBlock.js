const reducedMotion = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

export function initTimeline(){
    const track= document.querySelector(".timeline__track");
    const fill= document.querySelector(".timeline__bar-fill");

    if(!track||!fill) return;
    let rafId=null;

    function update(){
        const rect= track.getBoundingClientRect();
        const vp= innerHeight;
        const start= -(vp*.6);
        const end= track.offsetHeight- vp*.4;
        const progress= Math.max(0, Math.min(1, (-rect.top-start)/ (end-start)));
        fill.style.height= `${progress*100}%`;
        rafId=null;
    }

    addEventListener("scroll", ()=>{
            if(rafId) return;
            rafId= requestAnimationFrame(update);
        },
        {passive:true}
    );

    update();
}


export function initAnimations(){
    const items=[...document.querySelectorAll(".timeline__item")];

    if(!items.length) return;
    if(reducedMotion) {
        items.forEach(item=>
            item.classList.add("is-visible")
        );

        return;
    }

    items.forEach(item=>
        item.classList.add("reveal-pending")
    );

    const observer=
        new IntersectionObserver(
            entries=>{
                entries.forEach(entry=>{
                    if(!entry.isIntersecting)
                        return;
                    entry.target.classList.remove("reveal-pending");
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                rootMargin: "0px 0px -60px",
                threshold:.12
            }
        );

    items.forEach(item=>
        observer.observe(item)
    );
}