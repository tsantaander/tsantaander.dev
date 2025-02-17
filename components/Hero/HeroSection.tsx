import Image from 'next/image';
import ReadingSection from './ReadingSection';
export default function HeroSection() {
    return (
        <section className="relative flex max-h-[1440px] h-[100vh] justify-center flex-col w-full overflow-y-clip overflow-x-hidden">
            <div className="flex flex-col w-full mx-auto z-20 text-white max-w-[1400px]">
                <ReadingSection />
            </div>
            <div className="absolute inset-0 z-0">
                <Image 
                    src="/backgrounds/hero_background.webp"
                    alt="Hero background"
                    fill
                    width={0}
                    height={0}               
                />
            </div>
        </section>
    );
};