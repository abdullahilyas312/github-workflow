"use client";

import Image from "next/image";
import { gallery } from '@/data/objects/Gallery';



export default function ThreeColumnGallery() {


  return (
    <section className="w-full py-16 flex flex-col gap-20 overflow-hidden items-center justify-center">
      <div className="text-center mb-10">
        <p className="text-sm text-gray-500">Share your Watches with</p>
        <h2 className="text-2xl sm:text-3xl font-bold">#Amir Watches</h2>
      </div>

      <div className="w-full grid items-center grid-cols-5 gap-4">
        {[0, 1, 2].map((col) => (
          <div 
            key={col} 
            // ref={col === 0 ? col1Ref : col === 1 ? col2Ref : col3Ref} 
            className={
                `w-full h-auto space-y-5
                ${col === 0 ? 'columns-2' : (col === 1 ? 'columns-1' : 'columns-2')}
                ${col === 0 ? 'col-span-2' : (col === 1 ? 'col-span-1' : 'col-span-2')}
               
                } 
             `}>
            {gallery.map((img, i) => {
              if (col === 0 && i < 4) return renderImage(img, `${col}-${i}`)
              if (col === 1 && i >= 4 && i < 6 ) return renderImage(img, `${col}-${i}`)
              if (col === 2 && i >= 6 && i < 10) return renderImage(img, `${col}-${i}`)
              return null
            })}
          </div>
        ))}
      </div>
    </section>
  )
}

function renderImage(img, uniqueKey) {
  return (
    <div key={uniqueKey} className={`w-full`}>
      <Image
        src={img.src}
        alt={img.alt}
        className="h-auto w-full hover:scale-3d hover:scale-[102%] transition-all object-cover"
      />
    </div>
  )
}

