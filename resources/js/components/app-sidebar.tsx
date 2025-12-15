import { NavMain } from '@/components/nav-main';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import { dashboard, logout } from '@/routes';
import { type NavItem } from '@/types';
import AppLogo from './app-logo';
import home from '@/assets/home.png';
import profil from '@/assets/account.png';
import test from '@/assets/test.png';
import course from '@/assets/course2.png';
import grade from '@/assets/grade.png';
import guide from '@/assets/guide.png';
import feedback from '@/assets/feedback2.png';
import signout from '@/assets/signout.png';
import { usePage } from '@inertiajs/react';

export function AppSidebar() {

const {auth} =usePage().props;
const useRole =auth?.user?.role || 'user';

const mainNavItems: NavItem[] = [
    {
        title: 'Home',
        href: dashboard(),
        icon: <img src={home} className="w-5 h-5 " />, 
    },
    {
        title: 'Profil',
        href: dashboard(),
        icon: <img src={profil} className="w-6 h-6" />,
    },
    
];

const userNavItems: NavItem[] = [
        { title: 'Test', href: dashboard(), icon: <img src={test} className="w-6 h-6" /> },
        { title: 'Course', href: dashboard(), icon: <img src={course} className="w-5 h-5" /> },
        { title: 'Grade', href: dashboard(), icon: <img src={grade} className="w-6 h-6" /> },
        { title: 'Guidebook', href: dashboard(), icon: <img src={guide} className="w-5 h-5" /> },
        { title: 'Feedback', href: dashboard(), icon: <img src={feedback} className="w-5 h-5" /> },
];

const guruNavItems: NavItem[] = [
        { title: 'Data user', href: '/guru/dataUser', icon: <img src={profil} className="w-6 h-6" /> },
        { title: 'Kelola Test', href: '/guru/test/kelolaTest', icon: <img src={test} className="w-6 h-6" /> },
        { title: 'Kelola Course', href: '/guru/course', icon: <img src={course} className="w-5 h-5" /> },
        { title: 'Kelola Nilai', href: '/guru/grade', icon: <img src={grade} className="w-6 h-6" /> },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Logout',
        href: logout(),
        icon: <img src={signout} className="w-6 h-6" />,
    },
    
];

    let roleBasedNavItems = [...mainNavItems];
    if (useRole === 'user'){
        roleBasedNavItems = [...roleBasedNavItems, ...userNavItems, ...footerNavItems];
    }
    if (useRole === 'guru'){
        roleBasedNavItems = [...roleBasedNavItems, ...guruNavItems, ...footerNavItems];
    }


    return (
        <Sidebar collapsible="icon" variant="inset" className="bg-[#0F828C]">
            <SidebarHeader className="bg-[#0F828C] " >
                <SidebarMenu >
                    <SidebarMenuItem >
                        {/* <SidebarMenuButton  asChild > */}
                            {/* <Link href={dashboard()} > */}
                                <AppLogo />
                            {/* </Link> */}
                        {/* </SidebarMenuButton> */}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="bg-[#0F828C]">
                
                <NavMain items={roleBasedNavItems} />
            
            </SidebarContent>

            {/* <SidebarFooter className="bg-[#0F828C]">
                <NavUser />
            </SidebarFooter> */}
        </Sidebar>
    );
}
