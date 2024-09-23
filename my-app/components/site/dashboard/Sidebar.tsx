"use client"
import React, { Fragment, ReactElement, useEffect, useState } from 'react'
import WorkspaceSwitcher from "./WorkspaceSwitcher"
import { RectangleGroupIcon, Square3Stack3DIcon } from '@heroicons/react/24/outline'
import Image from 'next/image';
import { User } from '@prisma/client';

type ViewPerm = "ADMIN" | "MEMBER"

interface TabItem {
    name: string;
    value: string;
    icon: ReactElement,
    perm: ViewPerm
}


const tabs: TabItem[] = [
    {
        name: "Dashboard",
        value: "dashboard",
        icon: <RectangleGroupIcon height={22} width={22} />,
        perm: "ADMIN"
    },
    {
        name: "Assets",
        value: "assets",
        icon: <Square3Stack3DIcon height={22} width={22} />,
        perm: "MEMBER"
    }
]

export type Views = "dashboard" | "assets" | "user";

interface SidebarProps {
    // eslint-disable-next-line
    setView: (v: Views) => void;
}

const Sidebar = ({ setView }: SidebarProps) => {
    const [activeView, setActiveView] = useState<Views>("dashboard");
    const [isWorkspaceAdmin, setIsWorkspaceAdmin] = useState<boolean>(false);

    const [userData, setUserData] = useState<User>();

    const changeView = (v: Views) => {
        setActiveView(v);
        setView(v)
    }

    const getUserData = async () => {
        const query = await fetch("/api/user", { method: "GET" });
        const res = await query.json();
        setUserData(res);
    }

    useEffect(() => {
        getUserData();
    }, [isWorkspaceAdmin])



    return (
        <>
            <div className='flex h-screen flex-col p-2'>
                <div>
                    <WorkspaceSwitcher image={""} setIsAdmin={setIsWorkspaceAdmin} userData={userData ? userData : null} />
                </div>
                <div className='mt-4 space-y-3'>
                    {tabs.map((tab, i) => {

                        if (tab.perm == "ADMIN" && isWorkspaceAdmin) {
                            return (
                                <div key={i} className={activeView == tab.value ? 'flex flex-row gap-3 items-center bg-white hover:border-[1.5px] hover:border-gray-200 rounded-lg py-1.5 hover:bg-white cursor-pointer text-black' : 'flex flex-row gap-3 items-center hover:border-[1.5px] hover:border-gray-200 rounded-lg py-1.5 hover:bg-white cursor-pointer text-gray-600'} onClick={() => changeView(tab.value as Views)}>

                                    <div className={"ml-3"}>{tab.icon}</div>
                                    <h1 className='text-sm font-medium'>{tab.name}</h1>
                                </div>
                            )
                        } else if (tab.perm == "ADMIN" && !isWorkspaceAdmin) {
                            return <Fragment key={i}></Fragment>
                        } else if (tab.perm == "MEMBER") {
                            return (
                                <div key={i} className={activeView == tab.value ? 'flex flex-row gap-3 items-center bg-white hover:border-[1.5px] hover:border-gray-200 rounded-lg py-1.5 hover:bg-white cursor-pointer text-black' : 'flex flex-row gap-3 items-center hover:border-[1.5px] hover:border-gray-200 rounded-lg py-1.5 hover:bg-white cursor-pointer text-gray-600'} onClick={() => changeView(tab.value as Views)}>

                                    <div className={"ml-3"}>{tab.icon}</div>
                                    <h1 className='text-sm font-medium'>{tab.name}</h1>
                                </div>
                            )
                        }

                    })}


                </div>
                {/* User Tab */}
                <div className='mt-auto bottom-0 flex flex-col '>
                    {userData && (
                        <div className={activeView == "user" ? 'flex flex-row gap-3 items-center bg-white hover:border-[1.5px] hover:border-gray-200 rounded-lg py-1.5 hover:bg-white cursor-pointer' : 'flex flex-row gap-3 items-center hover:border-[1.5px] hover:border-gray-200 rounded-lg py-1.5 hover:bg-white cursor-pointer'} onClick={() => changeView("user")}>

                            <Image alt="Google" src={userData.image!} width={32} height={32} className='ml-3 rounded-lg' />
                            <div className='flex flex-col '>
                                <h1 className='text-sm font-semibold'>{userData.name}</h1>
                                <h1 className='text-xs font-medium'>{userData.email}</h1>

                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}

export default Sidebar