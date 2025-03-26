import Image from "next/image";

export default function FlyerPage() {
  return (
    <div className="relative w-full h-screen bg-black">
      <Image 
        src="/flyer.png" 
        alt="EECS Club Flyer" 
        fill
        className="object-contain"
        priority
      />
      
      <a 
        href="/flyer.png" 
        download="eecs_club_flyer.png"
        className="absolute bottom-6 right-6 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full transition-colors"
        title="Download Flyer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span className="text-sm font-medium">Download</span>
      </a>
    </div>
  );
}
