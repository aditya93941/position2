import Header from '@/components/header/page';
import StudioxBanner from '@/components/studioxBanner/page';
import StudioxCarousal from '@/components/studioxCarousal/page';
import StudioxFooter from '@/components/studoxFooter/page'
import Studiox3D from '@/components/studiox3D/page';

export const page = () => {
    return (
        <>
            <Header />
            <StudioxBanner />
            <Studiox3D />
            <StudioxCarousal />
            <StudioxFooter />
        </>
    )
}


export default page;
