import { useEffect, useRef, useState } from "react";


interface VirtualListOptions{
    rowHeight:number;
    visibleRows:number;
    overScan:number;
}


function useVirtualList<T> (items:T[],options:VirtualListOptions){

    const rowHeight=options.rowHeight;
    const visibleRows=options.visibleRows;
    const overScan=options.overScan;

    const [scrollTop,setScrollTop]=useState(0);
    const containerRef=useRef<HTMLDivElement>(null);

    useEffect(
        function(){
            const container=containerRef.current;
            if (container===null){return;}
        

        function onScroll(){
            setScrollTop(container?.scrollTop ?? 0 );
        }

        container.addEventListener('scroll',onScroll);

        return function (){
            container.removeEventListener('scroll',onScroll);
        }
    
    },[]
    )


    const fireRow= Math.floor(scrollTop/rowHeight);
    const startIndex=Math.max(0,(fireRow-overScan));
    const endIndex= Math.min(items.length,fireRow+visibleRows+overScan);
    const spaceAbove=startIndex*rowHeight;
    const spaceBelow= (items.length-endIndex)*rowHeight;



    return{
        visibleItem:items.slice(startIndex,endIndex),
        containerRef,
        spaceAbove,
        spaceBelow,
        startIndex
    }

}

export default useVirtualList;