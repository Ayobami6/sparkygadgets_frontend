import React from 'react'
import Image from 'next/image'
import { FaSearch } from "react-icons/fa";
import Link from 'next/link';

type Props = {
    searchText?: string;
    setSearchText?: (event: any) => void;
    handlePress?: (value: string) => void;
}

const Header = ({ searchText, setSearchText, handlePress }: Props) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearchText && setSearchText(event.target.value);
        handlePress && handlePress(event.target.value);

    };
    return (
        <div className='bg-white h-[100px] flex p-10 items-center border-b-2 rounded-md'>
            <div className='flex justify-start items-center gap-5'>
                <Link href={"/"}>
                    <div>
                        <Image src={'/images/spg-bg.png'} alt='logo' width={90} height={60} />
                    </div>
                </Link>

                <div className='relative'>
                    <input
                        type="text" className='p-3 border-2 rounded-md w-full pl-10'
                        placeholder='You looking for something?'
                        onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch />
                    </div>

                </div>


            </div>

        </div>
    )
}

export default Header