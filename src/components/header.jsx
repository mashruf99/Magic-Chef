import '../App.css'
import logo from '../assets/logo.svg'

function Header() {
    return (
        <>
            <header className="p-8 bg-neutral-50 shadow-xl">
                <div className="absolute top-6 left-5">
                   <img src={logo} alt="Magic Chef Logo" className="w-14 sm:w-14 md:w-16 lg:w-20" />
                </div>
                <div className="flex justify-center items-center ">
                    <h1 className="lg:text-4xl md:text-3xl sm:text-2xl">Magic Chef</h1>
                </div>
            </header>

        </>
    )
}

export default Header;
