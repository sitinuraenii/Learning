import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { url } = usePage(); 
    const normalizeHref = (href: NavItem['href']) => {
    return typeof href === 'string' ? href : String(href);
    };

    const isActive = (href: NavItem['href']) => {
        return url.startsWith(normalizeHref(href));
    };
    return (
        <SidebarGroup className="px-1 py-0 ">
            <SidebarGroupLabel className="text-sm font-semibold">Menu</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                <SidebarMenuItem key={String(item.href)}>
                    <SidebarMenuButton
                    asChild
                    className={`
                        transition
                        ${
                        isActive(item.href)
                            ? "bg-[#78B9B5] text-black font-semibold"
                            : "text-white/80 hover:bg-white/20"
                        }
                    `}
                    >
                    <Link href={item.href} className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
